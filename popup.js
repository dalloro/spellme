// Firebase Imports
import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot, Timestamp, connectFirestoreEmulator, deleteField
} from 'firebase/firestore';

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

// Game Constants
const LEVELS = [
  { name: 'Beginner', pct: 0 },
  { name: 'Good Start', pct: 0.02 },
  { name: 'Moving Up', pct: 0.05 },
  { name: 'Good', pct: 0.08 },
  { name: 'Solid', pct: 0.15 },
  { name: 'Nice', pct: 0.25 },
  { name: 'Great', pct: 0.40 },
  { name: 'Amazing', pct: 0.50 },
  { name: 'Genius', pct: 0.70 },
  { name: 'Queen Bee', pct: 1.0 }
];

// State
let state = {
  playerId: localStorage.getItem('sb_playerId') || crypto.randomUUID(),
  currentInput: '',
  foundWords: [],
  wordFinders: {}, // Track who found each word { word: nickname }
  score: 0,
  puzzle: null,
  puzzleId: null,
  attributionMode: 0, // 0 = none, 1 = colors, 2 = sections
  multiplayer: {
    roomCode: null,
    nickname: localStorage.getItem('sb_nickname') || '',
    teammates: [],
    step: 'nickname'
  },
  dbRefs: {}
};
localStorage.setItem('sb_playerId', state.playerId);

// DOM Elements
// DOM Elements
const els = {
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
  dotsContainer: document.querySelector('.dots-container'), // Restoring dotsContainer which was missing

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

    // Banner
    banner: document.getElementById('multiplayer-banner'),
    bannerRoomCode: document.getElementById('banner-room-code'),

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

document.addEventListener('DOMContentLoaded', initGame);

async function initGame() {
  await loadState();

  // Initialize playerId if missing
  if (!state.playerId) {
    state.playerId = crypto.randomUUID();
    saveState();
  }


  try {
    if (!state.puzzle) {
      await loadNYTDailyPuzzle();
    } else {
      loadPuzzle(state.puzzleId);
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
  renderMultiplayerBanner(); // Update banner on init
  setupEventListeners();

  // Input focus simulation
  document.addEventListener('keydown', handleKeydown);
}

// Game selection logic
function selectDailyPuzzle() {
  const today = new Date();
  const index = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % Object.keys(PUZZLES).length;
  loadPuzzle(index);
}

function selectRandomPuzzle() {
  const index = Math.floor(Math.random() * Object.keys(PUZZLES).length);
  loadPuzzle(index);
  showMessage("New Random Puzzle!", 1000);

  // Sync with room if active
  if (state.multiplayer.roomCode) {
    syncPuzzleToFirebase(state.puzzleId);
  }
}

function loadPuzzle(indexOrId) {
  let puzzle;
  let id;

  if (typeof indexOrId === 'number') {
    id = indexOrId;
    puzzle = PUZZLES[id];
  } else if (typeof indexOrId === 'string' && indexOrId.startsWith('nyt-')) {
    // If it's an NYT ID and it matches what we already have, do nothing
    // If it's different, we need to re-fetch/load NYT
    if (state.puzzleId !== indexOrId) {
      loadNYTDailyPuzzle(false); // Pass false to avoid re-broadcasting
    }
    return;
  } else {
    id = parseInt(indexOrId);
    puzzle = PUZZLES[id];
  }

  if (puzzle) {
    state.puzzleId = id;
    state.puzzle = puzzle;
    state.foundWords = [];
    state.score = 0;
    state.currentInput = ''; // Ensure currentInput is cleared
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
      }
      resolve();
    });
  });
}

function renderPuzzle() {
  const p = state.puzzle;
  if (!p) return;
  els.cells.center.textContent = p.letters[0].toUpperCase();
  els.cells.center.dataset.letter = p.letters[0];
  updateOuterLetters();
}

