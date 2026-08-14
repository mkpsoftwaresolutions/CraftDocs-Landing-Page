import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

/**
 * Filled from `npx -y firebase-tools@latest apps:sdkconfig WEB <APP_ID>`.
 * Do not commit secrets beyond the public web config Firebase provides for client apps.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

function hasConfig() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

export function getFirebaseApp() {
  if (!hasConfig()) {
    if (import.meta.env.DEV) {
      console.warn(
        "[firebase] Missing VITE_FIREBASE_* env. Run apps:create + apps:sdkconfig, then copy values into .env",
      );
    }
    return undefined;
  }
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export async function initFirebaseAnalytics() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp || typeof window === "undefined") return undefined;
  if (!(await isSupported())) return undefined;
  if (!analytics) {
    analytics = getAnalytics(firebaseApp);
  }
  return analytics;
}

