import React, { useState, useEffect } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [formType, setFormType] = useState("income");
  const [inputDate, setInputDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [inputTransactionData, setInputTransactionData] = useState({
    user: "",
    note: "",
    transactionType: formType,
    category: "income",
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
        inputTransactionData,
        setInputTransactionData,
        transactionHistory,
        setTransactionHistory,
        loading,
        setLoading,
        inputDate,
        setInputDate,
        formType,
        setFormType,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
