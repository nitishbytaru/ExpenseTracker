import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../api/authApi";
import LoginContext from "../../context/LoginContext";
import { showErrorToast } from "../../utils/toastUtils";

function TopNavBar({ toggleSideNav }) {
  const { isLoggedIn, profile, setProfile } = useContext(LoginContext);

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

  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-6 shadow-lg">
      <Link to="../" className="text-white p-2 rounded-full hover:bg-gray-700 ">
        <img
          className="w-20"
          src="https://res.cloudinary.com/dhysbx7mk/image/upload/v1720689247/download-removebg-preview_taddsa.png"
          alt=""
        />
      </Link>

      <div>
        <ul className="flex space-x-4">
          {profile ? (
            <>
              <li
                className="text-white p-2 rounded-lg hover:bg-green-600"
                onClick={toggleSideNav}
              >
                <div className="w-full flex justify-center align-middle">
                  <img
                    className="w-11 h-11 object-cover rounded-full"
                    src={`${profile.avatar}`}
                    alt=""
                  />
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="text-white p-2 rounded-lg hover:bg-blue-600">
                <Link to="register">Register</Link>
              </li>
              <li className="text-white p-2 rounded-lg hover:bg-green-600">
                <Link to="login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TopNavBar;
