# Spelling Bee Project (Extension & Mobile)

A clean, modern implementation of the Spelling Bee word game, featuring official NYT Daily puzzle integration, random puzzles, and **Real-Time Multiplayer**.

## 📥 Download & Install
### **Chrome Extension**
The easiest way to play is to install the Chrome Extension:
[![Download Latest ZIP](https://img.shields.io/badge/Download-Latest%20ZIP-brightgreen?style=for-the-badge&logo=github)](https://github.com/dalloro/spelling-bee-extension/releases/latest/download/spelling-bee-extension-v4.3.0.zip)

*To install: Download the zip, extract it into a folder, go to `chrome://extensions/`, enable "Developer Mode", and click "Load unpacked" on the folder.*

## 🏗️ Architecture

The project is structured around three core components that work together to provide a seamless gaming experience:

### 1. 📡 Real-Time Game Relay
A dedicated Firebase backend that acts as the multiplayer engine. It manages live room synchronization, tracks guessed words across teammates, and ensures a shared game state in real-time using Firestore.

### 2. 📱 Mobile-First Web App
A fully responsive web application optimized for mobile browsers, but equally functional on desktop. It allows users to play directly in their browser without any installation.
🔗 **Live at: [https://spelling-bee-mobile.web.app/](https://spelling-bee-mobile.web.app/)**

### 3. 🧩 Chrome Extension
A companion extension that provides instant, embedded access to the game via a browser action popup. It’s the perfect way to jump into a puzzle quickly while browsing.

---

## 🚀 Deployment

### 1. Automated (CI/CD)
Deployments are automated via **GitHub Actions** whenever you push to `main`.
To enable this, ensure the following **GitHub Secrets** are configured:
- `FIREBASE_TOKEN`: Your Firebase CI login token (`firebase login:ci`).
- `RELAY_PROJECT_ID`: The ID of your Firestore project.
- `HOSTING_PROJECT_ID`: The ID of your Hosting project (`spelling-bee-mobile`).
- `FIREBASE_API_KEY`: Your Firebase Web API Key.

### 2. Manual (CLI)
If you need to deploy manually from your local machine:

**Deploy Static Web App:**
```bash
cd mobile
npm run build
firebase deploy --only hosting --project spelling-bee-mobile
```

**Deploy Firestore Rules:**
```bash
firebase deploy --only firestore --project spelling-bee-relay-1025
```

---

## 🧪 Testing & Development

### Local Emulator Testing
To test multiplayer logic locally without hitting production:
1. Start the Firestore emulator:
   ```bash
   firebase emulators:start
   ```
2. In the browser (Mobile App), open the developer console and run:
   ```javascript
   switchMultiplayerEnv()
   ```
   This toggles the app between **Production** and **Local Emulator** modes.

### Browser Extension
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the root directory (or the zipped `dist` folder after running `npm run build`).

---

## 🛠️ Build System
We use `esbuild` for a unified build process that handles both the extension and the mobile app:
```bash
npm run build
```
This command:
1. Bundles `extension/popup.js` into `extension/dist/`.
2. Bundles `mobile/mobile.js` into `mobile/dist/`.
3. Injects secrets into the code.
4. Generates **Cache-Busting** version strings for mobile assets.
5. Zips the extension for distribution.

### 📁 Folder Structure
```
spelling-bee-extension/
├── extension/          # Chrome extension source
│   ├── popup.js        # Main extension logic
│   ├── popup.html      
│   ├── popup.css       
│   ├── manifest.json   
│   └── icons/          
├── mobile/             # Mobile web app source
│   ├── mobile.js       
│   ├── index.html      
│   └── mobile.css      
├── lang/               # Language resources
│   ├── en/             # English puzzles & dictionary
│   ├── it/             # Italian puzzles & dictionary  
│   └── strings.js      # Localization strings
├── utils/              # Shared modules
│   ├── constants.js    # LEVELS, LANGUAGE_CONFIG
│   ├── game-logic.js   # Word validation
│   ├── multiplayer.js  # Room code generation
│   └── puzzle-loaders.js # Daily puzzle fetchers
└── scripts/            # Build & generation scripts
```

---

### 🇮🇹 Italian Language Support
The Italian version uses an expanded dictionary (~4.2M words) for puzzle generation. To keep the extension lightweight, the full dictionary is **excluded** from the production bundle.

**To generate more Italian puzzles:**
```bash
# 1. Ensure the raw dictionary is present (lang/it/raw_dictionary.txt)
# 2. Process the dictionary
npm run generate:dictionary:it
# 3. Append 1000 new unique puzzles
npm run generate:puzzles:it
```
The generator automatically tracks existing puzzles to ensure no duplicates are created.

---
## 🙏 Credits & Acknowledgements

This project is inspired by the **New York Times Spelling Bee**. Use this extension to practice or play with friends!

We gratefully acknowledge the following sources for our Daily Puzzle data:
- **[NYT Spelling Bee Answers and Analysis (nytbee.com)](https://nytbee.com/)**: Source for the English daily letters.
- **[Apegramma (La Regione)](https://www.laregione.ch/giochi/apegramma)**: Source for the Italian daily letters.

---
*Maintained with care* 🐝
