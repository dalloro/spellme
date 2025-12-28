#!/usr/bin/env node
/**
 * Script to generate pre-computed English puzzles
 * Creates balanced puzzles targeting 1000 total.
 */

const fs = require('fs');
const path = require('path');
const { balancePuzzle } = require('../utils/puzzle-balancer');

// English Paths
const WORDS_FILE = path.join(__dirname, '../lang/en/words.js');
const OUTPUT_FILE = path.join(__dirname, '../lang/en/puzzles.js');
const FREQ_FILE = path.join(__dirname, '../lang/en/frequency.txt');

// Config
const MIN_WORD_LENGTH = 4;
const PUZZLE_LETTER_COUNT = 7;
const TARGET_PUZZLE_COUNT = 1000;
const MIN_NATURAL_WORDS = 20;
const MIN_PANGRAMS_PER_PUZZLE = 1;

function loadWords() {
    console.log('Loading English dictionary...');
    if (!fs.existsSync(WORDS_FILE)) {
        throw new Error(`Words file not found: ${WORDS_FILE}`);
    }
    const content = fs.readFileSync(WORDS_FILE, 'utf-8');
    // Extract array content from: const VALID_WORDS = new Set(["...", ...]);
    const match = content.match(/new Set\(([^)]+)\)/);
    if (!match) throw new Error('Could not parse words file');

    try {
        const arrayStr = match[1];
        return JSON.parse(arrayStr);
    } catch (e) {
        // Fallback for non-strict JSON (e.g. single quotes)
        return eval(match[1]);
    }
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
        const word = line.trim().toLowerCase();
        if (word) {
            map.set(word, index + 1);
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
    // English file: const PUZZLES = { ... };
    const match = content.match(/const PUZZLES = (\{[\s\S]*?\});/);
    if (!match) return {};
    try {
        // Use eval because keys might be unquoted or JS-specific
        return eval(`(${match[1]})`);
    } catch (e) {
        console.warn('Failed to parse existing puzzles, starting fresh.');
        return {};
    }
}

function getPuzzleSignature(letters) {
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
        if (!word.includes(centerLetter)) continue;

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
    // Puzzles keys are "0", "1"...
    Object.keys(existingPuzzles).forEach(id => {
        const p = existingPuzzles[id];
        existingSignatures.add(getPuzzleSignature(p.letters));
        maxId = Math.max(maxId, parseInt(id));
    });

    console.log(`Loaded ${existingSignatures.size} existing puzzle signatures.`);
    console.log(`Max ID: ${maxId}`);

    // Group words by their unique letters
    const letterCombinations = new Map();

    for (const word of words) {
        const uniqueLetters = getUniqueLetters(word);
        if (uniqueLetters.size === PUZZLE_LETTER_COUNT) {
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

    // We only need to generate if we have fewer than TARGET
    let currentTotal = Object.keys(puzzles).length;
    if (currentTotal >= TARGET_PUZZLE_COUNT) {
        console.log(`Already have ${currentTotal} puzzles. Skipping generation.`);
        return puzzles;
    }

    const combinations = Array.from(letterCombinations.keys());
    // Shuffle
    for (let i = combinations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }

    // Generate new ones
    for (const letterCombo of combinations) {
        if (Object.keys(puzzles).length >= TARGET_PUZZLE_COUNT) break;

        const letters = letterCombo.split('');

        // Try each letter as center
        for (const centerLetter of letters) {
            const allLetters = [centerLetter, ...letters.filter(l => l !== centerLetter)];
            const signature = getPuzzleSignature(allLetters);

            if (existingSignatures.has(signature)) continue;

            const naturalValidWords = findValidWordsForLetters(centerLetter, allLetters, words);
            const pangramCount = countPangrams(naturalValidWords);

            if (naturalValidWords.length >= MIN_NATURAL_WORDS && pangramCount >= MIN_PANGRAMS_PER_PUZZLE) {

                // Balance it
                const balanced = balancePuzzle(naturalValidWords, freqMap, totalFreqWords);

                maxId++;
                const nextId = maxId.toString();

                puzzles[nextId] = {
                    letters: allLetters,
                    words: balanced.words,
                    maxScore: balanced.maxScore
                };

                existingSignatures.add(signature);
                newGeneratedCount++;

                if (newGeneratedCount % 50 === 0) {
                    console.log(`Generated ${newGeneratedCount} additional puzzles... Total: ${Object.keys(puzzles).length}`);
                }

                if (Object.keys(puzzles).length >= TARGET_PUZZLE_COUNT) break;
            }
        }
        if (Object.keys(puzzles).length >= TARGET_PUZZLE_COUNT) break;
    }

    console.log(`Generated ${newGeneratedCount} NEW puzzles.`);
    return puzzles;
}

function main() {
    console.log('=== English Puzzle Generator ===\n');

    const words = loadWords();
    const freqMap = loadFrequency();
    const existingPuzzles = loadExistingPuzzles();

    // Generate new ones appending to existing
    const puzzles = generatePuzzles(words, existingPuzzles, freqMap);

    // Generate JavaScript file
    const jsContent = `const PUZZLES = ${JSON.stringify(puzzles, null, 2)};\n`;

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`\nSaved: ${OUTPUT_FILE}`);
    console.log(`File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`);

    // Print stats
    const allWordsCount = Object.values(puzzles).reduce((acc, p) => acc + p.words.length, 0);
    console.log(`\nPuzzle statistics:`);
    console.log(`  Total puzzles: ${Object.keys(puzzles).length}`);
    console.log(`  Avg words per puzzle: ${(allWordsCount / Object.keys(puzzles).length).toFixed(1)}`);
}

main();
