import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/authApi";
import { handleUserChange } from "../../utils/formHandleChanges";
import { setIsLoggedIn, setProfile } from "../../app/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    if (!userInput.username || !userInput.password) {
      return toast.warning("Username and Password are required");
    }

    try {
      const loginResponse = await login(userInput);
      const profileData = loginResponse.user;
      setIsLoggedIn(true);
      dispatch(setProfile(profileData));
      localStorage.setItem("profile", JSON.stringify(profileData));
      setUserInput({ username: "", password: "" });
      navigate("../");
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Your Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="username"
              required
              onChange={(event) =>
                handleUserChange(event, userInput, setUserInput)
              }
              value={userInput.username}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="••••••••"
              required
              onChange={(event) =>
                handleUserChange(event, userInput, setUserInput)
              }
              value={userInput.password}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <div>
            <p>
              New user?{" "}
              <Link to="/register" className="underline hover:text-blue-700">
                Register here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
