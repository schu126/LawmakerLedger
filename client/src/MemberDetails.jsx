import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MemberDetails.css';

function MemberDetails() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]); // Dependency array includes memberId to refetch when the parameter changes

  const fetchMemberDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5555/members/${memberId}`); // Adjust URL based on setup
      if (response.ok) {
        const data = await response.json();
        setMember(data);
        setError(null); // Clear any previous errors
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching member details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state
  }

  if (!member) {
    return <div>Member not found.</div>; // Show not found message if no member data
  }

  return (
    <div className="member-details">
      <h2 className="member-details-title">Member Details - {member.name}</h2>
      <p className="member-details-info">Party: {member.party}</p>
      <p className="member-details-info">State: {member.state}</p>
      <p className="member-details-info">District: {member.district}</p>
      {/* Display other member details */}
    </div>
  );
}

export default MemberDetails
