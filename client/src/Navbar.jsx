// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-semibold">
        <Link to="/">LawmakerLedger</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
        </li>
        <li>
          <Link to="/members" className="hover:bg-gray-700 px-3 py-2 rounded-md">Members</Link>
        </li>
        <li>
          <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
