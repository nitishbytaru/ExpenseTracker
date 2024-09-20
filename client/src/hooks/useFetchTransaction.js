import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/slices/authSlice.js";
import {
  setTransactionHistory,
  setInputDate,
} from "../app/slices/transactionSlice.js";
import { getHistory } from "../api/transactionApi.js";

export function useFetchTransaction() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const transactionHistory = useSelector(
    (state) => state.transaction.transactionHistory
  );
  const inputDate = useSelector((state) => state.auth.inputDate);

  useEffect(() => {
    async function callFunc() {
      dispatch(setLoading(true));
      const response = await getHistory();
      dispatch(setTransactionHistory(response.data.data));
      dispatch(setLoading(false));
    }

    if (isLoggedIn) {
      // fetchTransactions(setLoading, (data) => {
      //   console.log(data);
      //   dispatch(setTransactionHistory(data));
      // });
      callFunc();
    }
  }, [isLoggedIn]);

  return { transactionHistory, inputDate, setInputDate };
}
