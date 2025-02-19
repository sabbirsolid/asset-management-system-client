import React, { useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AssetList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ stockStatus: "", assetType: "" });
  const [sortConfig, setSortConfig] = useState({ field: "name", order: "asc" });
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [updatedAssetData, setUpdatedAssetData] = useState({});
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: assets = [], refetch } = useQuery({
    queryKey: [user?.email, "assets", searchTerm, filters, sortConfig],
    queryFn: async () => {
      const { field, order } = sortConfig;
      const { stockStatus, assetType } = filters;
      const res = await axiosSecure.get("/assetsHR", {
        params: {
          search: searchTerm,
          sortOrder: order,
          stockStatus,
          assetType,
          email: user?.email,
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
    refetch();
    setSortConfig({ field: column.selector, order: sortDirection });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/assetDelete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your asset has been deleted.",
              icon: "success",
            });
        refetch();
          }
        });
      }
    });
  };

  const handleUpdate = (asset) => {
    setSelectedAsset(asset);
    setUpdatedAssetData({ ...asset });
  };

  const handleUpdateSubmit = async () => {
    if (
      !updatedAssetData.name ||
      !updatedAssetData.quantity ||
      !updatedAssetData.type
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all the fields",
        icon: "error",
      });
      return;
    }
    const response = await axiosSecure.patch(
      `/assetUpdate/${selectedAsset._id}`,
      updatedAssetData
    );
    if (response.data.modifiedCount > 0) {
      Swal.fire({
        title: "Updated!",
        text: "The asset has been updated.",
        icon: "success",
      });
      refetch();
      setSelectedAsset(null);
    }
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      
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
        <div className="lg:flex justify-center items-center my-2 gap-2">
          <button
            onClick={() => handleUpdate(row)}
            className="bg-yellow-500 text-white btn btn-sm "
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white btn btn-sm "
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 pt-20">
      <Helmet>
        <title>Asset List | AMS</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-4">Asset List</h1>

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded  mb-4"
      />

      {/* Filter Section */}
      <div className="lg:flex gap-4 mb-4">
        <select
          name="stockStatus"
          value={filters.stockStatus}
          onChange={handleFilterChange}
          className="border mt-2 p-2 rounded"
        >
          <option value="">Filter by Stock Status</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        <select
          name="assetType"
          value={filters.assetType}
          onChange={handleFilterChange}
          className="border mt-2 p-2 rounded"
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

      {/* Update Modal */}
      {selectedAsset && (
        <div className="fixed inset-0  bg-opacity-75 flex justify-center items-center">
          <div className=" p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Asset</h3>
            <input
              type="text"
              value={updatedAssetData.name}
              onChange={(e) =>
                setUpdatedAssetData({
                  ...updatedAssetData,
                  name: e.target.value,
                })
              }
              placeholder="Asset Name"
              className="border p-2 mb-4 w-full"
            />
            <input
              type="number"
              value={updatedAssetData.quantity}
              onChange={(e) =>
                setUpdatedAssetData({
                  ...updatedAssetData,
                  quantity: e.target.value,
                })
              }
              placeholder="Quantity"
              className="border p-2 mb-4 w-full"
            />
            <select
              value={updatedAssetData.type}
              onChange={(e) =>
                setUpdatedAssetData({
                  ...updatedAssetData,
                  type: e.target.value,
                })
              }
              className="border p-2 mb-4 w-full"
            >
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedAsset(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
