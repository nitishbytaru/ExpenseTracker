import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTransaction } from "../../api/transactionApi.js";
import { useNavigate } from "react-router-dom";
import {
  handleDateChange,
  handleTransactionChange,
} from "../../utils/formHandleChanges.js";
import {
  setStartDate,
  setInputTransactionData,
} from "../../app/slices/transactionSlice";
import { toast } from "sonner";
import DatePicker from "react-datepicker";

function EditTransaction() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const { startDate, inputTransactionData } = useSelector(
    (state) => state.transaction
  );

  const submitForm = async (event) => {
    event.preventDefault();
    const {
      user,
      _id,
      note,
      transactionDate,
      transactionType,
      transactionValue,
    } = inputTransactionData;

    if (
      !profile &&
      !note &&
      !user &&
      !transactionDate &&
      !transactionType &&
      !transactionValue
    ) {
      return toast.warning("Input Fields are missing");
    }

    try {
      await updateTransaction(_id, inputTransactionData);
      toast.success("Transaction updated");
    } catch (error) {
      console.log(error);
    }
    navigate("/history");
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const isExpense = inputTransactionData.transactionType === "expense";

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>

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
              value={inputTransactionData.note}
              onChange={(event) => {
                handleTransactionChange(event, (data) =>
                  dispatch(setInputTransactionData(data))
                );
              }}
              className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
              placeholder="Note"
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
              value={inputTransactionData.transactionValue}
              onChange={(event) => {
                handleTransactionChange(event, (data) =>
                  dispatch(setInputTransactionData(data))
                );
              }}
              placeholder="999"
              required
            />
          </div>

          {isExpense && (
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="category"
                className="block mb-2 text-lg font-medium text-white"
              >
                Category:
              </label>
              <select
                className="border border-gray-500 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 text-white"
                name="category"
                id="category"
                value={inputTransactionData.category}
                onChange={(event) => {
                  handleTransactionChange(event, (data) =>
                    dispatch(setInputTransactionData(data))
                  );
                }}
                required
              >
                <option value="need">Need</option>
                <option value="want">Want</option>
                <option value="saving">Saving</option>
              </select>
            </div>
          )}

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
                handleDateChange(
                  date,
                  (date) => dispatch(setStartDate(date)),
                  (data) => dispatch(setInputTransactionData(data))
                );
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
