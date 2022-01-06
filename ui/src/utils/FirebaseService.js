import { initializeApp } from "firebase/app";
import {
  EmailAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  linkWithCredential,
  unlink,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);
export const emailProvider = new EmailAuthProvider();
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

export const signInWithGoogle = async () =>
  getAdditionalUserInfo(await signInWithPopup(auth, googleProvider));
export const signInWithFacebook = async () =>
  getAdditionalUserInfo(await signInWithPopup(auth, facebookProvider));

export const linkSocialLogin = (authUser, provider) =>
  linkWithPopup(authUser, provider).catch(console.log);
export const linkDefaultLogin = (authUser, email, password) => 
  linkWithCredential(authUser, EmailAuthProvider.credential(email, password))
export const unlinkLogin = (authUser, provider) =>
  unlink(authUser, provider).catch(console.log);

export const createUserEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  const userInfo = getAdditionalUserInfo(userCredential);
  return userInfo;
}
export const signInEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userInfo = getAdditionalUserInfo(userCredential);
  return userInfo;
}