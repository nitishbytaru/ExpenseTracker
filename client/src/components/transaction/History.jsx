import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  getHistory,
  deleteTransaction,
  getFilteredHistory,
} from "../../api/transactionApi";
import { showSuccessToast } from "../../utils/toastUtils";
import { toast } from "sonner";
import LoginContext from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const { setInputData } = useContext(LoginContext);

  const [loading, setLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [inputDate, setInputDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  async function fetchTransactions(isFiltered = false) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  function deleteTransactionCall(id) {
    toast.warning("Confirm to delete transaction", {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            await deleteTransaction(id);
            fetchTransactions();
            showSuccessToast("Transaction deleted");
          } catch (error) {
            console.error("Error deleting transaction:", error);
            toast.error("Error deleting transaction");
          }
        },
      },
    });
  }

  function editTransactionCall(id) {
    const Data = transactionHistory.find((obj) => obj._id === id);
    setInputData(Data);
    navigate("/editTransaction");
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-4 flex justify-end items-center space-x-4">
          <div>
            <label className="flex flex-col">
              <span className="text-white text-lg">From:</span>
              <DatePicker
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 bg-gray-700 text-white"
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
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 bg-gray-700 text-white"
                selected={inputDate.endDate}
                onChange={(date) =>
                  setInputDate({ ...inputDate, endDate: date })
                }
              />
            </label>
          </div>
          <button
            className="text-white p-2"
            onClick={() => fetchTransactions(true)}
            disabled={loading}
          >
            <RefreshTwoToneIcon fontSize="large" />
          </button>
        </div>

        <div className="relative rounded-2xl bg-gray-800 shadow-lg">
          <div className="overflow-y-auto " style={{ maxHeight: "450px" }}>
            <table className="w-full divide-y  text-sm text-left text-gray-500 ">
              <thead className=" text-center text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Transaction Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Note
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Transaction Value
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Transaction Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center text-white py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  transactionHistory.map(
                    ({
                      _id,
                      transactionValue,
                      note,
                      transactionType,
                      transactionDate,
                    }) => (
                      <tr
                        key={_id}
                        className="text-center font-medium text-white whitespace-nowrap"
                      >
                        <td className="px-4 py-2">{transactionDate}</td>
                        <td className="px-4 py-2">{note}</td>
                        <td className="px-4 py-2">{transactionValue}</td>
                        <td className="px-4 py-2">{transactionType}</td>
                        <td className="px-4 py-2 grid grid-flow-col gap-2">
                          <button
                            onClick={() => {
                              editTransactionCall(_id);
                            }}
                          >
                            <EditOutlinedIcon />
                          </button>
                          <button
                            onClick={() => {
                              deleteTransactionCall(_id);
                            }}
                          >
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
