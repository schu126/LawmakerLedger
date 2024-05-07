import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@tremor/react';

function MemberDetails() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemberDetails();
    // fetchMemberStocks();
    fetchMemberTransactions();
  }, [memberId]);

  const fetchMemberDetails = async () => {
    setLoading(true); // Consider setting individual loading states if needed
    try {
      const response = await fetch(`http://localhost:5555/members/${memberId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMember(data);
    } catch (error) {
      console.error('Error fetching member details:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Update or remove this if using individual loading states
    }
  };

  // const fetchMemberStocks = async () => {
  //   try {
  //     const response = await fetch(`/members/${memberId}/stocks`);
  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //     const data = await response.json();
  //     setStocks(data);
  //   } catch (error) {
  //     console.error('Error fetching stocks:', error);
  //     setError(error.message);
  //   }
  // };

  const fetchMemberTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:5555/members/${memberId}/transactions`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="member-details">
      <h2>Member Details - {member?.name}</h2>
      <p>Party: {member?.party}</p>
      <p>State: {member?.state}</p>
      <p>District: {member?.district || 'N/A'}</p>

      <h3>Invested Stocks</h3>
      <ul>
        {stocks.map(stock => <li key={stock.id}>{stock.company_name} ({stock.ticker})</li>)}
      </ul>

      <h3>Transactions</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.member ? transaction.member.name : 'N/A'}</TableCell>
              <TableCell>{transaction.stock ? transaction.stock.company_name : 'N/A'}</TableCell>
              <TableCell>{transaction.stock ? transaction.stock.ticker : 'N/A'}</TableCell>
              <TableCell>{transaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MemberDetails;
