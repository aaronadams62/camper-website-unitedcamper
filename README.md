# United Camper v2

React + Vite + Express single-page site with Firebase integration.

## Local setup

1. Install dependencies:
   `npm install`
2. Create `.env` from `.env.example` and fill in Firebase values.
3. Start in development:
   `npm start`

## Production build

1. Build:
   `npm run build`
2. Serve build with Express:
   `npm run start:prod`
3. Health check:
   `http://localhost:8080/ping` should return `pong`

## Firebase wiring

- Firebase config is loaded from `VITE_FIREBASE_*` values in `.env`.
- Initialization code is in `src/firebase.js`.
- Runtime smoke test is in `src/firebaseSmokeTest.js` and runs on app startup.
- CLI smoke test is `npm run smoke:firebase`.
- On startup, the app logs:
  - `Firebase initialized.` when complete
  - missing key names when values are not configured
  - `Firebase smoke test succeeded.` when Firestore read/write passes

## Firebase project

- Project name: `camper rental test website`
- Project ID: `camper-rental-test-web`
- Project number: `928318441939`
- Firebase Hosting config: `firebase.json`
- Default project mapping: `.firebaserc`

## Deploying to Firebase Hosting (optional)

1. Install CLI (if needed):
   `npm install -g firebase-tools`
2. Login:
   `firebase login`
3. Deploy:
   `npm run deploy:firebase`
