import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearch, setIsSearch] = useState();
  
    // const queryParams = new URLSearchParams(location.search);
     const searchText = location.search.slice(3)
    // setIsSearch(searchText)
  useEffect(() => {
    setIsSearch(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
const handleOnChange=(e)=>{
  const value=e.target.value
  const url=`/search?q=${value}`
  navigate(url)
}
  return (
    <div className="w-full sm:w-1/2">
      {!isSearch ? (
        <div
          onClick={redirectToSearchPage}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:shadow-md transition-all"
        >
          <FaSearch className="text-gray-400" />
          <TypeAnimation
            sequence={[
              "We produce food for Mice",
              2000,
              "We produce food for Hamsters",
              2000,
              "We produce food for Guinea Pigs",
              2000,
              "We produce food for Chinchillas",
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="text-gray-500 text-sm sm:text-base md:text-lg truncate"
            repeat={Infinity}
          />
        </div>
      ) : (
        <input
          type="text"
          autoFocus
          defaultValue={searchText}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleOnChange}
        />
      )}
    </div>
  );
};
