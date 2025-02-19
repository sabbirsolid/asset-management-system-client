import { useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRoles from "../../hooks/useUserRoles";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const RequestForAnAsset = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ stockStatus: "", assetType: "" });
  const [sortConfig, setSortConfig] = useState({ field: "name", order: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject } = useUserRoles();

  const { data: assets = [] } = useQuery({
    queryKey: [user?.email, "assets", searchTerm, filters, sortConfig],
    queryFn: async () => {
      const { field, order } = sortConfig;
      const { stockStatus, assetType } = filters;

      const res = await axiosSecure.get("/assets", {
        params: {
          search: searchTerm,
          sortField: field,
          sortOrder: order,
          stockStatus,
          assetType,
          email: user?.email,
        },
      });
      return res.data;
    },
  });
  const { data: requests = [], refetch } = useQuery({
    queryKey: [user?.email, "filteredRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/filteredRequests", {
        params: {
          email: user.email,
          hrEmail: userObject.hrEmail,
        },
      });
      return res.data;
    },
  });
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (column, sortDirection) => {
    setSortConfig({ field: column.selector, order: sortDirection });
  };

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
    setAdditionalNotes("");
    setRequestedQuantity(1);
  };

  const handleRequest = async () => {
    if (!selectedAsset || !user) return;

    const requestData = {
      assetId: selectedAsset._id,
      name: selectedAsset.name,
      type: selectedAsset.type,
      requesterName: user.displayName,
      requesterEmail: user.email,
      notes: additionalNotes,
      requestDate: new Date(),
      requestedQuantity,
      status: "pending",
      hrEmail: userObject?.hrEmail,
    };

    const res = await axiosSecure.post("/requests", requestData);

    if (res.data.insertedId) {
      Swal.fire({
        title: "Request submitted successfully!",
        icon: "success",
        draggable: true,
      });
      closeModal();
      refetch();
    }
  };

  const columns = [
    {
      name: "Asset Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Asset Type",
      selector: (row) => row.type,
    },
    {
      name: "Availability",
      selector: (row) => (row.quantity > 0 ? "Available" : "Out of Stock"),
    },

    {
      name: "Actions",
      cell: (row) => {
        const pendingRequest = requests?.find(
          (req) => req.assetId === row._id && req.status === "pending"
        );

        return (
          <button
            onClick={() => openModal(row)}
            className={`${
              row.quantity > 0 && !pendingRequest
                ? "bg-blue-500 text-"
                : "bg-gray-700  cursor-not-allowed"
            } btn btn-sm text-white `}
            disabled={parseInt(row.quantity) === 0 || !!pendingRequest}
          >
            {pendingRequest ? "Pending" : "Request"}
          </button>
        );
      },
    },
  ];

  0;

  return (
    <div className="p-6 pt-20">
      <Helmet>
        <title>Request for an Asset | AMS</title>
      </Helmet>

      <h1 className="text-2xl text-center font-bold mb-4">
        Request for an Asset
      </h1>

      <form onSubmit={handleSearch} action="">
        {/* Search Section */}

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Filter Section */}
        <div className="lg:flex gap-4 mb-4">
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
      </form>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={assets}
        pagination
        highlightOnHover
        sortServer
        onSort={handleSort}
      />

      {/* Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className=" p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Request Asset: {selectedAsset?.name}
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Additional Notes:
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="border w-full p-2 rounded"
                rows={4}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Quantity:</label>
              <input
                type="number"
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(Number(e.target.value))}
                className="border p-2 rounded w-full"
                min={1}
                max={selectedAsset?.quantity || 1}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestForAnAsset;
