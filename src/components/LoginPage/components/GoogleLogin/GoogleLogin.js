import React from 'react';
import "./GoogleLogin.css";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const GoogleLogin = (props) => {
  const {user,setUser,auth} = props;
  const googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
    const {displayName,email,photoURL} = result.user;
    setUser({
      name: displayName,
      email: email,
      photo: photoURL,
      isSignIn: true
    });
    }).catch((error) => {
       alert(error.message);
    });
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
  setUser({
      name: '',
      email: '',
      photo: '',
      isSignIn: false
    });
}).catch((error) => {
  alert(error.message);
});
  };
  const {name,email,photo,isSignIn} = user;
return (
  <div className="loginBox">
       { isSignIn 
       ? <button onClick={handleSignOut} className="my-btn">
        Sign out from Google
        </button>
       : <button onClick={handleSignIn} className="my-btn">
        Sign in with Google
        </button>
       }
        {
          isSignIn &&
          <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <img src={photo} alt="failed.." width="240px"/>
          </div>
        }  
  </div>
);
};

export default GoogleLogin;