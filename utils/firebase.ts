import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDjCbOHqMDlr7Dm1EGKxWLqIffYYm4VMVQ",
    authDomain: "foodcourt-d1025.firebaseapp.com",
    projectId: "foodcourt-d1025",
    storageBucket: "foodcourt-d1025.appspot.com",
    messagingSenderId: "215618704336",
    appId: "1:215618704336:web:ed82dac3a61881ab38dfd5",
    measurementId: "G-VYBL8RP6KS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);