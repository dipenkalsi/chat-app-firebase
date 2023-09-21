// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe4Q7_rIRXncadlwjkuUXODDFQtr0qXxY",
  authDomain: "chat-app-10c46.firebaseapp.com",
  projectId: "chat-app-10c46",
  storageBucket: "chat-app-10c46.appspot.com",
  messagingSenderId: "815544404233",
  appId: "1:815544404233:web:4a3a92191e0355f5192bd8"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export {db, auth, storage, provider};
