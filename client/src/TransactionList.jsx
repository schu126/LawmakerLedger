import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

function TransactionList() {
  // State for storing all transactions
  const [transactions, setTransactions] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle any errors during fetch
  const [error, setError] = useState(null);
  // State to manage current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State to manage the number of transactions per page
  const [transactionsPerPage] = useState(50);

  // Effect to fetch transactions from the server
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

  // Calculate the index of the last transaction on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  // Calculate the index of the first transaction on the current page
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  // Slice the transactions to get only those for the current page
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Function to handle the 'Next' button click
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle the 'Previous' button click
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <h1 className="text-lg font-semibold mb-4">Transaction List</h1>
      <Table className="w-full">
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
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNext} disabled={currentPage >= Math.ceil(transactions.length / transactionsPerPage)}>Next</button>
      </div>
    </Card>
  );
}

export default TransactionList;
