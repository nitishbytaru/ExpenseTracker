import React from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useAuth from "../../hooks/useAuth";

function TopNavBar({ toggleSideNav }) {
  const { profile } = useAuth();

  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-6 shadow-lg">
      <Link to="../" className="text-white p-2 rounded-full hover:bg-gray-700 ">
        <img
          className="w-20"
          src="https://res.cloudinary.com/dhysbx7mk/image/upload/v1717826022/Expense_Tracker/LOGOS/logo_oxowgj.png"
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
                <AccountCircleOutlinedIcon />
              </li>
            </>
          ) : (
            <>
              <li className="text-white p-2 rounded-lg hover:bg-blue-600">
                <Link to="signup">Register</Link>
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
