const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const ROOT_DIR = path.join(__dirname, '..');
const EXTENSION_SRC = path.join(ROOT_DIR, 'extension');
const EXTENSION_DIST = path.join(EXTENSION_SRC, 'dist');
const MOBILE_SRC = path.join(ROOT_DIR, 'mobile');
const MOBILE_DIST = path.join(MOBILE_SRC, 'dist');
const LANG_DIR = path.join(ROOT_DIR, 'lang');

// Get version from package.json
const packageJson = require(path.join(ROOT_DIR, 'package.json'));
const version = packageJson.version;

// Support versioned zip name via env or fallback to default
const ZIP_NAME = process.env.ZIP_NAME || `spelling-bee-extension-v${version}.zip`;
const ZIP_FILE = path.join(ROOT_DIR, ZIP_NAME);

// Clean up any old zips first
const oldZips = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.zip'));
oldZips.forEach(z => fs.unlinkSync(path.join(ROOT_DIR, z)));

// Inject secrets from environment variables (fallback to placeholders for local dev)
const defines = {
    'process.env.RELAY_PROJECT_ID': JSON.stringify(process.env.RELAY_PROJECT_ID || "spelling-bee-relay-1025"),
    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY || "AIzaSyDummyKeyForFreeTier")
};

async function build() {
    console.log('🚀 Starting Unified Build Process...');

    // 1. CHROME EXTENSION BUILD
    console.log('📦 Building Chrome Extension...');
    if (fs.existsSync(EXTENSION_DIST)) fs.rmSync(EXTENSION_DIST, { recursive: true, force: true });
    fs.mkdirSync(EXTENSION_DIST, { recursive: true });

    await esbuild.build({
        entryPoints: [path.join(EXTENSION_SRC, 'popup.js')],
        bundle: true,
        outfile: path.join(EXTENSION_DIST, 'popup_bundle.js'),
        minify: true,
        sourcemap: true,
        platform: 'browser',
        define: defines
    });

    // Copy extension assets (from extension/ folder)
    const extensionLocalAssets = ['manifest.json', 'popup.html', 'popup.css', 'icons'];
    extensionLocalAssets.forEach(asset => {
        copy(path.join(EXTENSION_SRC, asset), path.join(EXTENSION_DIST, asset));
    });

    // Copy language files (from lang/ folder)
    copy(path.join(LANG_DIR, 'en/puzzles.js'), path.join(EXTENSION_DIST, 'puzzles.js'));
    copy(path.join(LANG_DIR, 'en/words.js'), path.join(EXTENSION_DIST, 'words.js'));
    copy(LANG_DIR, path.join(EXTENSION_DIST, 'lang'));

    // Remove massive Italian dictionary from extension bundle
    const itWordsPath = path.join(EXTENSION_DIST, 'lang/it/words_it.js');
    const itRawPath = path.join(EXTENSION_DIST, 'lang/it/raw_dictionary.txt');
    if (fs.existsSync(itWordsPath)) {
        console.log('🗑️  Removing large Italian dictionary from extension bundle...');
        fs.unlinkSync(itWordsPath);
    }
    if (fs.existsSync(itRawPath)) {
        console.log('🗑️  Removing raw source dictionary from extension bundle...');
        fs.unlinkSync(itRawPath);
    }

    // Adjust HTML: Remove the massive dictionary script tag and swap bundle path
    adjustHtml(path.join(EXTENSION_DIST, 'popup.html'), '<script src="lang/it/words_it.js"></script>', '<!-- words_it.js excluded -->');
    adjustHtml(path.join(EXTENSION_DIST, 'popup.html'), 'src="dist/popup_bundle.js"', 'src="popup_bundle.js"');

    await zipDirectory(EXTENSION_DIST, ZIP_FILE);
    console.log(`✅ Extension ready at ${ZIP_FILE}`);

    // 2. MOBILE WEB APP BUILD
    console.log('📱 Building Mobile Web App...');
    if (fs.existsSync(MOBILE_DIST)) fs.rmSync(MOBILE_DIST, { recursive: true, force: true });
    fs.mkdirSync(MOBILE_DIST, { recursive: true });

    await esbuild.build({
        entryPoints: [path.join(MOBILE_SRC, 'mobile.js')],
        bundle: true,
        outfile: path.join(MOBILE_DIST, 'mobile_bundle.js'),
        minify: true,
        sourcemap: true,
        platform: 'browser',
        define: defines
    });

    // Copy mobile assets
    const mobileLocalAssets = ['index.html', 'mobile.css', 'icons'];
    mobileLocalAssets.forEach(asset => copy(path.join(MOBILE_SRC, asset), path.join(MOBILE_DIST, asset)));

    // Copy English puzzles/words from lang/en/ to mobile/dist/
    copy(path.join(LANG_DIR, 'en/puzzles.js'), path.join(MOBILE_DIST, 'puzzles.js'));
    copy(path.join(LANG_DIR, 'en/words.js'), path.join(MOBILE_DIST, 'words.js'));

    // Copy Italian and common language files - EXCLUDING THE MASSIVE DICTIONARY
    const itLangDist = path.join(MOBILE_DIST, 'lang', 'it');
    fs.mkdirSync(itLangDist, { recursive: true });
    copy(path.join(LANG_DIR, 'strings.js'), path.join(MOBILE_DIST, 'lang/strings.js'));
    copy(path.join(LANG_DIR, 'it/puzzles_it.js'), path.join(itLangDist, 'puzzles_it.js'));

    // Cache-busting and HTML cleanup for mobile
    const cacheVersion = Date.now();
    const mobileHtmlPath = path.join(MOBILE_DIST, 'index.html');
    adjustHtml(mobileHtmlPath, '<script src="lang/it/words_it.js"></script>', '<!-- words_it.js excluded -->');
    adjustHtml(mobileHtmlPath, /mobile\.css/g, `mobile.css?v=${cacheVersion}`);
    adjustHtml(mobileHtmlPath, /mobile_bundle\.js/g, `mobile_bundle.js?v=${cacheVersion}`);
    adjustHtml(mobileHtmlPath, /words\.js/g, `words.js?v=${cacheVersion}`);
    adjustHtml(mobileHtmlPath, /puzzles\.js/g, `puzzles.js?v=${cacheVersion}`);
    adjustHtml(mobileHtmlPath, /lang\/strings\.js/g, `lang/strings.js?v=${cacheVersion}`);

    console.log(`✅ Mobile Web App ready in mobile/dist/ (Version: ${cacheVersion})`);
}

function copy(src, dest) {
    if (!fs.existsSync(src)) return;
    if (fs.lstatSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function adjustHtml(filepath, target, replacement) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');
    if (target instanceof RegExp) {
        content = content.replace(target, replacement);
    } else {
        content = content.split(target).join(replacement);
    }
    fs.writeFileSync(filepath, content);
}

function zipDirectory(sourceDir, outPath) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);
    return new Promise((resolve, reject) => {
        archive.directory(sourceDir, false).on('error', err => reject(err)).pipe(stream);
        stream.on('close', () => resolve());
        archive.finalize();
    });
}

build().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
