import { getHistory, getFilteredHistory } from "../../api/transactionApi";
import { showErrorToast } from "../toastUtils";

export async function fetchTransactions(
  setLoading,
  setTransactionHistory,
  inputDate,
  isFiltered = false
) {
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
    showErrorToast("Error fetching transaction history");
  } finally {
    setLoading(false);
  }
}
