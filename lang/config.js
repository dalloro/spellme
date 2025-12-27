// Language Configuration for Multi-Language Spelling Bee
// This module provides language-specific settings and utilities

const LANGUAGES = {
    en: {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
        dailySource: 'https://nytbee.com/',
        dailyName: 'NYT Daily',
        minWordLength: 4,
        hasPuzzleDatabase: true,
        // Characters that are forbidden in puzzles (none for English)
        forbiddenChars: /[^a-zA-Z]/
    },
    it: {
        code: 'it',
        name: 'Italiano',
        flag: '🇮🇹',
        dailySource: 'https://www.corriere.it/giochi/apegramma/',
        dailyName: 'Apegramma',
        minWordLength: 4,
        hasPuzzleDatabase: true,
        // Accented letters and apostrophes are forbidden
        forbiddenChars: /[àèéìòùÀÈÉÌÒÙ']/
    }
};

// Default language
const DEFAULT_LANGUAGE = 'en';

// Get all available language codes
function getAvailableLanguages() {
    return Object.keys(LANGUAGES);
}

// Get language config by code
function getLanguageConfig(langCode) {
    return LANGUAGES[langCode] || LANGUAGES[DEFAULT_LANGUAGE];
}

// Check if a word contains forbidden characters for a language
function containsForbiddenChars(word, langCode) {
    const config = getLanguageConfig(langCode);
    return config.forbiddenChars.test(word);
}

// Check if a word is valid for a language (no forbidden chars, meets min length)
function isWordValidForLanguage(word, langCode) {
    const config = getLanguageConfig(langCode);
    if (word.length < config.minWordLength) return false;
    if (containsForbiddenChars(word, langCode)) return false;
    return true;
}

// Export for use in both browser and Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LANGUAGES, DEFAULT_LANGUAGE, getAvailableLanguages, getLanguageConfig, containsForbiddenChars, isWordValidForLanguage };
}
