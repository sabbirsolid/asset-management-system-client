import React, { useState, useEffect } from 'react';

const MonthlyRequests = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`/api/user/${userId}/monthly-requests`)
      .then((res) => res.json())
      .then((data) =>
        setRequests(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="monthly-requests">
      <h2>My Monthly Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.title} - {new Date(req.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyRequests;
