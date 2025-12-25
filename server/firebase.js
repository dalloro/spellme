import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin
// Note: In production, you'd set GOOGLE_APPLICATION_CREDENTIALS path 
// or pass the service account JSON via environment variables.
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
    } catch (error) {
        console.warn("Firebase Admin failed to initialize with default credentials. Falling back to mock (local) mode.");
    }
}

const db = admin.apps.length ? admin.firestore() : null;

/**
 * Saves or updates a room's state in Firestore
 */
export async function saveRoom(roomCode, state) {
    if (!db) return;
    try {
        await db.collection('rooms').doc(roomCode).set({
            ...state,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error(`Error saving room ${roomCode}:`, error);
    }
}

/**
 * Retrieves a room's state from Firestore
 */
export async function getRoom(roomCode) {
    if (!db) return null;
    try {
        const doc = await db.collection('rooms').doc(roomCode).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error(`Error fetching room ${roomCode}:`, error);
        return null;
    }
}

/**
 * Adds a word to the room's found list in Firestore
 */
export async function addWordToRoom(roomCode, word) {
    if (!db) return;
    try {
        await db.collection('rooms').doc(roomCode).update({
            foundWords: admin.firestore.FieldValue.arrayUnion(word),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error(`Error adding word to room ${roomCode}:`, error);
    }
}
