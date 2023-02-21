import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/ShipmentForm";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";

export const LoggedUserContext = createContext();
function App() {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <LoggedUserContext.Provider value={[loggedUser,setLoggedUser]} >
      <Header />
      <Routes>
        <Route exact path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/review" element={<Review />} />
       
        <Route path="/product/:key" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route
          element={
            <PrivateRoute isAllowed={!!loggedUser.email}/>
          }
        > 
          <Route path="/shipment" element={<Shipment/>  }/>
          <Route path="/inventory" element={<Inventory />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <footer className="footer">User: {loggedUser?.username}</footer>
    </LoggedUserContext.Provider>
  );
}

export default App;
