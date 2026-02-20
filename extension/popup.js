// Firebase Imports
// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot, Timestamp, connectFirestoreEmulator, deleteField
} from 'firebase/firestore';
import { validateWord as coreValidateWord, findWordsForLetters } from '../utils/game-logic.js';
import { LEVELS, LANGUAGE_CONFIG } from '../utils/constants.js';
import { generateRoomCode } from '../utils/multiplayer.js';
import { fetchDailyPuzzle, fetchApegrammaDailyPuzzle } from '../utils/puzzle-loaders.js';
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

// --- ENVIRONMENT CONFIGURATION ---
// Default to Remote (false) unless localStorage says otherwise
const useEmulator = localStorage.getItem('sb_use_emulator') === 'true';

if (useEmulator) {
  console.log("%c>>> MULTIPLAYER: CONNECTED TO LOCAL EMULATOR (127.0.0.1:8080) <<<", "color: #f7da21; font-weight: bold; background: #000; padding: 2px 5px;");
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
} else {
  console.log("%c>>> MULTIPLAYER: CONNECTED TO REMOTE FIREBASE <<<", "color: #4ecdc4; font-weight: bold; background: #000; padding: 2px 5px;");
}

// Global helper to switch environments from the console
globalThis.switchMultiplayerEnv = () => {
  const nextValue = !useEmulator;
  localStorage.setItem('sb_use_emulator', nextValue);
  console.log(`Switching to ${nextValue ? 'LOCAL' : 'REMOTE'} environment. Reloading...`);
  location.reload();
};
console.log("Registered global helper: switchMultiplayerEnv()");

// LEVELS imported from utils/constants.js

// State
let state = {
  playerId: localStorage.getItem('sb_playerId') || crypto.randomUUID(),
  currentInput: '',
  foundWords: [],
  wordFinders: {}, // Track who found each word { word: nickname }
  score: 0,
  puzzle: null,
  puzzleId: null,
  language: localStorage.getItem('sb_language') || 'en', // 'en' or 'it'
  attributionMode: 0, // 0 = none, 1 = colors, 2 = sections
  multiplayer: {
    roomCode: null,
    nickname: localStorage.getItem('sb_nickname') || '',
    teammates: [],
    step: 'nickname'
  },
  dbRefs: {}
};
// Expose state globally for translations (strings.js)
window.state = state;
localStorage.setItem('sb_playerId', state.playerId);

// LANGUAGE_CONFIG imported from utils/constants.js

// Language-specific data (will be set based on current language)
// PUZZLES and VALID_WORDS are globals loaded via script tags
function getCurrentPuzzles() {
  return state.language === 'it' ? (typeof PUZZLES_IT !== 'undefined' ? PUZZLES_IT : {}) : PUZZLES;
}

function getCurrentValidWords() {
  return state.language === 'it' ? (typeof VALID_WORDS_IT !== 'undefined' ? VALID_WORDS_IT : new Set()) : VALID_WORDS;
}

let els = {};

function initElements() {
  console.log("Initializing DOM elements...");
  els = {
    input: document.getElementById('word-input') || document.getElementById('input-text'),
    cursor: document.querySelector('.cursor'),
    score: document.getElementById('score-value') || document.getElementById('score'),
    messageArea: document.getElementById('message-toast') || document.getElementById('message-area'),
    hive: document.getElementById('hive-container'),
    levelText: document.getElementById('rank-label') || document.getElementById('current-level'),
    bar: document.getElementById('progress-fill'),
    wordsList: document.getElementById('words-list'),
    foundCount: document.getElementById('found-count'),
    toggleWordsBtn: document.getElementById('toggle-words-btn'),
    toggleAttributionBtn: document.getElementById('toggle-attribution-btn'),
    deleteBtn: document.querySelector('.action-btn.delete') || document.getElementById('delete-btn'),
    enterBtn: document.querySelector('.action-btn.enter') || document.getElementById('enter-btn'),
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

    // Multiplayer Elements
    multi: {
      btn: document.getElementById('multiplayer-btn'),
      screen: document.getElementById('multiplayer-screen'),
      closeBtn: document.getElementById('close-multi-btn'),

      // Steps
      stepNickname: document.getElementById('multi-setup') || document.getElementById('multi-nickname'),
      stepMenu: document.getElementById('multi-menu'),
      stepJoin: document.getElementById('multi-join'),
      stepActive: document.getElementById('multi-active'),

      // Inputs/Buttons
      nicknameInput: document.getElementById('nickname-input'),
      saveNicknameBtn: document.getElementById('save-nickname-btn'),
      createRoomBtn: document.getElementById('create-room-btn'),
      roomCodeInput: document.getElementById('room-code-input'),
      confirmJoinBtn: document.getElementById('confirm-join-btn') || document.getElementById('join-confirm-btn'),
      backBtn: document.getElementById('back-to-menu-btn') || document.getElementById('join-back-btn'),
      leaveBtn: document.getElementById('leave-room-btn'),

      // Displays
      activeRoomCode: document.getElementById('active-room-code'),
      playerList: document.getElementById('player-list'),
      displayNickname: document.getElementById('display-nickname'),
      editNicknameMenu: document.getElementById('edit-nickname-menu'),
      editNicknameRoom: document.getElementById('edit-nickname-room'),
      banner: document.getElementById('multiplayer-banner'),
      bannerRoomCode: document.getElementById('banner-room-code'),
      shareRoomBtnMenu: document.getElementById('share-room-btn-menu'),
      shareRoomBtnActive: document.getElementById('share-room-btn-active'),
      shareBannerBtn: document.getElementById('share-banner-btn'),

      // Legacy btn group if needed?
      btns: {
        open: document.getElementById('multiplayer-btn'),
        close: document.getElementById('close-multi-btn'),
        saveNickname: document.getElementById('save-nickname-btn'),
        createRoom: document.getElementById('create-room-btn'),
        joinRoom: document.getElementById('join-room-btn'),
        confirmJoin: document.getElementById('confirm-join-btn') || document.getElementById('join-confirm-btn'),
        backToMenu: document.getElementById('back-to-menu-btn') || document.getElementById('join-back-btn'),
        leaveRoom: document.getElementById('leave-room-btn')
      }
    }
  };
  console.log("DOM elements initialized:", Object.keys(els).length);
}

