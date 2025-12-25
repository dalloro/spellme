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

// Port mapping for local and cloud deployment
const PORT = process.env.PORT || 3000;

// In-memory room state (will be backed by Firestore in the next step)
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // --- ROOM MANAGEMENT ---

    // Player creates a new room
    socket.on('create-room', async ({ playerId, nickname, puzzleId }) => {
        const roomCode = generateRoomCode();

        const roomState = {
            roomCode,
            puzzleId,
            foundWords: [],
            players: [{ playerId, nickname, socketId: socket.id, online: true }]
        };

        rooms.set(roomCode, roomState);
        await saveRoom(roomCode, roomState);

        socket.join(roomCode);

        socket.emit('room-created', roomState);
        console.log(`Room created & persisted: ${roomCode} by ${nickname}`);
    });

    // Player joins an existing room
    socket.on('join-room', async ({ roomCode, playerId, nickname }) => {
        let room = rooms.get(roomCode);

        // Fallback to Firestore if not in memory
        if (!room) {
            room = await getRoom(roomCode);
            if (room) rooms.set(roomCode, room);
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
        }

        socket.join(roomCode);

        // Notify the joiner of the current room state
        socket.emit('joined-room', room);

        // Notify others in the room
        socket.to(roomCode).emit('player-joined', { playerId, nickname });
        console.log(`User ${nickname} joined room: ${roomCode}`);
    });

    // --- GAMEPLAY RELAY ---

    // Player finds a word
    socket.on('submit-word', async ({ roomCode, word, nickname }) => {
        const room = rooms.get(roomCode);
        if (!room) return;

        // Avoid duplicates
        if (!room.foundWords.includes(word)) {
            room.foundWords.push(word);
            await addWordToRoom(roomCode, word);

            // Mirror/broadcast to everyone in the room (including sender just to be sure)
            io.to(roomCode).emit('word-found', { word, nickname });
            console.log(`[${roomCode}] ${nickname} found: ${word} (persisted)`);
        }
    });

    // --- DISCONNECT ---
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        // Mark player as offline in any rooms they were in
        rooms.forEach((room, code) => {
            const p = room.players.find(p => p.socketId === socket.id);
            if (p) {
                p.online = false;
                io.to(code).emit('player-offline', { playerId: p.playerId });
            }
        });

        // Option: Cleanup empty rooms after some time
    });
});

httpServer.listen(PORT, () => {
    console.log(`Spelling Bee Relay Server running on port ${PORT}`);
});
