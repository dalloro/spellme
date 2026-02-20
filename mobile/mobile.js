// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

// Firebase Imports - v4.13.5
const APP_VERSION = '4.13.6';
console.log(`🚀 Spelling Bee Mobile v${APP_VERSION} starting...`);

import { initializeApp } from 'firebase/app';
import {
    getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot, Timestamp, connectFirestoreEmulator, deleteField
} from 'firebase/firestore';
import { validateWord as coreValidateWord, findWordsForLetters } from '../utils/game-logic.js';
import { LEVELS, LANGUAGE_CONFIG } from '../utils/constants.js';
import { generateRoomCode } from '../utils/multiplayer.js';
import { fetchDailyPuzzle, fetchApegrammaDailyPuzzle } from '../utils/puzzle-loaders.js';
import { initDailyAuth, requireDailyAuth } from '../utils/daily-auth.js';
import { submitWordToFirebase as coreSubmitWord, syncPuzzleToFirebase as coreSyncPuzzle, sendHeartbeat as coreSendHeartbeat } from '../utils/firebase-sync.js';
import { createRoom as coreCreateRoom, addPlayerToRoom, removePlayerFromRoom } from '../utils/room-manager.js';
import { copyToClipboard as coreCopyToClipboard } from '../utils/clipboard.js';

// Firebase config (Injected at build time via esbuild)
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.RELAY_PROJECT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
initDailyAuth(app);

// --- ENVIRONMENT CONFIGURATION ---
const useEmulator = localStorage.getItem('sb_use_emulator') === 'true';

