
import { useState } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import GoogleLogin from "./components/GoogleLogin/GoogleLogin";
import FacebookLogin from "./components/FacebookLogin/FacebookLogin";
import "./LoginPage.css";

// import for firebase
import firebaseConfig from "./firebase.config";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function LoginPage() {
  
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    photo:'',
    message: '',
    isSuccess: false,
    isSignIn: false
  });

  return (
    <div className="login-page">
        <GoogleLogin user={user} setUser={setUser} auth={auth}></GoogleLogin >
        <hr />
        <FacebookLogin user={user} setUser={setUser} auth={auth}></FacebookLogin >
        <hr />
        <LoginForm user={user} setUser={setUser} auth={auth}/>  
    </div>
  );
}

export default LoginPage; 