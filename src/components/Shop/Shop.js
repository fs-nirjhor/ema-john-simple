import React from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import { useState, useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const database = getDatabaseCart();
    const databaseKeys = Object.keys(database);
    const databaseCart = databaseKeys.map(dbkey => {
     const cartProduct = fakeData.find(product => product.key === dbkey);
     cartProduct.quantity = database[dbkey];
     return cartProduct;
    });
    setCart(databaseCart);
  }, []);
  const addButtonHandler = (product) => {
    const toBeAddedKey = cart.find(pd => pd.key === product.key);
    let quantity = 1;
    let newCart;
    if (toBeAddedKey) {
      quantity = product.quantity + 1;
      product.quantity = quantity ;
      const others = cart.filter(pd => pd.key !== product.key);
      newCart = [...others,product];
    } else {
      product.quantity = quantity;
      newCart = [...cart, product ];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, quantity);
  };
 
  return (
    <div>
      <div className="search-container">
        <input type="search" placeholder="type here to search" /> &nbsp;
        <FontAwesomeIcon icon={faShoppingCart} />
        <span> {cart.length}</span>
      </div>
      <div className="flex-container">
        <div className="product-container">
          {products.map((pd) => (
            <Product
              key={pd.key}
              showAddButton={true}
              product={pd}
              addButtonHandler={addButtonHandler}
            />
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} >
          <Link to="/review">
        <button className="button">
          <FontAwesomeIcon icon={faClipboardList} /> Review Your Order
        </button>
      </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
