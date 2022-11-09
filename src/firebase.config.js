import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC2LFMCN1nZUQw7xEjClbr9DsaCCwOv3y4",
  authDomain: "e-commerce-77a6c.firebaseapp.com",
  projectId: "e-commerce-77a6c",
  storageBucket: "e-commerce-77a6c.appspot.com",
  messagingSenderId: "622493245913",
  appId: "1:622493245913:web:3d1fccfea52faf47e679c8",
  measurementId: "G-M3STY0CYS8"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
