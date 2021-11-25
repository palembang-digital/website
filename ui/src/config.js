const getEnv = (env) => {
  return window.env && env in window.env ? window.env[env] : process.env[env];
};

export const firebaseConfig = {
  apiKey: getEnv("REACT_APP_FIREBASE_API_KEY"),
  authDomain: getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv("REACT_APP_FIREBASE_PROJECT_ID"),
  storageBucket: getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnv("REACT_APP_FIREBASE_APP_ID"),
  measurementId: getEnv("REACT_APP_FIREBASE_MEASUREMENT_ID"),
};
