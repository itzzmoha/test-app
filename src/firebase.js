import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore"; // Add necessary Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIlTPn3wD6BOKoCol5o2LjyaPkc3JfLUk",
  authDomain: "to-do-list-app-ca95c.firebaseapp.com",
  projectId: "to-do-list-app-ca95c",
  storageBucket: "to-do-list-app-ca95c.appspot.com",
  messagingSenderId: "1092357582290",
  appId: "1:1092357582290:web:ecf9e08bcc382f368f6c0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Export Firebase functions you need
export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  getDocs,
  query,
  orderBy,
  onSnapshot 
};
