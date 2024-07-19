import axios from "axios";
import { showErrorToast } from "../utils/toastUtils.js";

// const API_URL = "https://expensetracker-vbp3.onrender.com/api/v1/goal";
const API_URL = "/api/v1/goal";

//api for adding new goal
export const addGoal = async (Data) => {
  try {
    const { data } = await axios.post(`${API_URL}/addGoal`, Data, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    showErrorToast(error || "setting Goal Failed");
  }
};

//api for getting current goals
export const getGoals = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/getGoals`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    showErrorToast("error fetching goals");
  }
};

export const addMoneyToGoal = async (userId, Data) => {
  try {
    console.log(Data);
    const { data } = await axios.post(
      `${API_URL}/addMoneyToGoal/${userId}`,
      Data,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    showErrorToast("error adding money to goal");
  }
};

export const updateGoal = async (goalId, Data) => {
  try {
    const { data } = await axios.post(`${API_URL}/updateGoal/${goalId}`, Data, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    showErrorToast("Failed to update Goal");
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const { data } = await axios.get(`${API_URL}/deleteGoal/${goalId}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    showErrorToast("Failed to delete Goal");
  }
};
