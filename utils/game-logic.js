// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * Core Game Logic (Pure Functions)
 * Shared between Chrome Extension and Mobile Web App
 */

// Validate a word submission
export function validateWord(word, puzzle, foundWords, validWords) {
    if (!word) return { valid: false, error: 'empty' };

    // Length check
    if (word.length < 4) return { valid: false, error: 'tooShort' };

    // Center letter check
    const center = puzzle.letters[0].toLowerCase();
    if (!word.includes(center)) return { valid: false, error: 'missingCenter' };

    // Allowed letters check
    const allowed = new Set(puzzle.letters.map(l => l.toLowerCase()));
    for (let c of word) {
        if (!allowed.has(c)) return { valid: false, error: 'badLetter' };
    }

    // Dictionary check
    // puzzle.words is the list of valid words for this specific puzzle
    // validWords is the global dictionary (for loose check or fallback)

    // Strict check against puzzle words (authoritative source)
    if (!puzzle.words.includes(word)) {
        // Optional: Checking against global dictionary for specific error message
        if (validWords && validWords.has && validWords.has(word)) {
            return { valid: false, error: 'notInWordList' }; // Word is real but not in this puzzle
        }
        return { valid: false, error: 'notValidWord' };
    }

    // Already found check
    if (foundWords.includes(word)) return { valid: false, error: 'alreadyFound' };

    // Success
    const isPangram = new Set(word).size === 7;
    const score = word.length === 4 ? 1 : word.length + (isPangram ? 7 : 0);

    return { valid: true, score, isPangram };
}

// Find all valid words for a given set of letters
export function findWordsForLetters(allLetters, centerLetter, validWords) {
    const lettersSet = new Set(allLetters);
    const words = [];
    let maxScore = 0;

    validWords.forEach(word => {
        if (!word.includes(centerLetter)) return;

        let isValid = true;
        for (const char of word) {
            if (!lettersSet.has(char)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            words.push(word);
            let score = (word.length === 4) ? 1 : word.length;
            if (new Set(word).size === 7) score += 7;
            maxScore += score;
        }
    });

    return { words, maxScore };
}
