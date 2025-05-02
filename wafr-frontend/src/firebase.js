// Importer Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Ta configuration personnelle (copiée depuis Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDL2zx3Dpv1IYufdK2txxMHo0YwzX2afjk",
  authDomain: "wafr-auth.firebaseapp.com",
  projectId: "wafr-auth",
  storageBucket: "wafr-auth.firebasestorage.app",
  messagingSenderId: "558560610427",
  appId: "1:558560610427:web:a01f052e02d0317227fade"
};

// Initialiser l'application
const app = initializeApp(firebaseConfig);

// Exporter l'objet auth pour l’utiliser dans Login.jsx
export const auth = getAuth(app);
