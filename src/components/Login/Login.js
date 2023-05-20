import "./Login.css";
import { useState, useContext } from "react";
import { LoggedUserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateUserWithEmailAndPassword,
  SignInWithEmailAndPassword,
  UpdateProfile,
  googleProvider,
  facebookProvider,
  SignInWithPopup,
} from "./ManageLogin";

const Login = () => {
  const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
  const [myUser, setMyUser] = useState({});
  const [hasAccount, setHasAccount] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    SignInWithPopup(googleProvider)
      .then((result) => {
        setEmailAndName(result.user);
        setMessage("Signin Successfully !", true);
      })
      .catch((error) => {
        setMessage(error.code, false);
      });
  };

  const handleFacebookLogin = () => {
    SignInWithPopup(facebookProvider)
      .then((result) => {
        setEmailAndName(result.user);
        setMessage("Signin Successfully !", true);
      })
      .catch((error) => {
        setMessage(error.code, false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasAccount && myUser.username && myUser.email && myUser.password) {
      CreateUserWithEmailAndPassword(myUser)
        .then((result) => {
          UpdateProfile(myUser);
          setMessage("Signup Successfully !", true);
        })
        .catch((error) => {
          setMessage(error.code, false);
        });
      setHasAccount(true);
    }
    if (hasAccount && myUser.email && myUser.password) {
      SignInWithEmailAndPassword(myUser)
        .then((result) => {
          setEmailAndName(result.user);
          setMessage("Signin Successfully !", true);
        })
        .catch((error) => {
          setMessage(error.code, false);
        });
    }
  };
  const setMessage = (message, isSuccess) => {
    const newUser = { ...myUser };
    newUser.message = message;
    newUser.isSuccess = isSuccess;
    setMyUser(newUser);
  };
  const setEmailAndName = (user) => {
    const newUser = { ...loggedUser };
    newUser.username = user.displayName;
    newUser.email = user.email;
    setLoggedUser(newUser);
    if (location.state) {
      navigate(location.state.from);
    }
  };

  const emailRegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2,3})\b/;
  const passwordRegExp = /^(?=.*\d)[a-zA-Z0-9!#@$%&?]{6,16}$/;

  const handleChange = (e) => {
    const isFieldValid =
      e.target.name === "email"
        ? emailRegExp.test(e.target.value)
        : e.target.name === "password"
        ? passwordRegExp.test(e.target.value)
        : true;
    if (isFieldValid) {
      const newUser = { ...myUser };
      newUser[e.target.name] = e.target.value;
      setMyUser(newUser);
      e.target.style.color = "black";
    } else {
      e.target.style.color = "red";
    }
  };

  const messageColor = myUser?.isSuccess ? "green" : "red";
  const messageStyle = {
    color: messageColor,
    display: "block",
    marginTop: "10px",
  };
  return (
    <section className="login-page">
      <button className="my-btn" onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <button className="my-btn" onClick={handleFacebookLogin}>
        Login with Facebook
      </button>
      <form className="login-form" onSubmit={handleSubmit}>

        {!hasAccount && (
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="submit"
          name="submit"
          value={hasAccount ? "Login" : "Signup"}
          className="my-btn"
        />
      </form>
      <code className="message" style={messageStyle}>
        {myUser?.message}
      </code>
              <input
          type="checkbox"
          name="hasAccount"
          onClick={() => setHasAccount(!hasAccount)}
        />{" "}
        <label htmlFor="hasAccount">Don't have an account?</label>
    </section>
  );
};

export default Login;
