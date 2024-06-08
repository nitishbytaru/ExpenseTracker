import axios from "axios";

const API_URL = "/home";

//api for login
export const login = async (data) => {
  try {
    await axios.post(`${API_URL}/login`, data);
  } catch (error) {
    console.log(error);
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

//api to updateProfileData
export const updateProfileData = async (Data) => {
  try {
    await axios.get(`${API_URL}/updateProfileData`, Data);
  } catch (error) {
    console.log(error);
    return;
  }
};
