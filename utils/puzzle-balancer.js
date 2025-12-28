/**
 * Puzzle Balancer Utility
 * 
 * Logic to select a balanced set of words for a Spelling Bee puzzle.
 * - Targets 35-45 words per game (if starting with > 45).
 * - Maintains 50% Common, 30% Medium, 20% Rare distribution.
 * - Preserves natural difficulty for smaller puzzles.
 */

/**
 * Get frequency thresholds based on the size of the frequency list.
 * @param {number} totalFreqWords 
 * @returns {Object} { commonThreshold, mediumThreshold }
 */
function getThresholds(totalFreqWords) {
    if (totalFreqWords <= 15000) {
        // English (Small list)
        return { commonThreshold: 3000, mediumThreshold: 10000 };
    } else {
        // Italian (Large list)
        return { commonThreshold: 5000, mediumThreshold: 20000 };
    }
}

/**
 * Classifies words into frequency buckets.
 * @param {string[]} words - List of valid words.
 * @param {Map<string, number>|Object} freqMap - Map of word -> frequency rank/value.
 * @param {number} totalFreqWords - Total number of words in the frequency list (to determine percentiles).
 * @returns {Object} { common: [], medium: [], rare: [] }
 */
function classifyWords(words, freqMap, totalFreqWords) {
    const buckets = {
        common: [],
        medium: [],
        rare: []
    };

    const { commonThreshold, mediumThreshold } = getThresholds(totalFreqWords);

    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        let rank = Infinity;

        if (freqMap instanceof Map) {
            if (freqMap.has(lowerWord)) rank = freqMap.get(lowerWord);
        } else if (freqMap[lowerWord] !== undefined) {
            rank = freqMap[lowerWord];
        }

        if (rank <= commonThreshold) {
            buckets.common.push({ word, rank });
        } else if (rank <= mediumThreshold) {
            buckets.medium.push({ word, rank });
        } else {
            buckets.rare.push({ word, rank }); // Rank is Infinity or > mediumThreshold
        }
    });

    // Sort buckets by rank (ascending = more common first)
    buckets.common.sort((a, b) => a.rank - b.rank);
    buckets.medium.sort((a, b) => a.rank - b.rank);
    buckets.rare.sort((a, b) => a.rank - b.rank || a.word.length - b.word.length); // For rare, maybe length is a secondary sort?

    return buckets;
}

/**
 * Balances a single puzzle.
 * @param {string[]} allValidWords - All valid words for the letter set.
 * @param {Map<string, number>|Object} freqMap - Word frequency map.
 * @param {number} totalFreqWords - Total count in frequency list.
 * @param {number[]} targetRange - [min, max] word count (default [35, 45]).
 * @returns {Object} { words: [], maxScore: number, naturalCount: number }
 */
