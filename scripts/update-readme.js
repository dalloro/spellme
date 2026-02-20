// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const packageJson = require(path.join(ROOT_DIR, 'package.json'));
const version = packageJson.version;
const readmePath = path.join(ROOT_DIR, 'README.md');

if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');

    // Regex to find any versioned zip name in the README
    const regex = /spellme-v[\d\.]+\.zip/g;
    const newName = `spellme-v${version}.zip`;

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
