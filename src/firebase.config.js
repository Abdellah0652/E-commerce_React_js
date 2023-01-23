import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyC2LFMCN1nZUQw7xEjClbr9DsaCCwOv3y4",
  authDomain: "e-commerce-77a6c.firebaseapp.com",
  databaseURL: "https://e-commerce-77a6c-default-rtdb.firebaseio.com",
  projectId: "e-commerce-77a6c",
  storageBucket: "e-commerce-77a6c.appspot.com",
  messagingSenderId: "622493245913",
  appId: "1:622493245913:web:3d1fccfea52faf47e679c8",
  measurementId: "G-M3STY0CYS8"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
