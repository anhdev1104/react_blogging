import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNevtzQkBA_7WWC79cbOprcBGyjqWVltI',
  authDomain: 'monkey-blogging-f8dc3.firebaseapp.com',
  projectId: 'monkey-blogging-f8dc3',
  storageBucket: 'monkey-blogging-f8dc3.appspot.com',
  messagingSenderId: '335052980035',
  appId: '1:335052980035:web:2c76f7165d875a184239f6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
