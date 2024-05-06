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
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Members of Congress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <div key={member.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
            <Link to={`/members/${member.id}`} className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out text-lg font-medium">
              {member.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberList;
