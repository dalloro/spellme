import { describe, it, expect } from 'vitest';
import { validateWord, findWordsForLetters } from '../utils/game-logic';

describe('validateWord', () => {
    const puzzle = {
        letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'n'], // Added 'n'
        words: ['acne', 'cafe', 'faced', 'decaf']
    };
    const foundWords = ['acne'];
    const validWords = new Set(['acne', 'cafe', 'faced', 'decaf', 'other']);

    it('should reject short words', () => {
        const res = validateWord('act', puzzle, foundWords, validWords);
        expect(res.valid).toBe(false);
        expect(res.error).toBe('tooShort');
    });

    it('should reject words missing center letter', () => {
        const res = validateWord('beef', puzzle, foundWords, validWords); // No 'a'
        expect(res.valid).toBe(false);
        expect(res.error).toBe('missingCenter');
    });

    it('should reject words with bad letters', () => {
        const res = validateWord('apple', puzzle, foundWords, validWords); // 'p', 'l' not in set
        expect(res.valid).toBe(false);
        expect(res.error).toBe('badLetter');
    });

    it('should reject already found words', () => {
        const res = validateWord('acne', puzzle, foundWords, validWords);
        expect(res.valid).toBe(false);
        expect(res.error).toBe('alreadyFound');
    });

    it('should reject invalid words not in puzzle list', () => {
        const res = validateWord('facedd', puzzle, foundWords, validWords);
        expect(res.valid).toBe(false);
        expect(res.error).toBe('notValidWord');
    });

    it('should accept valid words', () => {
        const res = validateWord('cafe', puzzle, foundWords, validWords);
        expect(res.valid).toBe(true);
        expect(res.score).toBe(1); // Len 4 = 1 pt
    });

    it('should score 5-letter words correctly', () => {
        const res = validateWord('faced', puzzle, foundWords, validWords);
        expect(res.valid).toBe(true);
        expect(res.score).toBe(5); // Len 5 = 5 pts
    });

    it('should identify pangrams', () => {
        // Mock a pangram
        const p = { letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], words: ['abcdefg'] };
        const res = validateWord('abcdefg', p, [], validWords);
        expect(res.valid).toBe(true);
        expect(res.isPangram).toBe(true);
        expect(res.score).toBe(14); // 7 chars + 7 bonus
    });
});

describe('findWordsForLetters', () => {
    it('should find words from valid dictionary', () => {
        const letters = ['a', 'b', 'c', 't', 'e', 'r', 's'];
        const center = 'a';
        const dict = new Set(['cat', 'bat', 'rate', 'crate', 'create', 'crest']);

        const { words } = findWordsForLetters(letters, center, dict);
        expect(words).toContain('crate');
        expect(words).toContain('create');
        expect(words).toContain('rate');
        expect(words).toContain('cat');

        expect(words).not.toContain('crest'); // Missing center 'a'
    });
});
