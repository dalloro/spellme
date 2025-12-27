#!/usr/bin/env node
/**
 * Script to generate pre-computed Italian puzzles
 * Creates puzzles similar to the English version with letter sets and valid words
 */

const fs = require('fs');
const path = require('path');

// Load the Italian dictionary
const WORDS_FILE = path.join(__dirname, '../lang/it/words_it.js');
const OUTPUT_FILE = path.join(__dirname, '../lang/it/puzzles_it.js');

// Min 4 characters, standard game rules
const MIN_WORD_LENGTH = 4;
const PUZZLE_LETTER_COUNT = 7;
const TARGET_PUZZLE_COUNT = 1000;

// Minimum words per puzzle to be considered playable
const MIN_WORDS_PER_PUZZLE = 20;
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

function calculateMaxScore(words) {
    let score = 0;
    for (const word of words) {
        // 1 point for 4-letter words, length points for longer
        score += word.length === 4 ? 1 : word.length;
        // Bonus for pangrams (uses all 7 letters)
        if (getUniqueLetters(word).size === PUZZLE_LETTER_COUNT) {
            score += 7;
        }
    }
    return score;
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

function generatePuzzles(words, existingPuzzles) {
    console.log('Finding candidate letter combinations...');

    const existingSignatures = new Set();
    let maxId = -1;
    Object.keys(existingPuzzles).forEach(id => {
        const p = existingPuzzles[id];
        existingSignatures.add(getPuzzleSignature(p.letters));
        maxId = Math.max(maxId, parseInt(id));
    });

    console.log(`Loaded ${existingSignatures.size} existing puzzle signatures.`);

    // Group words by their unique letters
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

            const validWords = findValidWordsForLetters(centerLetter, allLetters, words);
            const pangramCount = countPangrams(validWords);

            if (validWords.length >= MIN_WORDS_PER_PUZZLE && pangramCount >= MIN_PANGRAMS_PER_PUZZLE) {
                const maxScore = calculateMaxScore(validWords);
                const nextId = (maxId + 1 + newGeneratedCount).toString();

                puzzles[nextId] = {
                    letters: allLetters,
                    words: validWords.sort(),
                    maxScore: maxScore
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
    const existingPuzzles = loadExistingPuzzles();
    const puzzles = generatePuzzles(words, existingPuzzles);

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
    const allWords = Object.values(puzzles).flatMap(p => p.words);
    console.log(`\nPuzzle statistics:`);
    console.log(`  Total puzzles: ${Object.keys(puzzles).length}`);
    console.log(`  Avg words per puzzle: ${(allWords.length / Object.keys(puzzles).length).toFixed(1)}`);
}

main();
