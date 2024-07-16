import React, { useState, useEffect } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  //this date is for the transaction Form
  const [startDate, setStartDate] = useState(new Date());

  //this date is for the history
  const [inputDate, setInputDate] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const [loading, setLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [formType, setFormType] = useState("income");

  // this is for transaction form replace it with the registrationform
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
