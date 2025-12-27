const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const packageJson = require(path.join(ROOT_DIR, 'package.json'));
const version = packageJson.version;
const readmePath = path.join(ROOT_DIR, 'README.md');

if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');

    // Regex to find the download link and update it
    // Examples:
    // [test](.../download/spelling-bee-extension-v2.4.0.zip)
    // [test](.../download/spelling-bee-extension.zip)
    const regex = /spelling-bee-extension-v[\d\.]+\.zip|spelling-bee-extension\.zip/g;
    const newName = `spelling-bee-extension-v${version}.zip`;

    if (content.match(regex)) {
        content = content.replace(regex, newName);
        fs.writeFileSync(readmePath, content);
        console.log(`✅ Updated README download link to ${newName}`);
    } else {
        console.warn('⚠️ No download link pattern found in README.md');
    }
} else {
    console.error('❌ README.md not found');
}
