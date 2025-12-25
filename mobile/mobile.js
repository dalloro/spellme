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
    wordFinders: {},
    score: 0,
    puzzle: null,
    puzzleId: null,
    attributionMode: 0,
    multiplayer: {
        roomCode: null,
        nickname: localStorage.getItem('sb_nickname') || '',
        teammates: [],
        step: 'nickname'
    }
};
localStorage.setItem('sb_playerId', state.playerId);

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
        bannerRoomCode: document.getElementById('banner-room-code')
    }
};

document.addEventListener('DOMContentLoaded', initGame);

async function initGame() {
    loadLocalState();

    if (!state.puzzle) {
        await loadNYTDailyPuzzle();
    } else {
        loadPuzzleById(state.puzzleId);
    }

    if (state.multiplayer.roomCode) {
        joinFirebaseRoom(state.multiplayer.roomCode, false).catch(() => {
            state.multiplayer.roomCode = null;
            saveLocalState();
        });
    }

    renderPuzzle();
    updateScoreUI();
    renderFoundWords();
    renderMultiplayerBanner();
    setupEventListeners();
}

function loadLocalState() {
    const saved = localStorage.getItem('sb_mobile_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
    }
}

function saveLocalState() {
    localStorage.setItem('sb_mobile_state', JSON.stringify(state));
}

function loadPuzzleById(id) {
    if (typeof id === 'string' && id.startsWith('nyt-')) {
        if (state.puzzleId !== id) loadNYTDailyPuzzle(false);
        return;
    }
    const p = PUZZLES[id];
    if (p) {
        state.puzzleId = id;
        state.puzzle = p;
        state.foundWords = [];
        state.score = 0;
        state.currentInput = '';
        saveLocalState();
        renderPuzzle();
        updateScoreUI();
        renderFoundWords();
    }
}

function renderPuzzle() {
    if (!state.puzzle) return;
    els.cells.center.textContent = state.puzzle.letters[0].toUpperCase();
    const outer = state.puzzle.letters.slice(1);
    els.cells.outer.forEach((cell, i) => {
        cell.textContent = outer[i].toUpperCase();
        cell.dataset.letter = outer[i];
    });
}

function setupEventListeners() {
    els.cells.center.onclick = () => handleInput(state.puzzle.letters[0]);
    els.cells.outer.forEach(cell => {
        cell.onclick = () => handleInput(cell.dataset.letter);
    });

    els.deleteBtn.onclick = handleDelete;
    els.enterBtn.onclick = handleEnter;
    els.shuffleBtn.onclick = shuffleLetters;
    els.restartBtn.onclick = () => {
        const id = Math.floor(Math.random() * Object.keys(PUZZLES).length);
        loadPuzzleById(id);
        if (state.multiplayer.roomCode) syncPuzzleToFirebase(state.puzzleId);
    };

    els.nytDailyBtn = document.getElementById('nyt-daily-btn');
    els.nytDailyBtn.onclick = () => loadNYTDailyPuzzle();

    els.multi.btn.onclick = renderMultiplayerScreen;
    els.multi.closeBtn.onclick = () => els.multi.screen.style.display = 'none';
    els.multi.saveNicknameBtn.onclick = handleSaveNickname;
    els.multi.createRoomBtn.onclick = handleCreateRoom;
    document.getElementById('join-room-btn').onclick = () => { state.multiplayer.step = 'join'; renderMultiplayerScreen(); };
    els.multi.confirmJoinBtn.onclick = handleConfirmJoin;
    els.multi.backBtn.onclick = () => { state.multiplayer.step = 'menu'; renderMultiplayerScreen(); };
    els.multi.leaveBtn.onclick = handleLeaveRoom;

    els.toggleWordsBtn.onclick = () => {
        const isHidden = els.wordsList.classList.toggle('hidden');
        els.toggleWordsBtn.innerText = isHidden ? "Show" : "Hide";
    };

    els.toggleAttributionBtn.onclick = () => {
        state.attributionMode = (state.attributionMode + 1) % 3;
        saveLocalState();
        renderFoundWords();
    };

    els.multi.editNicknameMenu.onclick = (e) => { e.preventDefault(); handleEditNickname(); };
    els.multi.editNicknameRoom.onclick = (e) => { e.preventDefault(); handleEditNickname(); };
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
        state.wordFinders[word] = state.multiplayer.nickname || 'You';
        saveLocalState();
        updateScoreUI();
        renderFoundWords();
        showMessage(result.isPangram ? "Pangram!" : "Nice!", 1500);
        submitWordToFirebase(word);
    } else {
        showMessage(result.error, 1000);
    }
    setTimeout(() => { state.currentInput = ''; els.input.innerText = ''; }, 500);
}

