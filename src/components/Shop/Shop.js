import React from 'react';
import './Shop.css';
import fakeData from "../../fakeData";
import { useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import giphy from "../../images/giphy.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
  const first10 = fakeData.slice(0,10);
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);
  
  const addButtonHandler = product => {
    const newCart = [...cart,product];
    setCart(newCart);
  };

  const reviewButtonHandler = () => {
   document.querySelector(".shop").style.display = "none" ;
   document.querySelector(".giphy").style.display = "block" ;
} ;

  return (
    <div>
    <div className="search-container">
    <input type="search" placeholder="type here to search"/> &nbsp;
  <FontAwesomeIcon icon={faShoppingCart} /> 
  <span> {cart.length}</span>
    </div>
  <div className="shop">
    <div className="product-container">
   {
     products.map(pd => <Product product={pd} addButtonHandler={addButtonHandler}></Product>)
   }
    </div>
<div className="cart-container">
 <Cart cart={cart} reviewButtonHandler={reviewButtonHandler}></Cart>
</div>
  </div>
   <img className="giphy" src={giphy} alt="giphy" />
  </div>
  )
}

export default Shop;