import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = (props) => {
  const {children, isAllowed, redirectPath = "/login"} = props;
  const location = useLocation();
  const idToken = sessionStorage.getItem("idToken");
  if (isAllowed || idToken) {
   return children ? children : <Outlet/> ;
  }
   return <Navigate replace to={redirectPath}  state={{ from: location }}/>  
};

export default PrivateRoute;