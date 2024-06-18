import axios from "axios";

const API_URL = "/home";

//api for login
export const getHistory = async () => {
  try {
    return await axios.get(`${API_URL}/history`);
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
