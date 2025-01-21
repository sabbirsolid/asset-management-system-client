import React, { useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import Swal from "sweetalert2";
import useUserRoles from "../../hooks/useUserRoles";

const MyRequestedAssets = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {userObject} = useUserRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ requestStatus: "", assetType: "" });

  const { data: requests = [], refetch } = useQuery({
    queryKey: [user?.email, "requests", searchTerm, filters],
    queryFn: async () => {
      const { requestStatus, assetType } = filters;
      const res = await axiosSecure.get("/filteredRequests", {
        params: { search: searchTerm, requestStatus, assetType, email:user.email, hrEmail: userObject.hrEmail },
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

  const handleCancelRequest = (requestId) => {
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
        axiosSecure.delete(`/requests/${requestId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });

    
  };

  const handleReturnAsset = async (requestId, assetId, requestedQuantity) => {
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
            axiosSecure.patch('/assetReturn', {assetId, requestedQuantity}).then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Approved!",
                  text: "Items Returned",
                  icon: "success",
                });
                
              }
            });
            axiosSecure
              .patch(`/requestReturned`, { requestId })
              .then((res) => {
                if(res.data.modifiedCount>0){
                  refetch();
                }
              });
          }
        });
   

  };

  const styles = StyleSheet.create({
    page: { padding: 20 },
    companyInfo: { marginBottom: 20 },
    details: { marginBottom: 10 },
    footer: { marginTop: 40, textAlign: "center", fontSize: 12 },
  });

  const RequestDetailsPDF = ({ request }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.companyInfo}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Company Name</Text>
          <Text>Email: {request.requesterEmail}</Text>
        </View>
        <View style={styles.details}>
          <Text>Asset Name: {request.name}</Text>
          <Text>Asset Type: {request.type}</Text>
          <Text>
            Request Date: {new Date(request.requestDate).toLocaleDateString()}
          </Text>
          <Text>
            Approval Date: {new Date(request.approvalDate).toLocaleDateString()}
          </Text>
          <Text>Request Status: {request.status}</Text>
        </View>
        <Text style={styles.footer}>
          Printed on {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );

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
      name: "Request Date",
      selector: (row) => new Date(row.requestDate).toLocaleDateString(),
    },
    {
      name: "Approval Date",
      selector: (row) =>
        row.approvalDate
          ? new Date(row.approvalDate).toLocaleDateString()
          : "N/A",
    },
    {
      name: "Request Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "pending" && (
            <button
              onClick={() => handleCancelRequest(row._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          {row.status === "approved" && (
            <>
              <PDFDownloadLink
                document={<RequestDetailsPDF request={row} />}
                fileName={`Request_Details_${row.name}.pdf`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Print
              </PDFDownloadLink>
              {row.type === "returnable" && (
                <button
                  onClick={() => handleReturnAsset(row._id, row.assetId, row.requestedQuantity)}
                  disabled={row.status === "returned"}
                  className={`${
                    row.status === "returned"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500"
                  } text-white px-4 py-2 rounded`}
                >
                  Return
                </button>
              )}
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Requested Assets</h1>

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search by asset name"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Filter Section */}
      <div className="flex gap-4 mb-4">
        <select
          name="requestStatus"
          value={filters.requestStatus}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Filter by Request Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
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
        data={requests}
        pagination
        highlightOnHover
        sortServer
      />
    </div>
  );
};

export default MyRequestedAssets;