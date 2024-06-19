import React, { useState, useEffect } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [inputData, setInputData] = useState({
    user: "",
    income: "",
    note: "",
    expense: "",
    transactionDate: startDate,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setIsLoggedIn(true);
      setProfile({ email: JSON.parse(storedEmail) });
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setInputData((prevInputData) => ({
        ...prevInputData,
        user: profile._id,
      }));
    }
  }, [profile]);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        startDate,
        setStartDate,
        inputData,
        setInputData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
