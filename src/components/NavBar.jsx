"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/all-product">Brand</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/all-product" className="hover:bg-gray-600 px-4 py-2">Home</Link>
          <Link href="/about" className="hover:bg-gray-600 px-4 py-2">About</Link>
          <Link href="/services" className="hover:bg-gray-600 px-4 py-2">Services</Link>
          <Link href="/contact" className="hover:bg-gray-600 px-4 py-2">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <Link href="/all-product" className="block px-4 py-2 hover:bg-gray-600">Home</Link>
          <Link href="/about" className="block px-4 py-2 hover:bg-gray-600">About</Link>
          <Link href="/services" className="block px-4 py-2 hover:bg-gray-600">Services</Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-gray-600">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
