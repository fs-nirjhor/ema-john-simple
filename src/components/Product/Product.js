import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Product = (props) => {

const {img,name,seller,price,stock} = props.product ;
  return (
  <div className="product">
    <div class="product-image">    
         <img src={img} alt="loading.."/>
         </div>
    <div class="product-details">
  <h4>{name}</h4>
 <div class="product-info">
     <div>
      <p><small>By: {seller}</small></p>
  <p>${price}</p>
  <p><small>Only {stock} left in stock - order soon</small></p>
  <button className="add-button" onClick={() => props.addButtonHandler(props.product)} > <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
  </div>
  <div >
    <h3>FEATURE</h3>
  </div>
 </div>
    </div>
  </div>
  )
}

export default Product;