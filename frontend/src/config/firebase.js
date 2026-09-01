import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAOrS9By42qIWQWjqldJyHWuNn49OWCfvg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sss-website-295a0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sss-website-295a0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sss-website-295a0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "640221293758",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:640221293758:web:e6eae807881c47c50082ef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QXY6VVS356"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
