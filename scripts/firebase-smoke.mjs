import { config as loadEnv } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

loadEnv();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const missing = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length) {
  console.error('Firebase smoke test failed. Missing env keys:', missing.join(', '));
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ref = doc(db, 'public_submissions', 'cli_smoke_test_' + Date.now());
const writeEnabled = process.env.SMOKE_FIREBASE_WRITE === 'true';

try {
  const readSnap = await getDoc(ref);
  console.log(
    'Firebase connectivity check succeeded.',
    'projectId=' + firebaseConfig.projectId,
    'docExists=' + readSnap.exists()
  );
  if (!writeEnabled) {
    process.exit(0);
  }

  await setDoc(
    ref,
    {
      name: 'CLI Smoke Test',
      email: 'smoke@example.com',
      message: 'Connectivity check',
      createdAt: serverTimestamp()
    },
    { merge: false }
  );
  const writeSnap = await getDoc(ref);
  console.log('Firebase write smoke test succeeded.', 'docExists=' + writeSnap.exists());
} catch (error) {
  if (error.code === 'permission-denied') {
    console.warn(
      'Firebase is connected, but Firestore rules denied this unauthenticated operation (permission-denied).'
    );
    process.exit(0);
  }

  console.error('Firebase smoke test failed with Firestore error:', error.code || error.message);
  process.exit(1);
}
