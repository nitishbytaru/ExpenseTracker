import axios from "axios";
import { showErrorToast } from "../utils/toastUtils";

// const API_URL = "https://expensetracker-vbp3.onrender.com/api/v1/user";
const API_URL = "/api/v1/user";

// Helper function to set access token in headers
const setAccessToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

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
    showErrorToast(error.response?.data?.message || "Registration failed");
  }
};

// api for login
export const login = async (Data) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, Data, {
      withCredentials: true,
    });
    const { accessToken, refreshToken } = data.data;

    localStorage.setItem("refreshToken", refreshToken);
    setAccessToken(accessToken);

    return data;
  } catch (error) {
    showErrorToast(error || "Login failed");
    return false;
  }
};

// api for logout
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
    return response;
  } catch (error) {
    showErrorToast(error.response?.data?.message || "Logout failed");
    throw error;
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
    showErrorToast(error.response?.data?.message || "Failed to fetch profile");
    throw error;
  }
};

// api to update profile data (PUT)
export const updateProfileData = async (data) => {
  try {
    await axios.put(`${API_URL}/profile`, data, {
      withCredentials: true,
    });
  } catch (error) {
    showErrorToast(error.response?.data?.message || "Failed to update profile");
    throw error;
  }
};

// api to delete current user
export const deleteAccountReq = async () => {
  try {
    await axios.delete(`${API_URL}/delete-account`, {
      withCredentials: true,
    });
  } catch (error) {
    showErrorToast(error.response?.data?.message || "Failed to delete account");
    throw error;
  }
};

// Refresh access token function
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const { data } = await axios.post(
      `${API_URL}/refresh-token`,
      { refreshToken },
      { withCredentials: true }
    );
    const { accessToken } = data.data;

    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    showErrorToast("Session expired. Please log in again.");
    logout();
    throw error;
  }
};

// Axios response interceptor for token refreshing
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      setAccessToken(newAccessToken);
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
