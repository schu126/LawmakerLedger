import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableHead, TableHeaderCell, TableRow, TableCell } from '@tremor/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// import './MemberDetails.css';

function MemberDetails() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState(1);
  const [industryData, setIndustryData] = useState([]);


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
          color: '#333' // Ensure text color contrasts with background
        }}>
          <p>{label || 'Unknown'}</p> {/* Fallback for label */}
          <p>{`Trades: ${tradeValue}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="member-details">
      <Card className="mx-auto max-w-4xl p-4">
        <h2>Member Details - {member?.name}</h2>
        <p>Party: {member?.party}</p>
        <p>State: {member?.state}</p>
        <p>District: {member?.district || 'N/A'}</p>
        <TabGroup defaultValue={1} onChange={(value) => setSelectedView(value)}>
          <TabList className="mt-4">
            <Tab value={1}>Invested Stocks</Tab>
            <Tab value={2}>Transactions</Tab>
            <Tab value={3}>Industry Analysis</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value={1}>
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Company Name</TableHeaderCell>
                    <TableHeaderCell>Ticker</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell>{stock.company_name}</TableCell>
                      <TableCell>{stock.ticker}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value={2}>
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Stock</TableHeaderCell>
                    <TableHeaderCell>Ticker</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.stock ? transaction.stock.company_name : 'N/A'}</TableCell>
                      <TableCell>{transaction.stock ? transaction.stock.ticker : 'N/A'}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value={3}>
              <BarChart width={1200} height={300} data={industryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide={true}/>
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Trades" fill="#8884d8" name="Number of Trades" />
              </BarChart>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
}

export default MemberDetails;