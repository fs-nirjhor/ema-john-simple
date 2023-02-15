import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";


//Component function
const FacebookLogin = (props) => {
  const {auth} = props;
 const facebookProvider = new FacebookAuthProvider();
  const handleFbSignIn = () => {
    signInWithPopup(auth, facebookProvider)
  .then((result) => {
    const user = result.user;
    console.log(user);
  })
  .catch((error) => {
   alert(error.message);
  });
  };
  
return (
  <div className="loginBox" >
    <button className="my-btn" onClick={handleFbSignIn}>
        Sign in with Facebook 
        </button>
  </div>
);
};

export default FacebookLogin;