import React from "react";
import { useState, useEffect } from "react";
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import giphy from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const databaseCart = getDatabaseCart();
    const cartKeys = Object.keys(databaseCart);
    const cartProducts = cartKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = databaseCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  const removeButtonHandler = (key) => {
    const unremovedProduct = cart.filter(pd => pd.key !== key) ;
    setCart(unremovedProduct);
    removeFromDatabaseCart(key);
  };
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const handlePlaceOrder = () => {
    setCart([]);
    processOrder();
    setIsOrderPlaced(true);
  };
  const congratsGiphy = <img src={giphy} alt="loading.." width="100%"/>;
  let congrats = isOrderPlaced ? congratsGiphy : '' ;
  return (
    <div className="flex-container">
    <div className="product-container">
      {cart.map((product) => (
        <ReviewItem key={product.key} product={product} removeButtonHandler={removeButtonHandler}/>
      ))}
      {congrats}
    </div>
    <div className="cart-container">
      <Cart cart={cart} >
      <button className="button" onClick={handlePlaceOrder}>Place Order</button>
      </Cart>
    </div>
        </div>
  );
};

export default Review;