document.addEventListener('DOMContentLoaded', initGame);

async function initGame() {
  initElements();
  await loadState();

  // Initialize playerId if missing
  if (!state.playerId) {
    state.playerId = crypto.randomUUID();
    saveState();
  }


  try {
    if (!state.puzzle) {
      await loadDailyPuzzle(); // Language-aware daily puzzle
    } else {
      // Redundant but safe check to populate state.puzzle if somehow missing while puzzleId exists
      const puzzles = getCurrentPuzzles();
      if (!state.puzzle && (puzzles[state.puzzleId] || typeof state.puzzleId === 'string')) {
        loadPuzzle(state.puzzleId);
      }
    }
  } catch (e) {
    console.error("Init Error:", e);
  }

  // Auto-sync puzzle if already in a room on init (silent, don't show screen)
  if (state.multiplayer.roomCode) {
    joinFirebaseRoom(state.multiplayer.roomCode, false).catch(err => {
      console.warn("Auto-join failed:", err);
      state.multiplayer.roomCode = null;
      saveState();
    });
  }

  renderPuzzle();
  updateScoreUI();
  renderFoundWords();
  renderMultiplayerBanner();
  updateLanguageUI(); // Set language selector UI
  setupEventListeners();

  // Input focus simulation
  document.addEventListener('keydown', handleKeydown);
}

// Game selection logic
function selectDailyPuzzle() {
  const today = new Date();
  const puzzles = getCurrentPuzzles();
  const index = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % Object.keys(puzzles).length;
  loadPuzzle(index);
}

function selectRandomPuzzle() {
  const puzzles = getCurrentPuzzles();
  const keys = Object.keys(puzzles);
  if (keys.length <= 1) {
    if (keys.length === 1) loadPuzzle(0); // Fail safe
    return;
  }

  let index;
  let attempts = 0;
  // Get current ID if numeric (random puzzles are numeric)
  const currentId = typeof state.puzzleId === 'number' ? state.puzzleId : -1;

  do {
    const randomKey = Math.floor(Math.random() * keys.length);
    index = parseInt(keys[randomKey]); // Assuming keys are "0", "1"... which they are.
    attempts++;
  } while (index === currentId && attempts < 10);

  loadPuzzle(index);
  showMessage(t('newRandomPuzzle'), 1000);

  // Sync with room if active
  if (state.multiplayer.roomCode) {
    syncPuzzleToFirebase(state.puzzleId);
  }
}

function loadPuzzle(indexOrId) {
  const puzzles = getCurrentPuzzles();
  let puzzle;
  let id;

  if (typeof indexOrId === 'number') {
    id = indexOrId;
    puzzle = puzzles[id];
  } else if (typeof indexOrId === 'string' && indexOrId.startsWith('nyt-')) {
    // Daily puzzle ID - re-fetch if different
    if (state.puzzleId !== indexOrId) {
      loadDailyEnglishPuzzle(false);
    }
    return;
  } else if (typeof indexOrId === 'string' && indexOrId.startsWith('apegramma-')) {
    // Apegramma daily puzzle ID - re-fetch if different
    if (state.puzzleId !== indexOrId) {
      loadApegrammaDailyPuzzle(false);
    }
    return;
  } else {
    id = parseInt(indexOrId);
    puzzle = puzzles[id];
  }

  if (puzzle) {
    const isNewPuzzle = state.puzzleId !== id;
    state.puzzleId = id;
    state.puzzle = puzzle;

    if (isNewPuzzle) {
      state.foundWords = [];
      state.score = 0;
      state.currentInput = '';
    }

    saveState();
    renderPuzzle();
    updateScoreUI();
    renderFoundWords();
  }
}

function saveState() {
  chrome.storage.local.set({ 'sb_state': state });
}

async function loadState() {
  return new Promise(resolve => {
    chrome.storage.local.get(['sb_state'], (result) => {
      if (result.sb_state) {
        // Merge with defaults to ensure new fields like multiplayer are present
        state = { ...state, ...result.sb_state };
        if (result.sb_state.multiplayer) {
          state.multiplayer = { ...state.multiplayer, ...result.sb_state.multiplayer };
        }
        // Update global reference
        window.state = state;
      }
      resolve();
    });
  });
}

function renderPuzzle() {
  const p = state.puzzle;
  if (!p) return;

  // Safety check: Ensure letters is an array of 7 elements
  if (!Array.isArray(p.letters) || p.letters.length < 7) {
    console.warn("Invalid puzzle format detected. Resetting...");
    state.puzzle = null;
    state.puzzleId = null;
    saveState();
    setTimeout(() => selectRandomPuzzle(), 100);
    return;
  }

  els.cells.center.textContent = p.letters[0].toUpperCase();
  els.cells.center.dataset.letter = p.letters[0];
  updateOuterLetters();
}