if (useEmulator) {
    console.log("Using Firestore Emulator at 127.0.0.1:8080");
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

// Global helper to switch environments from the console
globalThis.switchMultiplayerEnv = () => {
    const nextValue = !useEmulator;
    localStorage.setItem('sb_use_emulator', nextValue);
    location.reload();
};

// LEVELS imported from utils/constants.js

// State
let state = {
    playerId: localStorage.getItem('sb_playerId') || crypto.randomUUID(),
    currentInput: '',
    foundWords: [],
    wordFinders: {},
    score: 0,
    puzzle: null,
    puzzleId: null,
    language: localStorage.getItem('sb_language') || 'en',
    attributionMode: 0,
    multiplayer: {
        roomCode: null,
        nickname: localStorage.getItem('sb_nickname') || '',
        teammates: [],
        step: 'nickname'
    },
    dbRefs: {}
};
localStorage.setItem('sb_playerId', state.playerId);

// Expose state globally for translations
window.state = state;

// Multiplayer Real-time state
let unsub = null;
let heartbeatInterval = null;

// LANGUAGE_CONFIG imported from utils/constants.js

// Language-specific data helpers
function getCurrentPuzzles() {
    return state.language === 'it' ? (typeof PUZZLES_IT !== 'undefined' ? PUZZLES_IT : {}) : PUZZLES;
}

function getCurrentValidWords() {
    return state.language === 'it' ? (typeof VALID_WORDS_IT !== 'undefined' ? VALID_WORDS_IT : new Set()) : VALID_WORDS;
}

const els = {
    input: document.getElementById('input-text'),
    cursor: document.querySelector('.cursor'),
    score: document.getElementById('score'),
    messageArea: document.getElementById('message-area'),
    levelText: document.getElementById('current-level'),
    wordsList: document.getElementById('words-list'),
    foundCount: document.getElementById('found-count'),
    toggleWordsBtn: document.getElementById('toggle-words-btn'),
    toggleAttributionBtn: document.getElementById('toggle-attribution-btn'),
    deleteBtn: document.getElementById('delete-btn'),
    enterBtn: document.getElementById('enter-btn'),
    restartBtn: document.getElementById('restart-btn'),
    shuffleBtn: document.getElementById('shuffle-btn'),
    dotsContainer: document.querySelector('.dots-container'),
    cells: {
        center: document.getElementById('cell-center'),
        outer: [
            document.getElementById('cell-1'), document.getElementById('cell-2'), document.getElementById('cell-3'),
            document.getElementById('cell-4'), document.getElementById('cell-5'), document.getElementById('cell-6')
        ]
    },
    multi: {
        btn: document.getElementById('multiplayer-btn'),
        screen: document.getElementById('multiplayer-screen'),
        closeBtn: document.getElementById('close-multi-btn'),
        stepNickname: document.getElementById('multi-setup'),
        stepMenu: document.getElementById('multi-menu'),
        stepJoin: document.getElementById('multi-join'),
        stepActive: document.getElementById('multi-active'),
        nicknameInput: document.getElementById('nickname-input'),
        saveNicknameBtn: document.getElementById('save-nickname-btn'),
        createRoomBtn: document.getElementById('create-room-btn'),
        roomCodeInput: document.getElementById('room-code-input'),
        confirmJoinBtn: document.getElementById('join-confirm-btn'),
        backBtn: document.getElementById('join-back-btn'),
        leaveBtn: document.getElementById('leave-room-btn'),
        activeRoomCode: document.getElementById('active-room-code'),
        playerList: document.getElementById('player-list'),
        displayNickname: document.getElementById('display-nickname'),
        editNicknameMenu: document.getElementById('edit-nickname-menu'),
        editNicknameRoom: document.getElementById('edit-nickname-room'),
        banner: document.getElementById('multiplayer-banner'),
        bannerRoomCode: document.getElementById('banner-room-code'),
        shareRoomBtnMenu: document.getElementById('share-room-btn-menu'),
        shareRoomBtnActive: document.getElementById('share-room-btn-active'),
        shareBannerBtn: document.getElementById('share-banner-btn')
    }
};

document.addEventListener('DOMContentLoaded', initGame);

async function initGame() {
    try {
        console.log("Initializing game...");
        loadLocalState();

        if (!state.puzzle) {
            await loadDailyPuzzle();
        } else {
            // Redundant but safe check to populate state.puzzle if somehow missing while puzzleId exists
            const puzzles = getCurrentPuzzles();
            if (!state.puzzle && puzzles[state.puzzleId]) {
                state.puzzle = puzzles[state.puzzleId];
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const roomFromUrl = urlParams.get('room');

        if (roomFromUrl) {
            joinFirebaseRoom(roomFromUrl, false).catch(err => {
                console.warn("Failed to join room from URL:", err);
                window.history.replaceState({}, document.title, window.location.pathname);
            });
        } else if (state.multiplayer.roomCode) {
            joinFirebaseRoom(state.multiplayer.roomCode, false).catch(() => {
                state.multiplayer.roomCode = null;
                saveLocalState();
            });
        }

        renderPuzzle();
        updateScoreUI();
        renderFoundWords();
        renderMultiplayerBanner();
        updateLanguageUI();
        setupEventListeners();

        // Add version to UI for debugging
        const footer = document.createElement('div');
        footer.id = 'debug-version';
        footer.style.cssText = 'font-size: 10px; color: #666; text-align: center; padding: 10px; opacity: 0.5;';
        footer.innerText = `v${APP_VERSION}`;
        document.querySelector('.container').appendChild(footer);

        console.log("Game initialized successfully.");
    } catch (criticalError) {
        console.error("CRITICAL INIT ERROR:", criticalError);
        // Disaster recovery: Clear everything and reload
        localStorage.clear();
        setTimeout(() => location.reload(), 1000);
    }
}

function loadLocalState() {
    try {
        const saved = localStorage.getItem('sb_mobile_state');
        if (saved) {
            const parsed = JSON.parse(saved);

            // Validate puzzle structure before accepting it
            if (parsed.puzzle && (!Array.isArray(parsed.puzzle.letters) || parsed.puzzle.letters.length < 7)) {
                console.warn("Discarding invalid puzzle state from localStorage");
                delete parsed.puzzle;
                delete parsed.puzzleId;
            }

            Object.assign(state, parsed);
        }
    } catch (e) {
        console.error("Failed to load local state:", e);
    }
}

function saveLocalState() {
    localStorage.setItem('sb_mobile_state', JSON.stringify(state));
}

function loadPuzzleById(id) {
    if (typeof id === 'string' && id.startsWith('nyt-')) {
        if (state.puzzleId !== id) loadDailyEnglishPuzzle(false);
        return;
    }
    if (typeof id === 'string' && id.startsWith('apegramma-')) {
        if (state.puzzleId !== id) loadApegrammaDailyPuzzle(false);
        return;
    }
    const puzzles = getCurrentPuzzles();
    const p = puzzles[id];
    if (p) {
        const isNewPuzzle = state.puzzleId !== id;
        state.puzzleId = id;
        state.puzzle = p;

        if (isNewPuzzle) {
            state.foundWords = [];
            state.score = 0;
            state.currentInput = '';
        }

        saveLocalState();
        renderPuzzle();
        updateScoreUI();
        renderFoundWords();
    }
}


function selectRandomPuzzle() {
    const puzzles = getCurrentPuzzles();
    const keys = Object.keys(puzzles);
    if (keys.length === 0) return;

    if (keys.length === 1) {
        loadPuzzleById(keys[0]);
        return;
    }

    let nextId;
    let attempts = 0;
    const currentId = state.puzzleId;

    do {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        nextId = randomKey;
        attempts++;
    } while (nextId === currentId && attempts < 10);

    loadPuzzleById(nextId);

    if (state.multiplayer.roomCode) {
        syncPuzzleToFirebase(state.puzzleId);
    } else {
        showMessage(t('newRandomPuzzle'), 1000);
    }
}

function renderPuzzle() {
    if (!state.puzzle) return;

    // Safety check: Ensure letters is an array of 7 elements
    if (!Array.isArray(state.puzzle.letters) || state.puzzle.letters.length < 7) {
        console.warn("Invalid puzzle format detected. Resetting...");
        state.puzzle = null;
        state.puzzleId = null;
        saveLocalState();
        setTimeout(() => selectRandomPuzzle(), 100);
        return;
    }

    els.cells.center.textContent = state.puzzle.letters[0].toUpperCase();
    const outer = state.puzzle.letters.slice(1);
    els.cells.outer.forEach((cell, i) => {
        // Double check for individual items
        if (outer[i]) {
            cell.textContent = outer[i].toUpperCase();
            cell.dataset.letter = outer[i];
        } else {
            cell.textContent = '';
            cell.dataset.letter = '';
        }
    });
}

function setupEventListeners() {
    els.cells.center.onclick = () => { if (state.puzzle) handleInput(state.puzzle.letters[0]); };
    els.cells.outer.forEach(cell => {
        cell.onclick = () => { if (cell.dataset.letter) handleInput(cell.dataset.letter); };
    });

    els.deleteBtn.onclick = handleDelete;
    els.enterBtn.onclick = handleEnter;
    els.shuffleBtn.onclick = shuffleLetters;
    els.restartBtn.onclick = () => {
        if (state.multiplayer.roomCode && !confirm(t('confirmChangeGame'))) return;
        selectRandomPuzzle();
    };

    els.dailyBtn = document.getElementById('daily-btn');
    els.dailyBtn.onclick = async () => {
        if (state.multiplayer.roomCode && !confirm(t('confirmChangeGame'))) return;
        const authed = await requireDailyAuth();
        if (authed) loadDailyPuzzle();
    };

    // Language selector
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');

    if (langBtn && langMenu) {
        langBtn.onclick = (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        };

        langMenu.querySelectorAll('button[data-lang]').forEach(btn => {
            btn.onclick = () => {
                const lang = btn.dataset.lang;
                langMenu.classList.add('hidden');
                if (lang !== state.language) {
                    switchLanguage(lang);
                }
            };
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langMenu.classList.add('hidden');
        });
    }

    // Ranking modal trigger
    els.levelContainer = document.querySelector('.level-container');
    els.levelContainer.onclick = openRankingsModal;
    els.levelContainer.style.cursor = 'pointer';

    els.multi.btn.onclick = renderMultiplayerScreen;
    els.multi.closeBtn.onclick = () => els.multi.screen.style.display = 'none';
    els.multi.saveNicknameBtn.onclick = handleSaveNickname;
    els.multi.createRoomBtn.onclick = handleCreateRoom;
    document.getElementById('join-room-btn').onclick = () => { state.multiplayer.step = 'join'; renderMultiplayerScreen(); };
    els.multi.confirmJoinBtn.onclick = handleConfirmJoin;
    els.multi.backBtn.onclick = () => { state.multiplayer.step = 'menu'; renderMultiplayerScreen(); };
    els.multi.leaveBtn.onclick = handleLeaveRoom;

    // Sharing
    els.multi.shareRoomBtnMenu.onclick = handleShareRoom;
    els.multi.shareRoomBtnActive.onclick = handleShareRoom;
    els.multi.shareBannerBtn.onclick = handleShareRoom;

    els.toggleWordsBtn.onclick = () => {
        const isHidden = els.wordsList.classList.toggle('hidden');
        els.toggleWordsBtn.innerText = isHidden ? t('show') : t('hide');
    };

    els.toggleAttributionBtn.onclick = () => {
        state.attributionMode = (state.attributionMode + 1) % 3;
        saveLocalState();
        renderFoundWords();
    };

    els.multi.editNicknameMenu.onclick = (e) => { e.preventDefault(); handleEditNickname(); };
    els.multi.editNicknameRoom.onclick = (e) => { e.preventDefault(); handleEditNickname(); };

    // Global keyboard support for desktop users
    document.addEventListener('keydown', (e) => {
        // Don't intercept if user is typing in a real input field (nickname, room code, etc)
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

        const key = e.key.toLowerCase();
        if (key === 'backspace') {
            handleDelete();
            e.preventDefault();
        } else if (key === 'enter') {
            handleEnter();
            e.preventDefault();
        } else if (state.puzzle && state.puzzle.letters.map(l => l.toLowerCase()).includes(key)) {
            handleInput(key);
            e.preventDefault();
        }
    });
}

function handleInput(letter) {
    if (state.currentInput.length < 20) {
        state.currentInput += letter.toLowerCase();
        els.input.innerText = state.currentInput;
    }
}

function handleDelete() {
    state.currentInput = state.currentInput.slice(0, -1);
    els.input.innerText = state.currentInput;
}

function handleEnter() {
    const word = state.currentInput;
    if (!word) return;
    const result = validateWord(word);
    if (result.valid) {
        state.foundWords.push(word);
        state.score += result.score;
        state.foundWords.sort();
        state.wordFinders[word] = state.playerId; // Store playerId for consolidation
        saveLocalState();
        updateScoreUI();
        renderFoundWords();
        showMessage(result.isPangram ? t('pangram') : t('nice'), 1500);
        submitWordToFirebase(word);
    } else {
        showMessage(result.error, 1000);
    }
    setTimeout(() => { state.currentInput = ''; els.input.innerText = ''; }, 500);
}

function validateWord(word) {
    const result = coreValidateWord(word, state.puzzle, state.foundWords, getCurrentValidWords());
    if (!result.valid) return { valid: false, error: t(result.error) };
    return result;
}

function showMessage(msg, time) {
    els.messageArea.innerText = msg;
    els.messageArea.classList.add('visible');
    setTimeout(() => els.messageArea.classList.remove('visible'), time);
}

function updateScoreUI() {
    els.score.innerText = state.score;
    if (!state.puzzle) return;
    const max = state.puzzle.maxScore;
    let levelIdx = 0;
    LEVELS.forEach((l, i) => { if (state.score >= Math.floor(max * l.pct)) levelIdx = i; });
    els.levelText.innerText = t(LEVELS[levelIdx].key);

    els.dotsContainer.innerHTML = '';
    const fill = document.createElement('div');
    fill.className = 'progress-line-fill';
    fill.style.width = `${(levelIdx / (LEVELS.length - 1)) * 100}%`;
    els.dotsContainer.appendChild(fill);

    LEVELS.forEach((l, i) => {
        const d = document.createElement('div');
        d.className = `dot ${i <= levelIdx ? 'active' : ''} ${i === levelIdx ? 'current' : ''}`;
        d.style.left = `${(i / (LEVELS.length - 1)) * 100}%`;
        els.dotsContainer.appendChild(d);
    });
}

function renderFoundWords() {
    els.foundCount.innerText = `${state.foundWords.length} ${state.foundWords.length !== 1 ? t('words') : t('word')}`;
    els.wordsList.innerHTML = '';
    const mode = state.attributionMode;
    const playersMap = state.multiplayer.rawPlayers || {};

    // Define consistent colors and mapping
    const colors = ["#f7da21", "#4ecdc4", "#ff6b6b", "#a8e6cf", "#dfe6e9", "#fd79a8", "#74b9ff"];
    const idToColor = {}; let cIdx = 0;

    // Pre-calculate colors for consistency
    state.foundWords.forEach(w => {
        const finderId = state.wordFinders[w];
        if (finderId && !idToColor[finderId]) idToColor[finderId] = colors[cIdx++ % colors.length];
    });

    if (mode === 0) {
        state.foundWords.forEach(w => {
            const s = document.createElement('span'); s.innerText = w; s.className = 'found-word';
            els.wordsList.appendChild(s);
        });
    } else if (mode === 1) {
        state.foundWords.forEach(w => {
            const finderId = state.wordFinders[w];
            const color = idToColor[finderId] || '#ccc';
            const s = document.createElement('span'); s.innerText = w; s.style.color = color; s.className = 'found-word';
            els.wordsList.appendChild(s);
        });
    } else {
        const sections = {}; // Map of playerId to words
        state.foundWords.forEach(w => {
            const finderId = state.wordFinders[w];
            if (!sections[finderId]) sections[finderId] = [];
            sections[finderId].push(w);
        });

        Object.keys(sections).sort((a, b) => {
            if (a === state.playerId) return -1;
            if (b === state.playerId) return 1;
            const nameA = getDisplayName(a, playersMap);
            const nameB = getDisplayName(b, playersMap);
            return nameA.localeCompare(nameB);
        }).forEach(pid => {
            const displayName = getDisplayName(pid, playersMap);
            const color = idToColor[pid] || '#ccc';
            const sec = document.createElement('div'); sec.className = 'word-section';
            sec.innerHTML = `<div class="word-section-header" style="color: ${color}">${displayName} (${sections[pid].length})</div><div class="word-section-words"></div>`;
            sections[pid].forEach(w => {
                const s = document.createElement('span'); s.innerText = w; s.style.color = color; s.className = 'found-word';
                sec.querySelector('.word-section-words').appendChild(s);
            });
            els.wordsList.appendChild(sec);
        });
    }
}

function getDisplayName(pid, players) {
    if (!pid) return t('unknown');
    const p = players[pid];
    if (!p) return pid.length > 20 ? t('ghost') : pid;
    const nick = p.nickname || t('anonymous');

    // Check for duplicates
    const twins = Object.entries(players)
        .filter(([id, data]) => (data.nickname || "Anonymous") === nick)
        .sort(([idA], [idB]) => idA.localeCompare(idB));

    if (twins.length <= 1) return nick;
    const idx = twins.findIndex(([id]) => id === pid);
    return `${nick} (#${idx + 1})`;
}

async function loadDailyEnglishPuzzle(sync = true) {
    try {
        // Use shared fetcher with proxy (required for mobile)
        const { puzzleId, puzzle } = await fetchDailyPuzzle(true);

        const isNewPuzzle = state.puzzleId !== puzzleId;
        state.puzzleId = puzzleId;
        state.puzzle = puzzle;

        if (isNewPuzzle) {
            state.foundWords = [];
            state.score = 0;
        }
        saveLocalState();
        renderPuzzle();
        updateScoreUI();
        renderFoundWords();
        showMessage(t('dailyLoaded'), 2000);
        if (sync && state.multiplayer.roomCode) syncPuzzleToFirebase(state.puzzleId);
    } catch (e) {
        console.error("Daily Load Error:", e);
        showMessage(t('dailyLoadFailed'), 2000);
    }
}

// Language-agnostic Daily Puzzle Loader
async function loadDailyPuzzle(shouldBroadcast = true) {
    if (state.language === 'it') {
        await loadApegrammaDailyPuzzle(shouldBroadcast);
    } else {
        await loadDailyEnglishPuzzle(shouldBroadcast);
    }
}

// Load Italian "Apegramma" using shared fetcher
async function loadApegrammaDailyPuzzle(shouldBroadcast = true) {
    showMessage(t('fetchingApegramma'), 2000);
    try {
        // Use shared fetcher with proxy (required for mobile)
        const { puzzleId, puzzle } = await fetchApegrammaDailyPuzzle(true);

        const isNewPuzzle = state.puzzleId !== puzzleId;
        state.puzzleId = puzzleId;
        state.puzzle = puzzle;

        if (isNewPuzzle) {
            state.foundWords = [];
            state.score = 0;
            state.currentInput = '';
        }

        saveLocalState();
        renderPuzzle();
        updateScoreUI();
        renderFoundWords();
        renderMultiplayerBanner();
        updateLanguageUI();
        showMessage(t('apegrammLoaded'), 2000);

        if (shouldBroadcast && state.multiplayer.roomCode) {
            syncPuzzleToFirebase(state.puzzleId);
        }

    } catch (e) {
        console.error("Apegramma Load Error:", e);
        showMessage(t('errorLoadingApegramma'), 3000);
    }
}


// Switch language and reload puzzle
function switchLanguage(langCode) {
    if (!LANGUAGE_CONFIG[langCode]) return;

    // Confirmation if in multiplayer active room
    if (state.multiplayer.roomCode && state.multiplayer.step === 'active') {
        const confirmed = confirm(t('confirmChangeGame'));
        if (!confirmed) return;
    }

    // Save preference
    state.language = langCode;
    localStorage.setItem('sb_language', langCode);

    // Reset game state for new language
    state.foundWords = [];
    state.score = 0;
    state.currentInput = '';

    // Load new random puzzle for the language using the helper
    selectRandomPuzzle();

    // UI Updates (selectRandomPuzzle handles loading and some UI, but we need language UI)
    updateLanguageUI();
    // renderPuzzle, updateScoreUI, renderFoundWords are called by loadPuzzleById inside selectRandomPuzzle
}

function updateLanguageUI() {
    const config = LANGUAGE_CONFIG[state.language];
    if (!config) return;

    const flagEl = document.getElementById('lang-flag');
    if (flagEl) flagEl.textContent = config.flag;

    const dailyBtn = document.getElementById('daily-btn');
    // Use localized title or generic
    if (dailyBtn) dailyBtn.title = config.dailyName;

    const setText = (id, key) => { const el = document.getElementById(id); if (el) el.innerText = t(key); };
    const setPlaceholder = (id, key) => { const el = document.getElementById(id); if (el) el.placeholder = t(key); };
    const setTitle = (id, key) => { const el = document.getElementById(id); if (el) el.title = t(key); };

    setTitle('multiplayer-btn', 'multiplayer');
    setTitle('lang-btn', 'language');
    setTitle('restart-btn', 'newRandomPuzzleTitle');
    setText('score-label', 'scoreLabel');

    // Controls
    setText('delete-btn', 'delete');
    setText('enter-btn', 'enter');

    // Toggle Button
    const isHidden = els.wordsList.classList.contains('hidden');
    els.toggleWordsBtn.textContent = isHidden ? t('show') : t('hide');

    // Multiplayer Buttons
    setText('save-nickname-btn', 'continue');
    setText('create-room-btn', 'createRoom');
    setText('join-room-btn', 'joinRoomManually');
    setText('join-confirm-btn', 'join');
    setText('join-back-btn', 'back');
    setText('leave-room-btn', 'leaveRoom');
    setText('share-room-link-text-menu', 'shareRoomLink');

    // Headings & Text
    const setupP = document.querySelector('#multi-setup p');
    if (setupP) setupP.innerText = t('chooseNickname');

    const joinP = document.querySelector('#multi-join p');
    if (joinP) joinP.innerText = t('enterRoomCode');

    const multiHeader = document.querySelector('.multi-header h3');
    if (multiHeader) multiHeader.innerText = t('multiplayer');

    const rankingHeader = document.querySelector('.modal-header h2');
    if (rankingHeader) rankingHeader.innerText = t('rankings');

    // New multiplayer labels
    setText('logged-in-label', 'loggedInAs');
    setText('players-label', 'players');
    setText('room-code-label', 'roomCode');
    setText('banner-room-label', 'room');
    setText('edit-label-menu', 'edit');
    setText('edit-label-room', 'edit');

    // Placeholders
    setPlaceholder('nickname-input', 'anonymous');
    setPlaceholder('room-code-input', 'roomCode');

    // Tooltips
    const bannerShareBtn = document.getElementById('share-banner-btn');
    if (bannerShareBtn) bannerShareBtn.title = t('shareRoomLink');
    const activeShareBtn = document.getElementById('share-room-btn-active');
    if (activeShareBtn) activeShareBtn.title = t('shareRoomLink');

    // Re-render dynamic text
    if (typeof updateScoreUI === 'function') updateScoreUI();
    if (typeof renderFoundWords === 'function') renderFoundWords();
    if (state.multiplayer.step === 'active' && typeof renderTeammates === 'function') renderTeammates();
}

function openRankingsModal() {
    const modal = document.getElementById('rankings-modal');
    const list = document.getElementById('rankings-list');
    list.innerHTML = '';

    // Add Total Words info
    const totalWords = document.createElement('div');
    totalWords.className = 'ranking-row total-words-row';
    totalWords.innerHTML = `<span class="rank-name">${t('totalWords')}:</span><span class="rank-score">${state.puzzle.words.length}</span>`;
    list.appendChild(totalWords);

    // Add header
    const header = document.createElement('div');
    header.className = 'ranking-row ranking-header';
    header.innerHTML = `
        <span class="rank-name">${t('rank')}</span>
        <span class="rank-score">${t('minimumScore')}</span>
    `;
    list.appendChild(header);

    const max = state.puzzle.maxScore;
    [...LEVELS].reverse().forEach(l => {
        const row = document.createElement('div');
        row.className = `ranking-row ${state.score >= Math.floor(max * l.pct) ? 'reached' : ''}`;
        row.innerHTML = `<span class="rank-name">${t(l.key)}</span><span class="rank-score">${Math.floor(max * l.pct)}</span>`;
        list.appendChild(row);
    });

    modal.style.display = 'block';

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    document.getElementById('close-rankings-btn').onclick = () => {
        modal.style.display = 'none';
    };
}

// generateRoomCode is now imported from ../utils/multiplayer.js

async function joinFirebaseRoom(code, show = true) {
    const cleanCode = code.toLowerCase().trim();
    // Use shared addPlayerToRoom to join and get room data
    const data = await addPlayerToRoom(db, cleanCode, state.playerId, state.multiplayer.nickname);
    state.multiplayer.roomCode = cleanCode; // Lowercase ID
    state.multiplayer.displayCode = data.code || cleanCode; // Mixed display
    state.multiplayer.step = 'active';

    // === INITIAL SYNC: Language, Puzzle, and FoundWords ===
    // This ensures joining players see all existing words immediately

    // 1. Sync language first
    if (data.language && data.language !== state.language) {
        state.language = data.language;
        localStorage.setItem('sb_language', data.language);
        updateLanguageUI();
    }

    // 2. Load the room's puzzle (this resets foundWords, which we'll repopulate next)
    if (data.puzzleId && data.puzzleId !== state.puzzleId) {
        await loadPuzzleById(data.puzzleId);
    }

    // 3. Sync foundWords from room data (populate with existing words)
    if (data.foundWords) {
        state.foundWords = Object.keys(data.foundWords);
        state.wordFinders = { ...data.foundWords }; // { word: playerId }
        state.score = state.foundWords.reduce((acc, w) => {
            const res = validateWordLookup(w);
            return acc + (res.valid ? res.score : 0);
        }, 0);
        state.foundWords.sort();
        renderFoundWords();
        updateScoreUI();
    }

    saveLocalState();

    // Now subscribe to future updates
    subscribeToRoom(cleanCode);
    renderMultiplayerBanner();
    if (show) renderMultiplayerScreen();

    // Clear URL if joined via link
    if (window.location.search.includes('room=')) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// handleCreateRoom using shared room-manager.js
async function handleCreateRoom() {
    const code = generateRoomCode();
    const id = code.toLowerCase();
    await coreCreateRoom(db, id, code, state.puzzleId, state.language, state.playerId, state.multiplayer.nickname);
    await joinFirebaseRoom(code);
}

async function handleShareRoom() {
    if (!state.multiplayer.roomCode) {
        try {
            await handleCreateRoom();
        } catch (e) {
            console.error("Failed to create room for sharing:", e);
            return;
        }
    }

    const code = state.multiplayer.displayCode || (state.multiplayer.roomCode ? state.multiplayer.roomCode.toUpperCase() : '');
    const url = `${window.location.origin}${window.location.pathname}?room=${code}`;

    if (navigator.share) {
        navigator.share({
            title: 'Spelling Bee Team Play',
            url: url
        }).catch(() => copyToClipboard(url));
    } else {
        copyToClipboard(url);
    }
}

// copyToClipboard using shared clipboard.js
function copyToClipboard(text) {
    coreCopyToClipboard(text, () => {
        const msg = state.language === 'it' ? 'Link copiato negli appunti!' : 'Link copied to clipboard!';
        showMessage(msg, 2000);
    });
}

function handleConfirmJoin() {
    const code = els.multi.roomCodeInput.value.trim().toLowerCase();
    if (!code) return;
    joinFirebaseRoom(code).catch(e => showMessage(t('roomNotFound'), 2000));
}

// sendHeartbeat wrapper using shared firebase-sync.js
async function sendHeartbeat() {
    await coreSendHeartbeat(db, state.multiplayer.roomCode, state.playerId);
}

function subscribeToRoom(code) {
    if (unsub) unsub();
    if (heartbeatInterval) clearInterval(heartbeatInterval);

    heartbeatInterval = setInterval(sendHeartbeat, 30000); // 30s heartbeat

    unsub = onSnapshot(doc(db, 'rooms', code), (s) => {
        const d = s.data(); if (!d) return;
        state.multiplayer.rawPlayers = d.players || {}; // Store for resolve
        if (d.players) {
            const now = Date.now();
            state.multiplayer.teammates = Object.entries(d.players)
                .map(([id, p]) => {
                    const lastActive = p.lastActive?.toMillis ? p.lastActive.toMillis() : 0;
                    const isOnline = p.online && (now - lastActive < 90000);
                    return { playerId: id, nickname: p.nickname, online: isOnline };
                });
            renderTeammates();
        } else {
            // Handle case where players map is completely missing or empty
            state.multiplayer.teammates = [];
            renderTeammates();
        }

        if (d.foundWords) {
            let changed = false;
            Object.keys(d.foundWords).forEach(w => {
                const finderId = d.foundWords[w];
                state.wordFinders[w] = finderId;
                if (!state.foundWords.includes(w)) {
                    state.foundWords.push(w);
                    changed = true;
                    if (finderId !== state.playerId) {
                        const name = getDisplayName(finderId, d.players || {});
                        showMessage(`${name} ${t('foundWord')} ${w}`, 2000);
                    }
                }
            });

            if (changed || state.foundWords.length > 0) {
                // Ensure the score is always recalculated from the latest list to keep everyone in sync
                state.score = state.foundWords.reduce((acc, w) => {
                    const res = validateWordLookup(w);
                    return acc + (res.valid ? res.score : 0);
                }, 0);
                state.foundWords.sort();
                saveLocalState();
                renderFoundWords();
                updateScoreUI();
            }
        }

        // Handle Language Sync
        if (d.language && d.language !== state.language) {
            state.language = d.language;
            localStorage.setItem('sb_language', d.language);
            updateLanguageUI();
        }

        if (d.puzzleId && d.puzzleId !== state.puzzleId) loadPuzzleById(d.puzzleId);
    });
}

/**
 * Minimal version of validateWord for lookups (doesn't check state.foundWords)
 */
function validateWordLookup(word) {
    if (!state.puzzle || !state.puzzle.words.includes(word)) return { valid: false };
    const isPangram = new Set(word).size === 7;
    return { valid: true, score: word.length === 4 ? 1 : word.length + (isPangram ? 7 : 0) };
}

function renderTeammates() {
    els.multi.playerList.innerHTML = '';
    const players = state.multiplayer.rawPlayers || {};
    state.multiplayer.teammates.forEach(p => {
        const div = document.createElement('div');
        div.className = `player-item ${p.playerId === state.playerId ? 'self' : ''}`;
        const name = getDisplayName(p.playerId, players);
        div.innerHTML = `
            <div class="player-status ${p.online ? 'online' : 'offline'}"></div>
            <span>${name} ${p.playerId === state.playerId ? `(${t('you')})` : ''}</span>
        `;
        els.multi.playerList.appendChild(div);
    });
}

function renderMultiplayerScreen() {
    els.multi.screen.style.display = 'flex';
    [els.multi.stepNickname, els.multi.stepMenu, els.multi.stepJoin, els.multi.stepActive].forEach(s => s.classList.add('hidden'));
    if (state.multiplayer.step === 'nickname' && state.multiplayer.nickname) state.multiplayer.step = 'menu';
    const step = state.multiplayer.step;
    if (step === 'nickname') els.multi.stepNickname.classList.remove('hidden');
    else if (step === 'menu') { els.multi.stepMenu.classList.remove('hidden'); els.multi.displayNickname.innerText = state.multiplayer.nickname; }
    else if (step === 'join') els.multi.stepJoin.classList.remove('hidden');
    else if (step === 'active') { els.multi.stepActive.classList.remove('hidden'); els.multi.activeRoomCode.innerText = state.multiplayer.displayCode || state.multiplayer.roomCode; renderTeammates(); }
}

function handleSaveNickname() {
    const v = els.multi.nicknameInput.value.trim();
    if (v) {
        state.multiplayer.nickname = v;
        localStorage.setItem('sb_nickname', v);

        if (state.multiplayer.roomCode) {
            const ref = doc(db, 'rooms', state.multiplayer.roomCode);
            updateDoc(ref, { [`players.${state.playerId}.nickname`]: v })
                .catch(e => console.warn("Nickname update failed:", e));
        }

        state.multiplayer.step = 'menu';
        renderMultiplayerScreen();
        renderFoundWords(); // Immediate update
    }
}

// handleLeaveRoom using shared room-manager.js
async function handleLeaveRoom() {
    if (confirm(t('leaveRoomConfirm'))) {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        await removePlayerFromRoom(db, state.multiplayer.roomCode, state.playerId);
        state.multiplayer.roomCode = null;
        state.multiplayer.step = 'menu';
        saveLocalState();
        location.reload();
    }
}
function handleEditNickname() {
    const n = prompt("New nickname:", state.multiplayer.nickname);
    if (n && n.trim()) {
        const val = n.trim();
        state.multiplayer.nickname = val;
        saveLocalState();

        if (state.multiplayer.roomCode) {
            const ref = doc(db, 'rooms', state.multiplayer.roomCode);
            updateDoc(ref, { [`players.${state.playerId}.nickname`]: val })
                .catch(e => console.warn("Nickname update failed:", e));
        }

        renderMultiplayerScreen();
        renderFoundWords(); // Immediate update
    }
}

// submitWordToFirebase wrapper using shared firebase-sync.js
function submitWordToFirebase(word) {
    coreSubmitWord(db, state.multiplayer.roomCode, word, state.playerId);
}

// syncPuzzleToFirebase wrapper using shared firebase-sync.js
async function syncPuzzleToFirebase(pid) {
    await coreSyncPuzzle(db, state.multiplayer.roomCode, pid, state.language);
}
function renderMultiplayerBanner() { if (state.multiplayer.roomCode) { els.multi.banner.classList.remove('hidden'); els.multi.bannerRoomCode.innerText = state.multiplayer.displayCode || state.multiplayer.roomCode; } else els.multi.banner.classList.add('hidden'); }
function shuffleLetters() {
    if (!state.puzzle) return;
    const letters = state.puzzle.letters.slice(1);
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    els.cells.outer.forEach((cell, i) => {
        if (letters[i]) {
            cell.textContent = letters[i].toUpperCase();
            cell.dataset.letter = letters[i];
        }
    });
}
