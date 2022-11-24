// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_KvPwpKQHS1zCqCD5J-KShRta-b0g2vY",
  authDomain: "projektb-mosy.firebaseapp.com",
  projectId: "projektb-mosy",
  storageBucket: "projektb-mosy.appspot.com",
  messagingSenderId: "510578091695",
  appId: "1:510578091695:web:78a0f641f8bcccb14f565a",
  measurementId: "G-EPDR3JWJ0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentification
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// const analytics = getAnalytics(app);