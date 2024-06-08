import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

function PrivateRoutes() {
  const { isLoggedIn } = useContext(LoginContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
