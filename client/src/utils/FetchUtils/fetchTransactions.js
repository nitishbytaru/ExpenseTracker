import { getHistory, getFilteredHistory } from "../../api/transactionApi";

export async function fetchTransactions(
  setLoading,
  setTransactionHistory,
  inputDate,
  isFiltered = false
) {
  setLoading(true); // Dispatch the loading state
  try {
    const response = isFiltered
      ? await getFilteredHistory(inputDate)
      : await getHistory();
    console.log(response.data);
    const data = response.data?.data;

    const formattedTransactionHistory = data.map((transaction) => ({
      ...transaction,
      transactionDate: new Date(
        transaction.transactionDate
      ).toLocaleDateString(),
    }));

    // Dispatch the updated transaction history to Redux
    setTransactionHistory(
      formattedTransactionHistory.sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      )
    );
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
