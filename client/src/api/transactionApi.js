import axios from "axios";

const API_URL ="https://expensetracker-vbp3.onrender.com/api/v1/transaction";
// const API_URL = "/api/v1/transaction";

// API for sending form data
export const addTransaction = async (Data) => {
  try {
    const response = await axios.post(`${API_URL}/addTransaction`, Data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API for fetching the expense history
export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/history`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API for fetching the expense history with the date filter
export const getFilteredHistory = async (Data) => {
  try {
    const { data } = await axios.post(`${API_URL}/history/filtered`, Data, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API to delete transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/transaction/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// API to update transaction
export const updateTransaction = async (id, Data) => {
  try {
    await axios.put(`${API_URL}/transaction/${id}`, Data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
