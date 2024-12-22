
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";
// // import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAQdnTjzlZxj4cVQOml4-pCKpvO6-W2PSQ",
//   authDomain: "sipawaybluewaves.firebaseapp.com",
//   projectId: "sipawaybluewaves",
//   storageBucket: "sipawaybluewaves.appspot.com",
//   messagingSenderId: "322180542875",
//   appId: "1:322180542875:web:fce7ca0e38221ef148f13e",
//   measurementId: "G-LMHNFY3RMT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const fileDB = getStorage(app)
// const textDB = getFirestore(app)
// // const analytics = getAnalytics(app)
// const auth = getAuth(app)

// export {fileDB, textDB, auth};


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const fileDB = getStorage(app);
const textDB = getFirestore(app);
const auth = getAuth(app);

export { fileDB, textDB, auth };

// ---