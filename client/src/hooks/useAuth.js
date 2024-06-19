import { useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import { getProfile } from "../api/authApi";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, profile, setProfile } =
    useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkProfile() {
      try {
        const email = JSON.parse(localStorage.getItem("email"));
        const password = JSON.parse(localStorage.getItem("password"));
        if (email && password) {
          const { data } = await getProfile();
          setProfile(data);
        }
      } catch (error) {
        showErrorToast(error.response.data);
      }
    }
    if (isLoggedIn) checkProfile();
  }, [isLoggedIn]);

  const useLogin = async (data) => {
    try {
      const { email, password } = data;
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("password", JSON.stringify(password));
      setIsLoggedIn(true);
      setProfile(data);
      navigate("../");
      showSuccessToast("Login Successful");
    } catch (error) {
      console.log(error);
    }
  };

  const useLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
    setProfile(undefined);
  };

  return { isLoggedIn, profile, useLogin, useLogout };
};

export default useAuth;
