import  { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DataTable from "react-data-table-component";

const MyTeamPage = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch team members
  const { data: team, isLoading } = useQuery({
    queryKey: ["team", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`usersTeam/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading team members...</div>;
  }

  // Define columns for the DataTable
  const columns = [
    {
      name: "Image",
      selector: (row) => row.imageUrl,
      cell: (row) => (
        <img
          src={row.imageUrl}
          alt={row.name}
          className="w-10 h-10 rounded-full"
        />
      ),
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Member Type",
      selector: (row) => (row.isAdmin ? "Admin" : "Employee"),
      cell: (row) =>
        row.isAdmin ? (
          <span
            className="text-green-500 font-semibold"
            title="Admin"
          >
            Admin
          </span>
        ) : (
          <span
            className="text-blue-500 font-semibold"
            title="Normal Employee"
          >
            Employee
          </span>
        ),
      center: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>

      <div className="bg-white shadow-md p-4 rounded-md">
        <DataTable
          title="Team Members"
          columns={columns}
          data={team}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default MyTeamPage;