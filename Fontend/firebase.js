// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔹 use the config from your new Firebase project (whitmets-893e5)
const firebaseConfig = {
  apiKey: "AIzaSyDBijnByJXwWdo601Ahy87MkEATZ8HesQ4",
  authDomain: "whitmets-893e5.firebaseapp.com",
  projectId: "whitmets-893e5",
  storageBucket: "whitmets-893e5.firebasestorage.app",
  messagingSenderId: "490737557503",
  appId: "1:490737557503:web:ece13629e1b14351d251ca"
};

// 🔹 initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 get auth instance
const auth = getAuth(app);

export { app, auth };