function updateOuterLetters() {
  const p = state.puzzle;
  if (!p || !Array.isArray(p.letters)) return;
  const outerLetters = p.letters.slice(1);
  els.cells.outer.forEach((cell, i) => {
    if (outerLetters[i]) {
      cell.textContent = outerLetters[i].toUpperCase();
      cell.dataset.letter = outerLetters[i];
    } else {
      cell.textContent = '';
      cell.dataset.letter = '';
    }
  });
}

function shuffleLetters() {
  const p = state.puzzle;
  if (!p) return;
  let outer = p.letters.slice(1);

  for (let i = outer.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outer[i], outer[j]] = [outer[j], outer[i]];
  }

  els.cells.outer.forEach((cell, i) => {
    if (outer[i]) {
      cell.textContent = outer[i].toUpperCase();
      cell.dataset.letter = outer[i];
    }
    cell.style.transition = 'none';
    cell.style.transform = 'scale(0.8)';
    setTimeout(() => {
      cell.style.transition = 'transform 0.2s';
      cell.style.transform = 'scale(1)';
    }, 50);
  });
}

function updateInputUI() {
  els.input.innerText = state.currentInput;
  els.cursor.style.display = 'block';
}

function handleInput(letter) {
  if (state.currentInput.length < 20) {
    state.currentInput += letter.toLowerCase();
    updateInputUI();
  }
}

function handleDelete() {
  state.currentInput = state.currentInput.slice(0, -1);
  updateInputUI();
}

function handleEnter() {
  const word = state.currentInput.toLowerCase();
  if (word.length === 0) return;

  const result = validateWord(word);
  if (result.valid) {
    addWord(word, result.score, result.isPangram);
    showMessage(result.isPangram ? t('pangram') + " +" + result.score : t('nice') + " +" + result.score, 1500);

    // Broadcast word if in room
    submitWordToFirebase(word);
  } else {
    shakeInput();
    showMessage(result.error, 1000);
  }

  // Clear input with 0.5s delay (user request)
  setTimeout(() => {
    state.currentInput = '';
    updateInputUI();
  }, 500);
}

async function loadDailyEnglishPuzzle(shouldBroadcast = true) {
  showMessage(t('fetchingDaily'), 2000);
  try {
    // Use shared fetcher (no proxy for extension - has host permissions)
    const { puzzleId, puzzle } = await fetchDailyPuzzle(false);

    const isNewPuzzle = state.puzzleId !== puzzleId;
    state.puzzleId = puzzleId;
    state.puzzle = puzzle;

    if (isNewPuzzle) {
      state.foundWords = [];
      state.score = 0;
      state.currentInput = '';
    }

    saveState();
    renderPuzzle();
    updateScoreUI();
    renderFoundWords();
    renderMultiplayerBanner();
    showMessage(t('dailyLoaded'), 2000);

    if (shouldBroadcast && state.multiplayer.roomCode) {
      console.log("Broadcasting daily puzzle sync...");
      syncPuzzleToFirebase(state.puzzleId);
    }

  } catch (err) {
    console.error(err);
    showMessage(t('errorLoadingDaily') + ": " + err.message, 3000);
  }
}

// Load Italian "Apegramma" using shared fetcher
async function loadApegrammaDailyPuzzle(shouldBroadcast = true) {
  showMessage(t('fetchingApegramma'), 2000);
  try {
    // Use shared fetcher with proxy (for reliability)
    const { puzzleId, puzzle } = await fetchApegrammaDailyPuzzle(true);

    const isNewPuzzle = state.puzzleId !== puzzleId;
    state.puzzleId = puzzleId;
    state.puzzle = puzzle;

    finishLoadingPuzzle(shouldBroadcast, isNewPuzzle);

  } catch (e) {
    console.error("Apegramma Load Error:", e);
    showMessage(t('errorLoadingApegramma'), 3000);
  }
}

function finishLoadingPuzzle(shouldBroadcast, isNewPuzzle = true) {
  if (isNewPuzzle) {
    state.foundWords = [];
    state.score = 0;
    state.currentInput = '';
  }

  saveState();
  renderPuzzle();
  updateScoreUI();
  renderFoundWords();
  renderMultiplayerBanner();
  updateLanguageUI();
  showMessage(t('apegrammLoaded'), 2000);

  if (shouldBroadcast && state.multiplayer.roomCode) {
    syncPuzzleToFirebase(state.puzzleId);
  }
}



// Switch language and reload puzzle
// Switch language and reload puzzle
function switchLanguage(langCode) {
  if (!LANGUAGE_CONFIG[langCode]) return;

  // Confirmation if in multiplayer active room
  if (state.multiplayer.roomCode && state.multiplayer.step === 'active') {
    const confirmed = confirm(t('confirmChangeGame'));
    if (!confirmed) return;
  }

  state.language = langCode;
  localStorage.setItem('sb_language', langCode);

  // Reset puzzle state for new language
  state.puzzle = null;
  state.puzzleId = null;
  state.foundWords = [];
  state.score = 0;

  saveState();
  updateLanguageUI();

  // Load a random puzzle in the new language
  selectRandomPuzzle();
}

