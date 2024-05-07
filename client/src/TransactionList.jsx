import React, { useEffect, useState } from 'react';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import './TransactionList.css';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(50);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5555/transactions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTransactions(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card-container">
    <Card>
      <h3 className="text-lg font-semibold mb-4">Transaction List</h3>
      <Table className="transaction-table">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Trader Name</TableHeaderCell>
            <TableHeaderCell>Stock Company</TableHeaderCell>
            <TableHeaderCell>Ticker</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell className="text-right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.member ? transaction.member.name : 'N/A'}</TableCell>
              <TableCell>{transaction.stock ? transaction.stock.company_name : 'N/A'}</TableCell>
              <TableCell>{transaction.stock ? transaction.stock.ticker : 'N/A'}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button className="transaction-button" variant="primary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
        <Button className="transaction-button" variant="primary" onClick={handleNext} disabled={currentPage >= Math.ceil(transactions.length / transactionsPerPage)}>Next</Button>
      </div>
    </Card>
    </div>
  );
}

export default TransactionList;
