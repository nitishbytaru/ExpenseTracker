import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateProfileData } from "../../api/authApi";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

function EditProfile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/home/profile");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  async function submitForm(e) {
    e.preventDefault();
    const { username, email, password } = userData;
    if (email && password) {
      if (isValidEmail(email)) {
        try {
          await updateProfileData({ username, email, password });
          showSuccessToast("Details updated successfully");
          navigate("/transactionform");
        } catch (error) {
          console.log(error);
        }
      } else {
        showErrorToast("Invalid email address");
      }
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
        <form className="space-y-6" onSubmit={submitForm}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="username24"
              required
              onChange={handleChange}
              value={userData.username}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="name@company.com"
              required
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="••••••••"
                required
                onChange={handleChange}
                value={userData.password}
              />
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
