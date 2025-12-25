const ADJECTIVES = [
    'Swift', 'Happy', 'Busy', 'Clever', 'Golden', 'Silly', 'Bright', 'Brave', 'Steady', 'Mello',
    'Jazzy', 'Feisty', 'Witty', 'Silent', 'Mighty', 'Quirky', 'Vibrant', 'Zen', 'Nifty', 'Super'
];

const NOUNS = [
    'Bumble', 'Worker', 'Hive', 'Honey', 'Queen', 'Drone', 'Nectar', 'Pollen', 'Buzz', 'Stinger',
    'Wings', 'Beetle', 'Ant', 'Cricket', 'Moth', 'Flea', 'Wasp', 'Hornet', 'Spider', 'Fly'
];

/**
 * Generates a human-readable room code (e.g., Swift-Bumble-42)
 */
export function generateRoomCode() {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const num = Math.floor(Math.random() * 90) + 10; // 10-99
    return `${adj}-${noun}-${num}`;
}
