import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { showSuccessToast, showWarnToast } from "../utils/toastUtils.js";
import { useFetchSeperateTransaction } from "../hooks/useFetchSeperateTransaction.js";
import moment from "moment";

function LandingPage() {
  const navigate = useNavigate();
  const { profile } = useContext(LoginContext);
  const { totalIncome, totalExpense } = useFetchSeperateTransaction();

  // Example usage
  // const startDate = ; // Current date
  // const monthName = ;
  // console.log(); // This will print the month in words, e.g., "July"

  function clicked() {
    if (profile) {
      navigate("transactionform");
      showSuccessToast("Add your Transaction Now!");
    } else {
      navigate("login");
      showWarnToast("Login first to Start!");
    }
  }

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
            <p className="text-2xl font-semibold mb-2">
              Total Income of {moment().format("MMMM")}
            </p>
            <span className="text-4xl font-bold text-green-400">
              ₹ {totalIncome}
            </span>
          </div>
          <div className="text-center m-4 p-6 bg-gray-700 rounded-lg shadow-lg max-w-sm w-100">
            <p className="text-2xl font-semibold mb-2">
              Total Expense of {moment().format("MMMM")}
            </p>
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
