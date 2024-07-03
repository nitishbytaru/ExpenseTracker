import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { toast } from "sonner";
import { showSuccessToast, showWarnToast } from "../utils/toastUtils.js";
import { getHistory, getFilteredHistory } from "../api/transactionApi.js";

function LandingPage() {
  const navigate = useNavigate();
  const { profile, transactionHistory, setTransactionHistory } =
    useContext(LoginContext);

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  function clicked() {
    if (profile) {
      navigate("transactionform");
      showSuccessToast("Add your Transaction Now!");
    } else {
      navigate("login");
      showWarnToast("Login first to Start!");
    }
  }

  async function fetchTransactions(isFiltered = false) {
    try {
      const { data } = isFiltered
        ? await getFilteredHistory({ inputDate })
        : await getHistory();
      const formattedTransactionHistory = data.map((transaction) => ({
        ...transaction,
        transactionDate: new Date(
          transaction.transactionDate
        ).toLocaleDateString(),
      }));

      setTransactionHistory(
        formattedTransactionHistory.sort(
          (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
        )
      );
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      toast.error("Error fetching transaction history");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const income = transactionHistory
      .filter((transaction) => transaction.transactionType === "income")
      .reduce((acc, curr) => acc + curr.transactionValue, 0);

    const expense = transactionHistory
      .filter((transaction) => transaction.transactionType === "expense")
      .reduce((acc, curr) => acc + curr.transactionValue, 0);

    setTotalIncome(income);
    setTotalExpense(expense);
  }, [transactionHistory]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center p-12 bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full">
        <h1 className="text-5xl font-bold mb-4">Welcome to Expense Tracker</h1>
        <p className="text-xl mb-8 text-gray-400">
          Manage your expenses and keep track of your finances easily.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
          onClick={clicked}
        >
          Start Now
        </button>
      </div>
      {profile ? (
        <div className="flex mt-12">
          <div className="text-center m-4 p-6 bg-gray-700 rounded-lg shadow-lg max-w-sm w-100">
            <p className="text-2xl font-semibold mb-2">Total Income:</p>
            <span className="text-4xl font-bold text-green-400">
              ₹ {totalIncome}
            </span>
          </div>
          <div className="text-center m-4 p-6 bg-gray-700 rounded-lg shadow-lg max-w-sm w-100">
            <p className="text-2xl font-semibold mb-2">Total Expense:</p>
            <span className="text-4xl font-bold text-red-400">
              ₹ {totalExpense}
            </span>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-12 text-xl text-gray-400">
            Login to see your income and expenses{" "}
            <Link to="/login" className="underline hover:text-blue-700">
              Login here !!
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default LandingPage;
