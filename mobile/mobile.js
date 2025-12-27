// Firebase Imports - v2.3.2
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
        if (state.multiplayer.roomCode && !confirm("This will change the game for EVERYONE in the room. Continue?")) return;
        const id = Math.floor(Math.random() * Object.keys(PUZZLES).length);
        loadPuzzleById(id);
        if (state.multiplayer.roomCode) syncPuzzleToFirebase(state.puzzleId);
    };

    els.nytDailyBtn = document.getElementById('nyt-daily-btn');
    els.nytDailyBtn.onclick = () => {
        if (state.multiplayer.roomCode && !confirm("This will change the game for EVERYONE in the room to the NYT Daily. Continue?")) return;
        loadNYTDailyPuzzle();
    };

    // Ranking modal trigger
    els.levelContainer = document.querySelector('.level-container');
    els.levelContainer.onclick = openRankingsModal;
    els.levelContainer.style.cursor = 'pointer';

    els.multi.btn.onclick = renderMultiplayerScreen;
    els.multi.closeBtn.onclick = () => els.multi.screen.style.display = 'none';
    els.multi.saveNicknameBtn.onclick = handleSaveNickname;
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

async function loadNYTDailyPuzzle(sync = true) {
    try {
        const proxyUrl = "https://corsproxy.io/?";
        const targetUrl = encodeURIComponent('https://nytbee.com/');
        const res = await fetch(proxyUrl + targetUrl);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // 1. Extract the words
        const words = Array.from(doc.querySelectorAll('a[id^="link-definition-"]')).map(a => a.id.split('-').pop().toLowerCase());
        if (!words.length) throw new Error("No words found");

        // 2. Identify the true center letter (must be in every word)
        let commonLetters = new Set(words[0].split(''));
        words.forEach(w => {
            const wordSet = new Set(w.split(''));
            commonLetters = new Set([...commonLetters].filter(x => wordSet.has(x)));
        });
        const centerLetter = Array.from(commonLetters)[0]?.toUpperCase();
        if (!centerLetter) throw new Error("Center letter detection failed");

        // 3. Extract all candidate 7-letter sets from scripts
        const scripts = Array.from(doc.querySelectorAll('script')).map(s => s.textContent).join(' ');
        const letterArrays = scripts.match(/\[\s*"[A-Z]"(?:\s*,\s*"[A-Z]"){6}\s*\]/gi) || [];

        let foundLetters = null;
        for (const arrStr of letterArrays) {
            const candidate = arrStr.match(/[A-Z]/gi).map(l => l.toUpperCase());
            if (candidate.includes(centerLetter)) {
                // Return letters with the detected center letter at index 0
                const others = candidate.filter(l => l !== centerLetter);
                foundLetters = [centerLetter, ...others];
                break;
            }
        }

        if (!foundLetters) throw new Error("Could not match letters to word list");

        state.puzzleId = 'nyt-' + new Date().toISOString().split('T')[0];
        state.puzzle = {
            letters: foundLetters,
            words,
            maxScore: words.reduce((acc, w) => acc + (w.length === 4 ? 1 : w.length + (new Set(w).size === 7 ? 7 : 0)), 0)
        };

        state.foundWords = [];
        state.score = 0;
        saveLocalState();
        renderPuzzle();
        updateScoreUI();
        renderFoundWords();
        if (sync && state.multiplayer.roomCode) syncPuzzleToFirebase(state.puzzleId);
    } catch (e) {
        console.error("NYT Load Error:", e);
        showMessage("NYT Load Failed", 2000);
    }
}

function openRankingsModal() {
    const modal = document.getElementById('rankings-modal');
    const list = document.getElementById('rankings-list');
    list.innerHTML = '';

    const max = state.puzzle.maxScore;
    [...LEVELS].reverse().forEach(l => {
        const row = document.createElement('div');
        row.className = `ranking-row ${state.score >= Math.floor(max * l.pct) ? 'reached' : ''}`;
        row.innerHTML = `<span>${l.name}</span><span>${Math.floor(max * l.pct)}</span>`;
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

// Multiplayer Helpers (Minimal version of popup.js)
function generateRoomCode() {
    const adjs = ['Happy', 'Lucky', 'Sunny', 'Cool', 'Bright', 'Swift', 'Calm'];
    const nouns = ['Bee', 'Hive', 'Honey', 'Comb', 'Wing', 'Pollen', 'Nectar'];
    const num = Math.floor(Math.random() * 99) + 1;
    const adj = adjs[Math.floor(Math.random() * adjs.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}-${noun}-${num}`;
}

async function joinFirebaseRoom(code, show = true) {
    const cleanCode = code.toLowerCase().trim();
    const ref = doc(db, 'rooms', cleanCode);
    await updateDoc(ref, { [`players.${state.playerId}`]: { nickname: state.multiplayer.nickname, online: true, lastActive: Timestamp.now() } });
    state.multiplayer.roomCode = cleanCode; state.multiplayer.step = 'active'; saveLocalState();
    subscribeToRoom(cleanCode);
    renderMultiplayerBanner(); // Always update banner
    if (show) renderMultiplayerScreen();
}

async function handleCreateRoom() {
    const code = generateRoomCode().toLowerCase(); // Ensure lowercase
    const p = state.puzzle;
    await setDoc(doc(db, 'rooms', code), {
        puzzleId: state.puzzleId,
        createdAt: Timestamp.now(),
        players: { [state.playerId]: { nickname: state.multiplayer.nickname, online: true, lastActive: Timestamp.now() } },
        foundWords: {}
    });
    joinFirebaseRoom(code);
}

function handleConfirmJoin() {
    const code = els.multi.roomCodeInput.value.trim().toLowerCase();
    if (!code) return;
    joinFirebaseRoom(code).catch(e => showMessage("Room not found", 2000));
}

let unsub = null;
function subscribeToRoom(code) {
    if (unsub) unsub();
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
                        showMessage(`${name} found ${w}`, 2000);
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
            <span>${name} ${p.playerId === state.playerId ? '(You)' : ''}</span>
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
    else if (step === 'active') { els.multi.stepActive.classList.remove('hidden'); els.multi.activeRoomCode.innerText = state.multiplayer.roomCode; renderTeammates(); }
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

function handleLeaveRoom() { if (confirm("Leave?")) { state.multiplayer.roomCode = null; state.multiplayer.step = 'menu'; saveLocalState(); location.reload(); } }
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

function submitWordToFirebase(word) {
    if (state.multiplayer.roomCode) {
        updateDoc(doc(db, 'rooms', state.multiplayer.roomCode), {
            [`foundWords.${word}`]: state.playerId // Store playerId instead of nickname
        });
    }
}
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
