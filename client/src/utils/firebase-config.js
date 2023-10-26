import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCKjymaOj8jhxZUUs2f3qeBwSzn2lKuuZ0",
    authDomain: "react-netflix-clone-2240a.firebaseapp.com",
    projectId: "react-netflix-clone-2240a",
    storageBucket: "react-netflix-clone-2240a.appspot.com",
    messagingSenderId: "633243227929",
    appId: "1:633243227929:web:d4549a57ec18180a5b5788",
    measurementId: "G-BZPVPWECQ1"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);