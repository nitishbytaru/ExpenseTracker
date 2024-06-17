import React, { useState } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
