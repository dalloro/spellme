const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const manifestPath = path.join(__dirname, '../extension/manifest.json');

if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = packageJson.version;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`✅ Synced version ${packageJson.version} to manifest.json`);
} else {
    console.error('❌ manifest.json not found');
    process.exit(1);
}
