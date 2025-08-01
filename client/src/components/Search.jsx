import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import useMobile from "../hooks/useMobile";
export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearch, setIsSearch] = useState();
  const [isMobile] = useMobile();

  const searchText = location.search.slice(3);

  useEffect(() => {
    setIsSearch(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };
  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
      <div>
        {isMobile && isSearch ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearch ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                "Search milk",
                2000,
                "Search bread",
                2000,
                "Search sugar",
                2000,
                "Search panner",
                2000,
                "Search chocolate",
                2000,
                "Search curd",
                2000,
                "Search rice",
                2000,
                "Search egg",
                2000,
                "Search chips",
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className='w-full h-full'>
            <input
              type="text"
              autoFocus
              defaultValue={searchText}
              placeholder="Search products..."
              className="bg-transparent w-full h-full outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
