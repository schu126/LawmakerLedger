import React, { useState, useEffect } from 'react';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import './StockList.css';
import { ThreeDots } from 'react-loader-spinner';

function StockList() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [stocksPerPage] = useState(50);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5555/stocks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();

            // Mapping data to include transaction count and sorting alphabetically by company name
            data = data.map(stock => ({
                ...stock,
                company_name: stock.company_name || 'Unknown Company',
                transactionCount: stock.transactions ? stock.transactions.length : 0
            }));
            data.sort((a, b) => (a.company_name || '').localeCompare(b.company_name || ''));

            setStocks(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching stocks:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
    );
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="card-container">
            <div>
                <h2>Stock List</h2>
            </div>
            <Card>
                <Table className="stock-table">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Company Name</TableHeaderCell>
                            <TableHeaderCell>Ticker</TableHeaderCell>
                            <TableHeaderCell>Industry</TableHeaderCell>
                            <TableHeaderCell>Transactions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentStocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.company_name}</TableCell>
                                <TableCell>{stock.ticker}</TableCell>
                                <TableCell>{stock.industry || 'N/A'}</TableCell>
                                <TableCell>{stock.transactionCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between mt-4">
                    <Button className="stock-button" variant="primary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
                    <Button className="stock-button" variant="primary" onClick={handleNext} disabled={currentPage >= Math.ceil(stocks.length / stocksPerPage)}>Next</Button>
                </div>
            </Card>
        </div>
    );
}

export default StockList;
