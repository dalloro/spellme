# Multiplayer Design Document: Collaborative Spelling Bee

## Overview
Enable real-time collaborative play where multiple users can contribute to the same puzzle state without requiring traditional account registration.

## 1. Identity & Authentication (Anonymous)
To avoid sign-ups/sign-ins, we will use a **Persistent Local ID**:
- Upon installation/first use, the extension generates a unique `playerId` (UUID).
- The user can choose a `nickname` (e.g., "Bumblebee"), stored in `chrome.storage.local`.
- The server identifies users by this `playerId`.

## 2. Real-time Communication
We will use **WebSockets** (specifically `Socket.io`) for:
- Instant updates when a teammate finds a word.
- Real-time "presence" (see who is currently in the room).
- Minimal latency for a "live" feel.

## 3. Game Discovery & Rooms
- **Room Creation**: A user can "Start Multiplayer" on their current puzzle. This generates a **Human-Readable Room Code** (e.g., `Swift-Bumble-42` or `Happy-Worker-10`).
- **Memorable Codes**: We'll use a combination of simple Adjectives + Nouns + 2-digit numbers to make them easy to remember and share.
- **Joining**: Other players enter the Room Code or click a shared link.
- **Puzzle Sync**: The room is tied to a specific `puzzleId`. All players in a room receive the same letters.

## 4. State Synchronization
The server maintains the "Source of Truth" for each active room:
- `roomCode`: Unique identifier.
- `puzzleId`: To ensure everyone sees the same letters.
- `foundWords`: A merged list of words found by ANY player in the room.
- `players`: List of current active participants (names).

### The Handshake:
1. Client joins room with `roomCode` and `playerId`.
2. Server sends current `foundWords` and `puzzleId`.
3. Client renders the board.
4. When Client A finds a word:
   - Client sends `(roomCode, word)` to Server.
   - Server validates word against `puzzleId`.
   - Server broadcasts `(word, nickname)` to all other clients in `roomCode`.
   - Other clients update their UI with a "Bumblebee found: HONEY!" notification.

## 5. Persistence & Reliability (Firebase)
Since the server will be hosted on **Firebase**, we will use **Cloud Firestore** for persistence:
- **Resilience**: Even if the Node.js/Socket.io instance restarts, the state (found words, players) remains safe in Firestore.
- **Sync**: Clients joining mid-game will immediately pull the full list of already-found words from the database.
- **Auto-Cleanup**: We can set TTLs (Time to Live) on room documents so they expire after 24 hours of inactivity.

## 6. UI Additions
- **Multiplayer Menu**: New tab or section to Create/Join rooms.
- **Presence List**: Small avatars/names showing who is online.
- **Collaborative Word List**: Words found by others highlighted differently (e.g., with their name).

---

### Why the "Word Mirror" Recommendation?
A **Word Mirror** is a design where the server's primary job is to "reflect" actions within a specific room.

**Clarification on Privacy/Efficiency:**
- **Room-Scoped**: Actions are **strictly isolated** to the room. When Player A finds a word, the server only "mirrors" it to other players **in that same room code**.
- **No Global Broadcast**: Users in other rooms (or playing solo) will never see actions from players outside their specific game.
- **What it does:**
  - When Player A in `Swift-Bumble-42` finds "HONEY", the server "mirrors" that word *only* to other players in `Swift-Bumble-42`.
  - The other players' extensions receive the word and update their lists.

**Why start here?**
1. **Low Complexity**: We don't need a heavy game engine on the server. The server just acts as a reliable relay.
2. **Speed**: It allows us to verify the WebSocket connection and real-time feel very quickly.
3. **Decentralized Logic**: The "game logic" (what letters are valid, scoring) remains in the extension code we've already written, rather than duplicating it on the server.
**Next Step**: Should I begin drafting the server-side code (Node.js) or would you like to refine the Room/Invite flow first?
