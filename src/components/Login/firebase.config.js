// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDORAZ8vRszmyhPxMdspSJr04Z6vxw3cd8",
  authDomain: "fir-auth-fsn.firebaseapp.com",
  projectId: "fir-auth-fsn",
  storageBucket: "fir-auth-fsn.appspot.com",
  messagingSenderId: "654300181102",
  appId: "1:654300181102:web:34c7faf87bf07d5cb92c7f",
  measurementId: "G-0737P363BT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default firebaseConfig;