// Update language selector and all UI strings
function updateLanguageUI() {
  const langBtn = document.getElementById('lang-btn');
  const langFlag = document.getElementById('lang-flag');
  const lang = state.language;
  const config = LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG.en;

  if (langFlag) langFlag.textContent = config.flag;
  if (langBtn) langBtn.title = t('language') + ': ' + config.name;

  // Helper to set text
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.innerText = t(key);
  };
  const setTitle = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.title = t(key);
  };
  const setPlaceholder = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = t(key);
  };

  // Main UI
  setText('delete-btn', 'delete');
  setText('enter-btn', 'enter');

  const toggleWordsBtn = document.getElementById('toggle-words-btn');
  if (toggleWordsBtn) {
    const isHidden = els.wordsList ? els.wordsList.style.display === 'none' : true;
    toggleWordsBtn.innerText = isHidden ? t('show') : t('hide');
  }

  // Multiplayer UI
  setText('save-nickname-btn', 'continue');
  setText('create-room-btn', 'createRoom');
  setText('join-room-btn', 'joinRoom');
  setText('join-confirm-btn', 'join');
  setText('join-back-btn', 'back');
  setText('leave-room-btn', 'leaveRoom');

  // Multiplayer Instructions (target by selector as they lack unique IDs for text)
  const setupP = document.querySelector('#multi-setup p');
  if (setupP) setupP.innerText = t('chooseNickname');

  const joinP = document.querySelector('#multi-join p');
  if (joinP) joinP.innerText = t('enterRoomCode');

  // Placeholders
  setPlaceholder('nickname-input', 'anonymous'); // Using 'anonymous' as placeholder or just leave English? 
  // Added 'anonymous' key in strings.js (check if exists? Yes line 67)
  setPlaceholder('room-code-input', 'roomCode'); // "ROOM CODE" or example? Key 'roomCode' is "ROOM CODE". 
  // Maybe just leave placeholders as is if keys don't fit perfectly. 
  // 'enterRoomCode' key is "Enter the room code...". Too long for placeholder.

  // Headers
  const multiHeader = document.querySelector('.multi-header h3');
  if (multiHeader) multiHeader.innerText = t('multiplayer');

  const rankingHeader = document.querySelector('.modal-header h3'); // "Rankings"
  if (rankingHeader) rankingHeader.innerText = t('rankings');

  // Re-render things that depend on language
  renderFoundWords();
  updateScoreUI();

  // Localize tooltips
  const multiBtn = document.getElementById('multiplayer-btn');
  if (multiBtn) multiBtn.title = t('multiplayer');

  const dailyBtn = document.getElementById('daily-btn');
  if (dailyBtn) dailyBtn.title = t('loadDailyPuzzleTitle');

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) restartBtn.title = t('newRandomPuzzleTitle');

  // Localize Score Label
  const scoreLabel = document.getElementById('score-label');
  if (scoreLabel) scoreLabel.innerText = t('scoreLabel');
}

// Load appropriate daily puzzle based on current language
async function loadDailyPuzzle(shouldBroadcast = true) {
  if (state.language === 'it') {
    await loadApegrammaDailyPuzzle(shouldBroadcast);
  } else {
    await loadDailyEnglishPuzzle(shouldBroadcast);
  }
}

// --- MULTIPLAYER LOGIC (FIREBASE) ---

// generateRoomCode is now imported from ../utils/multiplayer.js

async function joinFirebaseRoom(roomCode, showScreen = true) {
  let cleanCode = roomCode.trim();
  if (cleanCode.includes('?room=')) {
    try {
      const url = new URL(cleanCode);
      cleanCode = url.searchParams.get('room') || cleanCode;
    } catch (e) {
      // Not a valid URL, treat as code
    }
  }
  cleanCode = cleanCode.toLowerCase();

  // Use shared addPlayerToRoom to join and get room data
  const data = await addPlayerToRoom(db, cleanCode, state.playerId, state.multiplayer.nickname);

  state.multiplayer.roomCode = cleanCode; // ID must be lowercase
  state.multiplayer.displayCode = data.code || cleanCode; // Display Mixed
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
    loadPuzzle(data.puzzleId);
  }

  // 3. Sync foundWords from room data (populate with existing words)
  if (data.foundWords) {
    state.foundWords = Object.keys(data.foundWords);
    state.wordFinders = { ...data.foundWords }; // { word: playerId }
    state.score = state.foundWords.reduce((acc, w) => {
      const res = validateWord(w);
      return acc + (res.valid ? res.score : 0);
    }, 0);
    state.foundWords.sort();
    renderFoundWords();
    updateScoreUI();
  }

  saveState();

  // Now subscribe to future updates
  subscribeToRoom(cleanCode);
  startHeartbeat(cleanCode);

  // Only show screen if explicitly requested (not on silent auto-join)
  if (showScreen) {
    renderMultiplayerScreen();
  } else {
    renderMultiplayerBanner();
  }
}

// createFirebaseRoom using shared room-manager.js
async function createFirebaseRoom() {
  const roomCode = generateRoomCode();
  const roomId = roomCode.toLowerCase();

  await coreCreateRoom(db, roomId, roomCode, state.puzzleId, state.language, state.playerId, state.multiplayer.nickname);

  subscribeToRoom(roomId);
  startHeartbeat(roomId);

  state.multiplayer.roomCode = roomId;
  state.multiplayer.displayCode = roomCode;
  state.multiplayer.step = 'active';
  saveState();
  renderMultiplayerScreen();
  return roomCode;
}

async function handleShareRoom(e) {
  console.log("handleShareRoom triggered", e);
  const btn = e.currentTarget;
  if (!btn) {
    console.error("No button found in event target");
    return;
  }
  const originalHtml = btn.innerHTML;
  const isMenuBtn = btn.id === 'share-room-btn-menu';

  if (!state.multiplayer.roomCode) {
    try {
      console.log("No room code, creating room first...");
      btn.disabled = true;
      if (isMenuBtn) {
        btn.innerText = state.language === 'it' ? 'Creazione stanza...' : 'Creating room...';
      }
      await createFirebaseRoom();
      console.log("Room created:", state.multiplayer.roomCode);
    } catch (e) {
      console.error("Failed to create room for sharing:", e);
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      alert(state.language === 'it' ? 'Errore nella creazione della stanza.' : 'Failed to create room.');
      return;
    }
  }

  btn.innerHTML = originalHtml;
  btn.disabled = false;

  const code = (state.multiplayer.displayCode || state.multiplayer.roomCode || '').toUpperCase();
  console.log("Sharing room code:", code);
  if (!code) {
    console.error("No room code found in state");
    return;
  }

  // Point to the mobile web app URL for sharing
  const url = `https://spelling-bee-mobile.web.app/?room=${code}`;
  console.log("Constructed share URL:", url);

  copyToClipboard(url);
}

// copyToClipboard using shared clipboard.js
async function copyToClipboard(text) {
  coreCopyToClipboard(
    text,
    () => {
      const msg = state.language === 'it' ? 'Link copiato!' : 'Link copied!';
      showMessage(msg, 2000);
    },
    (err) => console.error("Clipboard copy failed:", err),
    (txt) => prompt(state.language === 'it' ? 'Copia questo link:' : 'Copy this link:', txt)
  );
}


let unsubscribeRoom = null;

function subscribeToRoom(roomCode) {
  // Unsubscribe from previous room if any
  if (unsubscribeRoom) unsubscribeRoom();

  const roomRef = doc(db, 'rooms', roomCode);
  unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
    const data = snapshot.data();
    if (!data) return;

    state.multiplayer.rawPlayers = data.players || {}; // Store for nickname resolution

    // 1. Sync Players (with heartbeat-based online status)
    if (data.players) {
      const now = Date.now();
      const playersList = Object.entries(data.players).map(([uid, p]) => {
        // Consider offline if lastActive > 90 seconds ago
        const lastActive = p.lastActive?.toMillis ? p.lastActive.toMillis() : 0;
        const isOnline = p.online && (now - lastActive < 90000);
        return {
          playerId: uid,
          nickname: p.nickname,
          online: isOnline
        };
      });
      state.multiplayer.teammates = playersList.filter(p => p.playerId !== state.playerId);
      renderTeammates();
      renderMultiplayerBanner();
    } else {
      state.multiplayer.teammates = [];
      renderTeammates();
      renderMultiplayerBanner();
    }

    // 2. Sync Found Words
    if (data.foundWords) {
      const serverFound = Object.keys(data.foundWords);
      let newWordsFound = false;

      serverFound.forEach(word => {
        // Store the finder ID for attribution display
        const finderId = data.foundWords[word];
        state.wordFinders[word] = finderId;

        if (!state.foundWords.includes(word)) {
          if (finderId !== state.playerId) {
            const name = getDisplayName(finderId, data.players || {});
            showMessage(`${name} ${t('foundWord')} ${word}!`, 2000);
          }
          state.foundWords.push(word);
          const score = calculateScore(word);
          state.score += score;
          newWordsFound = true;
        }
      });

      if (newWordsFound) {
        state.foundWords.sort();
        saveState();
        renderFoundWords();
        updateScoreUI();
      }
    }

    // 3. Sync Puzzle & Language
    const d = data; // alias
    if (d.language && d.language !== state.language) {
      console.log("Remote language change detected:", d.language);
      state.language = d.language;
      localStorage.setItem('sb_language', d.language);
      updateLanguageUI();
      // Do NOT call selectRandomPuzzle logic; wait for puzzleId sync
    }

    if (d.puzzleId && d.puzzleId !== state.puzzleId) {
      console.log("Remote puzzle change detected:", d.puzzleId);
      loadPuzzle(d.puzzleId);
    }
  });
}

let heartbeatInterval = null;

// startHeartbeat wrapper using shared firebase-sync.js
function startHeartbeat(roomCode) {
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  coreSendHeartbeat(db, roomCode, state.playerId); // Initial
  heartbeatInterval = setInterval(() => coreSendHeartbeat(db, roomCode, state.playerId), 30000);
}

// submitWordToFirebase wrapper using shared firebase-sync.js
async function submitWordToFirebase(word) {
  await coreSubmitWord(db, state.multiplayer.roomCode, word, state.playerId);
}

// syncPuzzleToFirebase wrapper using shared firebase-sync.js
async function syncPuzzleToFirebase(puzzleId) {
  await coreSyncPuzzle(db, state.multiplayer.roomCode, puzzleId, state.language);
}

// leaveFirebaseRoom using shared room-manager.js
async function leaveFirebaseRoom() {
  await removePlayerFromRoom(db, state.multiplayer.roomCode, state.playerId);
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  if (unsubscribeRoom) unsubscribeRoom();
  state.multiplayer.roomCode = null;
  state.multiplayer.step = 'menu';
  saveState();
  location.reload();
}

function calculateScore(word) {
  if (word.length === 4) return 1;
  let score = word.length;
  if (new Set(word).size === 7) score += 7;
  return score;
}

function renderMultiplayerBanner() {
  if (state.multiplayer.roomCode) {
    els.multi.banner.classList.remove('hidden');
    els.multi.bannerRoomCode.innerText = state.multiplayer.displayCode || state.multiplayer.roomCode;
  } else {
    els.multi.banner.classList.add('hidden');
  }
}

