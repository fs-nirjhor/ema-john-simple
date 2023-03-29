import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import Product from "../Product/Product";
//import products from "../../fakeData";

const ProductDetails = () => {
  const {key} = useParams();
  //const product = products.find(product => product.key === key);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/products/${key}`)
    .then(res => res.json())
    .then(data => {
      setProduct(data);
    })
    .catch(error => console.log(error.message));
  }, [key]);

return (
  <div>
      <Product showAddButton={false} product={product}/>  
  </div>
);
};

export default ProductDetails;