// EmployeeStatistics.js
import React from 'react';

const EmployeeStatistics = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Employee Statistics</h2>
      <p className="text-gray-600">Total Employees: 250</p>
      <p className="text-gray-600">Active Requests: 120</p>
      <p className="text-gray-600">Resolved Requests: 80%</p>
    </div>
  );
};

export default EmployeeStatistics;
