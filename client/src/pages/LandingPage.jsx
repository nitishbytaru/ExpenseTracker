import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { setTransactionHistory } from "../app/slices/transactionSlice";
import { getHistory } from "../api/transactionApi.js";

import { toast } from "sonner";
import moment from "moment";

//to calculate the total expense and total income seperately
function calculateTotal(transactionHistory, type) {
  return transactionHistory
    .filter((transaction) => transaction.transactionType === type)
    .reduce((acc, curr) => acc + curr.transactionValue, 0);
}

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const transactionHistory = useSelector(
    (state) => state.transaction.transactionHistory
  );

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    function callIt() {
      if (transactionHistory?.length > 0) {
        setTotalIncome(calculateTotal(transactionHistory, "income"));
        setTotalExpense(calculateTotal(transactionHistory, "expense"));
      }
    }
    if (isLoggedIn) callIt();
  }, [transactionHistory]);

  useEffect(() => {
    async function getAllTransaction() {
      const response = await getHistory(); //function to call all the transactions
      dispatch(setTransactionHistory(response.data.data));
    }
    if (isLoggedIn) getAllTransaction();
  }, [isLoggedIn]);

  //this function is created only once as we have used the useCallback function
  const clicked = useCallback(() => {
    if (profile) {
      navigate("transactionform");
      toast.success("Add your Transaction Now!");
    } else {
      navigate("login");
      toast.warning("login first to start!");
    }
  });

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
