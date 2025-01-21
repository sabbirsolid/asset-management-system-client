// LimitedStockItems.js
import React from 'react';

const LimitedStockItems = () => {
  const stockItems = [
    { name: 'Staplers', quantity: 5 },
    { name: 'Notepads', quantity: 3 },
    { name: 'Markers', quantity: 7 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Limited Stock Items</h2>
      <ul className="space-y-2">
        {stockItems.map((item, index) => (
          <li key={index} className="p-2 border rounded-lg flex justify-between">
            <span>{item.name}</span>
            <span className="text-red-500">Qty: {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LimitedStockItems;