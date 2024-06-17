import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

function PrivateRoutes() {
  const { isLoggedIn, profile } = useContext(LoginContext);
  return isLoggedIn && profile ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
