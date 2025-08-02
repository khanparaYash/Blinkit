import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <section className="bg-white">
      <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr] lg:flex ' >
      <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r lg:w-[200px]">
        <UserMenu />
      </div>
      <div className="bg-white min-h-[75vh] m-auto ">
        <Outlet />
      </div>
      </div>
    </section>
  );
}

export default Dashboard;
