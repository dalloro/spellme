const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const DIST_DIR = path.join(__dirname, '../dist');
const MOBILE_DIST_DIR = path.join(__dirname, '../mobile/dist');
const ROOT_DIR = path.join(__dirname, '..');
const ZIP_FILE = path.join(ROOT_DIR, 'spelling-bee-extension.zip');

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

    const extensionAssets = ['manifest.json', 'popup.html', 'popup.css', 'words.js', 'puzzles.js', 'icons'];
    extensionAssets.forEach(asset => copy(path.join(ROOT_DIR, asset), path.join(DIST_DIR, asset)));

    // Adjust HTML
    adjustHtml(path.join(DIST_DIR, 'popup.html'), 'src="dist/popup_bundle.js"', 'src="popup_bundle.js"');

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

    console.log(`✅ Mobile Web App ready in mobile/dist/`);
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
    content = content.replace(target, replacement);
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
