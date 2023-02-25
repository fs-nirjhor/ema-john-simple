import React, { useContext } from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { LoggedUserContext } from "../../App";

const Header = (props) => {
  const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="ema-john" />
      </Link>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        {loggedUser.email ? (
          <button onClick={() => setLoggedUser({})}>
            Logout: {loggedUser?.username}
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
