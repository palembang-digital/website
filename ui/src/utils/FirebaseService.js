import { initializeApp } from 'firebase/app'
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  unlink,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC059Db716_SlXgim2nirUSSJkaXcFffZk",
  authDomain: "patal-dev.firebaseapp.com",
  projectId: "patal-dev",
  storageBucket: "patal-dev.appspot.com",
  messagingSenderId: "1048801972186",
  appId: "1:1048801972186:web:7f9fff3aa4f48792fc3ae3",
  measurementId: "G-MS4NRPQQPM"
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;

export const auth = getAuth(app);
export const onAuthListener = (next, fallback) =>
  auth.onAuthStateChanged(authUser => {
    if (authUser) {
      next(authUser);
    } else {
      fallback();
    }
  }, fallback);

export const fetchSignInMethods = email => fetchSignInMethodsForEmail(auth, email);

export const signOut = () => auth.signOut();
export const signInWithGoogle = async next => next(getAdditionalUserInfo(await signInWithPopup(auth, googleProvider)));
export const signInWithFacebook = async next => next(getAdditionalUserInfo(await signInWithPopup(auth, facebookProvider)));

export const linkSocialLogin = (authUser, provider) => linkWithPopup(authUser, provider).catch(console.log);
export const unlinkSocialLogin = (authUser, provider) => unlink(authUser, provider).catch(console.log);
