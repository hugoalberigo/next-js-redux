// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMgcsNWp3TSPzf5DoSklO5HHcWxImMqvg",
  authDomain: "challenge-chapter9.firebaseapp.com",
  databaseURL: "https://challenge-chapter9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "challenge-chapter9",
  storageBucket: "challenge-chapter9.appspot.com",
  messagingSenderId: "340242834685",
  appId: "1:340242834685:web:9313c708729ebcbda0ca94",
  measurementId: "G-J4PRXGCQQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const authFirebase = getAuth(app);
//const analytics = getAnalytics(firebase);