function validateWord(word) {
    if (word.length < 4) return { valid: false, error: "Too short" };
    const center = state.puzzle.letters[0].toLowerCase();
    if (!word.includes(center)) return { valid: false, error: "Missing center" };
    const allowed = new Set(state.puzzle.letters.map(l => l.toLowerCase()));
    for (let c of word) if (!allowed.has(c)) return { valid: false, error: "Bad letter" };
    if (!state.puzzle.words.includes(word)) return { valid: false, error: "Not a word" };
    if (state.foundWords.includes(word)) return { valid: false, error: "Already found" };
    const isPangram = new Set(word).size === 7;
    return { valid: true, score: word.length === 4 ? 1 : word.length + (isPangram ? 7 : 0), isPangram };
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
    els.levelText.innerText = LEVELS[levelIdx].name;

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
    els.foundCount.innerText = `${state.foundWords.length} words`;
    els.wordsList.innerHTML = '';
    const mode = state.attributionMode;

    if (mode === 0) {
        state.foundWords.forEach(w => {
            const s = document.createElement('span'); s.innerText = w; s.className = 'found-word';
            els.wordsList.appendChild(s);
        });
    } else if (mode === 1) {
        const colors = ["#f7da21", "#4ecdc4", "#ff6b6b", "#a8e6cf", "#dfe6e9", "#fd79a8", "#74b9ff"];
        const userMap = {}; let cIdx = 0;
        state.foundWords.forEach(w => {
            const finder = state.wordFinders[w] || 'You';
            if (!userMap[finder]) userMap[finder] = colors[cIdx++ % colors.length];
            const s = document.createElement('span'); s.innerText = w; s.style.color = userMap[finder]; s.className = 'found-word';
            els.wordsList.appendChild(s);
        });
    } else {
        const sections = {};
        state.foundWords.forEach(w => {
            const f = state.wordFinders[w] || 'You';
            if (!sections[f]) sections[f] = [];
            sections[f].push(w);
        });
        Object.keys(sections).sort().forEach(f => {
            const sec = document.createElement('div'); sec.className = 'word-section';
            sec.innerHTML = `<div class="word-section-header">${f} (${sections[f].length})</div><div class="word-section-words"></div>`;
            sections[f].forEach(w => {
                const s = document.createElement('span'); s.innerText = w; s.className = 'found-word';
                sec.querySelector('.word-section-words').appendChild(s);
            });
            els.wordsList.appendChild(sec);
        });
    }
}

async function loadNYTDailyPuzzle(sync = true) {
    try {
        const res = await fetch('https://nytbee.com/');
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const scripts = Array.from(doc.querySelectorAll('script')).map(s => s.textContent).join(' ');
        const bokeh = scripts.match(/\[\s*"([A-Z])"(?:\s*,\s*"([A-Z])"){6}\s*\]/i);
        if (!bokeh) throw new Error("No letters");
        const letters = bokeh[0].match(/[A-Z]/gi).map(l => l.toUpperCase());
        const words = Array.from(doc.querySelectorAll('a[id^="link-definition-"]')).map(a => a.id.split('-').pop());

        state.puzzleId = 'nyt-' + new Date().toISOString().split('T')[0];
        state.puzzle = { letters, words, maxScore: words.reduce((acc, w) => acc + (w.length === 4 ? 1 : w.length + (new Set(w).size === 7 ? 7 : 0)), 0) };
        state.foundWords = []; state.score = 0;
        saveLocalState(); renderPuzzle(); updateScoreUI(); renderFoundWords();
        if (sync && state.multiplayer.roomCode) syncPuzzleToFirebase(state.puzzleId);
    } catch (e) { showMessage("NYT Load Failed", 2000); }
}

