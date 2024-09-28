import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Import the necessary Firebase components
// import { initializeApp } from "firebase/app"; // Use the new modular import
// import { getAuth } from "firebase/auth"; // Modular import for auth
// import { getFirestore } from "firebase/firestore"; // Modular import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_okMXaaKCx-NDPDvYQAeWe7cP-IuF5pY",
  authDomain: "clone-fcd01.firebaseapp.com",
  projectId: "clone-fcd01",
  storageBucket: "clone-fcd01.appspot.com",
  messagingSenderId: "598460099977",
  appId: "1:598460099977:web:2cd5809b83f8602f5f4558",
};

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Use the app instance to get Auth
//export const db = getFirestore(app); // Use the app instance to get Firestore
export const db = app.firestore();

// import { getAuth } from "firebase/app";
// // we need this to use authantication service from firebase .

// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD_okMXaaKCx-NDPDvYQAeWe7cP-IuF5pY",
//   authDomain: "clone-fcd01.firebaseapp.com",
//   projectId: "clone-fcd01",
//   storageBucket: "clone-fcd01.appspot.com",
//   messagingSenderId: "598460099977",
//   appId: "1:598460099977:web:2cd5809b83f8602f5f4558",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = app.firestore()
