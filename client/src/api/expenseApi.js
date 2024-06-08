import axios from "axios";
import { toast } from "sonner";

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
