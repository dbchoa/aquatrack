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

// 2. [Surgical]: Enable Offline Persistence
// This saves data to the physical disk, allowing the app to survive reboots/refreshes while offline.
firebase.database().enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn("[AQUATRACK] Persistence failed: Multiple tabs open.");
    } else if (err.code == 'unimplemented') {
      console.warn("[AQUATRACK] Persistence failed: Browser not supported.");
    }
  });

// 3. Create easy-to-use references
export const auth = firebase.auth();
export const db = firebase.database();

// 4. Optimization: Set up a persistence check
export const checkConnection = (callback) => {
  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", (snap) => {
    const isOnline = snap.val() === true;
    callback(isOnline);
  });
};
