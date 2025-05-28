import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5khDcYqBraz-bj7Lmvgupo4ijmDETLlM",//current_key
    authDomain: "restaurant-booking-f7fa6.firebaseapp.com",//project_id + ".firebaseapp.com"
    projectId: "restaurant-booking-f7fa6", //project_id
    storageBucket: "restaurant-booking-f7fa6.firebasestorage.appspot.com", //project_id + ".firebasestorage.googleapis.com"
    messagingSenderId: "179769023615", //project_number
    appId: "1:179769023615:android:9ca7c98b3c9e087139b34a", //app_id
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