function renderTeammates() {
  els.multi.playerList.innerHTML = '';
  const playersMap = state.multiplayer.rawPlayers || {};

  // Include self in the display count/logic via teammates concatenation for mapping
  const allInRoom = [
    { playerId: state.playerId, nickname: state.multiplayer.nickname, online: true },
    ...state.multiplayer.teammates
  ];

  allInRoom.forEach(player => {
    const div = document.createElement('div');
    div.className = `player-item ${player.playerId === state.playerId ? 'self' : ''}`;

    const statusDot = document.createElement('div');
    statusDot.className = `player-status ${player.online ? 'online' : 'offline'}`;
    div.appendChild(statusDot);

    const nameSpan = document.createElement('span');
    const name = getDisplayName(player.playerId, playersMap);
    nameSpan.innerText = player.playerId === state.playerId ? `${name} (You)` : name;
    div.appendChild(nameSpan);

    els.multi.playerList.appendChild(div);
  });
}

function getDisplayName(pid, players) {
  if (!pid) return "Unknown";
  const p = players[pid];
  if (!p) return pid.length > 20 ? "Ghost" : pid; // Fallback for legacy nicknames strings
  const nick = p.nickname || "Anonymous";

  // Check for duplicates
  const twins = Object.entries(players)
    .filter(([id, data]) => (data.nickname || "Anonymous") === nick)
    .sort(([idA], [idB]) => idA.localeCompare(idB));

  if (twins.length <= 1) return nick;
  const idx = twins.findIndex(([id]) => id === pid);
  return `${nick} (#${idx + 1})`;
}

function renderMultiplayerScreen() {
  els.multi.screen.style.display = 'flex';

  // Hide all steps using classList
  els.multi.stepNickname.classList.add('hidden');
  els.multi.stepMenu.classList.add('hidden');
  els.multi.stepJoin.classList.add('hidden');
  els.multi.stepActive.classList.add('hidden');

  const step = state.multiplayer.step;

  // Auto-advance if nickname is set but step is 'nickname'
  if (step === 'nickname' && state.multiplayer.nickname) {
    state.multiplayer.step = 'menu';
    renderMultiplayerScreen();
    return;
  }

  // Show display nickname if we have it
  if (state.multiplayer.nickname && els.multi.displayNickname) {
    els.multi.displayNickname.innerText = state.multiplayer.nickname;
  }

  if (step === 'nickname') {
    els.multi.stepNickname.classList.remove('hidden');
  } else if (step === 'menu') {
    els.multi.stepMenu.classList.remove('hidden');
  } else if (step === 'join') {
    els.multi.stepJoin.classList.remove('hidden');
  } else if (step === 'active') {
    els.multi.stepActive.classList.remove('hidden');
    els.multi.activeRoomCode.innerText = state.multiplayer.displayCode || state.multiplayer.roomCode;
    renderTeammates();
  }
}

function closeMultiplayerScreen() {
  els.multi.screen.style.display = 'none';
}

function handleSaveNickname() {
  const val = els.multi.nicknameInput.value.trim();
  if (val) {
    state.multiplayer.nickname = val;
    localStorage.setItem('sb_nickname', val);

    // Update nickname in Firebase if in a room
    if (state.multiplayer.roomCode) {
      const roomRef = doc(db, 'rooms', state.multiplayer.roomCode);
      const playerKey = `players.${state.playerId}.nickname`;
      updateDoc(roomRef, { [playerKey]: val }).catch(e => console.warn("Nickname update failed:", e));
    }

    state.multiplayer.step = 'menu';
    renderMultiplayerScreen();
  }
}

async function handleCreateRoom() {
  els.multi.createRoomBtn.disabled = true;
  try {
    await createFirebaseRoom();
    // Subscription handles UI
  } catch (e) {
    console.error(e);
    alert("Error: " + e.message);
    els.multi.createRoomBtn.disabled = false;
  }
}

function handleJoinRoom() {
  state.multiplayer.step = 'join';
  renderMultiplayerScreen();
}

async function handleConfirmJoin() {
  const code = els.multi.roomCodeInput.value.trim();
  if (!code) return;
  els.multi.confirmJoinBtn.disabled = true;
  try {
    await joinFirebaseRoom(code);
  } catch (e) {
    alert(e.message);
    els.multi.confirmJoinBtn.disabled = false;
  }
}

function handleLeaveRoom() {
  if (confirm("Leave this room?")) {
    leaveFirebaseRoom();
  }
}


function validateWord(word) {
  const result = coreValidateWord(word, state.puzzle, state.foundWords, getCurrentValidWords());
  if (!result.valid) return { valid: false, error: t(result.error) };
  return result;
}

function addWord(word, scoreVal, isPangram) {
  state.foundWords.push(word);
  state.score += scoreVal;
  state.foundWords.sort();

  // Track self as the finder for attribution via playerId
  state.wordFinders[word] = state.playerId;

  saveState();
  updateScoreUI();
  renderFoundWords();
}

function updateScoreUI() {
  if (!state.puzzle) return;
  els.score.innerText = state.score;
  els.foundCount.innerText = `${state.foundWords.length} ${state.foundWords.length !== 1 ? t('words') : t('word')}`;

  const max = state.puzzle.maxScore;
  let currentLevelIndex = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    const threshold = Math.floor(max * LEVELS[i].pct);
    if (state.score >= threshold) {
      currentLevelIndex = i;
    }
  }

  els.levelText.innerText = t(LEVELS[currentLevelIndex].key);
  els.dotsContainer.innerHTML = '';

  const progressLine = document.createElement('div');
  progressLine.className = 'progress-line-fill';
  const baseProgress = (currentLevelIndex / (LEVELS.length - 1)) * 100;
  let subProgress = 0;
  if (currentLevelIndex < LEVELS.length - 1) {
    const start = Math.floor(max * LEVELS[currentLevelIndex].pct);
    const end = Math.floor(max * LEVELS[currentLevelIndex + 1].pct);
    const range = end - start;
    if (range > 0) {
      subProgress = ((state.score - start) / range) * (100 / (LEVELS.length - 1));
    }
  }

  progressLine.style.width = `${baseProgress + subProgress}%`;
  els.dotsContainer.appendChild(progressLine);

  LEVELS.forEach((lvl, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = `${(i / (LEVELS.length - 1)) * 100}%`;
    if (i <= currentLevelIndex) dot.classList.add('active');
    if (i === currentLevelIndex) dot.classList.add('current');
    dot.title = `${t(lvl.key)} (${Math.floor(max * lvl.pct)})`;
    els.dotsContainer.appendChild(dot);
  });
}

