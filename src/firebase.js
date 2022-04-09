import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNLRJ6gXBxmdOmp38DnuM8jF4bTrmQMuM",
  authDomain: "react-firebase-auth-ead15.firebaseapp.com",
  projectId: "react-firebase-auth-ead15",
  storageBucket: "react-firebase-auth-ead15.appspot.com",
  messagingSenderId: "274994868275",
  appId: "1:274994868275:web:d21a5e714995ff05a33346",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firebaseFunctions = {
  signInWithEmailAndPassword: function (email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  signOut: function () {
    return signOut(auth);
  },

  createUserWithEmailAndPassword: function (email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  },
};

export default app;
