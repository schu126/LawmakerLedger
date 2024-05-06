import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StockDetails() {
  const { ticker } = useParams();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await fetch(`/stocks/${ticker}`);
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{stock.company_name}</h1>
      <p>Ticker: {stock.ticker}</p>
      <p>Industry: {stock.industry}</p>
    </div>
  );
}

export default StockDetails;