// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
	apiKey: "AIzaSyDkJLF7DloHqYrvGC_Yi_5Emk-deHa27uM",
	authDomain: "derivative-a676c.firebaseapp.com",
	projectId: "derivative-a676c",
	storageBucket: "derivative-a676c.appspot.com",
	messagingSenderId: "913737319074",
	appId: "1:913737319074:web:827a30bb3d9f010ac24dfb",
	measurementId: "G-SEW9DS3B17",
});

// Initialize Firebase
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app };
