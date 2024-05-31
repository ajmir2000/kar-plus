// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "karplus-b0704.firebaseapp.com",
  projectId: "karplus-b0704",
  storageBucket: "karplus-b0704.appspot.com",
  messagingSenderId: "898032319705",
  appId: "1:898032319705:web:c8ab2f3ee91b81768bd2c8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
