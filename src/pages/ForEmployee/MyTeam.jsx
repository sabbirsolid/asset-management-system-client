import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet-async";

const MyTeamPage = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: team, isLoading } = useQuery({
    queryKey: ["team", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`usersTeam/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  const columns = [
    {
      name: "Image",
      selector: (row) => row.photoURL,
      cell: (row) => (
        <img
          src={row.photoURL}
          alt={row.name}
          className="w-8 h-8 rounded-full object-cover"
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
          <span className="text-green-500 font-semibold" title="Admin">
            Admin
          </span>
        ) : (
          <span className="text-blue-500 font-semibold" title="Normal Employee">
            Employee
          </span>
        ),
      center: true,
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <Helmet>
        <title>My Team | AMS</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-4">My Team</h1>
      <div className=" shadow-md p-4 rounded-md">
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
