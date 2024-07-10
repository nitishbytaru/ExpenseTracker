import axios from "axios";

const API_URL ="/api/v1/transaction";

// API for sending form data
export const addTransaction = async (Data) => {
  try {
    await axios.post(`${API_URL}/addTransaction`, Data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API for fetching the expense history
export const getHistory = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/history`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API for fetching the expense history with the date filter
export const getFilteredHistory = async (Data) => {
  try {
    const { data } = await axios.post(`${API_URL}/history/filtered`, Data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API to delete transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/transaction/${id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API to update transaction
export const updateTransaction = async (id, Data) => {
  try {
    await axios.put(`${API_URL}/transaction/${id}`, Data);
  } catch (error) {
    console.log(error);
    return error;
  }
};
