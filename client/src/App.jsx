import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MemberList from './MemberList';
import MemberDetails from './MemberDetails';
import About from './About';
import Navbar from './Navbar';
import StockList from './StockList';
import StockDetails from './StockDetails';
import TransactionList from './TransactionList';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/members/:memberId" element={<MemberDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/stocks/:ticker" element={<StockDetails />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;