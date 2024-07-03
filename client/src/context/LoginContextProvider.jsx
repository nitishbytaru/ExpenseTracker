import React, { useState, useEffect } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [inputData, setInputData] = useState({
    user: "",
    note: "",
    transactionType: "expense",
    transactionValue: 0,
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
        transactionHistory,
        setTransactionHistory,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
