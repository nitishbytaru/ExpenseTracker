import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFetchTransaction } from "../../hooks/useFetchTransaction";
import {
  deleteTransaction,
  getFilteredHistory,
  getHistory,
} from "../../api/transactionApi";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

import {
  setInputTransactionData,
  setTransactionHistory,
} from "../../app/slices/transactionSlice.js";
import { setLoading } from "../../app/slices/authSlice.js";

import DatePicker from "react-datepicker";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function History() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const [inputDate, setInputDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const { transactionHistory } = useFetchTransaction();

  //function to delete a transaction
  function deleteTransactionCall(id) {
    toast.warning("Confirm to delete transaction", {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            await deleteTransaction(id);
            getAllTransaction();
            toast.success("Transaction deleted");
          } catch (error) {
            console.error("Error deleting transaction:", error);
            toast.error("Error deleting transaction");
          }
        },
      },
    });
  }

  //function to edit the transaction
  function editTransactionCall(id) {
    const Data = transactionHistory.find((obj) => obj._id === id);
    dispatch(setInputTransactionData(Data));
    navigate("/editTransaction");
  }

  //function to call all the transactions
  async function getAllTransaction() {
    dispatch(setLoading(true));
    const response = await getHistory();
    dispatch(setTransactionHistory(response.data.data));
    dispatch(setLoading(false));
  }

  //function to call on the transactions which were in the given dates
  async function getFilteredTransaction() {
    dispatch(setLoading(true));
    const response = await getFilteredHistory();
    dispatch(setTransactionHistory(response.data.data));
    dispatch(setLoading(false));
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-4 flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div>
            <button
              className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2.5"
              onClick={() => getAllTransaction()}
            >
              All
            </button>
          </div>
          <div>
            <label className="flex flex-col">
              <span className="text-white text-lg">From:</span>
              <DatePicker
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-36 p-2.5 bg-gray-700 text-white"
                selected={inputDate.startDate}
                onChange={(date) =>
                  setInputDate({ ...inputDate, startDate: date })
                }
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <span className="text-white text-lg">To:</span>
              <DatePicker
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-36 p-2.5 bg-gray-700 text-white"
                selected={inputDate.endDate}
                onChange={(date) =>
                  setInputDate({ ...inputDate, endDate: date })
                }
              />
            </label>
          </div>
          <button
            className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2.5"
            onClick={() => getFilteredTransaction()}
            disabled={loading}
          >
            <RefreshTwoToneIcon fontSize="large" />
          </button>
        </div>

        <div className="relative rounded-2xl bg-gray-800 shadow-lg overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: "450px" }}>
            <table className="w-full divide-y text-sm text-left text-gray-500">
              <thead className="text-center text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    Transaction Date
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Note
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Transaction Value
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Transaction Type
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center text-white py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  transactionHistory?.map(
                    ({
                      _id,
                      transactionValue,
                      note,
                      transactionType,
                      transactionDate,
                      category,
                    }) => (
                      <tr
                        key={_id}
                        className="text-center font-medium text-white whitespace-nowrap"
                      >
                        <td className="px-2 py-2">
                          {new Date(transactionDate).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-2">{note}</td>
                        <td className="px-2 py-2">{transactionValue}</td>
                        <td className="px-2 py-2">{transactionType}</td>
                        <td className="px-2 py-2">{category}</td>
                        <td className="px-2 py-2 flex justify-center space-x-2">
                          <button onClick={() => editTransactionCall(_id)}>
                            <EditOutlinedIcon />
                          </button>
                          <button onClick={() => deleteTransactionCall(_id)}>
                            <DeleteOutlinedIcon />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
