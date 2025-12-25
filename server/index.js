import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRoomCode } from './utils.js';
import { saveRoom, getRoom, addWordToRoom } from './firebase.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*', // For development
        methods: ['GET', 'POST']
    }
});

// Port mapping for local and cloud deployment (Cloud Run uses PORT)
const PORT = process.env.PORT || 8080;

// In-memory room state (will be backed by Firestore in the next step)
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Simple rate limiting per socket
    let lastEventTime = 0;
    const RATE_LIMIT_MS = 200; // max 5 events per second

    const checkRateLimit = () => {
        const now = Date.now();
        if (now - lastEventTime < RATE_LIMIT_MS) return false;
        lastEventTime = now;
        return true;
    };

    // --- ROOM MANAGEMENT ---

    // Player creates a new room
    socket.on('create-room', async ({ playerId, nickname, puzzleId }) => {
        if (!checkRateLimit()) return;

        // Payload size sanity check
        if (nickname.length > 30 || String(puzzleId).length > 50) return;

        const roomCode = generateRoomCode();

        const roomState = {
            roomCode,
            puzzleId,
            foundWords: [],
            players: [{ playerId, nickname, socketId: socket.id, online: true }]
        };

        rooms.set(roomCode, roomState);

        // Non-blocking Firestore save
        saveRoom(roomCode, roomState).catch(err => console.error("Firestore Error:", err));

        socket.join(roomCode);
        socket.emit('room-created', roomState);
        console.log(`Room created: ${roomCode} by ${nickname}`);
    });

    // Player joins an existing room
    socket.on('join-room', async ({ roomCode, playerId, nickname }) => {
        if (!checkRateLimit()) return;
        if (nickname.length > 30 || roomCode.length > 30) return;

        let room = rooms.get(roomCode);

        // Fallback to Firestore if not in memory
        if (!room) {
            room = await getRoom(roomCode);
            if (room) {
                rooms.set(roomCode, room);
            }
        }

        if (!room) {
            return socket.emit('error-msg', { message: 'Room not found' });
        }

        // Add player to room state if not already there
        const playerExists = room.players.find(p => p.playerId === playerId);
        if (!playerExists) {
            room.players.push({ playerId, nickname, socketId: socket.id, online: true });
        } else {
            playerExists.socketId = socket.id;
            playerExists.online = true;
            playerExists.nickname = nickname; // Update nickname
        }

        socket.join(roomCode);

        // Send back current state
        socket.emit('joined-room', {
            roomCode: room.roomCode,
            puzzleId: room.puzzleId,
            foundWords: room.foundWords,
            players: room.players
        });

        // Broadcast updated list to everyone
        io.to(roomCode).emit('players-updated', { players: room.players });

        // Update Firestore in background
        saveRoom(roomCode, room).catch(err => console.error("Firestore Update Error:", err));

        console.log(`User ${nickname} joined room: ${roomCode}`);
    });

    // Player explicitly leaves room
    socket.on('leave-room', ({ roomCode, playerId }) => {
        const room = rooms.get(roomCode);
        if (room) {
            room.players = room.players.filter(p => p.playerId !== playerId);
            socket.leave(roomCode);

            // If room is empty, we could delete it, but for now just broadcast update
            io.to(roomCode).emit('players-updated', { players: room.players });
            saveRoom(roomCode, room).catch(err => console.error("Firestore Update Error:", err));
        }
    });

    // --- GAMEPLAY RELAY ---

    // Sync puzzle for everyone in the room
    socket.on('update-puzzle', async ({ roomCode, puzzleId, nickname }) => {
        if (!checkRateLimit()) return;
        if (String(puzzleId).length > 50) return;

        const room = rooms.get(roomCode);
        if (!room) return;

        room.puzzleId = puzzleId;
        room.foundWords = []; // Reset words for new puzzle

        saveRoom(roomCode, room).catch(err => console.error("Firestore Sync Error:", err));

        io.to(roomCode).emit('puzzle-synced', { puzzleId, nickname });
        console.log(`[${roomCode}] ${nickname} changed puzzle to ${puzzleId}`);
    });

    // Player finds a word
    socket.on('submit-word', async ({ roomCode, word, nickname }) => {
        if (!checkRateLimit()) return;
        if (word.length > 30) return; // Prevent massive strings

        const room = rooms.get(roomCode);
        if (!room) return;

        // Avoid duplicates
        if (!room.foundWords.includes(word)) {
            room.foundWords.push(word);
            addWordToRoom(roomCode, word).catch(err => console.error("Firestore Word Error:", err));

            // Mirror/broadcast to everyone in the room
            io.to(roomCode).emit('word-found', { word, nickname });
            console.log(`[${roomCode}] ${nickname} found: ${word}`);
        }
    });

    // --- DISCONNECT ---
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        rooms.forEach((room, code) => {
            const index = room.players.findIndex(p => p.socketId === socket.id);
            if (index !== -1) {
                const p = room.players[index];
                p.online = false;
                // Broadcast updated list so everyone knows they are offline
                io.to(code).emit('players-updated', { players: room.players });
            }
        });
    });
});

httpServer.listen(PORT, () => {
    console.log(`Spelling Bee Relay Server running on port ${PORT}`);
});
