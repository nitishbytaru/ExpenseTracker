import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../api/authApi";
import LoginContext from "../../context/LoginContext";
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from "../../utils/toastUtils";
import { isValidEmail } from "../../utils/formValidation";
import { handleUserChange } from "../../utils/formHandleChanges";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setProfile } = useContext(LoginContext);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;

    if (!email && !password)
      return showWarnToast("Email and Password Required");

    if (!isValidEmail(email))
      return showWarnToast("Given email is invalid. Please retry");

    try {
      const { data } = await login(userInput);
      if (data) {
        setIsLoggedIn(true);
        setProfile(data);
        setUserInput({
          email: "",
          password: "",
        });
        navigate("../");
        showSuccessToast("Login Successful");
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
        <form onSubmit={submitForm}>
          <div className="mb-4">
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
              onChange={(event) => {
                handleUserChange(event, userInput, setUserInput);
              }}
              value={userInput.email}
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
              onChange={(event) => {
                handleUserChange(event, userInput, setUserInput);
              }}
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
              New user ?{" "}
              <Link to="/register" className="underline hover:text-blue-700">
                Register here !
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
