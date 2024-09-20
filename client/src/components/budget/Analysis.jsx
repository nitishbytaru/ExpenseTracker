import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { getHistory } from "../../api/transactionApi";

function Analysis() {
  const [expense, setExpense] = useState({
    needs: 1,
    wants: 1,
    savings: 1,
  });

  function calculateCategory(transactions, type) {
    return transactions.data
      .filter((transaction) => transaction.category === type)
      .reduce((acc, curr) => acc + curr.transactionValue, 0);
  }

  useEffect(() => {
    async function callServer() {
      const { data } = await getHistory();
      setExpense({
        needs: calculateCategory(data, "need"),
        wants: calculateCategory(data, "want"),
        savings: calculateCategory(data, "saving"),
      });
    }
    callServer();
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Expense Analysis</h2>
        <div className="flex flex-col md:flex-row items-center justify-around w-full">
          <div className="flex justify-center md:justify-start w-full">
            <PieChart
              colors={["#1E90FF", "#FF4500", "#32CD32"]}
              series={[
                {
                  data: [
                    { id: 0, value: expense.needs },
                    { id: 1, value: expense.wants },
                    { id: 2, value: expense.savings },
                  ],
                },
              ]}
              width={window.innerWidth >= 768 ? 450 : 250}
              height={window.innerWidth >= 768 ? 450 : 250}
            />
          </div>
          <div className="mt-6 w-full md:w-1/2 md:mt-0 md:ml-8 flex flex-col items-center">
            <ul className="space-y-4 text-center">
              <li className="flex items-center justify-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-blue-500"></span>{" "}
                Needs: {expense.needs}
              </li>
              <li className="flex items-center justify-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-red-500"></span>{" "}
                Wants: {expense.wants}
              </li>
              <li className="flex items-center justify-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-green-500"></span>{" "}
                Savings: {expense.savings}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
