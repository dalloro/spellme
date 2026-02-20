// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * Shared Constants
 * Used by both Chrome Extension (popup.js) and Mobile Web App (mobile.js)
 */

// Game rank levels - keys map to localized strings in lang/strings.js
export const LEVELS = [
    { key: 'beginner', pct: 0 },
    { key: 'goodStart', pct: 0.02 },
    { key: 'movingUp', pct: 0.05 },
    { key: 'good', pct: 0.08 },
    { key: 'solid', pct: 0.15 },
    { key: 'niceLvl', pct: 0.25 },
    { key: 'great', pct: 0.40 },
    { key: 'amazing', pct: 0.50 },
    { key: 'genius', pct: 0.70 },
    { key: 'queenBee', pct: 1.0 }
];

// Language configuration
export const LANGUAGE_CONFIG = {
    en: { name: 'English', flag: '🇺🇸', dailyName: 'Daily' },
    it: { name: 'Italiano', flag: '🇮🇹', dailyName: 'Apegramma' }
};
