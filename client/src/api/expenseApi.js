import axios from "axios";

const API_URL = "https://expense-tracker-gz2i.vercel.app";

//api for feteching the expense history
export const getHistory = async () => {
  try {
    return await axios.get(`${API_URL}/history`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

//api for fetching the expense history with the date filter
export const getFilteredHistory = async (data) => {
  try {
    return await axios.post(`${API_URL}/filteredHistory`, data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

//api for sending form data
export const addExpense = async (Data) => {
  try {
    await axios.post(`${API_URL}/expense`, Data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

//api to delete transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/deleteTransaction/${id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

//api to update transaction
export const updateTransaction = async (id, Data) => {
  try {
    const { income, note, expense, transactionDate } = Data;
    await axios.put(`${API_URL}/updateTransaction/${id}`, {
      income: parseInt(income),
      note,
      expense: parseInt(expense),
      transactionDate,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
