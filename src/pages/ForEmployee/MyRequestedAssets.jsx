import { useState, useContext } from "react";
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
import { Helmet } from "react-helmet-async";

const MyRequestedAssets = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject } = useUserRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ requestStatus: "", assetType: "" });

  const { data: requests = [], refetch } = useQuery({
    queryKey: [user?.email, "requests", searchTerm, filters],
    queryFn: async () => {
      const { requestStatus, assetType } = filters;
      const res = await axiosSecure.get("/filteredRequests", {
        params: {
          search: searchTerm,
          requestStatus,
          assetType,
          email: user.email,
          hrEmail: userObject.hrEmail,
        },
      });
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCancelRequest = (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel?",
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
      text: "You want to return this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch("/assetReturn", { assetId, requestedQuantity })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Approved!",
                text: "Items Returned",
                icon: "success",
              });
            }
          });
        axiosSecure.patch(`/requestReturned`, { requestId }).then((res) => {
          if (res.data.modifiedCount > 0) {
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
      sortable: true
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
        <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
          {row.status === "pending" && (
            <button
              onClick={() => handleCancelRequest(row._id)}
              // className="bg-red-500 text-white px-2 py-1 rounded w-full lg:w-auto text-sm lg:text-base hover:bg-red-600 transition"
              className="btn btn-sm bg-red-600 text-white w-full"
            >
              Cancel
            </button>
          )}
          {row.status === "approved" && (
            <div className="flex flex-col gap-2 w-full lg:w-auto items-start">
              <PDFDownloadLink
                document={<RequestDetailsPDF request={row} />}
                fileName={`Request_Details_${row.name}.pdf`}
                // className="bg-blue-500 text-white px-2 py-1 rounded w-full lg:w-auto text-sm lg:text-base hover:bg-blue-600 transition"
                className="btn btn-sm bg-green-600 text-white w-full"
              >
                Print
              </PDFDownloadLink>
              {row.type === "returnable" && (
                <button
                  onClick={() =>
                    handleReturnAsset(
                      row._id,
                      row.assetId,
                      row.requestedQuantity
                    )
                  }
                  disabled={row.status === "returned"}
                  className={`btn btn-sm w-full ${
                    row.status === "returned"
                      ? "bg-gray-500 "
                      : "bg-yellow-500  text-black"
                  }`}
                >
                  {row.status === "returned" ? "Returned" : "Return"}
                </button>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 pt-20">
      <Helmet>
        <title>My Assets | AMS</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-4">
        My Requested Assets
      </h1>
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
