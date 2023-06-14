// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA52cJKu4aA2AYErYnO9VTTCjESFVodjKo",
  authDomain: "skm-web-app.firebaseapp.com",
  projectId: "skm-web-app",
  storageBucket: "skm-web-app.appspot.com",
  messagingSenderId: "124252450953",
  appId: "1:124252450953:web:7775dc4b831dc83f691658",
  measurementId: "G-114QK3NFZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);