function renderFoundWords() {
  els.wordsList.innerHTML = '';

  const mode = state.attributionMode;
  const playersMap = state.multiplayer.rawPlayers || {};

  // Define consistent colors and mapping
  const colors = ['#f7da21', '#4ecdc4', '#ff6b6b', '#a8e6cf', '#dfe6e9', '#fd79a8', '#74b9ff'];
  const playerColors = {};
  let colorIndex = 0;

  // Pre-calculate colors for all finders to ensure consistency
  state.foundWords.forEach(w => {
    const finderId = state.wordFinders[w];
    if (finderId && !playerColors[finderId]) {
      playerColors[finderId] = colors[colorIndex % colors.length];
      colorIndex++;
    }
  });

  if (mode === 0) {
    // Mode 0: No attribution, just list words
    state.foundWords.forEach(w => {
      const span = document.createElement('span');
      span.className = 'found-word';
      span.innerText = w;
      els.wordsList.appendChild(span);
    });
  } else if (mode === 1) {
    // Mode 1: Colors by player
    state.foundWords.forEach(w => {
      const finderId = state.wordFinders[w];
      const color = playerColors[finderId] || '#ccc';

      const span = document.createElement('span');
      span.className = 'found-word';
      span.style.color = color;
      span.innerText = w;
      els.wordsList.appendChild(span);
    });
  } else if (mode === 2) {
    // Mode 2: Sections by player
    const wordsByPlayer = {}; // Map of playerId to words

    state.foundWords.forEach(w => {
      const finderId = state.wordFinders[w];
      if (!wordsByPlayer[finderId]) wordsByPlayer[finderId] = [];
      wordsByPlayer[finderId].push(w);
    });

    // Sort players: current user first, then others alphabetically by display name
    const sortedPlayerIds = Object.keys(wordsByPlayer).sort((a, b) => {
      if (a === state.playerId) return -1;
      if (b === state.playerId) return 1;
      const nameA = getDisplayName(a, playersMap);
      const nameB = getDisplayName(b, playersMap);
      return nameA.localeCompare(nameB);
    });

    sortedPlayerIds.forEach(pid => {
      const displayName = getDisplayName(pid, playersMap);
      const color = playerColors[pid] || '#ccc';

      const section = document.createElement('div');
      section.className = 'word-section';

      const header = document.createElement('div');
      header.className = 'word-section-header';
      header.style.color = color; // Apply color to header too
      header.innerText = `${displayName} (${wordsByPlayer[pid].length})`;
      section.appendChild(header);

      const wordsContainer = document.createElement('div');
      wordsContainer.className = 'word-section-words';
      wordsByPlayer[pid].forEach(w => {
        const span = document.createElement('span');
        span.className = 'found-word';
        span.style.color = color; // Apply color to grouped words
        span.innerText = w;
        wordsContainer.appendChild(span);
      });
      section.appendChild(wordsContainer);

      els.wordsList.appendChild(section);
    });
  }
}

function showMessage(msg, duration) {
  els.messageArea.innerText = msg;
  els.messageArea.classList.add('visible');
  setTimeout(() => {
    els.messageArea.classList.remove('visible');
  }, duration);
}

function shakeInput() {
  els.input.parentElement.style.animation = 'shake 0.3s';
  setTimeout(() => els.input.parentElement.style.animation = '', 300);
}

function renderRankingModal() {
  const modal = document.getElementById('ranking-modal');
  const list = document.getElementById('ranking-list');
  const max = state.puzzle.maxScore;

  let currentLevelIndex = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (state.score >= Math.floor(max * LEVELS[i].pct)) {
      currentLevelIndex = i;
    }
  }

  list.innerHTML = '';

  LEVELS.forEach((lvl, i) => {
    const item = document.createElement('div');
    item.className = 'ranking-item';
    if (i === currentLevelIndex) item.classList.add('current');
    const threshold = Math.floor(max * lvl.pct);
    item.innerHTML = `
      <span class="rank-name">${t(lvl.key)}</span>
      <span class="rank-score">${threshold}</span>
    `;
    list.appendChild(item);
  });

  // Add header (Second to last in DOM -> Visual Middle)
  const header = document.createElement('div');
  header.className = 'ranking-item ranking-header';
  header.innerHTML = `
    <span class="rank-name">${t('rank')}</span>
    <span class="rank-score">${t('minimumScore')}</span>
  `;
  list.appendChild(header);

  // Add Total Words info (Last in DOM -> Visual Top due to column-reverse)
  const totalWords = document.createElement('div');
  totalWords.className = 'ranking-item total-words-row';
  totalWords.innerHTML = `<span class="rank-name">${t('totalWords')}:</span><span class="rank-score">${state.puzzle.words.length}</span>`;
  list.appendChild(totalWords);
  modal.style.display = 'block';
}

