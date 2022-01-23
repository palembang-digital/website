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

export const websiteConfig = {
  title: "Palembang Digital",
  description:
    "Platform komunitas digital pertama dari dan untuk seluruh masyarakat Sumatera Selatan.",
  siteUrl: "https://palembangdigital.org",
  logo: "https://res.cloudinary.com/patal/image/upload/v1635217848/patal/events/logo_patal_512_ddkjd7.png",
};
