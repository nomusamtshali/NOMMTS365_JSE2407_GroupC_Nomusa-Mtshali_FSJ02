/**
 * @module Header
 * @description A responsive header component for the MaxiMart website.
 * @requires react
 * @requires react-icons/fa
 * @requires next/link
 */

"use client";

import { FaShoppingCart, FaHeart, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

/**
 * Header component with responsive navigation and user action links.
 * @returns {JSX.Element} The rendered Header component
 */

const Header = () => {
  /**
   * State to control the visibility of the mobile menu.
   * @type {[boolean, function]} A tuple containing the state and its setter function
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false); // toggle state for the menu

  return (
    <nav className="bg-white shadow-lg p-6 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-black text-2xl font-bold">
          <Link href="/">MaxiMart</Link>
        </h1>

        {/* centered navigation links for larger screens */}
        <div className="hidden lg:flex space-x-6">
          <Link href="/" className="text-md font-medium hover:text-gray-600">
            Home
          </Link>
          <Link
            href="/products"
            className="text-md font-medium hover:text-gray-600"
          >
            Products
          </Link>
        </div>

        {/* icons for cart, wishlist, and account */}
        <div className="hidden lg:flex space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
            <FaShoppingCart className="text-lg" />
            <span className="text-md font-medium">Cart</span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
            <FaHeart className="text-lg" />
            <span className="text-md font-medium">Wishlist</span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-600">
            <FaUser className="text-lg" />
            <span className="text-md font-medium">Account</span>
          </div>
        </div>

        {/* hamburger menu for small screens */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* dropdown menu for small screens */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white shadow-md`}
      >
        <div className="flex flex-col items-center p-4 space-y-4">
          <Link
            href="/"
            className="text-md font-medium hover:text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-md font-medium hover:text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>

          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaShoppingCart className="text-lg" />
            <span className="text-md font-medium">Cart</span>
          </div>

          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHeart className="text-lg" />
            <span className="text-md font-medium">Wishlist</span>
          </div>

          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaUser className="text-lg" />
            <span className="text-md font-medium">Account</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
