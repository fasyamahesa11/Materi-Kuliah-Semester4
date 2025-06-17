// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDiblRJR2o4ACMHP2pycelnzataXjFkAEA",
  authDomain: "projectuas-947e8.firebaseapp.com",
  projectId: "projectuas-947e8",
  storageBucket: "projectuas-947e8.firebasestorage.app", // ⬅️ perbaiki domainnya
  messagingSenderId: "548529702289",
  appId: "1:548529702289:android:d0f80631030da6faaa8630"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };