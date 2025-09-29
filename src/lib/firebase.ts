import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-8253008489-748df",
  "appId": "1:263387124139:web:800edeca02a5496ab542ee",
  "apiKey": "AIzaSyAwgaljoj78jwSzm94ZBwjDQPUjKmOc26A",
  "authDomain": "studio-8253008489-748df.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "263387124139"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
