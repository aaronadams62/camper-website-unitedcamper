import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { isFirebaseConfigured } from './firebase';
import { runFirebaseSmokeTest } from './firebaseSmokeTest';

if (isFirebaseConfigured) {
  console.log('Firebase initialized.');
  runFirebaseSmokeTest().then(function (result) {
    if (result.ok) {
      console.log('Firebase smoke test succeeded.');
      return;
    }
    console.warn('Firebase smoke test failed:', result.reason);
  });
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
