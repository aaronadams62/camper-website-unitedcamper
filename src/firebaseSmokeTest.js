import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export async function runFirebaseSmokeTest() {
  if (!isFirebaseConfigured || !db) {
    return { ok: false, reason: 'firebase-not-configured' };
  }

  const testRef = doc(db, '_health', 'frontend_smoke');
  try {
    await setDoc(testRef, { updatedAt: serverTimestamp() }, { merge: true });
    await getDoc(testRef);
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.code || error.message };
  }
}
