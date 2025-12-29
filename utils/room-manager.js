// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * Room Manager Utilities
 * Shared Firestore room operations (pure database calls)
 * Used by both Chrome Extension and Mobile Web App
 * 
 * Note: Higher-level functions (join/create/leave) remain in the apps
 * because they are tightly coupled to app-specific state and UI.
 */

import { doc, setDoc, getDoc, updateDoc, Timestamp, deleteField } from 'firebase/firestore';

// TTL for room expiration (7 days in milliseconds)
const ROOM_TTL_MS = 168 * 60 * 60 * 1000;

/**
 * Create a new room in Firestore
 * @param {Object} db - Firestore database instance
 * @param {string} roomId - Room ID (lowercase)
 * @param {string} displayCode - Mixed-case display code
 * @param {string} puzzleId - Current puzzle ID
 * @param {string} language - Current language code
 * @param {string} playerId - Creator's player ID
 * @param {string} nickname - Creator's nickname
 * @returns {Promise<void>}
 */
export async function createRoom(db, roomId, displayCode, puzzleId, language, playerId, nickname) {
    const roomRef = doc(db, 'rooms', roomId);
    const expiresAt = Timestamp.fromMillis(Date.now() + ROOM_TTL_MS);

    await setDoc(roomRef, {
        code: displayCode,
        puzzleId: puzzleId,
        language: language,
        createdAt: Timestamp.now(),
        expiresAt: expiresAt,
        players: {
            [playerId]: {
                nickname: nickname,
                online: true,
                lastActive: Timestamp.now()
            }
        },
        foundWords: {}
    });
}

/**
 * Add a player to an existing room
 * @param {Object} db - Firestore database instance
 * @param {string} roomId - Room ID (lowercase)
 * @param {string} playerId - Player's ID
 * @param {string} nickname - Player's nickname
 * @returns {Promise<Object>} Room data
 */
export async function addPlayerToRoom(db, roomId, playerId, nickname) {
    const roomRef = doc(db, 'rooms', roomId);
    const snapshot = await getDoc(roomRef);

    if (!snapshot.exists()) {
        throw new Error("Room not found");
    }

    const expiresAt = Timestamp.fromMillis(Date.now() + ROOM_TTL_MS);
    await updateDoc(roomRef, {
        [`players.${playerId}`]: {
            nickname: nickname,
            online: true,
            lastActive: Timestamp.now()
        },
        expiresAt: expiresAt
    });

    return snapshot.data();
}

/**
 * Remove a player from a room
 * @param {Object} db - Firestore database instance
 * @param {string} roomId - Room ID (lowercase)
 * @param {string} playerId - Player's ID
 * @returns {Promise<void>}
 */
export async function removePlayerFromRoom(db, roomId, playerId) {
    if (!roomId) return;
    const roomRef = doc(db, 'rooms', roomId);
    try {
        await updateDoc(roomRef, {
            [`players.${playerId}`]: deleteField()
        });
    } catch (e) {
        console.warn("Error removing player from room:", e);
    }
}

/**
 * Get room data
 * @param {Object} db - Firestore database instance
 * @param {string} roomId - Room ID (lowercase)
 * @returns {Promise<Object|null>} Room data or null if not found
 */
export async function getRoomData(db, roomId) {
    const roomRef = doc(db, 'rooms', roomId);
    const snapshot = await getDoc(roomRef);
    return snapshot.exists() ? snapshot.data() : null;
}
