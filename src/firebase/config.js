import firebase from "firebase/app";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2B-4U4sALUQ1rAySgY1UsLQSX_S2KnHc",
  authDomain: "cooking-recipe-site-10496.firebaseapp.com",
  projectId: "cooking-recipe-site-10496",
  storageBucket: "cooking-recipe-site-10496.appspot.com",
  messagingSenderId: "84707600739",
  appId: "1:84707600739:web:65a94b40c2be83578f0b56",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
