import React from "react";
import { signup, login } from "../../api/authApi";
import { showErrorToast } from "../../utils/toastUtils";
import useFormValidate from "../../hooks/useFormValidate";
import useAuth from "../../hooks/useAuth";

function Signup() {
  const { useEmailValidate, useHandleChange } = useFormValidate();
  const [userInput, handleChange] = useHandleChange({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  const { useLogin } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    const { username, email, password, Cpassword } = userInput;
    if (email && password) {
      if (useEmailValidate(email)) {
        if (password === Cpassword) {
          try {
            const res = await signup({ username, email, password });
            if (res) {
              await login(userInput);
              await useLogin(userInput);
            }
          } catch (error) {
            console.log(error);
            showErrorToast(error);
          }
        } else {
          showErrorToast("Passwords do not match");
        }
      } else {
        showErrorToast("Invalid email address");
      }
    }
  };

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
              value={userInput.username}
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
              value={userInput.email}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            <div>
              <label htmlFor="Cpassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="Cpassword"
                id="Cpassword"
                className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="••••••••"
                required
                onChange={handleChange}
                value={userInput.Cpassword}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
