# Improvements Tracker

This file is the active engineering workboard for production hardening.

## Project Snapshot

- App stack: React 18 + Vite + Firebase + Firebase Hosting
- Firebase project: `camper-rental-test-web`
- Live URL: `https://camper-rental-test-web.web.app`
- Current risk theme: Firestore security + unnecessary client writes

## Status Legend

- `TODO`: not started
- `IN PROGRESS`: actively being worked
- `BLOCKED`: waiting on decision/access
- `DONE`: completed and verified

## Priority Board

| ID | Priority | Status | Owner | Area | Summary |
|---|---|---|---|---|---|
| SEC-001 | Critical | DONE | AI | Firestore Rules | Replace global public read/write with least-privilege rules |
| APP-001 | High | DONE | AI | Frontend Runtime | Remove/gate automatic smoke-test writes on every page load |
| DEP-001 | Medium | DONE | AI | Dependencies | Resolve remaining production audit advisory |
| META-001 | Low | DONE | AI | Repository Metadata | Update stale `package.json` repo/main metadata |

## Detailed Work Items

### SEC-001 - Harden Firestore rules

- Priority: Critical
- Status: DONE
- Owner: AI
- Files: `firestore.rules`
- Problem:
  - Current rule is `allow read, write: if true;` for all documents.
  - This allows anonymous full read/write/delete access to the entire database.
- Plan:
  - Define allowed public collections only (if any).
  - Restrict writes to specific collections with schema checks.
  - Deny all by default for everything else.
- Definition of Done:
  - [x] Global wildcard public write removed.
  - [x] Rules compile and deploy successfully.
  - [x] `npm run smoke:firebase` passes for expected allowed paths only.
  - [x] Manual negative test confirms restricted paths are denied.
- Validation Commands:
  - `firebase deploy --only firestore:rules --project camper-rental-test-web`
  - `npm run smoke:firebase`
 - Result:
  - Implemented scoped rules for `public_submissions` with field validation and deny-by-default fallback.
  - Rules deployed successfully to `camper-rental-test-web`.
  - Smoke write/read passes only on allowed path.

### APP-001 - Stop runtime write on every page load

- Priority: High
- Status: DONE
- Owner: AI
- Files: `src/index.jsx`, `src/firebaseSmokeTest.js`
- Problem:
  - App startup currently triggers Firestore write/read in browser for every visitor.
  - This increases cost and abuse surface.
- Plan:
  - Keep smoke test as CLI-only check, or gate browser smoke test with `import.meta.env.DEV`.
  - Remove production write behavior from startup path.
- Definition of Done:
  - [x] No Firestore write occurs on normal production page load.
  - [x] Local/dev smoke testing remains available.
  - [x] Build and deploy still pass.
- Validation Commands:
  - `npm run build`
  - `npm run deploy:firebase`
  - Browser network check confirms no Firestore write on initial load in production.
 - Result:
  - Startup smoke test is now gated behind `import.meta.env.DEV`.
  - Production build/deploy validated successfully.

### DEP-001 - Resolve remaining production vulnerability

- Priority: Medium
- Status: DONE
- Owner: AI
- Files: `package-lock.json` (likely transitive)
- Problem:
  - `npm audit --omit=dev` reported a high advisory for `websocket-extensions` (ReDoS).
- Plan:
  - Run `npm audit fix`.
  - Recheck audit output.
  - If still present, pin/override transitive dependency path.
- Definition of Done:
  - [x] `npm audit --omit=dev` has zero high/critical findings or has documented accepted risk.
  - [x] Build/deploy tests pass after dependency change.
- Validation Commands:
  - `npm audit --omit=dev`
  - `npm run build`
 - Result:
  - Ran `npm audit fix`.
  - Current result: `npm audit --omit=dev` reports `0 vulnerabilities`.

### META-001 - Clean package metadata

- Priority: Low
- Status: DONE
- Owner: AI
- Files: `package.json`
- Problem:
  - `repository` points to old repo.
  - `main` is stale for this frontend/Vite app.
- Plan:
  - Set `repository` to current GitHub repo.
  - Remove or adjust `main`.
- Definition of Done:
  - [x] `package.json` metadata matches current repository and project type.
 - Result:
  - Updated `repository` to the current GitHub project.
  - Removed stale `main` field for Vite frontend package metadata.

## Work Log

Use this format for updates:

- `YYYY-MM-DD` - `Initials` - `Item ID` - `Status Change` - short note

Entries:

- `2026-02-27` - `AI` - `SEC-001` - `TODO` - Identified global public Firestore read/write rule as highest risk.
- `2026-02-27` - `AI` - `APP-001` - `TODO` - Identified runtime smoke test writes on startup.
- `2026-02-27` - `AI` - `DEP-001` - `TODO` - Identified one remaining production dependency advisory.
- `2026-02-27` - `AI` - `META-001` - `TODO` - Identified stale package metadata.
- `2026-02-27` - `AI` - `SEC-001` - `DONE` - Deployed least-privilege rules with allowed `public_submissions` path only.
- `2026-02-27` - `AI` - `APP-001` - `DONE` - Gated browser smoke test to dev-only.
- `2026-02-27` - `AI` - `DEP-001` - `DONE` - Ran `npm audit fix`; `npm audit --omit=dev` now reports zero vulnerabilities.
- `2026-02-27` - `AI` - `META-001` - `DONE` - Updated `package.json` repository and removed stale `main`.

## Handoff Notes For Next Dev

- Current board status: all tracked items completed and verified.
- If new issues are discovered, add a new item ID and follow the same status/work-log format.
