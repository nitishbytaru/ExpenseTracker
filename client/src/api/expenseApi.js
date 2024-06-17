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
