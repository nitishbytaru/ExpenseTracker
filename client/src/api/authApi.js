import axios from "axios";
import { showErrorToast } from "../utils/toastUtils";

const API_URL = "/home";

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

//api for signup
export const signup = async (data) => {
  try {
    await axios.post(`${API_URL}/signup`, data);
  } catch (error) {
    console.log(error);
  }
};

//api for logout
export const logout = async () => {
  try {
    await axios.get(`${API_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
};

//api to get current user
export const getProfile = async () => {
  try {
    return await axios.get(`${API_URL}/profile`);
  } catch (error) {
    console.log(error);
    return;
  }
};

//api to updateProfileData(PUT)
export const updateProfileData = async (Data) => {
  try {
    await axios.put(`${API_URL}/updateProfileData`, Data);
  } catch (error) {
    console.log(error);
    return;
  }
};

//api to delete current user
export const deleteAccountReq = async () => {
  try {
    await axios.get(`${API_URL}/deleteAccount`);
  } catch (error) {
    console.log(error);
  }
};
