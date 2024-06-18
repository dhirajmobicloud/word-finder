// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, get, ref, child } from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnQiPittd-jbYmQnlHkcVQkw0vzmKgTuY",
    authDomain: "word-quest-a2b1b.firebaseapp.com",
    projectId: "word-quest-a2b1b",
    storageBucket: "word-quest-a2b1b.appspot.com",
    messagingSenderId: "660493145372",
    appId: "1:660493145372:web:ba64a5c2abfdd32f5f56d9",
    measurementId: "G-772RCNVEZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)

export const writeUserData = (uid, displayName, email, phoneNumber) => {
    set(ref(db, "users/" + uid), {
        uid,
        displayName,
        email,
        phoneNumber,

    })
}

export const getUser = (userId) => {
    const dbRef = ref(db);
    let user = get(child(dbRef, `users/${userId}`));

    return user
}


export default app;

