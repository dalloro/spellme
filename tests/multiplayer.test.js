/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, onSnapshot, updateDoc, terminate, clearIndexedDbPersistence } from 'firebase/firestore';
// Note: We use the actual SDK, but connected to emulator

const PROJECT_ID = 'spelling-bee-extension';
const FIRESTORE_PORT = 8080;

// Helper to create an isolated app instance for a user
function createClient(userId) {
    // Config for emulator
    const app = initializeApp({
        projectId: PROJECT_ID,
        apiKey: "fake-api-key", // Emulator accepts anything
    }, userId); // unique app name
    const db = getFirestore(app);
    connectFirestoreEmulator(db, '127.0.0.1', FIRESTORE_PORT);
    return { app, db, userId };
}

describe('Multiplayer Language Sync', () => {
    let clientA, clientB;
    const roomCode = 'test-room-sync'; // ID (lowercase)

    // Setup: Connect clients
    beforeAll(() => {
        clientA = createClient('userA');
        clientB = createClient('userB');
    });

    afterAll(async () => {
        await terminate(clientA.db);
        await terminate(clientB.db);
    });

    // Clean DB before each test? 
    // Ideally we rely on unique room codes or manually clear.
    // For now, unique room code per test or just one scenario.

    it('should sync language and puzzle changes to all players', async () => {
        const { db: dbA } = clientA;
        const { db: dbB } = clientB;

        // 1. A creates Room
        console.log("Creating room...");
        const roomRefA = doc(dbA, 'rooms', roomCode);
        await setDoc(roomRefA, {
            code: 'Test-Room',
            language: 'en',
            puzzleId: '123',
            players: {
                'userA': { nickname: 'Alice', online: true },
                'userB': { nickname: 'Bob', online: true }
            }
        });

        // 2. B "joins" (subscribes)
        console.log("B subscribing...");
        let stateB = { language: 'en', puzzleId: '123' };

        // Emulate subscribeToRoom logic for B
        const unsubB = onSnapshot(doc(dbB, 'rooms', roomCode), (snap) => {
            const data = snap.data();
            if (!data) return;
            // Capture updates
            if (data.language) stateB.language = data.language;
            if (data.puzzleId) stateB.puzzleId = data.puzzleId;
        });

        // Verify initial state
        await new Promise(r => setTimeout(r, 500));
        expect(stateB.language).toBe('en');

        // 3. A Switches Language (The Logic under test)
        console.log("A switching language to IT...");
        // Emulate syncPuzzleToFirebase from Popup
        // Atomic update of language + puzzleId
        await updateDoc(roomRefA, {
            puzzleId: 'apegramma-2025-12-27',
            language: 'it',
            foundWords: {}
        });

        // 4. Verify B receives update
        await new Promise(r => setTimeout(r, 1000)); // Wait for sync

        // Assertions
        console.log("Checking B state:", stateB);
        expect(stateB.language).toBe('it');
        expect(stateB.puzzleId).toBe('apegramma-2025-12-27');

        unsubB();
    });
});
