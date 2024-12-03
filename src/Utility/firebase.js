import firebase  from "firebase/compat/app";
//auth
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbblmS75wfjTd-Pxt_QbLv-cft3l5zcR8",
  authDomain: "clone-afbc8.firebaseapp.com",
  projectId: "clone-afbc8",
  storageBucket: "clone-afbc8.firebasestorage.app",
  messagingSenderId: "756260554508",
  appId: "1:756260554508:web:8598c458f03b95471fab29",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db=app.firestore();
