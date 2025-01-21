import React, { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
const {user} = useContext(AuthContext);
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["allRequests",user?.email, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get("/allRequestsHR", {
        params: { search: searchTerm, email: user?.email },
      });
      return res.data;
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApproveRequest = (requestId, assetId, requestedQuantity) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/requests/approve/${requestId}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Approved!",
              text: "The request has been approved.",
              icon: "success",
            });
            refetch();
          }
        });
        axiosSecure
          .patch(`/assetDecrease`, { assetId, requestedQuantity })
          .then((res) => {
            console.log(res.data);
          });
      }
    });
  };

  const handleRejectRequest = (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/requests/reject/${requestId}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Rejected!",
              text: "The request has been rejected.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
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
      name: "Requester Email",
      selector: (row) => row.requesterEmail,
    },
    {
      name: "Requester Name",
      selector: (row) => row.requesterName,
    },
    {
      name: "Request Date",
      selector: (row) => new Date(row.requestDate).toLocaleDateString(),
    },
    {
      name: "Additional Note",
      selector: (row) => row.additionalNote || "N/A",
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "pending" && (
            <>
              <button
                onClick={() =>
                  handleApproveRequest(
                    row._id,
                    row.assetId,
                    row.requestedQuantity
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve ({row.requestedQuantity})
              </button>
              <button
                onClick={() => handleRejectRequest(row._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Requests</h1>

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search by requester name or email"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={requests}
        pagination
        highlightOnHover
        sortServer
      />
    </div>
  );
};

export default AllRequests;
