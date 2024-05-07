import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MemberList.css';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterParty, setFilterParty] = useState('');
  const [error, setError] = useState(null); // Added to track any errors

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5555/members'); // Ensure URL is correct
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Directly use .json() if the response is expected to be in JSON format
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError(error.message); // Update the state with error message
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterParty = (e) => {
    setFilterParty(e.target.value);
  };

  const filteredMembers = members.filter((member) => {
    const nameMatch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const partyMatch = filterParty === '' || member.party === filterParty;
    return nameMatch && partyMatch;
  });

  return (
    <div className="container">
      <h2 className="members-title">Members of Congress</h2>
      {error && <p className="error">Error fetching members: {error}</p>} {/* Display error if there is one */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <select value={filterParty} onChange={handleFilterParty} className="filter-select">
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
  );
}

export default MemberList;
