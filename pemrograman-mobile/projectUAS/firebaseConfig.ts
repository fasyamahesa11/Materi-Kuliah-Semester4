// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5khDcYqBraz-bj7Lmvgupo4ijmDETLlM",
  authDomain: "restaurant-booking-f7fa6.firebaseapp.com",
  projectId: "restaurant-booking-f7fa6",
  storageBucket: "restaurant-booking-f7fa6.firebasestorage.appspot.com", // ⬅️ perbaiki domainnya
  messagingSenderId: "179769023615",
  appId: "1:179769023615:android:9ca7c98b3c9e087139b34a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };