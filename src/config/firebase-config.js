// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAzxW60Ih49od-gLwORgkhE-SP3pkxTqTA",
    authDomain: "vocationnations-7860.firebaseapp.com",
    databaseURL: "https://vocationnations-7860.firebaseio.com",
    projectId: "vocationnations-7860",
    storageBucket: "vocationnations-7860.appspot.com",
    messagingSenderId: "637465130244",
    appId: "1:637465130244:web:21a5922c054198c43dcc51",
    measurementId: "G-2D73Y6QZ8Z"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();


export {
    firebaseApp,
    firebaseAppAuth,
}
