import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const CreateUserWithEmailAndPassword = (myUser) => {
  return createUserWithEmailAndPassword(auth, myUser.email, myUser.password);
};

export const UpdateProfile = (myUser) => {
  updateProfile(auth.currentUser, {
    displayName: myUser.username,
  }).catch((error) => {
    alert(error.code);
  });
};

export const SignInWithEmailAndPassword = (myUser) => {
  return signInWithEmailAndPassword(auth, myUser.email, myUser.password);
};

export const SignInWithPopup = (provider) => {
  return signInWithPopup(auth, provider);
};
