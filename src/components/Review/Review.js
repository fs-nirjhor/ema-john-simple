import React from "react";
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { getDatabaseCart, removeFromDatabaseCart } from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";

const Review = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const databaseCart = getDatabaseCart();
    const cartKeys = Object.keys(databaseCart);
    fetch(`http://localhost:4000/reviewProducts`, {
      method: "POST", 
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(cartKeys)
    })
    .then(res => res.json())
    .then(data => {
      setCart(data);
    })
    .catch(error => console.log(error.message));
  }, []);
  const removeButtonHandler = (key) => {
    const unremovedProduct = cart.filter(pd => pd.key !== key) ;
    setCart(unremovedProduct);
    removeFromDatabaseCart(key);
  };
  const handleConfirmOrder = () => {
    // setCart([]);
    // processOrder();
    navigate("/shipment");
  };
  return (
    <div className="flex-container">
    <div className="product-container">
      {cart.map((product) => (
        <ReviewItem key={product.key} product={product} removeButtonHandler={removeButtonHandler}/>
      ))}
    </div>
    <div className="cart-container">
      <Cart cart={cart} >
      <button className="button" onClick={handleConfirmOrder}> Confirm Order </button>
      </Cart>
    </div>
        </div>
  );
};

export default Review;
