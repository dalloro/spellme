// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, doc, getDoc, terminate } from 'firebase/firestore';
import { createRoom, addPlayerToRoom, removePlayerFromRoom, getRoomData } from '../utils/room-manager.js';
import { submitWordToFirebase, syncPuzzleToFirebase, sendHeartbeat } from '../utils/firebase-sync.js';

const PROJECT_ID = 'spelling-bee-extension';
const FIRESTORE_PORT = 8080;

function createClient(userId) {
    const app = initializeApp({
        projectId: PROJECT_ID,
        apiKey: "fake-api-key",
    }, userId);
    const db = getFirestore(app);
    connectFirestoreEmulator(db, '127.0.0.1', FIRESTORE_PORT);
    return { app, db, userId };
}

describe('Firebase Utils Integration', () => {
    let clientA, clientB;
    const roomCode = 'test-room-utils';
    const roomId = roomCode.toLowerCase();

    beforeAll(() => {
        clientA = createClient('userUtilsA');
        clientB = createClient('userUtilsB');
    });

    afterAll(async () => {
        await terminate(clientA.db);
        await terminate(clientB.db);
    });

    it('should create a room correctly', async () => {
        const { db } = clientA;
        await createRoom(db, roomId, roomCode, 'puzzle-1', 'en', 'userUtilsA', 'Alice');

        const data = await getRoomData(db, roomId);
        expect(data).toBeDefined();
        expect(data.code).toBe(roomCode);
        expect(data.language).toBe('en');
        expect(data.players['userUtilsA'].nickname).toBe('Alice');
        expect(data.expiresAt).toBeDefined();
    });

    it('should allow another player to join', async () => {
        const { db } = clientB;
        const data = await addPlayerToRoom(db, roomId, 'userUtilsB', 'Bob');

        expect(data.code).toBe(roomCode);
        // data contains the room state BEFORE we joined, so our player might not be in it yet.
        // We verify the addition by checking the DB below.

        // Verify DB update
        const updatedRoom = await getRoomData(db, roomId);
        expect(updatedRoom.players['userUtilsB'].nickname).toBe('Bob');

        // Verify A sees B
        const roomA = await getRoomData(clientA.db, roomId);
        expect(roomA.players['userUtilsB']).toBeDefined();
    });

    it('should sync puzzle updates', async () => {
        const { db } = clientA;
        await syncPuzzleToFirebase(db, roomId, 'puzzle-2', 'it');

        // Wait for propagation (emulator is fast but async)
        await new Promise(r => setTimeout(r, 200));

        const data = await getRoomData(clientB.db, roomId);
        expect(data.puzzleId).toBe('puzzle-2');
        expect(data.language).toBe('it');
        expect(data.foundWords).toEqual({}); // Should reset words
    });

    it('should submit shared found words', async () => {
        const { db } = clientB;
        await submitWordToFirebase(db, roomId, 'CIAO', 'userUtilsB');

        await new Promise(r => setTimeout(r, 200));

        const data = await getRoomData(clientA.db, roomId);
        expect(data.foundWords['CIAO']).toBe('userUtilsB');
    });

    it('should send heartbeat', async () => {
        const { db } = clientA;
        await sendHeartbeat(db, roomId, 'userUtilsA');

        const data = await getRoomData(db, roomId);
        expect(data.players['userUtilsA'].lastActive).toBeDefined();
    });

    it('should remove player on leave', async () => {
        const { db } = clientB;
        await removePlayerFromRoom(db, roomId, 'userUtilsB');

        await new Promise(r => setTimeout(r, 200));

        const data = await getRoomData(clientA.db, roomId);
        expect(data.players['userUtilsB']).toBeUndefined();
        expect(data.players['userUtilsA']).toBeDefined();
    });
});
