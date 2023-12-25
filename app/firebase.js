import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2ffbETwL8hupSveo6d55YTOun0kYzCC4",
    authDomain: "loqi-loqi.firebaseapp.com",
    databaseURL: "https://loqi-loqi-default-rtdb.firebaseio.com",
    projectId: "loqi-loqi",
    storageBucket: "loqi-loqi.appspot.com",
    messagingSenderId: "622541820845",
    appId: "1:622541820845:web:e7b417188f959ea1c40724",
    measurementId: "G-HZDJC6PYH8"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const initFirebase = () => {
  return app;
}