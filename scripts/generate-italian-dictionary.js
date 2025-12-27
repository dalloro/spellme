#!/usr/bin/env node
/**
 * Script to process Italian word lists and generate words_it.js
 * Filters out words with accents, apostrophes, and short words.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MIN_WORD_LENGTH = 4;
const FORBIDDEN_PATTERN = /[àèéìòùÀÈÉÌÒÙ']/;
const ONLY_LETTERS_PATTERN = /^[a-zA-Z]+$/;

// Input files (downloaded from GitHub)
// Using curated list only - full conjugation list is too large (65MB)
const INPUT_FILES = [
    path.join(__dirname, '../lang/it/raw_dictionary.txt')
];

// Output file
const OUTPUT_FILE = path.join(__dirname, '../lang/it/words_it.js');
const RAW_DICT_URL = 'https://raw.githubusercontent.com/sigmasaur/AnagramSolver/master/dictionary.txt';

async function downloadIfMissing(filePath) {
    if (fs.existsSync(filePath)) return;

    console.log(`Downloading raw dictionary from ${RAW_DICT_URL}...`);
    const response = await fetch(RAW_DICT_URL);
    if (!response.ok) throw new Error(`Failed to download dictionary: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`Downloaded: ${filePath}`);
}

async function processWords() {
    console.log('Processing Italian word lists...');

    // Ensure raw dictionary exists
    const rawDictPath = INPUT_FILES[0];
    await downloadIfMissing(rawDictPath);

    const wordSet = new Set();
    let totalInput = 0;
    let filtered = { short: 0, forbidden: 0, invalid: 0 };

    for (const inputFile of INPUT_FILES) {
        if (!fs.existsSync(inputFile)) {
            console.log(`Skipping ${inputFile} (not found)`);
            continue;
        }

        const content = fs.readFileSync(inputFile, 'utf-8');
        const lines = content.split('\n');

        console.log(`Processing ${inputFile}: ${lines.length} entries`);
        totalInput += lines.length;

        for (const line of lines) {
            const word = line.trim().toLowerCase();

            // Skip empty lines
            if (!word) continue;

            // Skip short words
            if (word.length < MIN_WORD_LENGTH) {
                filtered.short++;
                continue;
            }

            // Skip words with forbidden characters (accents, apostrophes)
            if (FORBIDDEN_PATTERN.test(word)) {
                filtered.forbidden++;
                continue;
            }

            // Skip words with non-letter characters
            if (!ONLY_LETTERS_PATTERN.test(word)) {
                filtered.invalid++;
                continue;
            }

            wordSet.add(word);
        }
    }

    console.log(`\nStatistics:`);
    console.log(`  Total input words: ${totalInput}`);
    console.log(`  Filtered (too short): ${filtered.short}`);
    console.log(`  Filtered (accents/apostrophes): ${filtered.forbidden}`);
    console.log(`  Filtered (non-letter chars): ${filtered.invalid}`);
    console.log(`  Valid words: ${wordSet.size}`);

    // Sort words alphabetically
    const sortedWords = Array.from(wordSet).sort();

    // Generate JavaScript file
    const jsContent = `// Italian Word Dictionary for Spelling Bee
// Generated from hunspell-it and other public domain sources
// Words with accents, apostrophes, or fewer than 4 letters are excluded
// Total words: ${sortedWords.length}

const VALID_WORDS_IT = new Set(${JSON.stringify(sortedWords)});

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VALID_WORDS_IT };
}
`;

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`\nGenerated: ${OUTPUT_FILE}`);
    console.log(`File size: ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB`);
}

processWords().catch(err => {
    console.error('Failed to generate dictionary:', err);
    process.exit(1);
});
