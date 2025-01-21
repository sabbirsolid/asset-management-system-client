import React, { useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const AssetList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ stockStatus: "", assetType: "" });
  const [sortConfig, setSortConfig] = useState({ field: "name", order: "asc" });
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: assets = [] } = useQuery({
    queryKey: [user?.email, "assets", searchTerm, filters, sortConfig],
    queryFn: async () => {
      const { field, order } = sortConfig;
      const { stockStatus, assetType } = filters;

      // Send query parameters to the server
      const res = await axiosSecure.get("/assetsHR", {
        params: {
          search: searchTerm,
          sortField: field,
          sortOrder: order,
          stockStatus,
          assetType,
          email: user?.email
        },
      });
      return res.data;
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (column, sortDirection) => {
    setSortConfig({ field: column.selector, order: sortDirection });
  };
  
  const handleDelete = (column, sortDirection) => {
    setSortConfig({ field: column.selector, order: sortDirection });
  };
  

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Product Type",
      selector: (row) => row.type,
    },
    {
      name: "Product Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Date Added",
      selector: (row) => new Date(row.addedDate).toLocaleDateString(),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asset List</h1>

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Filter Section */}
      <div className="flex gap-4 mb-4">
        <select
          name="stockStatus"
          value={filters.stockStatus}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Filter by Stock Status</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        <select
          name="assetType"
          value={filters.assetType}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Filter by Asset Type</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-Returnable</option>
        </select>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={assets}
        pagination
        highlightOnHover
        sortServer
        onSort={handleSort}
      />
    </div>
  );
};
export default AssetList;
