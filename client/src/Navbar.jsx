// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">LawmakerLedger</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/members" className="hover:text-gray-300">Members</Link>
          </li>
          <li>
            <Link to="/stocks" className="hover:text-gray-300">Stocks</Link>
          </li>
          <li>
            <Link to="/transactions" className="hover:text-gray-300">Transactions</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;