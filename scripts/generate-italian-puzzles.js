#!/usr/bin/env node
/**
 * Script to generate pre-computed Italian puzzles
 * Creates puzzles similar to the English version with letter sets and valid words
 * Now with BALANCED difficulty based on word frequency.
 */

const fs = require('fs');
const path = require('path');
const { balancePuzzle } = require('../utils/puzzle-balancer');

// Load the Italian dictionary
const WORDS_FILE = path.join(__dirname, '../lang/it/words_it.js');
const OUTPUT_FILE = path.join(__dirname, '../lang/it/puzzles_it.js');
const FREQ_FILE = path.join(__dirname, '../lang/it/frequency.txt');

// Min 4 characters, standard game rules
const MIN_WORD_LENGTH = 4;
const PUZZLE_LETTER_COUNT = 7;
const TARGET_PUZZLE_COUNT = 1000;

// Minimum words per puzzle to be considered playable
// Note: balancer might keep it small if natural count is small
// But for a NEW puzzle, we probably want at least some minimum "Natural" complexity
const MIN_NATURAL_WORDS = 20;
const MIN_PANGRAMS_PER_PUZZLE = 1;

function loadWords() {
    console.log('Loading Italian dictionary...');
    if (!fs.existsSync(WORDS_FILE)) {
        throw new Error(`Words file not found: ${WORDS_FILE}. Run "npm run generate:dictionary:it" first.`);
    }
    const content = fs.readFileSync(WORDS_FILE, 'utf-8');
    // Extract the array from the Set constructor
    const match = content.match(/new Set\((\[[\s\S]*?\])\)/);
    if (!match) {
        throw new Error('Could not parse words file');
    }
    const words = JSON.parse(match[1]);
    console.log(`Loaded ${words.length} words`);
    return words;
}

function loadFrequency() {
    console.log('Loading frequency list...');
    if (!fs.existsSync(FREQ_FILE)) {
        console.warn('Frequency file not found. Balancing will be less effective.');
        return new Map();
    }
    const content = fs.readFileSync(FREQ_FILE, 'utf-8');
    const lines = content.split('\n');
    const map = new Map();
    lines.forEach((line, index) => {
        // Format: "word count" or just "word"? 
        // The downloaded file (hermitdave) usually has "word count".
        // Let's check format. Step 36 output showed empty chunks, let's assume it's "word count" or just words.
        // Actually, typical frequency lists are "word 12345".
        // Let's assume space separated.
        const parts = line.trim().split(' ');
        const word = parts[0];
        if (word) {
            map.set(word.toLowerCase(), index + 1);
        }
    });
    console.log(`Loaded frequencies for ${map.size} words.`);
    return map;
}

function loadExistingPuzzles() {
    if (!fs.existsSync(OUTPUT_FILE)) {
        return {};
    }
    console.log('Loading existing puzzles...');
    const content = fs.readFileSync(OUTPUT_FILE, 'utf-8');
    const match = content.match(/const PUZZLES_IT = (\{[\s\S]*?\});/);
    if (!match) return {};
    try {
        return JSON.parse(match[1]);
    } catch (e) {
        console.warn('Failed to parse existing puzzles, starting fresh.');
        return {};
    }
}

function getPuzzleSignature(letters) {
    // Signature is center letter + sorted other letters
    const center = letters[0];
    const others = letters.slice(1).sort().join('');
    return `${center}:${others}`;
}

function getUniqueLetters(word) {
    return new Set(word.toLowerCase().split(''));
}

function findValidWordsForLetters(centerLetter, allLetters, allWords) {
    const letterSet = new Set(allLetters);
    const validWords = [];

    for (const word of allWords) {
        if (word.length < MIN_WORD_LENGTH) continue;

        // Must contain center letter
        if (!word.includes(centerLetter)) continue;

        // All letters must be in the allowed set
        let valid = true;
        for (const char of word) {
            if (!letterSet.has(char)) {
                valid = false;
                break;
            }
        }

        if (valid) {
            validWords.push(word);
        }
    }

    return validWords;
}

function countPangrams(words) {
    let count = 0;
    for (const word of words) {
        if (getUniqueLetters(word).size === PUZZLE_LETTER_COUNT) {
            count++;
        }
    }
    return count;
}

