import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MemberDetails.css';

function MemberDetails() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]);

  const fetchMemberDetails = async () => {
    try {
      const response = await fetch(`/members/${memberId}`);
      if (response.status === 200) {
        const data = await response.json();
        setMember(data);
      } else if (response.status !== 304) {
        throw new Error('Error fetching member details');
      }
    } catch (error) {
      console.error('Error fetching member details:', error);
    }
  };

  if (!member) {
    return <div>Loading...</div>;
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

export default MemberDetails;