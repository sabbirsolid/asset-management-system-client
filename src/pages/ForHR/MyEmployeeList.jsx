import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserRoles from "../../hooks/useUserRoles";
import { Helmet } from "react-helmet-async";

const MyEmployeeList = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState({ title: "", description: "" });
  const { userObject } = useUserRoles();

  // Fetch team members
  const {
    data: team,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["team", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user?.email}`);
      return res.data.hrMembers;
    },
  });

  // Handle remove member
  const handleRemoveMember = async (memberId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/usersRemove/${memberId}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "The member has been removed.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  // Handle notice submission
  const handleNoticeSubmit = async () => {
    if (!notice.title || !notice.description) {
      Swal.fire("Error", "Title and description cannot be empty.", "error");
      return;
    }
    const noticeWithAllInfo = {
      title: notice.title,
      description: notice.description,
      hrEmail: userObject.email,
      company: userObject.company,
      postedDate: new Date(),
    };

    try {
      const res = await axiosSecure.post("/addNotice", noticeWithAllInfo);
      if (res.data.insertedId) {
        Swal.fire("Success", "Notice added successfully.", "success");
        setNotice({ title: "", description: "" });
        setModalOpen(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add notice. Please try again.", "error");
    }
  };

  // Define columns for the data table
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.photoURL}
          alt={row.name}
          className="w-8 h-8 rounded-full object-cover mx-auto shadow-sm"
        />
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) =>
        row.isAdmin ? (
          <span className="text-green-500 font-semibold" title="Admin">
            Admin
          </span>
        ) : (
          <span className="text-blue-500 font-semibold" title="Normal Employee">
            Employee
          </span>
        ),
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleRemoveMember(row._id)}
          className="bg-red-500 text-white btn btn-sm"
        >
          Remove
        </button>
      ),
      sortable: false,
    },
  ];

  if (loading || isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 pt-20 min-h-screen">
      <Helmet>
        <title>My Employee List | AMS</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-6 ">
        Employee List
      </h1>
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 ">
          Number of Employees: {team?.length}
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add a Notice
        </button>
        {team?.length === 0 ? (
          <p className="text-gray-600">No team members found.</p>
        ) : (
          <DataTable
            columns={columns}
            data={team}
            pagination
            highlightOnHover
            striped
            customStyles={{
              headCells: {
                style: {
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#374151",
                },
              },
              cells: {
                style: {
                  textAlign: "center",
                  color: "#4B5563",
                },
              },
            }}
          />
        )}
      </div>

      {/* Modal for Adding a Notice */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4 ">
              Add a Notice
            </h2>
            <label className="block mb-2 font-medium">
              Title:
            </label>
            <input
              type="text"
              value={notice.title}
              onChange={(e) =>
                setNotice((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter notice title"
            />
            <label className="block mb-2 font-medium ">
              Description:
            </label>
            <textarea
              value={notice.description}
              onChange={(e) =>
                setNotice((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Enter notice description"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleNoticeSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Submit
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEmployeeList;
