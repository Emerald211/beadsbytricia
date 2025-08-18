
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNKBOiX7N5PiNvrblNiGnBnUQPa2DP8wY",
  authDomain: "luxnexus-store.firebaseapp.com",
  projectId: "luxnexus-store",
  storageBucket: "luxnexus-store.appspot.com",
  messagingSenderId: "352456158321",
  appId: "1:352456158321:web:34df29d6d83b5214e3bfd0",
  measurementId: "G-8VC6BVXNN1"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app)
