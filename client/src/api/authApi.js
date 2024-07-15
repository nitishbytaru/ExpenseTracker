import axios from "axios";
import { showErrorToast } from "../utils/toastUtils";

// const API_URL = "https://expensetracker-vbp3.onrender.com/api/v1/user";
const API_URL = "/api/v1/user";


// api for register
export const register = async (data) => {
  try {
    await axios.post(`${API_URL}/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// api for login
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    showErrorToast(error);
    return false;
  }
};

// api for logout
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// api to get current user
export const getProfile = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

// api to update profile data (PUT)
export const updateProfileData = async (data) => {
  try {
    await axios.put(`${API_URL}/profile`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

// api to delete current user
export const deleteAccountReq = async () => {
  try {
    await axios.delete(`${API_URL}/delete-account`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
