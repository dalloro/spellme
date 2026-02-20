const fs = require('fs');
const path = require('path');

// Configuration
const COLFIS_PATH = path.join(__dirname, '../lang/it/CoLFIS/lemmario/Lemmi_e_Forme_rango_txt/Lemmi e Forme_rango.txt');
const MORPHIT_PATH = path.join(__dirname, '../lang/it/morph-it/current_version/morph-it_048.txt');
const OUTPUT_FILE = path.join(__dirname, '../lang/it/words_it_lemmas.js');

const MAX_RANGO = 50000;
const MIN_LENGTH = 4;

// Manual Allow List for definitely common words missing from CoLFIS or filtered by POS
const MANUAL_ALLOW_LIST = new Set([
    'predare',
    'ardere',
    'rampone',
    'pomo',
    'omone',
    'marrano',
    'mormone',
    'sotto',
    'finito',
    'molto',
    'bene',
    'male',
    'prima',
    'dopo',
    'sopra',
    'dentro',
    'fuori',
    'oggi',
    'ieri',
    'domani'
]);

// Tags to accept (Morph-it format)
// Only accepting base forms: Infinitive Verbs, Masculine Singular Nouns/Adjectives
// Adding Adverbs, Prepositions as they are base forms.
const VALID_TAGS = [
    'VER:inf',      // Verb Infinitive (e.g., VER:inf+pres)
    'NOUN-M:s',     // Noun Masculine Singular
    'NOUN-F:s',     // Noun Feminine Singular
    'NOUN:s',       // Generic Singular Noun
    'ADJ:pos+m+s',  // Adjective Masculine Singular (Correct Morph-it tag)
    'ADJ:pos+f+s',  // Adjective Feminine Singular (Correct Morph-it tag)
    'ADJ:s',        // Generic Singular Adjective (Fallback)
    'ADV',          // Adverbs (e.g., bene, male, sotto)
    'PRE',          // Prepositions (e.g., sotto, sopra)
    'CON'           // Conjunctions
];

async function processWords() {
    console.log('Processing Italian Lemma Dictionary...');

    // 1. Parse CoLFIS for Frequency (Rango)
    console.log(`Reading CoLFIS from: ${COLFIS_PATH}`);
    if (!fs.existsSync(COLFIS_PATH)) throw new Error('CoLFIS file not found');

    const colfisContent = fs.readFileSync(COLFIS_PATH, 'binary'); // Read as binary to preserve bytes
    // CoLFIS is Latin-1 (ISO-8859-1). We need to decode it manually or rely on 'latin1' encoding if supported.
    // Node.js supports 'latin1'. Let's retry with that explicit encoding in case the previous run failed encoding.

    const commonLemmas = new Set();
    const colfisLines = colfisContent.split('\n');
    let skippedColfis = 0;

    for (const line of colfisLines) {
        if (!line.trim() || line.startsWith('N Lem')) continue; // Skip header/empty

        // Split by whitespace
        const parts = line.trim().split(/\s+/);

        // Safety check columns
        if (parts.length < 16) {
            skippedColfis++;
            continue;
        }

        const rango = parseInt(parts[13], 10); // Column 14 (index 13)
        const lemma = parts[15]; // Column 16 (index 15)

        if (!isNaN(rango) && rango <= MAX_RANGO) {
            // Clean lemma (punctuation check)
            if (/^[a-zA-ZàèéìòùÀÈÉÌÒÙ]+$/.test(lemma)) {
                commonLemmas.add(lemma.toLowerCase());
            }
        }
    }
    console.log(`Loaded ${commonLemmas.size} common lemmas from CoLFIS (Max Rango: ${MAX_RANGO})`);


    // 2. Parse Morph-it! for Valid Parts of Speech
    console.log(`Reading Morph-it! from: ${MORPHIT_PATH}`);
    if (!fs.existsSync(MORPHIT_PATH)) throw new Error('Morph-it file not found');

    const morphitContent = fs.readFileSync(MORPHIT_PATH, 'utf-8'); // Morph-it is usually UTF-8
    const morphitLines = morphitContent.split('\n');

    const finalSet = new Set();
    let stats = { total: 0, tagMismatch: 0, notBase: 0, rare: 0, short: 0, kept: 0 };

    for (const line of morphitLines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        stats.total++;
        const parts = trimmed.split(/\s+/); // Tab or space
        if (parts.length < 3) continue;

        const form = parts[0].toLowerCase();
        const lemma = parts[1].toLowerCase();
        const tag = parts[2];

        // Filter 1: Lemma matching
        // We rely on strict TAG matching (Singular only) to exclude plurals/conjugations.
        // This allows gendered singulars (e.g. 'calda' which maps to lemma 'caldo') 
        // while still ensuring base-form logic.

        // Filter 2: Length >= 4
        if (lemma.length < MIN_LENGTH) {
            stats.short++;
            continue;
        }

        // Filter 3: Valid POS Tag
        // Check if tag starts with any of our valid prefixes
        const isValidTag = VALID_TAGS.some(t => tag.startsWith(t));
        if (!isValidTag) {
            stats.tagMismatch++;
            continue;
        }

        // Filter 4: Must be in CoLFIS common list OR Manual Allow List
        const isCommon = commonLemmas.has(lemma) || MANUAL_ALLOW_LIST.has(lemma) || MANUAL_ALLOW_LIST.has(form);
        if (!isCommon) {
            stats.rare++;
            continue;
        }

        finalSet.add(form);
        stats.kept++;
    }

    console.log('\nProcessing Stats:');
    console.log(`  Total Morph-it entries: ${stats.total}`);
    console.log(`  Filtered (Not Base Form): ${stats.notBase}`);
    console.log(`  Filtered (Wrong Tag): ${stats.tagMismatch}`);
    console.log(`  Filtered (Length < 4): ${stats.short}`);
    console.log(`  Filtered (Rare/Not in CoLFIS): ${stats.rare}`);
    console.log(`  Kept Valid Lemmas: ${finalSet.size}`);

    // Force include manual allow list words even if they were missing from Morph-it!
    MANUAL_ALLOW_LIST.forEach(word => {
        if (word.length >= MIN_LENGTH) {
            finalSet.add(word);
        }
    });

    // 3. Write Output
    const sortedWords = Array.from(finalSet).sort();
    const jsContent = `// Italian Lemma Dictionary for Spellme
// Generated from Morph-it! (0.48) and CoLFIS
// Criteria:
// - POS: Infinitive Verbs, Masc/Sing Nouns & Adjectives
// - Frequency: Top ${MAX_RANGO} in CoLFIS
// - Length: >= ${MIN_LENGTH}
// Total words: ${sortedWords.length}

const VALID_WORDS_IT = new Set(${JSON.stringify(sortedWords)});

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VALID_WORDS_IT };
}
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`\nGenerated: ${OUTPUT_FILE}`);
}

processWords().catch(console.error);
