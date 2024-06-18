import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../api/authApi";
import LoginContext from "../../context/LoginContext";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { setIsLoggedIn, setProfile } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  }

  function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;
    if (email.trim() && password.trim()) {
      if (isValidEmail(email)) {
        try {
          const res = await login(userInput);
          if(res){localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("password", JSON.stringify(password));
          setIsLoggedIn(true);
          setProfile(userInput);
          setUserInput({
            email: "",
            password: "",
          });
          navigate("../");
          showSuccessToast("Login Successful");}
        } catch (error) {
          showErrorToast(error);
        }
      } else {
        showErrorToast("Given email is invalid. Please retry");
      }
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              <Link to="/signup" className="underline hover:text-blue-700">
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
