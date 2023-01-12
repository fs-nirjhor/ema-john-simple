import React from 'react';
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = props => {
  const addedProducts = props.cart ;
  const precision = amount => {
    const fixedAmount = amount.toFixed(2);
    return Number(fixedAmount);
  } ;
  const price = precision( addedProducts.reduce((currentPrice, product) => currentPrice + product.price, 0) );
 /*let price = 0;
 for (let i = 0; i < addedProducts.length; i++) {
     let product = addedProducts[i];
      price += product.price;
 }*/
   let shipping = 0;
   if (price > 35) {
     shipping = 0;
   } else 
   if (price > 20) {
     shipping = 4.99 ;
   } else 
   if (price > 0) {
     shipping = 9.99 ;
   }
   const subtotal = precision(price + shipping);
   const tax = precision(subtotal / 10) ;
   const total = precision(subtotal + tax) ;
  return (
  <div className="order">
  <div className="order-header">
      <h1>Order Summary</h1>
  <h2>Items Ordered: {addedProducts.length}</h2>
  </div>
  <div className="accounting">
    <div className="account-name">
      <h3>Price: </h3>
      <h3>Shipping: </h3>
      <h3>Subtotal: </h3>
      <h3>Tax: </h3>
      <h2 className="total">Total: </h2>
    </div>
    <div className="account-value">
      <h3> ${price}</h3>
      <h3> ${shipping}</h3>
      <h3> ${subtotal}</h3>
      <h3> ${tax}</h3>
      <h2 className="total"> ${total}</h2>
    </div>
  </div>
  <button onClick={props.reviewButtonHandler}><FontAwesomeIcon icon={faShoppingCart} /> Review Your Order</button>
  </div> 
  )
}

export default Cart;

