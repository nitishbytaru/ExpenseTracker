import React, { useState } from "react";
import SideNavBar from "./components/navbar/SideNavBar";
import { Outlet } from "react-router-dom";
import TopNavBar from "./components/navbar/TopNavBar";

function Layout() {
  const [showSideNav, setShowSideNav] = useState(false);

  function toggleSideNav() {
    setShowSideNav(!showSideNav);
  }

  return (
    <div className="h-screen flex">
      <div className="fixed left-0 top-0 h-full z-50">
        <div
          className={`${
            showSideNav ? "block" : "hidden"
          } fixed inset-0 bg-black opacity-25`}
          onClick={toggleSideNav}
        ></div>
        <div
          className={`${
            showSideNav ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out`}
        >
          <SideNavBar toggleSideNav={toggleSideNav} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <TopNavBar toggleSideNav={toggleSideNav} />
        <div className="flex flex-grow">
          <div className="flex-grow h-full overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
