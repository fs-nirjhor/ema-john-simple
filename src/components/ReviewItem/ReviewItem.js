import React from "react";
import Shipping from "../Shipping/Shipping";

const ReviewItem = (props) => {
  const { product, removeButtonHandler } = props;
  const { name, price, quantity, key } = product;
  const reviewItemStyle = {
    borderBottom: "1px solid lightgrey",
    marginLeft: "10px",
  };
  return (
    <div style={reviewItemStyle} className="product-details">
      <h4 className="product-name">{name}</h4>
      <div className="product-info">
        <div className="info">
          <p>Price: ${price}</p>
          { /*
          <p>Quantity: {quantity }</p>
          <p>Item Price: ${price * quantity}</p> 
          */}
          <button className="button" onClick={() => removeButtonHandler(key)}>
            Remove
          </button>
        </div>
        <div className="info">
          <Shipping productKey={key}></Shipping>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
