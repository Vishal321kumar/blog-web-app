// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvPEmmjCwnVc7np7NXzDaQX21ZwG8N5Oc",
  authDomain: "blogapp-bae9a.firebaseapp.com",
  projectId: "blogapp-bae9a",
  storageBucket: "blogapp-bae9a.appspot.com",
  messagingSenderId: "199870698572",
  appId: "1:199870698572:web:aa69829ff55b399b6f50e9"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();