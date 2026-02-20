// MIT License
// Copyright (c) 2025 Livio Dalloro
// See LICENSE file for details.

/**
 * Daily Puzzle Auth Gate
 * Requires Firebase Authentication to access daily puzzles.
 * Uses email/password sign-in with session persistence.
 */

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

let _auth = null;
let _currentUser = null;
let _authReady = false;
let _authReadyPromise = null;

/**
 * Initialize the auth module. Call once after initializeApp().
 * @param {import('firebase/app').FirebaseApp} app
 */
export function initDailyAuth(app) {
    _auth = getAuth(app);
    _authReadyPromise = new Promise((resolve) => {
        onAuthStateChanged(_auth, (user) => {
            _currentUser = user;
            _authReady = true;
            resolve(user);
        });
    });
}

/**
 * Check if user is currently authenticated.
 * @returns {boolean}
 */
export function isDailyAuthed() {
    return !!_currentUser;
}

/**
 * Wait for auth state to be resolved (first load).
 * @returns {Promise<import('firebase/auth').User|null>}
 */
export function waitForAuth() {
    return _authReadyPromise;
}

/**
 * Require authentication to access daily puzzles.
 * If already signed in, resolves immediately.
 * If not, shows a login prompt and resolves on success.
 * @returns {Promise<boolean>} true if authenticated, false if cancelled
 */
export async function requireDailyAuth() {
    // Wait for initial auth state
    await _authReadyPromise;

    // Already signed in
    if (_currentUser) return true;

    // Show login prompt
    return showLoginPrompt();
}

/**
 * Show a modal login prompt. Returns true on successful sign-in.
 */
function showLoginPrompt() {
    return new Promise((resolve) => {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.id = 'daily-auth-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); display: flex; align-items: center;
            justify-content: center; z-index: 10000;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: #1a1a1a; border-radius: 16px; padding: 32px;
            max-width: 340px; width: 90%; border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        `;

        modal.innerHTML = `
            <h3 style="margin: 0 0 8px; color: #00BFAE; font-size: 18px;">🔒 Daily Puzzle</h3>
            <p style="margin: 0 0 20px; color: #aaa; font-size: 13px;">Sign in to access daily puzzles</p>
            <input id="daily-auth-email" type="email" placeholder="Email" autocomplete="email"
                style="width: 100%; padding: 10px 12px; margin-bottom: 10px;
                       background: #222; border: 1px solid #444; border-radius: 8px;
                       color: #fff; font-size: 14px; box-sizing: border-box;">
            <input id="daily-auth-pass" type="password" placeholder="Password" autocomplete="current-password"
                style="width: 100%; padding: 10px 12px; margin-bottom: 16px;
                       background: #222; border: 1px solid #444; border-radius: 8px;
                       color: #fff; font-size: 14px; box-sizing: border-box;">
            <div id="daily-auth-error" style="color: #ff6666; font-size: 12px; margin-bottom: 12px; display: none;"></div>
            <div style="display: flex; gap: 10px;">
                <button id="daily-auth-cancel" style="flex: 1; padding: 10px; background: #333;
                    border: 1px solid #555; border-radius: 8px; color: #fff; cursor: pointer; font-size: 14px;">
                    Cancel
                </button>
                <button id="daily-auth-submit" style="flex: 1; padding: 10px; background: #00BFAE;
                    border: none; border-radius: 8px; color: #fff; cursor: pointer; font-size: 14px; font-weight: 600;">
                    Sign In
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const emailInput = document.getElementById('daily-auth-email');
        const passInput = document.getElementById('daily-auth-pass');
        const errorDiv = document.getElementById('daily-auth-error');
        const submitBtn = document.getElementById('daily-auth-submit');
        const cancelBtn = document.getElementById('daily-auth-cancel');

        function cleanup() {
            overlay.remove();
        }

        cancelBtn.onclick = () => {
            cleanup();
            resolve(false);
        };

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                cleanup();
                resolve(false);
            }
        };

        async function doLogin() {
            const email = emailInput.value.trim();
            const pass = passInput.value;
            if (!email || !pass) {
                errorDiv.textContent = 'Enter email and password';
                errorDiv.style.display = 'block';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = '...';
            errorDiv.style.display = 'none';

            try {
                await signInWithEmailAndPassword(_auth, email, pass);
                cleanup();
                resolve(true);
            } catch (err) {
                errorDiv.textContent = err.code === 'auth/invalid-credential'
                    ? 'Invalid email or password'
                    : err.message;
                errorDiv.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
        }

        submitBtn.onclick = doLogin;
        passInput.onkeydown = (e) => { if (e.key === 'Enter') doLogin(); };
        emailInput.onkeydown = (e) => { if (e.key === 'Enter') passInput.focus(); };

        // Focus email input
        setTimeout(() => emailInput.focus(), 100);
    });
}
