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
  } = useContext(LoginContext);

  useEffect(() => {
    fetchTransactions(setLoading, setTransactionHistory, inputDate);
  }, []);

  return { transactionHistory, inputDate, setInputDate };
}