function generatePuzzles(words, existingPuzzles, freqMap) {
    console.log('Finding candidate letter combinations...');
    const totalFreqWords = freqMap.size;

    const existingSignatures = new Set();
    let maxId = -1;
    Object.keys(existingPuzzles).forEach(id => {
        const p = existingPuzzles[id];
        existingSignatures.add(getPuzzleSignature(p.letters));
        maxId = Math.max(maxId, parseInt(id));
    });

    console.log(`Loaded ${existingSignatures.size} existing puzzle signatures.`);

    // Group words by their unique letters (to find Pangrams easily)
    const letterCombinations = new Map();

    for (const word of words) {
        const uniqueLetters = getUniqueLetters(word);
        if (uniqueLetters.size === PUZZLE_LETTER_COUNT) {
            // This word is a pangram - extract its letter combination
            const letters = Array.from(uniqueLetters).sort().join('');
            if (!letterCombinations.has(letters)) {
                letterCombinations.set(letters, []);
            }
            letterCombinations.get(letters).push(word);
        }
    }

    console.log(`Found ${letterCombinations.size} letter combinations with pangrams`);

    const puzzles = { ...existingPuzzles };
    let newGeneratedCount = 0;
    let attempts = 0;

    // Shuffle the combinations for variety
    const combinations = Array.from(letterCombinations.keys());
    for (let i = combinations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }

    for (const letterCombo of combinations) {
        if (newGeneratedCount >= TARGET_PUZZLE_COUNT) break;
        attempts++;

        const letters = letterCombo.split('');

        // Try each letter as the center letter
        for (const centerLetter of letters) {
            const allLetters = [centerLetter, ...letters.filter(l => l !== centerLetter)];
            const signature = getPuzzleSignature(allLetters);

            if (existingSignatures.has(signature)) continue;

            const naturalValidWords = findValidWordsForLetters(centerLetter, allLetters, words);
            const pangramCount = countPangrams(naturalValidWords);

            // Filter out puzzles that are too sparse naturally
            if (naturalValidWords.length >= MIN_NATURAL_WORDS && pangramCount >= MIN_PANGRAMS_PER_PUZZLE) {

                // BALANCE THE PUZZLE
                const balanced = balancePuzzle(naturalValidWords, freqMap, totalFreqWords);

                // Assuming we want to store it even if it was capped
                const nextId = (maxId + 1 + newGeneratedCount).toString();

                puzzles[nextId] = {
                    letters: allLetters,
                    words: balanced.words,
                    maxScore: balanced.maxScore,
                    // naturalCount: balanced.naturalCount // Optional metadata
                };

                existingSignatures.add(signature);
                newGeneratedCount++;

                if (newGeneratedCount % 100 === 0) {
                    console.log(`Generated ${newGeneratedCount} NEW puzzles...`);
                }

                if (newGeneratedCount >= TARGET_PUZZLE_COUNT) break;
            }
        }
    }

    console.log(`Generated ${newGeneratedCount} NEW puzzles from ${attempts} attempts`);
    return puzzles;
}

function main() {
    console.log('=== Italian Puzzle Generator ===\n');

    const words = loadWords();
    const freqMap = loadFrequency();
    const existingPuzzles = loadExistingPuzzles();

    // We can regenerate all or append. 
    // Usually append is safer, but if we want to REBALANCE existing Italian puzzles,
    // we should probably clear existing ones or reprocess them.
    // Given the task is to "improve gameplay" and "ensure number of words... in ballpark",
    // we should really re-process everything.
    // But this function specifically loads existing.
    // Let's decide to KEEP logic as "generate new", but the user might want old ones fixed.
    // Since Italian puzzles file might be small or generated, let's just generate fresh ones or update logic?
    // "TARGET_PUZZLE_COUNT = 1000". If we already have 1000, it won't generate new ones.
    // Let's assume we want to replace/refresh them.
    // I will pass empty object to generatePuzzles to force regeneration using new logic.

    console.log('Regenerating ALL puzzles with new balance logic...');
    const puzzles = generatePuzzles(words, {}, freqMap);

    // Generate JavaScript file
    const jsContent = `// Italian Puzzles for Spelling Bee
// Generated from Italian word dictionary
// Total puzzles: ${Object.keys(puzzles).length}

const PUZZLES_IT = ${JSON.stringify(puzzles, null, 2)};

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PUZZLES_IT };
}
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`\nGenerated: ${OUTPUT_FILE}`);
    console.log(`File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`);

    // Print some stats
    const allWordsCount = Object.values(puzzles).reduce((acc, p) => acc + p.words.length, 0);
    console.log(`\nPuzzle statistics:`);
    console.log(`  Total puzzles: ${Object.keys(puzzles).length}`);
    console.log(`  Avg words per puzzle: ${(allWordsCount / Object.keys(puzzles).length).toFixed(1)}`);
}

main();
