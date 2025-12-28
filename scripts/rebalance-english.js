const fs = require('fs');
const path = require('path');
const { balancePuzzle } = require('../utils/puzzle-balancer');

const ROOT_DIR = path.join(__dirname, '..');
const WORDS_FILE = path.join(ROOT_DIR, 'lang/en/words.js');
const PUZZLES_FILE = path.join(ROOT_DIR, 'lang/en/puzzles.js');
const FREQ_FILE = path.join(ROOT_DIR, 'lang/en/frequency.txt');

function loadWords() {
    console.log('Loading words...');
    const content = fs.readFileSync(WORDS_FILE, 'utf-8');
    // Extract array content from: const VALID_WORDS = new Set(["...", ...]);
    const match = content.match(/new Set\(([^)]+)\)/);
    if (!match) throw new Error('Could not parse words file');

    // Evaluate the array string or parse it safely
    // Since it's a simple array of strings, JSON.parse might work if we replace single quotes? 
    // The file used double quotes in the snippet, so let's try strict JSON parsing if possible.
    // If not, we can use eval since we trust our own codebase.
    try {
        const arrayStr = match[1];
        // Ensure it looks like JSON
        return JSON.parse(arrayStr);
    } catch (e) {
        console.warn("JSON parse failed, falling back to eval for words list");
        return eval(match[1]);
    }
}

function loadPuzzles() {
    console.log('Loading puzzles...');
    const content = fs.readFileSync(PUZZLES_FILE, 'utf-8');
    // Extract object: const PUZZLES = { ... };
    const match = content.match(/const PUZZLES = (\{[\s\S]*?\});/);
    if (!match) throw new Error('Could not parse puzzles file');
    // Use eval because the object keys might not be quoted or other JS specifics
    // Wrapper in parentheses to evaluate as expression
    return eval(`(${match[1]})`);
}

function loadFrequency() {
    console.log('Loading frequency list...');
    const content = fs.readFileSync(FREQ_FILE, 'utf-8');
    const lines = content.split('\n');
    const map = new Map();
    lines.forEach((line, index) => {
        const word = line.trim().toLowerCase();
        if (word) {
            map.set(word, index + 1); // Rank 1-based
        }
    });
    console.log(`Loaded frequencies for ${map.size} words.`);
    return map;
}

function findValidWords(allWords, letters) {
    const center = letters[0].toLowerCase();
    const allowed = new Set(letters.map(l => l.toLowerCase()));

    return allWords.filter(word => {
        if (word.length < 4) return false;
        if (!word.includes(center)) return false;
        for (const char of word) {
            if (!allowed.has(char)) return false;
        }
        return true;
    });
}

function main() {
    const allWords = loadWords();
    const puzzles = loadPuzzles();
    const freqMap = loadFrequency();
    const totalFreqWords = freqMap.size; // Should be ~10k for English

    console.log(`Processing ${Object.keys(puzzles).length} puzzles...`);

    let balancedCount = 0;
    let modifiedCount = 0;

    for (const id in puzzles) {
        const puzzle = puzzles[id];
        const letters = puzzle.letters;

        // Recover all possible valid words ("Natural" set)
        const naturalWords = findValidWords(allWords, letters);

        // Apply balancing logic
        const balanced = balancePuzzle(naturalWords, freqMap, totalFreqWords);

        // Update puzzle
        if (balanced.words.length !== puzzle.words.length) {
            modifiedCount++;
        }

        puzzle.words = balanced.words;
        puzzle.maxScore = balanced.maxScore;
        // Optional: puzzle.naturalCount = balanced.naturalCount; // Not strictly required by UI yet

        balancedCount++;
        if (balancedCount % 100 === 0) process.stdout.write('.');
    }

    console.log(`\nProcessed ${balancedCount} puzzles.`);
    console.log(`Modified word lists for ${modifiedCount} puzzles.`);

    // Save back to file
    const newContent = `const PUZZLES = ${JSON.stringify(puzzles, null, 2)};\n`;
    fs.writeFileSync(PUZZLES_FILE, newContent);
    console.log('Saved updated puzzles to', PUZZLES_FILE);
}

main();
