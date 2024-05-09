import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MemberList.css';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterParty, setFilterParty] = useState('');
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true); // Set loading to true when the fetch begins
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
      setLoading(false); // Set loading to false once fetching is complete
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
      {error && <p className="error">Error fetching members: {error}</p>}
      {loading ? (
        <div className="loader"></div> // Display spinner while loading
      ) : (
        <div>
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
      )}
    </div>
  );
}


export default MemberList;
