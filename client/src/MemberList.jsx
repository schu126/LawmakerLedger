import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MemberList.css';
import { ThreeDots } from 'react-loader-spinner';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterParty, setFilterParty] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const placeholders = ["Search by name...", "Enter lawmaker's name...", "Try 'John Doe'..."];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.placeholder = placeholders[currentIndex];
        currentIndex = (currentIndex + 1) % placeholders.length;
      }
    }, 2000); // Changes placeholder every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // This effect only runs once on mount

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5555/members');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterParty = (e) => {
    setFilterParty(e.target.value);
  };

  const filteredMembers = members.filter(member => {
    const nameMatch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const partyMatch = filterParty === '' || member.party === filterParty;
    return nameMatch && partyMatch;
  });

  return (
    <div className="container">
      {error && <p className="error">Error fetching members: {error}</p>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div>
          <div className="search-filter">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name"
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <select
              value={filterParty}
              onChange={handleFilterParty}
              className="filter-select"
            >
              <option value="">All Parties</option>
              <option value="Republican">Republican</option>
              <option value="Democrat">Democratic</option>
              <option value="Independent">Independent</option>
            </select>
          </div>
          <div className="member-grid">
            {filteredMembers.map((member) => (
              <div key={member.id} className="member-card">
                <Link to={`/members/${member.id}`} className="member-link">
                  {member.name}
                </Link>
                <p className="member-party">{member.party}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberList;