function balancePuzzle(allValidWords, freqMap, totalFreqWords, targetRange = [35, 45]) {
    const minTarget = targetRange[0];
    const maxTarget = targetRange[1];
    const naturalCount = allValidWords.length;

    // 1. Natural Difficulty Check
    if (naturalCount <= maxTarget) {
        // "Hard" or "Standard" puzzle - keep all words.
        // No capping needed.
        return {
            words: allValidWords.sort(),
            maxScore: calculateScore(allValidWords),
            naturalCount: naturalCount
        };
    }

    // 2. Capping Strategy
    // Pick a random target between min and max
    const targetCount = Math.floor(Math.random() * (maxTarget - minTarget + 1)) + minTarget;

    // 3. Classification
    const buckets = classifyWords(allValidWords, freqMap, totalFreqWords);
    const { commonThreshold, mediumThreshold } = getThresholds(totalFreqWords);

    // 4. Quotas (50% Common, 30% Medium, 20% Rare)
    let quotas = {
        common: Math.floor(targetCount * 0.50),
        medium: Math.floor(targetCount * 0.30),
        rare: Math.floor(targetCount * 0.20)
    };

    // Adjust for rounding errors to match targetCount
    let currentTotal = quotas.common + quotas.medium + quotas.rare;
    while (currentTotal < targetCount) {
        quotas.common++; // Dump remainder into common
        currentTotal++;
    }

    // 5. Selection
    const selected = new Set();
    // const centerLetter = getCenterLetter(allValidWords); // Heuristic to find center if not provided?
    // Actually, we don't have the center letter passed in clearly here, 
    // but the words are already pre-validated for a specific puzzle, so they share a center.
    // However, for Pangram detection, we definitely need to know which words are pangrams.
    // In Spelling Bee, a pangram uses ALL 7 letters.
    // We can infer the 7 letters from the set of unique letters in the longest words (or union of all words).

    // const uniqueLetters = new Set(allValidWords.join('').split(''));
    // If the input list is huge, this might be slow, but usually < 1000 words.
    // Actually, it's safer to just iterate words and find those with 7 unique letters.

    // Pangram handling
    const pangrams = allValidWords.filter(w => new Set(w).size === 7);

    // Mandatory: Add 1-2 Pangrams (prefer Common > Medium > Rare)
    // We'll pick valid pangrams from our buckets.
    // Sort all pangrams by rank first.
    const sortedPangrams = pangrams
        .map(w => ({ word: w, rank: getRank(w, freqMap) }))
        .sort((a, b) => a.rank - b.rank);

    const numPangrams = Math.random() < 0.5 ? 1 : 2; // 1 or 2
    const chosenPangrams = sortedPangrams.slice(0, numPangrams).map(p => p.word);

    chosenPangrams.forEach(w => selected.add(w));

    // Helper to fill quota
    function fillQuota(bucketName, amount) {
        const candidates = buckets[bucketName].map(item => item.word);
        let addedCount = 0;

        // Count how many from this bucket are already in (e.g. pangrams)
        for (const w of candidates) {
            if (selected.has(w)) addedCount++;
        }

        for (const w of candidates) {
            if (addedCount >= amount) break;
            if (!selected.has(w)) {
                selected.add(w);
                addedCount++;
            }
        }

        return addedCount; // Return how many we actually have from this bucket/intent
    }

    // Revised Waterfall Strategy:
    // Determine how many of each bucket we ALREADY have from Chosen Pangrams
    // Then fill needs.

    // Calculate current counts from pangrams
    let cCount = 0, mCount = 0, rCount = 0;
    chosenPangrams.forEach(w => {
        const r = getRank(w, freqMap);
        if (r <= commonThreshold) cCount++;
        else if (r <= mediumThreshold) mCount++;
        else rCount++;
    });

    // Fill Rare
    let rareNeeded = quotas.rare - rCount;
    if (rareNeeded > 0) {
        const rareCandidates = buckets.rare.map(i => i.word).filter(w => !selected.has(w));
        const toTake = rareCandidates.slice(0, rareNeeded);
        toTake.forEach(w => selected.add(w));
        // If we took less than needed, pass deficit to Medium
        quotas.medium += (rareNeeded - toTake.length);
    }

    // Fill Medium
    // Recount current mediums in 'selected' (could have increased if rare spilled? no, rare spill increases medium quota)
    // We need to count how many mediums are CURRENTLY in selected.
    let currentMediums = 0;
    selected.forEach(w => {
        const r = getRank(w, freqMap);
        if (r > commonThreshold && r <= mediumThreshold) currentMediums++;
    });

    let mediumNeeded = quotas.medium - currentMediums;
    if (mediumNeeded > 0) {
        const mediumCandidates = buckets.medium.map(i => i.word).filter(w => !selected.has(w));
        const toTake = mediumCandidates.slice(0, mediumNeeded);
        toTake.forEach(w => selected.add(w));
        // Deficit to Common
        quotas.common += (mediumNeeded - toTake.length);
    }

    // Fill Common
    let currentCommons = 0;
    selected.forEach(w => {
        const r = getRank(w, freqMap);
        if (r <= commonThreshold) currentCommons++;
    });

    let commonNeeded = quotas.common - currentCommons;
    if (commonNeeded > 0) {
        const commonCandidates = buckets.common.map(i => i.word).filter(w => !selected.has(w));
        const toTake = commonCandidates.slice(0, commonNeeded);
        toTake.forEach(w => selected.add(w));
    }

    // Final sanity check: Do we have enough words?
    // If we are still below targetCount (because we ran out of Common words too),
    // then we just return what we have. (It implies the natural count was low, but we filtered Step 1... 
    // Wait, Step 1 checked *Total Valid*. Step 3 splits them. 
    // It's possible we have enough Total, but our buckets might overlap or I messed up logic.
    // With disjoint buckets, Sum(buckets) == Total. 
    // The waterfall ensures we select as many as possible up to targetCount.

    const finalWords = Array.from(selected).sort();

    return {
        words: finalWords,
        maxScore: calculateScore(finalWords),
        naturalCount: naturalCount
    };
}

function getRank(word, freqMap) {
    const w = word.toLowerCase();
    if (freqMap instanceof Map) return freqMap.has(w) ? freqMap.get(w) : Infinity;
    return freqMap[w] !== undefined ? freqMap[w] : Infinity;
}

function calculateScore(words) {
    let score = 0;
    for (const word of words) {
        score += word.length === 4 ? 1 : word.length;
        if (new Set(word).size === 7) score += 7;
    }
    return score;
}

function getCenterLetter(words) {
    // Only needed if we didn't have the letter set. Not critical here.
    return '';
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        balancePuzzle,
        classifyWords
    };
}
