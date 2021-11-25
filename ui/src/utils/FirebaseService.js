import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  unlink,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;

export const auth = getAuth(app);
export const onAuthListener = (next, fallback) =>
  auth.onIdTokenChanged((authUser) => {
    if (authUser) {
      authUser
        .getIdToken()
        .then((token) => {
          next(authUser, token);
        })
        .catch(console.log);
    } else {
      fallback();
    }
  }, fallback);

export const fetchSignInMethods = (email) =>
  fetchSignInMethodsForEmail(auth, email);

export const signOut = () => auth.signOut();
export const signInWithGoogle = async (next) =>
  next(getAdditionalUserInfo(await signInWithPopup(auth, googleProvider)));
export const signInWithFacebook = async (next) =>
  next(getAdditionalUserInfo(await signInWithPopup(auth, facebookProvider)));

export const linkSocialLogin = (authUser, provider) =>
  linkWithPopup(authUser, provider).catch(console.log);
export const unlinkSocialLogin = (authUser, provider) =>
  unlink(authUser, provider).catch(console.log);
