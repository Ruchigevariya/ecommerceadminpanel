// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuyxfXnkUoaP9c08HlIH3cWoJRLpuXvSo",
  authDomain: "fashionecommerce-adminpanel.firebaseapp.com",
  projectId: "fashionecommerce-adminpanel",
  storageBucket: "fashionecommerce-adminpanel.appspot.com",
  messagingSenderId: "113335796487",
  appId: "1:113335796487:web:956db976161fa09a4e3ba2",
  measurementId: "G-RY0KJ2K4QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);