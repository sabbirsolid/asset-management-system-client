import { useState, useEffect } from 'react';

const PendingRequests = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`/api/user/${userId}/pending-requests`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="pending-requests">
      <h2>My Pending Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>{req.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequests;
