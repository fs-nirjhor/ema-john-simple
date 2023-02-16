import React from "react";
import "./LoginForm.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState, useContext} from "react";
import {LoggedUserContext} from "../../../../App";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setLoggerUser = useContext(LoggedUserContext);
  const { user, setUser, auth } = props;
  const { email, password, message, isSuccess } = user;
  const newUser = {...user};
  const [hasAccount, setHasAccount] = useState(false);
  const messageColor = isSuccess ? {color: 'green'} : {color: 'red'} ;
  const handleBlur = (e) => {
    const emailRegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
    //  const passwordRegExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#@$%&?]{6,20}$/ ;
    const passwordRegExp = /^(?=.*\d)[a-zA-Z0-9!#@$%&?]{6,16}$/;

    const isFieldValid =
      e.target.name === "email"
        ? emailRegExp.test(e.target.value)
        : e.target.name === "password"
        ? passwordRegExp.test(e.target.value)
        : true;
    if (isFieldValid) {
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };
  const handleSubmit = (e) => {
    if (!hasAccount && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
         // const user = userCredential.user;
          newUser.message = "Account created successfully!";
          newUser.isSuccess = true;
          setUser(newUser);
          setLoggerUser(newUser);
        })
        .catch((error) => {
          newUser.message = error.code;
          newUser.isSuccess = false;
          setUser(newUser);
        });
    } 
    if (hasAccount && email && password) {
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
   // const user = userCredential.user;
    newUser.message = "Logged in successfully!";
    newUser.isSuccess = true;
    setUser(newUser);
    setLoggerUser(newUser);
    manageUser();
    navigate(location.state.from);
  })
  .catch((error) => {
    newUser.message = error.code;
    newUser.isSuccess = false;
    setUser(newUser);
  });
    }
    e.preventDefault();
  };
  const manageUser = () => {
    onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUser();
    /*const displayName = user.displayName;
  const email = user.email;
    console.log(user,displayName,email);*/
  } else {
   alert("error in managing user");
  }
});
  };
  const updateUser = () => {
    updateProfile(auth.currentUser, {
  displayName: user.name
})
.catch((error) => {
  alert("Profile not updated!");
  // ...
});
  };
  
  return (
    <section  >
    <div className="login-form">
      <form onSubmit={handleSubmit}>
      <input type="checkbox" name="hasAccount" id="hasAccount" onChange={()=>setHasAccount(!hasAccount)}/>
      <label htmlFor="hasAccount">Already have an account ?</label>
      <br />
      { !hasAccount &&
        <input
          type="text"
          name="name"
          id="name"
          onBlur={handleBlur}
          placeholder="Your name"
          required
        /> 
         }
         <br />
        <input
          type="email"
          name="email"
          id="email"
          onBlur={handleBlur}
          placeholder="Your Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onBlur={handleBlur}
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" name="submit" id="submit" value={hasAccount ? "Sign in" : "Sign up"} className="my-btn" />
      <p style={messageColor}>{message}</p>
      </form>
    </div>
    </section >
  );
};

export default LoginForm;
