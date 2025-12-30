import fs from 'fs';
import path from 'path';
import { describe, test, expect, beforeAll } from 'vitest';

describe('Italian Game Logic', () => {
    let puzzles;
    let words;

    beforeAll(() => {
        // Load Puzzles
        const puzzlesPath = path.join(__dirname, '../lang/it/puzzles_it.js');
        const puzzlesContent = fs.readFileSync(puzzlesPath, 'utf-8');
        const puzzlesMatch = puzzlesContent.match(/const PUZZLES_IT = (\{[\s\S]*?\});/);
        puzzles = JSON.parse(puzzlesMatch[1]);

        // Load Dictionary
        const wordsPath = path.join(__dirname, '../lang/it/words_it.js');
        const wordsContent = fs.readFileSync(wordsPath, 'utf-8');
        const wordsMatch = wordsContent.match(/new Set\((\[[\s\S]*?\])\)/);
        words = new Set(JSON.parse(wordsMatch[1]));
    });

    test('All puzzles should have between 30 and 60 words', () => {
        const ids = Object.keys(puzzles);
        expect(ids.length).toBeGreaterThan(0);

        ids.forEach(id => {
            const p = puzzles[id];
            expect(p.words.length).toBeGreaterThanOrEqual(30);
            expect(p.words.length).toBeLessThanOrEqual(60);
        });
    });

    test('All puzzles should contain at least one pangram', () => {
        Object.values(puzzles).forEach(p => {
            const pangrams = p.words.filter(w => new Set(w.split('')).size === 7);
            expect(pangrams.length).toBeGreaterThanOrEqual(1); // Min 1 pangram
        });
    });

    test('Dictionary should not contain conjugated verbs (Sample Check)', () => {
        // Check known conjugated forms that should be EXCLUDED
        const invalidVerbs = ['mangiamo', 'parlavano', 'dormiva', 'andando'];
        invalidVerbs.forEach(v => {
            expect(words.has(v)).toBe(false);
        });

        // Check known lemmas that should be INCLUDED
        const validLemmas = ['mangiare', 'parlare', 'dormire', 'andare'];
        validLemmas.forEach(v => {
            expect(words.has(v)).toBe(true);
        });
    });

    test('Dictionary should contain Feminine Adjectives/Nouns', () => {
        // Check feminine forms explicitly enabled
        expect(words.has('gialla')).toBe(true);
        expect(words.has('calda')).toBe(true);
        expect(words.has('bella')).toBe(true);
    });
});
