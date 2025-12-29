// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * Firebase Sync Utilities
 * Shared Firebase synchronization functions
 * Used by both Chrome Extension and Mobile Web App
 */

import { doc, updateDoc, Timestamp } from 'firebase/firestore';

// TTL for room expiration (7 days in milliseconds)
const ROOM_TTL_MS = 168 * 60 * 60 * 1000;

/**
 * Submit a found word to Firebase
 * @param {Object} db - Firestore database instance
 * @param {string} roomCode - The room code
 * @param {string} word - The word to submit
 * @param {string} playerId - The player's unique ID
 */
export async function submitWordToFirebase(db, roomCode, word, playerId) {
    if (!roomCode) return;
    const roomRef = doc(db, 'rooms', roomCode.toLowerCase());
    const expiresAt = Timestamp.fromMillis(Date.now() + ROOM_TTL_MS);
    await updateDoc(roomRef, {
        [`foundWords.${word}`]: playerId,
        expiresAt: expiresAt
    });
}

/**
 * Sync puzzle and language to Firebase (resets found words)
 * @param {Object} db - Firestore database instance
 * @param {string} roomCode - The room code
 * @param {string} puzzleId - The puzzle ID to sync
 * @param {string} language - The current language code
 */
export async function syncPuzzleToFirebase(db, roomCode, puzzleId, language) {
    if (!roomCode) return;
    try {
        const roomRef = doc(db, 'rooms', roomCode.toLowerCase());
        const expiresAt = Timestamp.fromMillis(Date.now() + ROOM_TTL_MS);
        await updateDoc(roomRef, {
            puzzleId: puzzleId,
            language: language,
            foundWords: {},
            expiresAt: expiresAt
        });
    } catch (err) {
        console.error("Error syncing puzzle:", err);
    }
}

/**
 * Send a heartbeat to update player's online status
 * @param {Object} db - Firestore database instance
 * @param {string} roomCode - The room code
 * @param {string} playerId - The player's unique ID
 */
export async function sendHeartbeat(db, roomCode, playerId) {
    if (!roomCode) return;
    try {
        const roomRef = doc(db, 'rooms', roomCode.toLowerCase());
        const expiresAt = Timestamp.fromMillis(Date.now() + ROOM_TTL_MS);
        await updateDoc(roomRef, {
            [`players.${playerId}.online`]: true,
            [`players.${playerId}.lastActive`]: Timestamp.now(),
            expiresAt: expiresAt
        });
    } catch (e) {
        console.warn("Heartbeat failed:", e);
    }
}
