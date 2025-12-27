// UI String Localization for Multi-Language Spelling Bee
// Contains all user-facing strings in English and Italian

const STRINGS = {
    en: {
        // Validation messages
        tooShort: "Too short",
        missingCenter: "Missing center letter",
        badLetter: "Bad letter",
        notInWordList: "Not in word list",
        notValidWord: "Not a valid word",
        alreadyFound: "Already found",

        // Success messages
        pangram: "Pangram!",
        nice: "Nice!",
        newRandomPuzzle: "New Random Puzzle!",
        nytDailyLoaded: "NYT Daily Loaded!",
        apegrammLoaded: "Apegramma Loaded!",
        roomCodeCopied: "Room code copied!",

        // Loading messages
        fetchingNYT: "Fetching NYT Daily...",
        fetchingApegramma: "Fetching Apegramma...",

        // Error messages
        errorLoadingNYT: "Error loading NYT Daily",
        errorLoadingApegramma: "Error loading Apegramma",
        roomNotFound: "Room not found",

        // Levels
        beginner: "Beginner",
        goodStart: "Good Start",
        movingUp: "Moving Up",
        good: "Good",
        solid: "Solid",
        niceLvl: "Nice",
        great: "Great",
        amazing: "Amazing",
        genius: "Genius",
        queenBee: "Queen Bee",

        // Controls
        delete: "Delete",
        enter: "Enter",
        hide: "Hide",
        show: "Show",

        // Multiplayer
        multiplayer: "Multiplayer",
        createRoom: "Create Room",
        joinRoom: "Join Room",
        leaveRoom: "Leave Room",
        roomCode: "ROOM CODE",
        room: "Room",
        players: "Players",
        edit: "edit",
        editNickname: "edit nickname",
        enterNewNickname: "Enter new nickname:",
        chooseNickname: "Choose a nickname to start playing with others.",
        continue: "Continue",
        join: "Join",
        back: "Back",
        enterRoomCode: "Enter the room code shared with you.",
        loggedInAs: "Logged in as",
        leaveRoomConfirm: "Leave this room?",
        anonymous: "Anonymous",
        unknown: "Unknown",
        ghost: "Ghost",
        you: "You",
        confirmChangeGame: "This will change the game for EVERYONE in the room. Continue?",

        // Found word
        foundWord: "found",
        words: "words",
        word: "word",

        // Rankings modal
        rankings: "Rankings",
        rank: "Rank",
        minimumScore: "Minimum Score",

        // Language
        language: "Language",
        english: "English",
        italiano: "Italiano"
    },

    it: {
        // Validation messages
        tooShort: "Troppo corta",
        missingCenter: "Manca la lettera centrale",
        badLetter: "Lettera non valida",
        notInWordList: "Non nella lista",
        notValidWord: "Parola non valida",
        alreadyFound: "Già trovata",

        // Success messages
        pangram: "Pangram!",
        nice: "Bene!",
        newRandomPuzzle: "Nuovo puzzle casuale!",
        nytDailyLoaded: "NYT Daily caricato!",
        apegrammLoaded: "Apegramma caricato!",
        roomCodeCopied: "Codice stanza copiato!",

        // Loading messages
        fetchingNYT: "Caricamento NYT Daily...",
        fetchingApegramma: "Caricamento Apegramma...",

        // Error messages
        errorLoadingNYT: "Errore caricamento NYT Daily",
        errorLoadingApegramma: "Errore caricamento Apegramma",
        roomNotFound: "Stanza non trovata",

        // Levels
        beginner: "Principiante",
        goodStart: "Buon Inizio",
        movingUp: "In Crescita",
        good: "Bene",
        solid: "Solido",
        niceLvl: "Bravo",
        great: "Ottimo",
        amazing: "Fantastico",
        genius: "Genio",
        queenBee: "Ape Regina",

        // Controls
        delete: "Cancella",
        enter: "Invio",
        hide: "Nascondi",
        show: "Mostra",

        // Multiplayer
        multiplayer: "Multigiocatore",
        createRoom: "Crea Stanza",
        joinRoom: "Entra in Stanza",
        leaveRoom: "Esci dalla Stanza",
        roomCode: "CODICE STANZA",
        room: "Stanza",
        players: "Giocatori",
        edit: "modifica",
        editNickname: "modifica nome",
        enterNewNickname: "Inserisci nuovo nome:",
        chooseNickname: "Scegli un nome per giocare con gli altri.",
        continue: "Continua",
        join: "Entra",
        back: "Indietro",
        enterRoomCode: "Inserisci il codice stanza condiviso con te.",
        loggedInAs: "Connesso come",
        leaveRoomConfirm: "Uscire da questa stanza?",
        anonymous: "Anonimo",
        unknown: "Sconosciuto",
        ghost: "Fantasma",
        you: "Tu",
        confirmChangeGame: "Questo cambierà il gioco per TUTTI nella stanza. Continuare?",

        // Found word
        foundWord: "ha trovato",
        words: "parole",
        word: "parola",

        // Rankings modal
        rankings: "Classifiche",
        rank: "Livello",
        minimumScore: "Punteggio Minimo",

        // Language
        language: "Lingua",
        english: "English",
        italiano: "Italiano"
    }
};

// Get localized string
function t(key) {
    const lang = (typeof state !== 'undefined' && state.language) || 'en';
    return STRINGS[lang]?.[key] || STRINGS.en[key] || key;
}

// Get localized level name
function getLocalizedLevel(levelIndex) {
    const levelKeys = ['beginner', 'goodStart', 'movingUp', 'good', 'solid', 'niceLvl', 'great', 'amazing', 'genius', 'queenBee'];
    return t(levelKeys[levelIndex] || 'beginner');
}

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STRINGS, t, getLocalizedLevel };
}
