import React, {  useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Search } from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { useGlobalContext } from "../provider/GlobalProvider";
import logo from "../assets/logo.png";
import useMobile from "../hooks/useMobile";
function Header() {
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { totalQty, totalPrice } = useGlobalContext();

  const handelCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt=""
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block">
          <Search />
          </div>

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
                    <UserMenu close={handelCloseUserMenu} />
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
                {totalPrice}
                <FaShoppingCart className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQty}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
