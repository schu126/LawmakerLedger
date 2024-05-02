// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white w-64 h-full fixed inset-y-0 left-0 flex flex-col justify-between py-4">
      <div>
        <h1 className="text-xl font-semibold px-6 py-4">LawmakerLedger</h1>
        <ul className="flex flex-col">
          <li>
            <Link to="/" className="block hover:bg-gray-700 px-6 py-3">Home</Link>
          </li>
          <li>
            <Link to="/members" className="block hover:bg-gray-700 px-6 py-3">Members</Link>
          </li>
          <li>
            <Link to="/about" className="block hover:bg-gray-700 px-6 py-3">About</Link>
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        <p className="text-sm">© 2024 LawmakerLedger. All rights reserved.</p>
      </div>
    </nav>
  );
}

export default Navbar;
