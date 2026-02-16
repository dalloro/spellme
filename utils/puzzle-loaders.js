// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * Puzzle Loaders
 * Shared puzzle fetching logic for NYT and Apegramma daily puzzles
 * Used by both Chrome Extension and Mobile Web App
 */

/**
 * CORS proxy fallback chain.
 * Tried in order; first successful response wins.
 */
const CORS_PROXIES = [
    (url) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
    (url) => `https://corsyou.livio-ba2.workers.dev/?url=${encodeURIComponent(url)}`,
];

/**
 * Fetch a URL through the CORS proxy fallback chain.
 * Each proxy is tried with a 5-second timeout.
 * @param {string} baseUrl - The target URL to fetch
 * @returns {Promise<string>} - The response HTML text
 */
async function fetchWithProxyFallback(baseUrl) {
    const errors = [];
    for (const proxyFn of CORS_PROXIES) {
        const proxyUrl = proxyFn(baseUrl);
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(proxyUrl, { signal: controller.signal });
            clearTimeout(timeout);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch (err) {
            const msg = `Proxy failed (${proxyUrl}): ${err.message}`;
            console.warn(msg);
            errors.push(msg);
        }
    }
    throw new Error(`All CORS proxies failed:\n${errors.join('\n')}`);
}

/**
 * Fetch and parse NYT daily puzzle from nytbee.com
 * @param {boolean} useProxy - Whether to use CORS proxy (needed for mobile)
 * @returns {Promise<{puzzleId: string, puzzle: Object}>}
 */
export async function fetchNYTDailyPuzzle(useProxy = false) {
    const baseUrl = 'https://nytbee.com/';

    let html;
    if (useProxy) {
        html = await fetchWithProxyFallback(baseUrl);
    } else {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error("Failed to fetch NYT puzzle");
        html = await response.text();
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 1. Extract the words (most reliable source)
    const wordList = Array.from(doc.querySelectorAll('a[id^="link-definition-"]'))
        .map(a => a.id.replace('link-definition-', '').toLowerCase())
        .filter(w => w.length >= 4);

    if (wordList.length === 0) throw new Error("No words found on page");

    // 2. Identify the true center letter (must be in every word)
    let commonChars = new Set(wordList[0].split(''));
    wordList.forEach(w => {
        const charSet = new Set(w.split(''));
        commonChars = new Set([...commonChars].filter(x => charSet.has(x)));
    });
    const centerLetter = Array.from(commonChars)[0]?.toUpperCase();
    if (!centerLetter) throw new Error("Center letter detection failed");

    // 3. Extract all candidate 7-letter sets from scripts
    const scriptText = Array.from(doc.querySelectorAll('script')).map(s => s.textContent).join(' ');
    const letterArrays = scriptText.match(/\[\s*"[A-Z]"(?:\s*,\s*"[A-Z]"){6}\s*\]/gi) || [];

    let foundLetters = null;
    for (const arrStr of letterArrays) {
        const candidate = arrStr.match(/[A-Z]/gi).map(l => l.toUpperCase());
        if (candidate.includes(centerLetter)) {
            const others = candidate.filter(l => l !== centerLetter);
            foundLetters = [centerLetter, ...others];
            break;
        }
    }

    if (!foundLetters) throw new Error("Could not match letters to word list");

    // Calculate max score
    const maxScore = wordList.reduce((acc, word) => {
        let s = (word.length === 4) ? 1 : word.length;
        if (new Set(word).size === 7) s += 7;
        return acc + s;
    }, 0);

    const dateStr = new Date().toISOString().split('T')[0];
    const puzzleId = 'nyt-' + dateStr;

    return {
        puzzleId,
        puzzle: {
            id: puzzleId,
            letters: foundLetters,
            words: wordList,
            maxScore: maxScore,
            author: 'NYT Daily'
        }
    };
}

/**
 * Fetch and parse Apegramma daily puzzle from laregione.ch
 * @param {boolean} useProxy - Whether to use CORS proxy (needed for mobile)
 * @returns {Promise<{puzzleId: string, puzzle: Object}>}
 */
export async function fetchApegrammaDailyPuzzle(useProxy = false) {
    const baseUrl = 'https://www.laregione.ch/giochi/apegramma';

    let html;
    if (useProxy) {
        html = await fetchWithProxyFallback(baseUrl);
    } else {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error("Fetch failed");
        html = await response.text();
    }

    const match = html.match(/<div[^>]*id="jsonDati"[^>]*>(.*?)<\/div>/);
    if (!match) throw new Error("Data not found");

    const json = JSON.parse(match[1]);
    if (!json.data || !json.data.letters) throw new Error("Invalid data structure");

    const d = json.data;
    const central = d.central.toLowerCase();
    const lettersArr = d.letters.toLowerCase().split(' ').map(s => s.trim()).filter(l => l);
    const others = lettersArr.filter(l => l !== central).sort();
    const allLetters = [central, ...others];
    const validWords = Object.keys(d.validWords);

    // Calculate maxScore
    let maxScore = 0;
    validWords.forEach(w => {
        let s = (w.length === 4) ? 1 : w.length;
        if (new Set(w).size === 7) s += 7;
        maxScore += s;
    });

    const dateStr = new Date().toISOString().split('T')[0];
    const puzzleId = 'apegramma-' + dateStr;

    return {
        puzzleId,
        puzzle: {
            id: puzzleId,
            letters: allLetters,
            words: validWords,
            maxScore: maxScore,
            author: 'Apegramma Daily'
        }
    };
}
