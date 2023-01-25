
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  return (
    <BrowserRouter >
    <Header />
       <Routes >
          <Route exact path="/" element={<Shop />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/review" element={<Review />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/product/:key" element={<ProductDetails/> }/>  
          <Route path="*" element={<h1> Oops!! Page not found. (404)</h1>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
