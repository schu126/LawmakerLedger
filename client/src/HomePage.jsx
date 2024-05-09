import React from 'react';
import './HomePage.css';
import homepage from './assets/homepage.png';

function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${homepage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="home-container">
        <div className="hero-welcome">
          <h1>Welcome to LawmakerLedger</h1>
          <p>Track the investments of Congress members for political and financial transparency.</p>
        </div>
        <div className="callout-container">
          <div className="callout" style={{ backgroundColor: '#f0f8ff' }}>
            <h2>Explore Members</h2>
            <p>Dive into detailed profiles of each member of Congress, their financial disclosures, and legislative activities.</p>
          </div>
          <div className="callout" style={{ backgroundColor: '#e6ffe6' }}>
            <h2>Investigate Stocks</h2>
            <p>View comprehensive stock transactions and trends within the legislative branches.</p>
          </div>
          <div className="callout" style={{ backgroundColor: '#fff0f0' }}>
            <h2>Analyze Transactions</h2>
            <p>Access a detailed transaction log that provides insight into the trading activities of lawmakers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;