// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjCbOHqMDlr7Dm1EGKxWLqIffYYm4VMVQ",
  authDomain: "foodcourt-d1025.firebaseapp.com",
  projectId: "foodcourt-d1025",
  storageBucket: "foodcourt-d1025.firebasestorage.app",
  messagingSenderId: "215618704336",
  appId: "1:215618704336:web:ed82dac3a61881ab38dfd5",
  measurementId: "G-VYBL8RP6KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export async function getWebToken() {
  getToken(messaging, { vapidKey: 'BL69E9JGeb2FtyVbRJZUfclRHWnWZerlWWdbnvg6sH4uT-MiwRQ_Ijw4hSXSUhwdm3OQ5wN5YN3PTK6m1Qu4W8Y' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log({ currentToken })
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
}