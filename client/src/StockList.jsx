import React, { useState, useEffect } from 'react';

function StockList() {
    const [stocks, setStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch stock data
        const fetchStocks = async () => {
            try {
                const response = await fetch('http://localhost:5555/stocks'); // Adjust this URL to your environment
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                const data = await response.json();
                setStocks(data); // Assuming the response is an array of stocks
            } catch (error) {
                setError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStocks();
    }, []); // Empty dependency array means this effect will only run once after the initial render

    return (
        <div>
            <h1>Stock List</h1>
            {isLoading ? (
                <p>Loading stocks...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {stocks.map(stock => (
                        <li key={stock.id}>{stock.name} - Ticker: {stock.ticker}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StockList;
