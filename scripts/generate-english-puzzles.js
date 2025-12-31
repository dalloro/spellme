#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Paths
const ENRICHED_WORDS_FILE = path.join(__dirname, '../lang/en/words_enriched.js');
const OUTPUT_FILE = path.join(__dirname, '../lang/en/puzzles.js');

// Config
const TARGET_PUZZLE_COUNT = 1000;
const MIN_WORDS = 30;
const MAX_WORDS = 80; // Expanded to support higher scores
const PREFERRED_ADVANCED_MAX = 0.25;

console.log('Loading Enriched Dictionary...');
const { ENRICHED_WORDS } = require(ENRICHED_WORDS_FILE);
const allWords = Object.keys(ENRICHED_WORDS);

function getUniqueLetters(word) {
    return Array.from(new Set(word.toLowerCase().split(''))).sort().join('');
}

// Group words by pangram sets
console.log('Indexing pangrams...');
const pangramGroups = new Map();
allWords.forEach(word => {
    const unique = getUniqueLetters(word);
    if (unique.length === 7) {
        if (!pangramGroups.has(unique)) pangramGroups.set(unique, []);
        pangramGroups.get(unique).push(word);
    }
});
console.log(`Found ${pangramGroups.size} unique letter sets with at least one pangram.`);

function calculateQBScore(words) {
    let score = 0;
    for (const word of words) {
        score += word.length === 4 ? 1 : word.length;
        if (new Set(word).size === 7) score += 7;
    }
    return score;
}

function evaluatePuzzle(center, words) {
    const wordCount = words.length;
    if (wordCount < MIN_WORDS || wordCount > MAX_WORDS) return Infinity;

    const qbScore = calculateQBScore(words);

    let advancedCount = 0;
    let rankSum = 0;
    const posSeen = new Set();

    words.forEach(w => {
        const entry = ENRICHED_WORDS[w];
        if (entry.rank > 10000) advancedCount++;
        rankSum += entry.rank;
        if (entry.pos) entry.pos.forEach(p => posSeen.add(p));
    });

    const avgRank = rankSum / wordCount;
    const advancedRatio = advancedCount / wordCount;

    // Penalize high advanced ratio
    const advancedPenalty = Math.max(0, advancedRatio - PREFERRED_ADVANCED_MAX) * 100000; // Increased penalty for bad quality

    // NEW KPI: Target 250 points (Aggressive weighting)
    const scorePenalty = Math.abs(qbScore - 250) * 1000;

    // Diversity bonus
    const diversityBonus = posSeen.size * 3000;

    return avgRank + advancedPenalty + scorePenalty - diversityBonus;
}

const puzzles = [];
console.log('Generating puzzle candidates...');
let processed = 0;
const total = pangramGroups.size;

for (const [uniqueLetters, seedWords] of pangramGroups.entries()) {
    processed++;
    if (processed % 200 === 0) console.log(`Processed ${processed}/${total}...`);

    const letterArray = uniqueLetters.split('');
    const letterSet = new Set(letterArray);

    const pool = [];
    for (const word of allWords) {
        let match = true;
        for (const char of word) {
            if (!letterSet.has(char)) {
                match = false;
                break;
            }
        }
        if (match) pool.push(word);
    }

    for (const center of letterArray) {
        if (['q', 'x', 'z'].includes(center)) continue;

        const validWords = pool.filter(w => w.includes(center));
        const score = evaluatePuzzle(center, validWords);

        if (score !== Infinity) {
            puzzles.push({
                center,
                letters: uniqueLetters.replace(center, ''),
                words: validWords.sort(),
                score: score,
                count: validWords.length,
                qbScore: calculateQBScore(validWords)
            });
        }
    }
}

console.log(`Generated ${puzzles.length} valid puzzles. Selecting top ${TARGET_PUZZLE_COUNT}...`);
puzzles.sort((a, b) => a.score - b.score);

const finalPuzzles = {};
const picked = puzzles.slice(0, TARGET_PUZZLE_COUNT);

picked.forEach((p, idx) => {
    finalPuzzles[idx] = {
        letters: [p.center, ...p.letters.split('')],
        words: p.words,
        maxScore: p.qbScore
    };
});

const output = `// Pre-computed English Puzzles (Overhauled)
// word count: 30-70, target score: 250.
const PUZZLES = ${JSON.stringify(finalPuzzles, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PUZZLES };
}
`;

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Saved ${picked.length} puzzles with Avg Score: ${(picked.reduce((a, b) => a + b.qbScore, 0) / picked.length).toFixed(1)}`);
