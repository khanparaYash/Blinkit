import React from 'react'
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Search } from './Search';
import { Link,  useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold text-blue-600">MyShop</Link>

        {/* Search Bar */}
        <Search/>

        {/* Login & Cart */}
        <div className="flex items-center space-x-5 text-gray-700 text-xl">
          <button onClick={()=>navigate("/login")} title="Login" className="hover:text-blue-600 transition-colors">
            <FaUser />
          </button>
          <div className="relative">
            <button title="Cart" className="hover:text-blue-600 transition-colors">
              <FaShoppingCart />
            </button>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Header