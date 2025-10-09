import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDpJKtMbVlT8iMIv0E0ZrFNQydDS05QQGI",
  authDomain: "british-army-dashboard.firebaseapp.com",
  projectId: "british-army-dashboard",
  storageBucket: "british-army-dashboard.firebasestorage.app",
  messagingSenderId: "616019408085",
  appId: "1:616019408085:web:a139bed32946e030d5de5c",
  measurementId: "G-4KJBNDEFS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app, "us-central1");