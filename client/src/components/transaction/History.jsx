import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import { getHistory } from "../../api/expenseApi";

function History() {
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [historyStartDate, setHistoryStartDate] = useState(new Date());
  const [historyEndDate, setHistoryEndDate] = useState(new Date());

  useEffect(() => {
    async function fetchExpensesHistory() {
      try {
        const { data } = await getHistory();
        const formattedExpenseHistory = data.map((expense) => ({
          ...expense,
          transactionDate: new Date(
            expense.transactionDate
          ).toLocaleDateString(),
        }));
        setExpenseHistory(
          formattedExpenseHistory.sort(
            (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
          )
        );
      } catch (error) {
        console.error("Error fetching expense history:", error);
      }
    }
    fetchExpensesHistory();
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="mb-4 flex justify-end items-center space-x-4">
          <div>
            <label className="flex flex-col">
              <span className="text-white text-lg">From:</span>
              <DatePicker
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 bg-gray-700 text-white"
                selected={historyStartDate}
                onChange={(date) => setHistoryStartDate(date)}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <span className="text-white text-lg">To:</span>
              <DatePicker
                className="border border-gray-300 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 bg-gray-700 text-white"
                selected={historyEndDate}
                onChange={(date) => setHistoryEndDate(date)}
              />
            </label>
          </div>
          <button
            className="text-white p-2"
            onClick={() => fetchExpensesHistory()}
          >
            <RefreshTwoToneIcon fontSize="large" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
          <table className="w-full divide-y text-sm text-left text-gray-500">
            <thead className="text-center text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Note
                </th>
                <th scope="col" className="px-6 py-3">
                  Income
                </th>
                <th scope="col" className="px-6 py-3">
                  Expense
                </th>
              </tr>
            </thead>
            <tbody>
              {expenseHistory.map(
                ({ _id, income, note, expense, transactionDate }) => (
                  <tr
                    key={_id}
                    className="text-center font-medium text-white whitespace-nowrap bg-gray-900 border-b border-gray-700"
                  >
                    <td className="px-4 py-2">{transactionDate}</td>
                    <td className="px-4 py-2">{note}</td>
                    <td className="px-4 py-2">{income}</td>
                    <td className="px-4 py-2">{expense}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
