// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGp13NTibaLcE3EIrdzc3PRf509p9q_vI",
  authDomain: "react-native-chat-24acd.firebaseapp.com",
  projectId: "react-native-chat-24acd",
  storageBucket: "react-native-chat-24acd.appspot.com",
  messagingSenderId: "175110120682",
  appId: "1:175110120682:web:7434ef15befffcd6baa393",
  measurementId: "G-E0KR11TCTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);