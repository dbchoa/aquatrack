/**
 * AquaTrack Authentication Logic
 * Handles login, logout, and session persistence.
 */

import { auth, db } from './firebase-init.js';
import { toast, debug, setTheme } from './utils.js';

// ─── ROLE → PATH MAP ─────────────────────────────────────────────────────────
// Single source of truth. Mirrors the map in index.html.
const ROLE_PATHS = {
    reader:    'reader/reader.html',
    billing:   'billing/billing.html',
    admin:     'admin/admin.html',
    homeowner: 'homeowner/ho.html',
};

/**
 * 1. User Login
 * Authenticates with Firebase and caches user data in sessionStorage.
 */
export const login = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user           = userCredential.user;

        const snapshot = await db.ref(`users/${user.uid}`).once('value');
        const userData  = snapshot.val();

        if (!userData) throw new Error('User profile not found.');

        sessionStorage.setItem('aqt_user_role', userData.role);
        sessionStorage.setItem('aqt_user_name', userData.name);

        if (userData.theme) setTheme(userData.theme);

        toast(`Welcome back, ${userData.name}!`, 'success');

        // Small delay to ensure sessionStorage write completes before redirect
        setTimeout(() => redirectByRole(userData.role), 100);

    } catch (error) {
        debug('Login Error', error.message);
        toast(error.message, 'error');
    }
};

/**
 * 2. Role-Based Redirector
 * Uses window.location.replace so the login page is not in browser history.
 */
const redirectByRole = (role) => {
    const path = ROLE_PATHS[role];
    if (path) {
        window.location.replace(path);
    } else {
        toast('Unknown role. Contact admin.', 'error');
        debug('redirectByRole: unrecognised role:', role);
    }
};

/**
 * 3. Logout
 */
export const logout = async () => {
    try {
        await auth.signOut();
        sessionStorage.clear();
        window.location.replace('../index.html');
    } catch (error) {
        toast('Logout failed', 'error');
    }
};

/**
 * 4. Auth State Observer (diagnostic only)
 */
auth.onAuthStateChanged((user) => {
    if (user) {
        debug('User session detected:', user.email);
    } else {
        debug('No active session.');
    }
});
