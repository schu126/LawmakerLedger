// components/MemberList.js
import React from 'react';
import { Link } from 'react-router-dom';

function MemberList() {
  // Dummy data for example
  const members = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ];

  return (
    <div>
      <h2>Members of Congress</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            <Link to={`/members/${member.id}`}>{member.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
