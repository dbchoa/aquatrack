/**
 * AquaTrack Firebase Configuration & Initialization
 * This file establishes the connection to Auth and the Realtime Database.
 */

const firebaseConfig = {
  apiKey: "AIzaSyBxnQXgKO0K5qC522nrecoQsAb1G9uBwFU",
  authDomain: "dbc-aquatrack.firebaseapp.com",
  databaseURL: "https://dbc-aquatrack-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "dbc-aquatrack",
  storageBucket: "dbc-aquatrack.firebasestorage.app",
  messagingSenderId: "656106085568",
  appId: "1:656106085568:web:bf80ba725e6df317d66125"
};

// 1. Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 2. [Surgical Fix]: Handle Offline State
// Realtime Database handles local caching automatically once a listener is active.
// We keep this block clean to avoid the "not a function" TypeError.
const dbInstance = firebase.database();

// 3. Create easy-to-use references
export const auth = firebase.auth();
export const db = dbInstance;

// 4. Connection check utility
// This is the true "Engine" for your Terminal Outbox logic.
export const checkConnection = (callback) => {
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    const isOnline = snap.val() === true;
    callback(isOnline);
  });
};

console.log("%c[AQUATRACK] Field HUD Logic Ready", "color: #4facfe; font-weight: bold;");
