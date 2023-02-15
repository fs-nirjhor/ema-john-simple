import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
  const {children, isAllowed, redirectPath = "/login"} = props;
  if (!isAllowed) {
   return <Navigate to={redirectPath} replace/>  
  }
   return children ? children : <Outlet/> ;
};

export default PrivateRoute;