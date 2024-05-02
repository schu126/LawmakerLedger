// components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to LawmakerLedger</h1>
      <p>Track the investments of Congress members for political and financial transparency.</p>
      <Link to="/members">View Members</Link>
    </div>
  );
}

export default HomePage;
