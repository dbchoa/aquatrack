/**
 * AquaTrack Authentication Logic
 * Handles login, logout, and session persistence.
 */

import { auth, db } from './firebase-init.js';
import { toast, debug, setTheme } from './utils.js';

/**
 * 1. User Login
 * Authenticates with Firebase and caches user data.
 */
export const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Fetch the user's role and preference from the database
    const snapshot = await db.ref(`users/${user.uid}`).once('value');
    const userData = snapshot.val();

    if (userData) {
      // FIXED: Standardized keys to match Dashboard security checks
      sessionStorage.setItem('aqt_user_role', userData.role);
      sessionStorage.setItem('aqt_user_name', userData.name);
      
      // Apply saved theme preference
      if (userData.theme) setTheme(userData.theme);

      toast(`Welcome back, ${userData.name}!`, 'success');
      
      // SURGICAL ADJUSTMENT: Small delay to ensure Storage write is complete before redirect
      setTimeout(() => {
        redirectByRole(userData.role);
      }, 100);

    } else {
      throw new Error("User profile not found.");
    }
  } catch (error) {
    debug("Login Error", error.message);
    toast(error.message, 'error');
  }
};

/**
 * 2. Role-Based Redirector
 */
const redirectByRole = (role) => {
  switch (role) {
    case 'reader':
      window.location.href = 'reader/dashboard.html';
      break;
    case 'billing':
      window.location.href = 'billing/dashboard.html';
      break;
    case 'homeowner':
      window.location.href = 'homeowner/dashboard.html';
      break;
    case 'admin':
      window.location.href = 'admin/dashboard.html';
      break;
    default:
      window.location.href = 'index.html';
  }
};

/**
 * 3. Logout
 */
export const logout = async () => {
  try {
    await auth.signOut();
    sessionStorage.clear(); 
    window.location.href = '../index.html';
  } catch (error) {
    toast("Logout failed", 'error');
  }
};

/**
 * 4. Auth State Observer
 */
auth.onAuthStateChanged((user) => {
  if (user) {
    debug("User session detected:", user.email);
  } else {
    debug("No active session.");
  }
});
