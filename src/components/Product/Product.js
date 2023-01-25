import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt="loading.." />
      </div>
      <div className="product-details">
        <h4 >
          <Link to={`/product/${key}`} className="product-name">{name}</Link>
        </h4>
        <div className="product-info">
          <div className="info">
            <p>
              <small>By: {seller}</small>
            </p>
            <p>${price}</p>
            <p>
              <small>Only {stock} left in stock - order soon</small>
            </p>
            {props.showAddButton && (
              <button
                className="button"
                onClick={() => props.addButtonHandler(props.product)}
              >
                {" "}
                <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
              </button>
            )}
          </div>
          <div className="info">
            <h3>FEATURE</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
