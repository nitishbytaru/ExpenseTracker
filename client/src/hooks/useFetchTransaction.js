import { useEffect, useContext } from "react";
import { fetchTransactions } from "../utils/FetchUtils/fetchTransactions.js";
import LoginContext from "../context/LoginContext";

export function useFetchTransaction() {
  const {
    setLoading,
    transactionHistory,
    setTransactionHistory,
    inputDate,
    setInputDate,
    isLoggedIn,
  } = useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTransactions(setLoading, setTransactionHistory, inputDate, true);
    }
  }, [isLoggedIn]);

  return { transactionHistory, inputDate, setInputDate };
}
