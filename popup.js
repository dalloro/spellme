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
  puzzleId: null,
  foundWords: [],
  score: 0,
  currentInput: '',
  puzzle: null,
  playerId: null,
  socket: null,
  multiplayer: {
    nickname: '',
    roomCode: null,
    teammates: [],
    step: 'setup' // setup, menu, join, active
  }
};

// DOM Elements
const els = {
  input: document.getElementById('input-text'),
  cursor: document.querySelector('.cursor'),
  score: document.getElementById('score'),
  levelText: document.getElementById('current-level'),
  messageArea: document.getElementById('message-area'),
  wordsList: document.getElementById('words-list'),
  foundCount: document.getElementById('found-count'),
  toggleWordsBtn: document.getElementById('toggle-words-btn'),
  deleteBtn: document.getElementById('delete-btn'),
  enterBtn: document.getElementById('enter-btn'),
  shuffleBtn: document.getElementById('shuffle-btn'),
  dotsContainer: document.querySelector('.dots-container'),
  cells: {
    center: document.getElementById('cell-center'),
    outer: [
      document.getElementById('cell-1'),
      document.getElementById('cell-2'),
      document.getElementById('cell-3'),
      document.getElementById('cell-4'),
      document.getElementById('cell-5'),
      document.getElementById('cell-6')
    ]
  },
  multi: {
    screen: document.getElementById('multiplayer-screen'),
    setup: document.getElementById('multi-setup'),
    menu: document.getElementById('multi-menu'),
    join: document.getElementById('multi-join'),
    active: document.getElementById('multi-active'),
    nicknameInput: document.getElementById('nickname-input'),
    roomCodeInput: document.getElementById('room-code-input'),
    displayNickname: document.getElementById('display-nickname'),
    activeRoomCode: document.getElementById('active-room-code'),
    playerList: document.getElementById('player-list'),
    banner: document.getElementById('multiplayer-banner'),
    bannerCode: document.getElementById('banner-room-code'),
    btns: {
      open: document.getElementById('multiplayer-btn'),
      close: document.getElementById('close-multi-btn'),
      saveNickname: document.getElementById('save-nickname-btn'),
      createRoom: document.getElementById('create-room-btn'),
      joinRoom: document.getElementById('join-room-btn'),
      confirmJoin: document.getElementById('join-confirm-btn'),
      backToMenu: document.getElementById('join-back-btn'),
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

  // Initialize Socket connection
  if (typeof io !== 'undefined') {
    const isLocal = true; // Set to false when your Render server is live!
    const prodUrl = 'https://spelling-bee-relay.onrender.com';
    state.socket = io(isLocal ? 'http://localhost:3000' : prodUrl);
    setupSocketListeners();
  }

  if (!state.puzzle) {
    loadNYTDailyPuzzle();
  } else {
    loadPuzzle(state.puzzleId);
  }

  // Auto-sync puzzle if already in a room on init
  if (state.multiplayer.roomCode && state.socket) {
    state.socket.emit('join-room', {
      roomCode: state.multiplayer.roomCode,
      playerId: state.playerId,
      nickname: state.multiplayer.nickname
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
  if (state.multiplayer.roomCode && state.socket) {
    state.socket.emit('update-puzzle', {
      roomCode: state.multiplayer.roomCode,
      puzzleId: state.puzzleId,
      nickname: state.multiplayer.nickname
    });
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

    // Sync with server if in a room
    if (state.multiplayer.roomCode && state.socket) {
      state.socket.emit('submit-word', {
        roomCode: state.multiplayer.roomCode,
        word: word,
        nickname: state.multiplayer.nickname
      });
    }
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

    // 1. Try to find the word list first as it's the most reliable source for letters too
    // NYTbee often has links like <a id="link-definition-word" ...>
    let wordList = Array.from(doc.querySelectorAll('a[id^="link-definition-"]'))
      .map(a => a.id.replace('link-definition-', '').toLowerCase())
      .filter(w => w.length >= 4);

    // Alternative word list selectors
    if (wordList.length === 0) {
      wordList = Array.from(doc.querySelectorAll('#main-answer-list .flex-list-item, #all-answers li, .answer-list li'))
        .map(li => li.textContent.trim().toLowerCase())
        .filter(w => w.length >= 4);
    }

    // 2. Extract letters
    let letters = [];

    // Method A: Bokeh Plot data (most reliable recent format)
    // Look for ["P","A","G","I","N","R","W"] or ["P", "A", "G", "I", "N", "R", "W"]
    const scriptText = Array.from(doc.querySelectorAll('script')).map(s => s.textContent).join(' ');
    // Improved regex to find the 7-letter array and extract all letters
    const bokehMatch = scriptText.match(/\[\s*"([A-Z])"(?:\s*,\s*"([A-Z])"){6}\s*\]/i);
    if (bokehMatch) {
      // Re-extract using global match to get all 7
      const allLettersMatch = bokehMatch[0].match(/[A-Z]/gi);
      if (allLettersMatch && allLettersMatch.length === 7) {
        letters = allLettersMatch.map(l => l.toUpperCase());
      }
    }

    // Method B: Try to extract from Page Title (often contains letters like "P (A G I N R W)")
    if (letters.length < 7) {
      const titleMatch = doc.title.match(/([A-Z])\s*\(\s*([A-Z\s]+)\s*\)/i);
      if (titleMatch) {
        const centerLetter = titleMatch[1].toUpperCase();
        const outerLetters = titleMatch[2].match(/[A-Z]/gi).map(l => l.toUpperCase());
        letters = [centerLetter, ...outerLetters];
      }
    }

    // Method C: Fallback to old selectors
    if (letters.length < 7) {
      const lettersText = doc.querySelector('#today-letters')?.textContent.trim().toUpperCase() ||
        doc.querySelector('.pangram')?.textContent.trim().toUpperCase();
      letters = lettersText ? lettersText.match(/[A-Z]/g) : [];
    }

    // Method D: Infer from word list if we have words but no letters
    if (letters.length < 7 && wordList.length > 0) {
      const allChars = new Set(wordList.join('').toUpperCase().split(''));
      if (allChars.size === 7) {
        letters = Array.from(allChars);
      }
    }

    if (letters.length < 7) {
      throw new Error("Could not find letters on page");
    }

    // 3. Determine Center Letter
    // If we have less than 7 words, finding the letter common to ALL might be risky.
    // If Method A or B worked, the first letter is the center.
    let center = letters[0];

    // Cross-reference with word list if we have enough words
    if (wordList.length > 3) {
      const common = letters.filter(l => wordList.every(w => w.toUpperCase().includes(l)));
      if (common.length === 1) {
        center = common[0];
      } else if (common.length > 1) {
        // If multiple are common, keep the one we currently think is center if it's in the common list
        if (common.includes(center)) {
          // Stay with current center
        } else {
          center = common[0]; // fallback to first common
        }
      }
    }

    const outer = letters.filter(l => l !== center);

    if (wordList.length === 0) {
      throw new Error("Could not find word list on page");
    }

    const uniqueWords = Array.from(new Set(wordList)).sort();

    // Calculate max score
    let maxScore = 0;
    uniqueWords.forEach(w => {
      let score = (w.length === 4) ? 1 : w.length;
      if (new Set(w).size === 7) score += 7;
      maxScore += score;
    });

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const puzzle = {
      letters: [center, ...outer].map(l => l.toLowerCase()),
      words: uniqueWords.map(w => w.toLowerCase()),
      maxScore: maxScore
    };

    // 4. Update state and UI
    state.puzzleId = `nyt-${dateStr}`;
    state.puzzle = puzzle;
    state.foundWords = [];
    state.score = 0;
    state.currentInput = ''; // Ensure currentInput is cleared
    saveState();
    renderPuzzle();
    updateScoreUI();
    renderFoundWords();
    renderMultiplayerBanner(); // Update banner when puzzle changes
    showMessage("NYT Daily Loaded!", 2000);

    // CRITICAL FIX: Sync with room if active
    if (shouldBroadcast && state.multiplayer.roomCode && state.socket) {
      console.log("Broadcasting NYT puzzle sync...");
      state.socket.emit('update-puzzle', {
        roomCode: state.multiplayer.roomCode,
        puzzleId: state.puzzleId,
        nickname: state.multiplayer.nickname
      });
    }
  } catch (err) {
    console.error(err);
    showMessage("Error loading NYT Daily: " + err.message, 3000);
  }
}

function validateWord(word) {
  if (word.length < 4) return { valid: false, error: "Too short" };
  if (!word.includes(state.puzzle.letters[0])) return { valid: false, error: "Missing center letter" };

  const allowed = new Set(state.puzzle.letters);
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
  saveState();
  updateScoreUI();
  renderFoundWords();
}

function updateScoreUI() {
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
  state.foundWords.forEach(w => {
    const span = document.createElement('span');
    span.className = 'found-word';
    span.innerText = w;
    els.wordsList.appendChild(span);
  });
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
function renderMultiplayerBanner() {
  const m = state.multiplayer;
  const banner = els.multi.banner;

  if (m.roomCode && m.step === 'active') {
    banner.classList.remove('hidden');
    // Count only online players
    const onlineTeammates = m.teammates ? m.teammates.filter(t => t.online) : [];
    const count = onlineTeammates.length + 1;
    els.multi.bannerCode.textContent = `${m.roomCode} (${count} player${count > 1 ? 's' : ''})`;
  } else {
    banner.classList.add('hidden');
  }
}

// Multiplayer Logic
function setupSocketListeners() {
  const socket = state.socket;
  if (!socket) return;

  socket.on('room-created', (roomState) => {
    state.multiplayer.roomCode = roomState.roomCode;
    state.multiplayer.step = 'active';
    state.multiplayer.teammates = roomState.players.filter(p => p.playerId !== state.playerId);
    saveState();
    renderMultiplayerScreen();
    renderMultiplayerBanner(); // Update banner
    showMessage(`Room ${roomState.roomCode} Created!`, 2000);
  });

  socket.on('joined-room', (roomState) => {
    state.multiplayer.roomCode = roomState.roomCode;
    state.multiplayer.step = 'active';
    state.multiplayer.teammates = roomState.players.filter(p => p.playerId !== state.playerId);

    // CRITICAL FIX: Sync Puzzle ID and load correct letters
    if (String(roomState.puzzleId) !== String(state.puzzleId)) {
      console.log(`Syncing puzzle to ${roomState.puzzleId}`);
      loadPuzzle(roomState.puzzleId);
    }

    // Sync words found by others
    roomState.foundWords.forEach(word => {
      if (!state.foundWords.includes(word)) {
        state.foundWords.push(word);
        state.score += calculateWordScore(word);
      }
    });

    saveState();
    renderPuzzle(); // Refresh UI with new letters and found words

    // Only show screen if were NOT already in a valid active state
    // This prevents the screen from popping up on extension open
    if (els.multi.screen.style.display === 'flex') {
      renderMultiplayerScreen();
    }

    renderMultiplayerBanner(); // Update banner
    showMessage(`Joined Room ${roomState.roomCode}. Letters synced!`, 3000);
  });

  socket.on('players-updated', ({ players }) => {
    state.multiplayer.teammates = players.filter(p => p.playerId !== state.playerId);
    renderTeammates();
    renderMultiplayerBanner(); // Update banner (count might have changed)
  });

  socket.on('puzzle-synced', ({ puzzleId, nickname }) => {
    if (String(state.puzzleId) !== String(puzzleId)) {
      loadPuzzle(puzzleId);
      renderMultiplayerBanner(); // Ensure banner is fresh
      showMessage(`${nickname} changed the puzzle!`, 3000);
    }
  });

  socket.on('word-found', ({ word, nickname }) => {
    if (!state.foundWords.includes(word)) {
      state.foundWords.push(word);
      state.score += calculateWordScore(word);
      saveState();
      renderFoundWords();
      updateScoreUI();
      showMessage(`${nickname} found: ${word}`, 2000);
    }
  });

  socket.on('error-msg', ({ message }) => {
    showMessage(message, 3000);
  });
}

function renderMultiplayerScreen() {
  const m = state.multiplayer;
  const elsM = els.multi;

  // Show only the current step
  elsM.setup.classList.add('hidden');
  elsM.menu.classList.add('hidden');
  elsM.join.classList.add('hidden');
  elsM.active.classList.add('hidden');

  if (!m.nickname) {
    elsM.setup.classList.remove('hidden');
  } else if (m.step === 'menu') {
    elsM.displayNickname.textContent = m.nickname;
    elsM.menu.classList.remove('hidden');
  } else if (m.step === 'join') {
    elsM.join.classList.remove('hidden');
  } else if (m.step === 'active') {
    elsM.activeRoomCode.textContent = m.roomCode;
    renderTeammates();
    elsM.active.classList.remove('hidden');
  }

  elsM.screen.style.display = 'flex';
}

function renderTeammates() {
  const list = els.multi.playerList;
  list.innerHTML = '';

  // Add self
  const me = document.createElement('div');
  me.className = 'player-item online';
  me.innerHTML = `<div class="status-dot"></div> <span>${state.multiplayer.nickname} (You)</span>`;
  list.appendChild(me);

  // Add others (only online)
  state.multiplayer.teammates.forEach(t => {
    if (t.online) {
      const item = document.createElement('div');
      item.className = 'player-item online';
      item.innerHTML = `<div class="status-dot"></div> <span>${t.nickname}</span>`;
      list.appendChild(item);
    }
  });
}

function closeMultiplayerScreen() {
  els.multi.screen.style.display = 'none';
}

function handleSaveNickname() {
  const nick = els.multi.nicknameInput.value.trim();
  if (nick) {
    state.multiplayer.nickname = nick;
    state.multiplayer.step = 'menu';
    saveState();
    renderMultiplayerScreen();
  } else {
    showMessage("Please enter a nickname", 2000);
  }
}

function handleCreateRoom() {
  if (state.socket) {
    state.socket.emit('create-room', {
      playerId: state.playerId,
      nickname: state.multiplayer.nickname,
      puzzleId: state.puzzleId
    });
  } else {
    showMessage("Not connected to server", 2000);
  }
}

function handleJoinRoom() {
  state.multiplayer.step = 'join';
  renderMultiplayerScreen();
}

function handleConfirmJoin() {
  const code = els.multi.roomCodeInput.value.trim();
  if (code && state.socket) {
    state.socket.emit('join-room', {
      roomCode: code,
      playerId: state.playerId,
      nickname: state.multiplayer.nickname
    });
  } else if (!code) {
    showMessage("Please enter a room code", 2000);
  } else {
    showMessage("Not connected to server", 2000);
  }
}

function handleLeaveRoom() {
  if (state.socket && state.multiplayer.roomCode) {
    state.socket.emit('leave-room', {
      roomCode: state.multiplayer.roomCode,
      playerId: state.playerId
    });
  }
  state.multiplayer.roomCode = null;
  state.multiplayer.step = 'menu';
  state.multiplayer.teammates = [];
  saveState();
  // Simple way to reset state and clear socket rooms
  window.location.reload();
}
