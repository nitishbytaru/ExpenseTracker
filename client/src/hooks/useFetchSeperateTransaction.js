import { useState, useEffect, useContext } from "react";
import { useFetchTransaction } from "./useFetchTransaction";
import { fetchTransactions } from "../utils/FetchUtils/fetchTransactions.js";
import LoginContext from "../context/LoginContext";

function calculateTotal(transactionHistory, type) {
  return transactionHistory
    .filter((transaction) => transaction.transactionType === type)
    .reduce((acc, curr) => acc + curr.transactionValue, 0);
}

export function useFetchSeperateTransaction() {
  const { setTransactionHistory, setLoading, isLoggedIn } =
    useContext(LoginContext);
  const { transactionHistory, inputDate } = useFetchTransaction();

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTransactions(setLoading, setTransactionHistory, inputDate, true);
    }
  }, [inputDate, setLoading, setTransactionHistory]);

  useEffect(() => {
    setTotalIncome(calculateTotal(transactionHistory, "income"));
    setTotalExpense(calculateTotal(transactionHistory, "expense"));
  }, [transactionHistory]);

  return { totalIncome, totalExpense };
}
