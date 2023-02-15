
import { useState, createContext } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LoginPage from "./components/LoginPage/LoginPage";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const LoggedUserContext = createContext();
function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  
  return (
    <LoggedUserContext.Provider value={[loggedUser, setLoggedUser]}>
    <Header />
       <Routes >
          <Route exact path="/" element={<Shop />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/review" element={<Review />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/product/:key" element={<ProductDetails/> }/>  
          <Route path="login" element={<LoginPage/> }/> 
          <Route path="/shipment" element={<PrivateRoute isAllowed={!!loggedUser}><Shipment/>  </PrivateRoute>}/>
          <Route path="*" element={<h1> Oops!! Page not found. (404)</h1>}/>
       </Routes>
       <p className="footer">Email: {loggedUser?.email}</p>
       </LoggedUserContext.Provider>
  );
}

export default App;
