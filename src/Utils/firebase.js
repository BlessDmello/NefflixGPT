// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3k0Yk3vTEcH2hgcb9ODlUJ_kWdM0yAlo",
  authDomain: "netflixgpt-a023c.firebaseapp.com",
  projectId: "netflixgpt-a023c",
  storageBucket: "netflixgpt-a023c.firebasestorage.app",
  messagingSenderId: "723747251930",
  appId: "1:723747251930:web:60366ee43eb8a1af2b27e3",
  measurementId: "G-34EF6DS6M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();