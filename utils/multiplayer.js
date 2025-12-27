/**
 * Multiplayer Utilities
 * Shared multiplayer helper functions
 * Used by both Chrome Extension and Mobile Web App
 */

/**
 * Generate a human-readable room code
 * @returns {string} Room code like "Happy-Bee-42"
 */
export function generateRoomCode() {
    const adjs = ['Happy', 'Lucky', 'Sunny', 'Cool', 'Bright', 'Swift', 'Calm'];
    const nouns = ['Bee', 'Hive', 'Honey', 'Comb', 'Wing', 'Pollen', 'Nectar'];
    const num = Math.floor(Math.random() * 99) + 1;
    const adj = adjs[Math.floor(Math.random() * adjs.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}-${noun}-${num}`;
}

/**
 * Get display name for a player, handling duplicates
 * @param {string} playerId - The player's unique ID
 * @param {Object} players - Map of all players {playerId: {nickname, ...}}
 * @param {Function} t - Translation function
 * @returns {string} Display name, possibly with disambiguator
 */
export function getDisplayName(playerId, players, t) {
    if (!playerId) return t('unknown');
    const p = players[playerId];
    if (!p) return playerId.length > 20 ? t('ghost') : playerId;
    const nick = p.nickname || t('anonymous');

    // Check for duplicates
    const twins = Object.entries(players)
        .filter(([id, data]) => (data.nickname || "Anonymous") === nick)
        .sort(([idA], [idB]) => idA.localeCompare(idB));

    if (twins.length <= 1) return nick;
    const idx = twins.findIndex(([id]) => id === playerId);
    return `${nick} (#${idx + 1})`;
}
