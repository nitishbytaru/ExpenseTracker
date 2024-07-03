import React, { useContext } from "react";
import LoginContext from "../context/LoginContext";
import DatePicker from "react-datepicker";
import { updateTransaction } from "../api/transactionApi.js";
import { showSuccessToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import {
  handleDateChange,
  handleTransactionChange,
} from "../utils/formHandleChanges";

function EditTransaction() {
  const navigate = useNavigate();

  const { profile, setStartDate, inputData, setInputData } =
    useContext(LoginContext);

  const submitForm = async (event) => {
    event.preventDefault();
    const {
      user,
      _id,
      note,
      transactionDate,
      transactionType,
      transactionvalue,
    } = inputData;

    if (
      !profile &&
      !note &&
      !user &&
      !transactionDate &&
      !transactionType &&
      !transactionvalue
    ) {
      return showWarnToast("Input Fields are missing");
    }

    try {
      await updateTransaction(_id, inputData);
      showSuccessToast("Transaction updated");
    } catch (error) {
      console.log(error);
    }
    navigate("/history");
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>

        <form className="grid grid-cols-2 gap-6" onSubmit={submitForm}>
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="note"
              className="block mb-2 text-lg font-medium text-white"
            >
              Note:
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={inputData.note}
              onChange={(event) => {
                handleTransactionChange(event, setInputData);
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
              Transaction Value:
            </label>
            <input
              type="number"
              id="transactionValue"
              name="transactionValue"
              className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
              value={inputData.transactionValue}
              onChange={(event) => {
                handleTransactionChange(event, setInputData);
              }}
              placeholder="999"
              required
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="transactionType"
              className="block mb-2 text-lg font-medium text-white"
            >
              Transaction Type:
            </label>
            <select
              className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
              name="transactionType"
              id="transactionType"
              value={inputData.transactionType}
              onChange={(event) => {
                handleTransactionChange(event, setInputData);
              }}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
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
              selected={inputData.transactionDate}
              onChange={(date) => {
                handleDateChange(date, setStartDate, setInputData);
              }}
              dateFormat="dd/MM/yyyy"
              required
            />
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

export default EditTransaction;
