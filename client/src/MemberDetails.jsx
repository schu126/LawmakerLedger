import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Table, TableBody, TableHead, TableHeaderCell, TableRow, TableCell } from '@tremor/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './MemberDetails.css';

function MemberDetails() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [industryData, setIndustryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);  


  useEffect(() => {
    fetchMemberDetails();
    fetchMemberStocks();
    fetchMemberTransactions();
  }, [memberId]);

  const fetchMemberDetails = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`http://localhost:5555/members/${memberId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMember(data);
    } catch (error) {
      console.error('Error fetching member details:', error);
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  const fetchMemberStocks = async () => {
    try {
      const response = await fetch(`http://localhost:5555/members/${memberId}/stocks`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setError(error.message);
    }
  };

  const fetchMemberTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:5555/members/${memberId}/transactions`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTransactions(data);
      processTransactionsData(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message);
    }
  };

  const processTransactionsData = (transactions) => {
    const countPerIndustry = transactions.reduce((acc, { stock }) => {
      const industry = stock ? stock.industry : 'Unknown';
      acc[industry] = acc[industry] ? acc[industry] + 1 : 1;
      return acc;
    }, {});
  
  const chartData = Object.keys(countPerIndustry).map(industry => ({
      name: industry,
      Trades: countPerIndustry[industry]
    }));
    setIndustryData(chartData);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const tradeValue = payload[0].value ? payload[0].value : 'No data';
      return (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          color: '#333' 
        }}>
          <p>{label || 'Unknown'}</p> {/* Fallback for label */}
          <p>{`Trades: ${tradeValue}`}</p>
        </div>
      );
    }
  
    return null;
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
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card-container">
    <Card className="member-details mx-auto max-w-4xl p-4">
      <div className="member-details">
      <h2>Member Details - {member?.name}</h2>
      <p>Party: {member?.party}</p>
    </div>
      
    <div className="industry-analysis-section">
        <h2>Industry Analysis</h2>
      <BarChart width={1075} height={400} data={industryData}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" hide={true} />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="Trades" fill="#8884d8" name="Number of Trades" />
      </BarChart>
      </div>

      <div className="transactions-section">
        <h2>Transactions</h2>
        <Table className="transaction-table">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Ticker</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell className="text-right">Amount</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.stock ? transaction.stock.company_name : 'N/A'}</TableCell>
                <TableCell>{transaction.stock ? transaction.stock.ticker : 'N/A'}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button className="transaction-button" onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
          <Button className="transaction-button" onClick={handleNext} disabled={currentPage >= Math.ceil(transactions.length / transactionsPerPage)}>Next</Button>
        </div>
        </div>
      </Card>
      </div>
  );
}

export default MemberDetails;