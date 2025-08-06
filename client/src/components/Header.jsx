import React, { useState } from "react";
import { Search } from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import DisplayCartItem from "./DisplayCartItem.jsx";
import { useGlobalContext } from "../provider/GlobalProvider";
import logo from "../assets/logo.png";
import useMobile from "../hooks/useMobile";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees.js";
function Header() {
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [OpenCartSection, setOpenCartSection] = useState(false);
  const { totalQty, totalPrice } = useGlobalContext() || {};
  // let totalQty, totalPrice 
  // if(contex){
  //     ({ totalQty, totalPrice } = contex); 
  // }
  const cartItem = useSelector((state) => state.cart.cart);
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

          {/* Login  */}
          <div>
            {/* for mobile */}
            <button
              onClick={() => {
                if (!user._id) {
                  navigate("/login");
                  return;
                }

                navigate("/user");
              }}
              title="Login"
              className="text-neutral-600 lg:hidden"
            >
              <FaRegCircleUser size={26} />
            </button>
            {/* desktop */}
            <div className="hidden lg:flex  items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex select-none items-center gap-1 cursor-pointer"
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <FaAngleUp size={25} />
                    ) : (
                      <FaAngleDown size={25} />
                    )}
                  </div>

                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handelCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-lg px-2"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/**add to card icons */}
          <button
            onClick={() => setOpenCartSection(true)}
            className="hidden lg:flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
          >
            <div className="animate-bounce">
              <BsCart4 size={26} />
            </div>
            <div className="font-semibold text-sm">
              {cartItem[0] ? (
                <div>
                  <p>{totalQty} Items</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              ) : (
                <p>My Cart</p>
              )}
            </div>
          </button>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {OpenCartSection && (
        <DisplayCartItem onclose={() => setOpenCartSection(false)} />
      )}
    </header>
  );
}

export default Header;
