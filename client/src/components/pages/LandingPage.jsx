import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import {
  showSuccessToast,
  showWarnToast,
} from "../../utils/toastUtils";

function LandingPage() {
  const navigate = useNavigate();

  const { profile } = useContext(LoginContext);

  function clicked() {
    if (profile) {
      navigate("transactionform");
      showSuccessToast("Add your Transaction Now !");
    } else {
      navigate("login");
      showWarnToast("Login first to Start !");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Expense Tracker</h1>
      <p className="text-xl mb-8 text-gray-400">
        Manage your expenses and keep track of your finances easily.{" "}
        <button className="underline hover:text-blue-700" onClick={clicked}>
          Start Now
        </button>
      </p>
    </div>
  );
}

export default LandingPage;
