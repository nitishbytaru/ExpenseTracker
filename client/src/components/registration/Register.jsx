import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import {
  handleFileChange,
  handleUserChange,
} from "../../utils/formHandleChanges";
import { Oval } from "react-loader-spinner";
import { isValidEmail } from "../../utils/emailValidate/emailValidate.js";
import { toast } from "sonner";

function Register() {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const { username, email, password, Cpassword } = userInput;

    if (!email && !password)
      return toast.warning("Email and Password Required");

    if (!isValidEmail(email))
      return toast.warning("Given email is invalid. Please retry");

    if (password !== Cpassword) return toast.warning("Passwords do not match");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", file);

    setLoading(true);
    try {
      await register(formData);
      toast.success("Registration successful");
      navigate("../");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setLoading(false);
    setUserInput({
      username: "",
      email: "",
      password: "",
      Cpassword: "",
    });
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
              onChange={(event) => {
                handleUserChange(event, userInput, setUserInput);
              }}
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
              onChange={(event) => {
                handleUserChange(event, userInput, setUserInput);
              }}
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
                onChange={(event) => {
                  handleUserChange(event, userInput, setUserInput);
                }}
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
                onChange={(event) => {
                  handleUserChange(event, userInput, setUserInput);
                }}
                value={userInput.Cpassword}
              />
            </div>
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              name="avatar"
              id="profileImage"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              required
              onChange={(event) => {
                handleFileChange(event, setFile);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={loading}
            >
              {loading ? (
                <Oval
                  height={20}
                  width={20}
                  color="#ffffff"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#cccccc"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
