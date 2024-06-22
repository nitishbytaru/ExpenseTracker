import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// api for fetching the expense history
export const getHistory = async () => {
  try {
    return await axios.get(`${API_URL}/history`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api for fetching the expense history with the date filter
export const getFilteredHistory = async (data) => {
  try {
    return await axios.post(`${API_URL}/filteredHistory`, data, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api for sending form data
export const addExpense = async (Data) => {
  try {
    await axios.post(`${API_URL}/expense`, Data, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api to delete transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/deleteTransaction/${id}`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api to update transaction
export const updateTransaction = async (id, Data) => {
  try {
    const { income, note, expense, transactionDate } = Data;
    await axios.put(`${API_URL}/updateTransaction/${id}`, {
      income: parseInt(income),
      note,
      expense: parseInt(expense),
      transactionDate,
    }, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};
