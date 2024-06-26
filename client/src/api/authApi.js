import axios from "axios";
import { showErrorToast } from "../utils/toastUtils";

const API_URL = "/api/v1/user";

//api for register
export const register = async (data) => {
  try {
    await axios.post(`${API_URL}/register`, data);
  } catch (error) {
    console.log(error);
  }
};

//api for login
export const login = async (data) => {
  try {
    await axios.post(`${API_URL}/login`, data);
    return true;
  } catch (error) {
    showErrorToast(error);
    return false;
  }
};

//api for logout
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
};

//api to get current user
export const getProfile = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/profile`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//api to updateProfileData(PUT)
export const updateProfileData = async (Data) => {
  try {
    await axios.put(`${API_URL}/profile`, Data);
  } catch (error) {
    console.log(error);
    return;
  }
};

//api to delete current user
export const deleteAccountReq = async () => {
  try {
    await axios.delete(`${API_URL}/delete-account`);
  } catch (error) {
    console.log(error);
  }
};
