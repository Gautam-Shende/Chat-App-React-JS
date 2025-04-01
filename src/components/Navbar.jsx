import React, { useState } from 'react';
import { IoReorderThree, IoClose } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <FaRobot className="text-2xl text-blue-500" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">ChatBot AI</h1>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">Home</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">Features</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">About</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoClose className="text-3xl text-gray-700 dark:text-gray-300 transition-transform transform rotate-180 duration-300" />
            ) : (
              <IoReorderThree className="text-3xl text-gray-700 dark:text-gray-300 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu (shown when toggled) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
            <div className="flex flex-col space-y-3">
              <a href="#" className="block px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300">Home</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300">Features</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300">About</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300">Contact</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;