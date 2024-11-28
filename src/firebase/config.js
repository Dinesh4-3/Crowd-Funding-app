import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsJTAebp4qQaaWuTNmb3x6j4-Cvi9V0Wo",
  authDomain: "crowd-funding-platform-57073.firebaseapp.com",
  projectId: "crowd-funding-platform-57073",
  storageBucket: "crowd-funding-platform-57073.firebasestorage.app",
  messagingSenderId: "458718728328",
  appId: "1:458718728328:web:4e6174e4ad078518408f3d",
  measurementId: "G-PBCLWCR7JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with specific settings
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable CORS for storage
const storageRef = getStorage(app);
storageRef.settings = {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
    allowHeaders: ['Content-Type']
  }
};





