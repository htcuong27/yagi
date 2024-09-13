import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH8J512luyO-WP7lhG9NX_mx_dMuelEcg",
  authDomain: "saoke-5c328.firebaseapp.com",
  projectId: "saoke-5c328",
  storageBucket: "saoke-5c328.appspot.com",
  messagingSenderId: "676657398923",
  appId: "1:676657398923:web:250d8ae31a52bbc480008e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
