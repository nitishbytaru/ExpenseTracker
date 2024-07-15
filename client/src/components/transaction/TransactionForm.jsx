import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../context/LoginContext.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showSuccessToast, showWarnToast } from "../../utils/toastUtils.js";
import { addTransaction } from "../../api/transactionApi.js";
import {
  handleTransactionChange,
  handleDateChange,
} from "../../utils/formHandleChanges.js";

function TransactionForm() {
  const {
    profile,
    startDate,
    setStartDate,
    inputTransactionData,
    setInputTransactionData,
    formType,
    setFormType,
  } = useContext(LoginContext);
  const [formCategory, setFormCategory] = useState(
    inputTransactionData.category
  );

  useEffect(() => {
    if (profile) {
      setInputTransactionData({
        user: profile._id,
        note: "",
        transactionType: formType,
        category: formCategory,
        transactionValue: "",
        transactionDate: startDate,
      });
    }
  }, [profile, formType]);

  const submitForm = async (event) => {
    event.preventDefault();

    const { note, user, transactionValue } = inputTransactionData;

    if (!note && !user && !profile && !transactionValue) {
      return showWarnToast("Input Fields are missing");
    }

    try {
      await addTransaction(inputTransactionData);
      showSuccessToast("Transaction Added");
    } catch (error) {
      console.log(error);
    }

    setInputTransactionData({
      user: profile._id,
      note: "",
      transactionType: formType,
      category: "income",
      transactionValue: "",
      transactionDate: startDate,
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Transaction</h1>
        <div className="flex justify-center mb-6">
          <button
            className={`w-1/3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 transition duration-300 transform hover:scale-105 ${
              formType === "income" ? "bg-blue-700" : ""
            }`}
            onClick={() => setFormType("income")}
          >
            Income Form
          </button>
          <button
            className={`w-1/3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 transition duration-300 transform hover:scale-105 ${
              formType === "expense" ? "bg-blue-700" : ""
            }`}
            onClick={() => {
              setFormType("expense");
              setFormCategory("need");
            }}
          >
            Expense Form
          </button>
        </div>
        {formType === "expense" ? (
          <form className="grid grid-cols-2 gap-6" onSubmit={submitForm}>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="note"
                className="block mb-2 text-lg font-medium text-white"
              >
                Expense Note:
              </label>
              <input
                type="text"
                id="note"
                name="note"
                value={inputTransactionData.note}
                onChange={(event) => {
                  handleTransactionChange(event, setInputTransactionData);
                }}
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                placeholder="Salary"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="transactionValue"
                className="block mb-2 text-lg font-medium text-white"
              >
                Expense Amount:
              </label>
              <input
                type="number"
                id="transactionValue"
                name="transactionValue"
                value={inputTransactionData.transactionValue}
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                onChange={(event) => {
                  handleTransactionChange(event, setInputTransactionData);
                }}
                placeholder="999"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="category"
                className="block mb-2 text-lg font-medium text-white"
              >
                Catogery:
              </label>
              <select
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                name="category"
                id="category"
                value={inputTransactionData.category}
                onChange={(event) => {
                  handleTransactionChange(event, setInputTransactionData);
                }}
                required
              >
                <option value="need" defaultValue>
                  Need
                </option>
                <option value="want">Want</option>
                <option value="saving">Saving</option>
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="transactionDate"
                className="block mb-2 text-lg font-medium text-white"
              >
                Select a Date:
              </label>
              <DatePicker
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                selected={startDate}
                onChange={(date) => {
                  handleDateChange(date, setStartDate, setInputTransactionData);
                }}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>

            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="w-1/3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form className="grid grid-cols-2 gap-6" onSubmit={submitForm}>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="note"
                className="block mb-2 text-lg font-medium text-white"
              >
                Income Note:
              </label>
              <input
                type="text"
                id="note"
                name="note"
                value={inputTransactionData.note}
                onChange={(event) => {
                  handleTransactionChange(event, setInputTransactionData);
                }}
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                placeholder="Salary"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="transactionValue"
                className="block mb-2 text-lg font-medium text-white"
              >
                Income Amount:
              </label>
              <input
                type="number"
                id="transactionValue"
                name="transactionValue"
                value={inputTransactionData.transactionValue}
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                onChange={(event) => {
                  handleTransactionChange(event, setInputTransactionData);
                }}
                placeholder="999"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="transactionDate"
                className="block mb-2 text-lg font-medium text-white"
              >
                Select a Date:
              </label>
              <DatePicker
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                selected={startDate}
                onChange={(date) => {
                  handleDateChange(date, setStartDate, setInputTransactionData);
                }}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>

            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="w-1/3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TransactionForm;