function setupEventListeners() {
  els.deleteBtn.addEventListener('click', handleDelete);
  els.enterBtn.addEventListener('click', handleEnter);
  els.shuffleBtn.addEventListener('click', shuffleLetters);

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', selectRandomPuzzle);
  }

  // Daily puzzle button - loads language-specific daily puzzle
  const dailyBtn = document.getElementById('daily-btn');
  if (dailyBtn) {
    dailyBtn.addEventListener('click', loadDailyPuzzle);
  }

  // Language selector
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });

    langMenu.querySelectorAll('button[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        langMenu.classList.add('hidden');
        if (lang !== state.language) {
          switchLanguage(lang);
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      langMenu.classList.add('hidden');
    });
  }

  document.querySelector('.level-container').addEventListener('click', renderRankingModal);
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('ranking-modal').style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('ranking-modal');
    if (e.target === modal) modal.style.display = 'none';
  });

  // Multiplayer Listeners
  els.multi.btns.open.addEventListener('click', renderMultiplayerScreen);
  els.multi.btns.close.addEventListener('click', closeMultiplayerScreen);
  els.multi.btns.saveNickname.addEventListener('click', handleSaveNickname);
  els.multi.btns.createRoom.addEventListener('click', handleCreateRoom);
  els.multi.btns.joinRoom.addEventListener('click', handleJoinRoom);
  els.multi.btns.confirmJoin.addEventListener('click', handleConfirmJoin);

  if (els.multi.shareRoomBtnMenu) els.multi.shareRoomBtnMenu.addEventListener('click', handleShareRoom);
  if (els.multi.shareRoomBtnActive) els.multi.shareRoomBtnActive.addEventListener('click', handleShareRoom);
  if (els.multi.shareBannerBtn) els.multi.shareBannerBtn.addEventListener('click', handleShareRoom);

  els.multi.btns.backToMenu.addEventListener('click', () => {
    state.multiplayer.step = 'menu';
    renderMultiplayerScreen();
  });
  els.multi.btns.leaveRoom.addEventListener('click', handleLeaveRoom);

  // Sharing
  if (els.multi.shareRoomBtnMenu) els.multi.shareRoomBtnMenu.addEventListener('click', handleShareRoom);
  if (els.multi.shareRoomBtnActive) els.multi.shareRoomBtnActive.addEventListener('click', handleShareRoom);
  if (els.multi.shareBannerBtn) els.multi.shareBannerBtn.addEventListener('click', handleShareRoom);

  // Edit Nickname Links (Menu & Room)
  const editHandler = (e) => {
    e.preventDefault();

    const currentName = state.multiplayer.nickname;
    const newName = prompt("Enter new nickname:", currentName);

    if (newName && newName.trim() !== "") {
      const val = newName.trim();
      state.multiplayer.nickname = val;
      localStorage.setItem('sb_nickname', val);

      // Update Firebase if in a room
      if (state.multiplayer.roomCode) {
        const roomRef = doc(db, 'rooms', state.multiplayer.roomCode);
        const playerKey = `players.${state.playerId}.nickname`;
        updateDoc(roomRef, { [playerKey]: val }).catch(e => console.warn("Nickname update failed:", e));
      }

      // Update UI
      if (els.multi.displayNickname) els.multi.displayNickname.innerText = val;
      renderMultiplayerScreen(); // Re-render to update lists/banners
      renderFoundWords(); // Update word list labels
    }
  };

  if (els.multi.editNicknameMenu) {
    els.multi.editNicknameMenu.addEventListener('click', editHandler);
  }
  if (els.multi.editNicknameRoom) {
    els.multi.editNicknameRoom.addEventListener('click', editHandler);
  }

  // Attribution Mode Toggle (cycles 0 -> 1 -> 2 -> 0)
  if (els.toggleAttributionBtn) {
    const modeIcons = ['👤', '🎨', '📋']; // none, colors, sections
    els.toggleAttributionBtn.addEventListener('click', () => {
      state.attributionMode = (state.attributionMode + 1) % 3;
      els.toggleAttributionBtn.innerText = modeIcons[state.attributionMode];
      renderFoundWords();
    });
  }

  els.multi.activeRoomCode.addEventListener('click', () => {
    const code = els.multi.activeRoomCode.textContent;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        showMessage(t('roomCodeCopied'), 2000);
      });
    }
  });

  els.toggleWordsBtn.addEventListener('click', () => {
    const isHidden = els.wordsList.style.display === 'none';
    if (isHidden) {
      els.wordsList.style.display = 'flex';
      els.toggleWordsBtn.innerText = 'Hide';
    } else {
      els.wordsList.style.display = 'none';
      els.toggleWordsBtn.innerText = 'Show';
    }
  });

  [els.cells.center, ...els.cells.outer].forEach(cell => {
    cell.addEventListener('click', (e) => {
      const target = e.target.closest('.cell');
      if (target) handleInput(target.dataset.letter);
    });
  });

  // Clear focus after click to prevent Enter key re-triggers
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) btn.blur();
  });
}

function handleKeydown(e) {
  // Ignore keydown if typing in an input field
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  // Ignore shortcuts (Cmd/Ctrl/Alt + Key)
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // Ignore if multiplayer screen is open (visible)
  if (els.multi.screen && els.multi.screen.offsetParent !== null) return;

  if (e.key === 'Backspace') {
    handleDelete();
  } else if (e.key === 'Enter') {
    handleEnter();
  } else if (e.key === ' ') {
    e.preventDefault();
    shuffleLetters();
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    handleInput(e.key);
  }
}

// Shake animation dynamic addition
if (!document.getElementById('shake-style')) {
  const style = document.createElement('style');
  style.id = 'shake-style';
  style.innerHTML = `
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  `;
  document.head.appendChild(style);
}
