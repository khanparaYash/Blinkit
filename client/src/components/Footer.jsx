import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
     <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MyBrand</h2>
          <p className="text-gray-400">Building modern web experiences with React and creativity.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer