import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import {Link} from "react-router-dom";

const Header = (props) => {
  return (
  <header className="header">
  <Link to="/"><img src={logo} alt="ema-john" /></Link>  
  <nav>
    <Link to="/shop">Shop</Link>
    <Link to="/review">Order Review</Link>
    <Link to="/inventory">Manage Inventory</Link>
  </nav>
  </header> 
  )
}
 
export default Header;