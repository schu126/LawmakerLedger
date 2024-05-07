import React, { useEffect, useState } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);  // Set loading to true when the fetch starts
    try {
      const response = await fetch('http://localhost:5555/transactions');  // Adjust URL based on setup
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();  // Use .json() directly if the API returns JSON
      setTransactions(data);
      setError(null);  // Reset any previous errors
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message);  // Set the error message to state
    } finally {
      setLoading(false);  // Set loading to false when the fetch is complete
    }
  };

  if (loading) {
    return <div>Loading transactions...</div>;  // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message
  }

  return (
    <div>
      <h1>Transaction List</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} - {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