// Multiplayer Helpers (Minimal version of popup.js)
async function joinFirebaseRoom(code, show = true) {
    const ref = doc(db, 'rooms', code);
    await updateDoc(ref, { [`players.${state.playerId}`]: { nickname: state.multiplayer.nickname, online: true, lastActive: Timestamp.now() } });
    state.multiplayer.roomCode = code; state.multiplayer.step = 'active'; saveLocalState();
    subscribeToRoom(code);
    if (show) renderMultiplayerScreen(); else renderMultiplayerBanner();
}

async function createFirebaseRoom() {
    const code = `${['Swift', 'Cool', 'Calm'][Math.floor(Math.random() * 3)]}-Bee-${Math.floor(Math.random() * 99)}`;
    const ref = doc(db, 'rooms', code);
    await setDoc(ref, { createdAt: Timestamp.now(), puzzleId: state.puzzleId, foundWords: {}, players: { [state.playerId]: { nickname: state.multiplayer.nickname, online: true, lastActive: Timestamp.now() } } });
    state.multiplayer.roomCode = code; state.multiplayer.step = 'active'; saveLocalState();
    subscribeToRoom(code); renderMultiplayerScreen();
}

let unsub = null;
function subscribeToRoom(code) {
    if (unsub) unsub();
    unsub = onSnapshot(doc(db, 'rooms', code), (s) => {
        const d = s.data(); if (!d) return;
        if (d.players) {
            state.multiplayer.teammates = Object.entries(d.players).filter(([id]) => id !== state.playerId).map(([id, p]) => ({ nickname: p.nickname, online: p.online }));
            renderTeammates();
        }
        if (d.foundWords) {
            Object.keys(d.foundWords).forEach(w => {
                state.wordFinders[w] = d.foundWords[w];
                if (!state.foundWords.includes(w)) {
                    state.foundWords.push(w); state.score += validateWord(w).score || 0;
                    if (d.foundWords[w] !== state.multiplayer.nickname) showMessage(`${d.foundWords[w]} found ${w}`, 2000);
                }
            });
            state.foundWords.sort(); saveLocalState(); renderFoundWords(); updateScoreUI();
        }
        if (d.puzzleId && d.puzzleId !== state.puzzleId) loadPuzzleById(d.puzzleId);
    });
}

function renderTeammates() {
    const list = els.multi.playerList; list.innerHTML = `<div class="player-item self">${state.multiplayer.nickname} (You)</div>`;
    state.multiplayer.teammates.forEach(t => {
        const i = document.createElement('div'); i.className = 'player-item'; i.innerText = t.nickname;
        list.appendChild(i);
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
    else if (step === 'active') { els.multi.stepActive.classList.remove('hidden'); els.multi.activeRoomCode.innerText = state.multiplayer.roomCode; renderTeammates(); }
}

function handleSaveNickname() {
    const v = els.multi.nicknameInput.value.trim();
    if (v) { state.multiplayer.nickname = v; localStorage.setItem('sb_nickname', v); state.multiplayer.step = 'menu'; renderMultiplayerScreen(); }
}

async function handleCreateRoom() { await createFirebaseRoom(); }
async function handleConfirmJoin() { await joinFirebaseRoom(els.multi.roomCodeInput.value.trim()); }
function handleLeaveRoom() { if (confirm("Leave?")) { state.multiplayer.roomCode = null; state.multiplayer.step = 'menu'; saveLocalState(); location.reload(); } }
function handleEditNickname() { const n = prompt("New nickname:", state.multiplayer.nickname); if (n) { state.multiplayer.nickname = n; saveLocalState(); renderMultiplayerScreen(); } }

function submitWordToFirebase(word) { if (state.multiplayer.roomCode) updateDoc(doc(db, 'rooms', state.multiplayer.roomCode), { [`foundWords.${word}`]: state.multiplayer.nickname }); }
function syncPuzzleToFirebase(pid) { if (state.multiplayer.roomCode) updateDoc(doc(db, 'rooms', state.multiplayer.roomCode), { puzzleId: pid, foundWords: {} }); }
function renderMultiplayerBanner() { if (state.multiplayer.roomCode) { els.multi.banner.classList.remove('hidden'); els.multi.bannerRoomCode.innerText = state.multiplayer.roomCode; } else els.multi.banner.classList.add('hidden'); }
function shuffleLetters() {
    if (!state.puzzle) return;
    const letters = state.puzzle.letters.slice(1);
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    els.cells.outer.forEach((cell, i) => { cell.textContent = letters[i].toUpperCase(); cell.dataset.letter = letters[i]; });
}
