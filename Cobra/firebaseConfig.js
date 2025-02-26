// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA-QkGsykpYqvrzj-l_gIm1MoK0OTHgAE",
  authDomain: "cobra-8ec2a.firebaseapp.com",
  projectId: "cobra-8ec2a",
  storageBucket: "cobra-8ec2a.firebasestorage.app",
  messagingSenderId: "590301233617",
  appId: "1:590301233617:web:cba85cbbe7569cb634e0f0",
  measurementId: "G-PKZK2RW5DG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);