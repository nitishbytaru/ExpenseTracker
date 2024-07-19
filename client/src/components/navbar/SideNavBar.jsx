import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { logout } from "../../api/authApi";
import LoginContext from "../../context/LoginContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

function SideNavBar({ toggleSideNav }) {
  const { setIsLoggedIn, setProfile } = useContext(LoginContext);

  async function callLogout() {
    try {
      await logout();
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      setIsLoggedIn(false);
      setProfile(undefined);
    } catch (error) {
      showErrorToast(error.response.data);
    }
    toggleSideNav();
    showSuccessToast("Logout Successful");
  }

  return (
    <div className="bg-gray-900 w-80 h-screen p-6 flex flex-col items-start shadow-lg">
      <button
        className="text-white mb-6 p-2 rounded-full hover:bg-gray-700 self-end"
        onClick={toggleSideNav}
      >
        <CloseTwoToneIcon />
      </button>
      <ul className="w-full">
        <li className="w-full mb-4">
          <NavLink
            to="transactionform"
            onClick={toggleSideNav}
            className={({ isActive }) =>
              `block w-full p-4 text-center text-lg font-semibold rounded-lg ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            Add Transaction
          </NavLink>
        </li>

        <li className="w-full mb-4">
          <NavLink
            to="history"
            onClick={toggleSideNav}
            className={({ isActive }) =>
              `block w-full p-4 text-center text-lg font-semibold rounded-lg ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            Transaction History
          </NavLink>
        </li>

        <li className="w-full mb-4">
          <NavLink
            to="analysis"
            onClick={toggleSideNav}
            className={({ isActive }) =>
              `block w-full p-4 text-center text-lg font-semibold rounded-lg ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            Chart Analysis
          </NavLink>
        </li>

        <li className="w-full mb-4">
          <NavLink
            to="goal"
            onClick={toggleSideNav}
            className={({ isActive }) =>
              `block w-full p-4 text-center text-lg font-semibold rounded-lg ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            Goals
          </NavLink>
        </li>

        <li className="w-full mb-4">
          <NavLink
            to="editProfile"
            onClick={toggleSideNav}
            className={({ isActive }) =>
              `block w-full p-4 text-center text-lg font-semibold rounded-lg ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            Edit Profile
          </NavLink>
        </li>

        <li className="w-full mb-4">
          <NavLink
            to="../"
            onClick={callLogout}
            className={({ isActive }) =>
              `block w-full p-4 text-center text-lg font-semibold rounded-lg ${
                isActive
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-red-500 hover:text-white"
              }`
            }
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNavBar;
