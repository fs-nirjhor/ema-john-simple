import React from 'react';
import {useParams} from "react-router-dom";
import Product from "../Product/Product";
import products from "../../fakeData";

const ProductDetails = () => {
  const {key} = useParams();
  const product = products.find(product => product.key === key);

return (
  <div>
      <Product showAddButton={false} product={product}/>  
  </div>
);
};

export default ProductDetails;