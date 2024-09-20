import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfile } from "../../app/slices/authSlice";

function TopNavBar({ toggleSideNav }) {
  const profile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile !== "undefined") {
      dispatch(setProfile(JSON.parse(savedProfile)));
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-6 shadow-lg">
      <Link to="../" className="text-white p-2 rounded-full hover:bg-gray-700 ">
        <img
          className="w-20"
          src="https://res.cloudinary.com/dhysbx7mk/image/upload/v1720689247/download-removebg-preview_taddsa.png"
          alt="Logo"
        />
      </Link>

      <div>
        <ul className="flex space-x-4">
          {profile ? (
            <li
              className="text-white p-2 rounded-lg hover:bg-green-600"
              onClick={toggleSideNav}
            >
              <div className="w-full flex justify-center align-middle">
                <img
                  className="w-11 h-11 object-cover rounded-full"
                  src={profile.avatar}
                  alt="Profile"
                />
              </div>
            </li>
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
