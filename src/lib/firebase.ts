import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// In AI Studio, the config is at the root
import localFirebaseConfig from '../../firebase-applet-config.json';

const getFirebaseConfig = () => {
  // If Vercel env variables are present, use them
  if (import.meta.env.FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID,
      firestoreDatabaseId: import.meta.env.FIREBASE_DATABASE_ID || import.meta.env.VITE_FIREBASE_DATABASE_ID
    };
  }
  // Otherwise default to the generated config JSON (for AI Studio)
  return localFirebaseConfig;
};

const appConfig = getFirebaseConfig();

// Initialize Firebase
const app = initializeApp(appConfig);
export const db = getFirestore(app, appConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export const storage = getStorage(app);
