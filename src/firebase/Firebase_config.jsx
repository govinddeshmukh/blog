import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCy6WGXI4CMIywYZRxIFG2eYp64o8yNsno",
  authDomain: "blog-93f0a.firebaseapp.com",
  projectId: "blog-93f0a",
  storageBucket: "blog-93f0a.appspot.com",
  messagingSenderId: "207465154085",
  appId: "1:207465154085:web:0f79a5d44627d0d66321cc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

export {app , auth, db, storage }