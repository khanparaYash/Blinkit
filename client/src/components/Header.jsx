import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Search } from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import UserMenu from "./UserMenu";
function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handelCloseUserMenu=()=>{
    setOpenUserMenu(false)
  }

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold text-blue-600">
          MyShop
        </Link>

        {/* Search Bar */}
        <Search />

        {/* Login & Cart */}
        <div className="flex items-center gap-6 text-gray-700 text-lg">
          {user?._id ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 select-none cursor-pointer group"
                onClick={() => setOpenUserMenu((prev) => !prev)}
              >
                <p className="group-hover:text-blue-600 transition-colors">
                  Account
                </p>
                {openUserMenu ? (
                  <FaAngleUp className="group-hover:text-blue-600 transition-colors" />
                ) : (
                  <FaAngleDown className="group-hover:text-blue-600 transition-colors" />
                )}
              </div>

              {openUserMenu && (
                <div className="absolute right-0 mt-2 z-50">
                  <UserMenu close={handelCloseUserMenu}/>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              title="Login"
              className="hover:text-blue-600 transition-colors"
            >
              <FaUser className="text-xl" />
            </button>
          )}

          <div className="relative">
            <button
              title="Cart"
              className="hover:text-blue-600 transition-colors relative"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
