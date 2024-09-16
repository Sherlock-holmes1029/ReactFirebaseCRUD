// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA70ajgrxdlF6vQ1kzFjbgc6uREeBM6gPU",
  authDomain: "reactfirebasecrud-d1e8b.firebaseapp.com",
  projectId: "reactfirebasecrud-d1e8b",
  storageBucket: "reactfirebasecrud-d1e8b.appspot.com",
  messagingSenderId: "266713546624",
  appId: "1:266713546624:web:3675c65161f6a8fb730b65",
  measurementId: "G-JCJB3KVK3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
