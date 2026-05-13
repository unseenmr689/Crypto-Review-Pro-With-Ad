// Firebase initialization and exports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, limit, serverTimestamp, getDocFromServer } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfoLDtTIT597KNGmYpGB5YIOd2EXspuuQ",
  authDomain: "gen-lang-client-0446016045.firebaseapp.com",
  projectId: "gen-lang-client-0446016045",
  storageBucket: "gen-lang-client-0446016045.firebasestorage.app",
  messagingSenderId: "70879715589",
  appId: "1:70879715589:web:4dbf012fa2183fa180976c",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, "ai-studio-cryptoreviewpro-11c3c820-acca-4173-900e-0c1879d704d6");

/**
 * Handle Firestore errors by throwing a specific JSON error object.
 */
function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { 
  auth, db, 
  signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
  collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, limit, serverTimestamp, getDocFromServer,
  handleFirestoreError
};
