const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const DIST_DIR = path.join(__dirname, '../dist');
const MOBILE_DIST_DIR = path.join(__dirname, '../mobile/dist');
const ROOT_DIR = path.join(__dirname, '..');

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
    if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
    fs.mkdirSync(DIST_DIR);

    await esbuild.build({
        entryPoints: [path.join(ROOT_DIR, 'popup.js')],
        bundle: true,
        outfile: path.join(DIST_DIR, 'popup_bundle.js'),
        minify: true,
        sourcemap: true,
        platform: 'browser',
        define: defines
    });

    const extensionAssets = ['manifest.json', 'popup.html', 'popup.css', 'words.js', 'puzzles.js', 'icons', 'lang'];
    extensionAssets.forEach(asset => {
        const src = path.join(ROOT_DIR, asset);
        const dest = path.join(DIST_DIR, asset);
        copy(src, dest);

        // Post-copy cleanup: Remove massive files from the extension bundle
        if (asset === 'lang') {
            const itWordsPath = path.join(dest, 'it/words_it.js');
            const itRawPath = path.join(dest, 'it/raw_dictionary.txt');
            if (fs.existsSync(itWordsPath)) {
                console.log('🗑️  Removing large dictionary from extension bundle...');
                fs.unlinkSync(itWordsPath);
            }
            if (fs.existsSync(itRawPath)) {
                console.log('🗑️  Removing raw source dictionary from extension bundle...');
                fs.unlinkSync(itRawPath);
            }
        }
    });

    // Adjust HTML: Remove the massive dictionary script tag and swap bundle path
    adjustHtml(path.join(DIST_DIR, 'popup.html'), '<script src="lang/it/words_it.js"></script>', '<!-- words_it.js excluded -->');
    adjustHtml(path.join(DIST_DIR, 'popup.html'), 'src="dist/popup_bundle.js"', 'src="popup_bundle.js"');

    // Copy strings.js correctly
    copy(path.join(ROOT_DIR, 'lang/strings.js'), path.join(DIST_DIR, 'lang/strings.js'));

    await zipDirectory(DIST_DIR, ZIP_FILE);
    console.log(`✅ Extension ready at ${ZIP_FILE}`);

    // 2. MOBILE WEB APP BUILD
    console.log('📱 Building Mobile Web App...');
    const MOBILE_SRC = path.join(ROOT_DIR, 'mobile');
    if (fs.existsSync(MOBILE_DIST_DIR)) fs.rmSync(MOBILE_DIST_DIR, { recursive: true, force: true });
    fs.mkdirSync(MOBILE_DIST_DIR);

    await esbuild.build({
        entryPoints: [path.join(MOBILE_SRC, 'mobile.js')],
        bundle: true,
        outfile: path.join(MOBILE_DIST_DIR, 'mobile_bundle.js'),
        minify: true,
        sourcemap: true,
        platform: 'browser',
        define: defines
    });

    const mobileAssets = ['index.html', 'mobile.css', 'words.js', 'puzzles.js', 'icons'];
    mobileAssets.forEach(asset => copy(path.join(MOBILE_SRC, asset), path.join(MOBILE_DIST_DIR, asset)));

    // Copy Italian and common language files for mobile - EXCLUDING THE MASSIVE DICTIONARY
    const itLangDir = path.join(MOBILE_DIST_DIR, 'lang', 'it');
    const commonLangDir = path.join(MOBILE_DIST_DIR, 'lang');
    fs.mkdirSync(itLangDir, { recursive: true });

    // Copy strings.js to mobile
    copy(path.join(ROOT_DIR, 'lang/strings.js'), path.join(commonLangDir, 'strings.js'));
    // Note: skipping words_it.js to save 65MB
    copy(path.join(ROOT_DIR, 'lang/it/puzzles_it.js'), path.join(itLangDir, 'puzzles_it.js'));

    // Cache-busting and HTML cleanup for mobile
    const version = Date.now();
    const mobileHtmlPath = path.join(MOBILE_DIST_DIR, 'index.html');
    adjustHtml(mobileHtmlPath, '<script src="lang/it/words_it.js"></script>', '<!-- words_it.js excluded -->');
    adjustHtml(mobileHtmlPath, /mobile\.css/g, `mobile.css?v=${version}`);
    adjustHtml(mobileHtmlPath, /mobile_bundle\.js/g, `mobile_bundle.js?v=${version}`);
    adjustHtml(mobileHtmlPath, /words\.js/g, `words.js?v=${version}`);
    adjustHtml(mobileHtmlPath, /puzzles\.js/g, `puzzles.js?v=${version}`);
    adjustHtml(mobileHtmlPath, /lang\/strings\.js/g, `lang/strings.js?v=${version}`);

    console.log(`✅ Mobile Web App ready in mobile/dist/ (Version: ${version})`);
}

function copy(src, dest) {
    if (!fs.existsSync(src)) return;
    if (fs.lstatSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function adjustHtml(path, target, replacement) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    content = content.split(target).join(replacement);
    fs.writeFileSync(path, content);
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
