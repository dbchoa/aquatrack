/**
 * AquaTrack Firebase Configuration & Initialization
 * This file establishes the connection to Auth and the Realtime Database.
 */

// 1. Your unique Firebase project configuration
// IMPORTANT: Replace these placeholders with your actual Firebase project settings!
const firebaseConfig = {
  apiKey: "AIzaSyBxnQXgKO0K5qC522nrecoQsAb1G9uBwFU",
  authDomain: "dbc-aquatrack.firebaseapp.com",
  databaseURL: "https://dbc-aquatrack-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "dbc-aquatrack",
  storageBucket: "dbc-aquatrack.firebasestorage.app",
  messagingSenderId: "656106085568",
  appId: "1:656106085568:web:bf80ba725e6df317d66125"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 3. Create easy-to-use references for the rest of your app
export const auth = firebase.auth();
export const db = firebase.database();

// 4. Optimization: Set up a persistence check
// This helps handle the "Offline Queue" requirement by detecting connection status.
export const checkConnection = (callback) => {
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    const isOnline = snap.val() === true;
    callback(isOnline);
  });
};

/** * Beginner Tip: 
 * We do not use persistent listeners (.on) for everything. 
 * Per Section 7 of the Project Context, we use .once('value') 
 * for standard page loads to keep database costs low.
 */
