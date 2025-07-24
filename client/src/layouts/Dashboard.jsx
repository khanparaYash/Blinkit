import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md border-r">
        <UserMenu />
      </div>
      <div className="flex-1  h-2/3 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