function updateOuterLetters() {
  const p = state.puzzle;
  const outerLetters = p.letters.slice(1);
  els.cells.outer.forEach((cell, i) => {
    cell.textContent = outerLetters[i].toUpperCase();
    cell.dataset.letter = outerLetters[i];
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
    cell.textContent = outer[i].toUpperCase();
    cell.dataset.letter = outer[i];
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
    showMessage(result.isPangram ? "Pangram! +" + result.score : "Nice! +" + result.score, 1500);

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

async function loadNYTDailyPuzzle(shouldBroadcast = true) {
  showMessage("Fetching NYT Daily...", 2000);
  try {
    const response = await fetch('https://nytbee.com/');
    if (!response.ok) throw new Error("Failed to fetch");
    const html = await response.text();
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
        // Found the right set. Order it: [center, ...others]
        const others = candidate.filter(l => l !== centerLetter);
        foundLetters = [centerLetter, ...others];
        break;
      }
    }

    if (!foundLetters) throw new Error("Could not match letters to word list");

    // --- Success Path ---
    const dateStr = new Date().toISOString().split('T')[0];
    const pid = 'nyt-' + dateStr;

    const maxScore = wordList.reduce((acc, word) => {
      let s = (word.length === 4) ? 1 : word.length;
      if (new Set(word).size === 7) s += 7;
      return acc + s;
    }, 0);

    state.puzzleId = pid;
    state.puzzle = {
      id: pid,
      letters: foundLetters,
      words: wordList,
      maxScore: maxScore,
      author: 'NYT Daily'
    };
    state.foundWords = [];
    state.score = 0;
    state.currentInput = '';

    saveState();
    renderPuzzle();
    updateScoreUI();
    renderFoundWords();
    renderMultiplayerBanner();
    showMessage("NYT Daily Loaded!", 2000);

    if (shouldBroadcast && state.multiplayer.roomCode) {
      console.log("Broadcasting NYT puzzle sync...");
      syncPuzzleToFirebase(state.puzzleId);
    }

  } catch (err) {
    console.error(err);
    showMessage("Error loading NYT Daily: " + err.message, 3000);
  }
}

// --- MULTIPLAYER LOGIC (FIREBASE) ---

function generateRoomCode() {
  const adjs = ['Happy', 'Lucky', 'Sunny', 'Cool', 'Bright', 'Swift', 'Calm'];
  const nouns = ['Bee', 'Hive', 'Honey', 'Comb', 'Wing', 'Pollen', 'Nectar'];
  const num = Math.floor(Math.random() * 99) + 1;
  const adj = adjs[Math.floor(Math.random() * adjs.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}-${noun}-${num}`;
}

async function joinFirebaseRoom(roomCode, showScreen = true) {
  const roomRef = doc(db, 'rooms', roomCode);
  const snapshot = await getDoc(roomRef);
  if (!snapshot.exists()) {
    throw new Error("Room not found");
  }

  // Add/update player in players map
  const playerKey = `players.${state.playerId}`;
  await updateDoc(roomRef, {
    [playerKey]: {
      nickname: state.multiplayer.nickname,
      online: true,
      lastActive: Timestamp.now()
    }
  });

  subscribeToRoom(roomCode);
  startHeartbeat(roomCode);

  state.multiplayer.roomCode = roomCode;
  state.multiplayer.step = 'active';
  saveState();

  // Only show screen if explicitly requested (not on silent auto-join)
  if (showScreen) {
    renderMultiplayerScreen();
  } else {
    renderMultiplayerBanner();
  }
}

async function createFirebaseRoom() {
  const roomCode = generateRoomCode();
  const roomRef = doc(db, 'rooms', roomCode);

  const initialData = {
    createdAt: Timestamp.now(),
    puzzleId: state.puzzleId,
    foundWords: {},
    players: {
      [state.playerId]: {
        nickname: state.multiplayer.nickname,
        online: true,
        lastActive: Timestamp.now()
      }
    }
  };

  await setDoc(roomRef, initialData);

  subscribeToRoom(roomCode);
  startHeartbeat(roomCode);

  state.multiplayer.roomCode = roomCode;
  state.multiplayer.step = 'active';
  saveState();
  renderMultiplayerScreen();
  return roomCode;
}

let unsubscribeRoom = null;

function subscribeToRoom(roomCode) {
  // Unsubscribe from previous room if any
  if (unsubscribeRoom) unsubscribeRoom();

  const roomRef = doc(db, 'rooms', roomCode);
  unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
    const data = snapshot.data();
    if (!data) return;

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
    }

    // 2. Sync Found Words
    if (data.foundWords) {
      const serverFound = Object.keys(data.foundWords);
      let newWordsFound = false;

      serverFound.forEach(word => {
        // Store the finder for attribution display
        state.wordFinders[word] = data.foundWords[word];

        if (!state.foundWords.includes(word)) {
          const finder = data.foundWords[word];
          if (finder !== state.multiplayer.nickname) {
            showMessage(`${finder} found ${word}!`, 2000);
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

    // 3. Sync Puzzle
    if (data.puzzleId && data.puzzleId !== state.puzzleId) {
      console.log("Remote puzzle change detected:", data.puzzleId);
      loadPuzzle(data.puzzleId);
    }
  });
}

let heartbeatInterval = null;

function startHeartbeat(roomCode) {
  if (heartbeatInterval) clearInterval(heartbeatInterval);

  const sendHeartbeat = async () => {
    try {
      const roomRef = doc(db, 'rooms', roomCode);
      const playerKey = `players.${state.playerId}.lastActive`;
      await updateDoc(roomRef, { [playerKey]: Timestamp.now() });
    } catch (e) {
      console.warn("Heartbeat failed:", e);
    }
  };

  sendHeartbeat(); // Initial
  heartbeatInterval = setInterval(sendHeartbeat, 30000); // Every 30s
}

async function submitWordToFirebase(word) {
  if (!state.multiplayer.roomCode) return;
  const roomRef = doc(db, 'rooms', state.multiplayer.roomCode);
  const wordKey = `foundWords.${word}`;
  await updateDoc(roomRef, { [wordKey]: state.multiplayer.nickname });
}

async function syncPuzzleToFirebase(puzzleId) {
  if (!state.multiplayer.roomCode) return;
  const roomRef = doc(db, 'rooms', state.multiplayer.roomCode);
  await updateDoc(roomRef, { puzzleId: puzzleId, foundWords: {} });
}

async function leaveFirebaseRoom() {
  if (state.multiplayer.roomCode) {
    const roomRef = doc(db, 'rooms', state.multiplayer.roomCode);
    const playerKey = `players.${state.playerId}`;
    try {
      await updateDoc(roomRef, { [playerKey]: deleteField() });
    } catch (e) {
      console.warn("Leave room error:", e);
    }
  }
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
    els.multi.banner.style.display = 'flex';
    els.multi.bannerRoomCode.innerText = state.multiplayer.roomCode;
  } else {
    els.multi.banner.style.display = 'none';
  }
}

function renderTeammates() {
  const list = els.multi.playerList;
  list.innerHTML = '';

  // Add Self
  const selfItem = document.createElement('div');
  selfItem.className = 'player-item self';
  selfItem.innerHTML = `<span class="status-dot online"></span> ${state.multiplayer.nickname} (You)`;
  list.appendChild(selfItem);

  state.multiplayer.teammates.forEach(p => {
    const item = document.createElement('div');
    item.className = 'player-item';
    const statusClass = p.online ? 'online' : 'offline';
    item.innerHTML = `<span class="status-dot ${statusClass}"></span> ${p.nickname}`;
    list.appendChild(item);
  });
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
    els.multi.activeRoomCode.innerText = state.multiplayer.roomCode;
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
  if (word.length < 4) return { valid: false, error: "Too short" };

  // Normalize letters to lowercase for comparison
  const centerLetter = state.puzzle.letters[0].toLowerCase();
  if (!word.includes(centerLetter)) return { valid: false, error: "Missing center letter" };

  const allowed = new Set(state.puzzle.letters.map(l => l.toLowerCase()));
  for (let char of word) {
    if (!allowed.has(char)) return { valid: false, error: "Bad letter" };
  }

  if (!state.puzzle.words.includes(word)) {
    if (VALID_WORDS.has(word)) {
      return { valid: false, error: "Not in word list" };
    }
    return { valid: false, error: "Not a valid word" };
  }

  if (state.foundWords.includes(word)) return { valid: false, error: "Already found" };

  let score = (word.length === 4) ? 1 : word.length;
  const isPangram = new Set(word).size === 7;
  if (isPangram) score += 7;

  return { valid: true, score: score, isPangram: isPangram };
}

function addWord(word, scoreVal, isPangram) {
  state.foundWords.push(word);
  state.score += scoreVal;
  state.foundWords.sort();

  // Track self as the finder for attribution
  state.wordFinders[word] = state.multiplayer.nickname || 'You';

  saveState();
  updateScoreUI();
  renderFoundWords();
}

function updateScoreUI() {
  if (!state.puzzle) return;
  els.score.innerText = state.score;
  els.foundCount.innerText = `${state.foundWords.length} word${state.foundWords.length !== 1 ? 's' : ''}`;

  const max = state.puzzle.maxScore;
  let currentLevelIndex = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    const threshold = Math.floor(max * LEVELS[i].pct);
    if (state.score >= threshold) {
      currentLevelIndex = i;
    }
  }

  els.levelText.innerText = LEVELS[currentLevelIndex].name;
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
    dot.title = `${lvl.name} (${Math.floor(max * lvl.pct)})`;
    els.dotsContainer.appendChild(dot);
  });
}

function renderFoundWords() {
  els.wordsList.innerHTML = '';

  const mode = state.attributionMode;

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
    const playerColors = {};
    let colorIndex = 0;
    const colors = ['#f7da21', '#4ecdc4', '#ff6b6b', '#a8e6cf', '#dfe6e9', '#fd79a8', '#74b9ff'];

    state.foundWords.forEach(w => {
      const finder = state.wordFinders[w] || state.multiplayer.nickname || 'You';
      if (!playerColors[finder]) {
        playerColors[finder] = colors[colorIndex % colors.length];
        colorIndex++;
      }

      const span = document.createElement('span');
      span.className = 'found-word';
      span.style.color = playerColors[finder];
      span.innerText = w;
      els.wordsList.appendChild(span);
    });
  } else if (mode === 2) {
    // Mode 2: Sections by player
    const wordsByPlayer = {};

    state.foundWords.forEach(w => {
      const finder = state.wordFinders[w] || state.multiplayer.nickname || 'You';
      if (!wordsByPlayer[finder]) wordsByPlayer[finder] = [];
      wordsByPlayer[finder].push(w);
    });

    // Sort: current user first, then others alphabetically
    const myNickname = state.multiplayer.nickname || 'You';
    const sortedPlayers = Object.keys(wordsByPlayer).sort((a, b) => {
      if (a === myNickname) return -1;
      if (b === myNickname) return 1;
      return a.localeCompare(b);
    });

    sortedPlayers.forEach(player => {
      const section = document.createElement('div');
      section.className = 'word-section';

      const header = document.createElement('div');
      header.className = 'word-section-header';
      header.innerText = player === myNickname ? `You (${wordsByPlayer[player].length})` : `${player} (${wordsByPlayer[player].length})`;
      section.appendChild(header);

      const wordsContainer = document.createElement('div');
      wordsContainer.className = 'word-section-words';
      wordsByPlayer[player].forEach(w => {
        const span = document.createElement('span');
        span.className = 'found-word';
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
      <span class="rank-name">${lvl.name}</span>
      <span class="rank-score">${threshold}</span>
    `;
    list.appendChild(item);
  });

  // Add header last so it appears at the top (due to column-reverse)
  const header = document.createElement('div');
  header.className = 'ranking-item ranking-header';
  header.innerHTML = `
    <span class="rank-name">Rank</span>
    <span class="rank-score">Minimum Score</span>
  `;
  list.appendChild(header);
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

  const nytBtn = document.getElementById('nyt-daily-btn');
  if (nytBtn) {
    nytBtn.addEventListener('click', loadNYTDailyPuzzle);
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
  els.multi.btns.backToMenu.addEventListener('click', () => {
    state.multiplayer.step = 'menu';
    renderMultiplayerScreen();
  });
  els.multi.btns.leaveRoom.addEventListener('click', handleLeaveRoom);

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
        showMessage("Room code copied!", 2000);
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
