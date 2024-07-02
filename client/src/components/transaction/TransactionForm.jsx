import React, { useContext, useState, useEffect } from "react";
import LoginContext from "../../context/LoginContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showSuccessToast, showWarnToast } from "../../utils/toastUtils";
import { addExpense } from "../../api/expenseApi";
import { handleChange, handleDateChange } from "../../utils/formHandleChanges";

function TransactionForm() {
  const { profile, startDate, setStartDate, inputData, setInputData } =
    useContext(LoginContext);

  useEffect(() => {
    if (profile) {
      setInputData((prevInputData) => ({
        ...prevInputData,
        user: profile._id,
      }));
    }
  }, [profile]);

  // const handleDateChange = (date) => {
  //   setStartDate(date);
  //   setInputData((prevInputData) => ({
  //     ...prevInputData,
  //     transactionDate: date,
  //   }));
  // };

  const submitForm = async (event) => {
    event.preventDefault();

    const { income, note, user } = inputData;

    if (!profile && !income && !note && !user)
      return showWarnToast("Input Fields are missing");

    try {
      await addExpense(inputData);
      showSuccessToast("Transaction Added");
    } catch (error) {
      console.log(error);
    }

    setInputData({
      user: profile._id,
      income: "",
      note: "",
      expense: "",
      transactionDate: startDate,
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>

        <form className="grid grid-cols-2 gap-6" onSubmit={submitForm}>
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="income"
              className="block mb-2 text-xl font-medium text-white"
            >
              Income:
            </label>
            <input
              type="number"
              id="income"
              name="income"
              value={inputData.income}
              className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
              onChange={(event) => {
                handleChange(event, setUserInput);
              }}
              placeholder="999"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="note"
              className="block mb-2 text-xl font-medium text-white"
            >
              Note:
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={inputData.note}
              onChange={(event) => {
                handleChange(event, setUserInput);
              }}
              className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
              placeholder="salary"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="expense"
              className="block mb-2 text-xl font-medium text-white"
            >
              Expense:
            </label>
            <input
              type="number"
              id="expense"
              name="expense"
              value={inputData.expense}
              className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
              onChange={(event) => {
                handleChange(event, setUserInput);
              }}
              placeholder="999"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="transactionDate"
              className="block mb-2 text-xl font-medium text-white"
            >
              Select a date:
            </label>
            <div id="transactionDate" name="transactionDate">
              <DatePicker
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                selected={startDate}
                onChange={(date) => {
                  handleDateChange(date, setStartDate, setInputData);
                }}
              />
            </div>
          </div>

          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
