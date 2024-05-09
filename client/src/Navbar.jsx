import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Lawmaker Ledger Logo" style={{ height: '100px' }} />
        </Link>
        <ul className="navbar-links">
          <li><Link to="/members">Members</Link></li>
          <li><Link to="/stocks">Stocks</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

