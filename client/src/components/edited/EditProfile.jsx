import React, { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  deleteAccountReq,
  logout,
  updateProfileData,
} from "../../api/authApi.js";
import { showSuccessToast, showWarnToast } from "../../utils/toastUtils.js";
import LoginContext from "../../context/LoginContext.js";
import { isValidEmail } from "../../utils/formValidation.js";
import { handleUserChange } from "../../utils/formHandleChanges.js";
import { fetchUserData } from "../../utils/FetchUtils/fetchUserData.js";

function EditProfile() {
  const navigate = useNavigate();
  const { setProfile, setIsLoggedIn } = useContext(LoginContext);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUserData(setUserData);
  }, []);

  async function submitForm(e) {
    e.preventDefault();
    const { username, email, password } = userData;

    if (!email && !password)
      return showWarnToast("Email and Password required");

    if (!isValidEmail(email)) return showWarnToast("Invalid email address");

    try {
      await updateProfileData({ username, email, password });
      showSuccessToast("Details updated successfully");
      navigate("/transactionform");
    } catch (error) {
      console.log(error);
    }
  }

  function deleteAccount() {
    toast.warning("Confirm to delete account", {
      action: {
        label: "Confirm",
        onClick: () => {
          deleteAccountReq();
          logout();
          setProfile(null);
          setIsLoggedIn(false);
          navigate("../ ");
          showSuccessToast("Account deleted successfully");
        },
      },
    });
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="w-full flex justify-center mb-6">
          <img
            className="rounded-full w-32 h-32 object-cover"
            src={`${userData.avatar}`}
            alt="User Avatar"
          />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
        <form className="space-y-6" onSubmit={submitForm}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mt-1"
              placeholder="Enter your username"
              required
              onChange={(event) => {
                handleUserChange(event, userData, setUserData);
              }}
              value={userData.username}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mt-1"
              placeholder="Enter your email"
              required
              onChange={(event) => {
                handleUserChange(event, userData, setUserData);
              }}
              value={userData.email}
            />
          </div>
          <div className="grid grid-flow-col items-end">
            <div className="mr-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mt-1"
                placeholder="Enter your password"
                required
                onChange={(event) => {
                  handleUserChange(event, userData, setUserData);
                }}
                value={userData.password}
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={deleteAccount}
                className="block w-full text-center font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white p-2.5"
              >
                DELETE ACCOUNT
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Edit & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
