import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAE2gFtQTUAun9V8Z6LosGJQFJHj3YyJj0",
    authDomain: "whatsapp-clone-709b4.firebaseapp.com",
    projectId: "whatsapp-clone-709b4",
    storageBucket: "whatsapp-clone-709b4.appspot.com",
    messagingSenderId: "122106288635",
    appId: "1:122106288635:web:214c02c3ba89dd498ad35e",
    measurementId: "G-0N4EGQFPEM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;