// TopRequestedItems.js
import React from "react";

const TopRequestedItem = () => {
  const items = ["Laptops", "Office Chairs", "Monitors", "Keyboards"];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Top Requested Items</h2>
      <ol className="list-decimal list-inside">
        {items.map((item, index) => (
          <li key={index} className="p-2">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopRequestedItem;
