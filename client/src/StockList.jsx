import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch('/stocks');
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <Link to={`/stocks/${stock.ticker}`}>{stock.company_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;