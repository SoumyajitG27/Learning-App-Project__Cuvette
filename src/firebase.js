// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtcgKjigpBxnBkkTJjOJU6BAwS98Uq2rM",
  authDomain: "e-learning-app-authentication.firebaseapp.com",
  projectId: "e-learning-app-authentication",
  storageBucket: "e-learning-app-authentication.appspot.com",
  messagingSenderId: "183329982953",
  appId: "1:183329982953:web:66d5278d9151aef9efe378",
  measurementId: "G-W7B8X2X6PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =  getAuth();
export default app;
