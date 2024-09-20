import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);

  return isLoggedIn && profile ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
