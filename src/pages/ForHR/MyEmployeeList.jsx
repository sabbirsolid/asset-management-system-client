// import { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../Providers/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MyEmployeeList = () => {
//   const { user, loading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   // Fetch team members
//   const {
//     data: team,
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["team", user?.email],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`users/${user?.email}`);
//       return res.data.hrMembers;
//     },
//   });

//   // Handle remove member
//   const handleRemoveMember = async (memberId) => {
//     try {
//       const res = await axiosSecure.patch(`/api/team/remove`, {
//         memberId,
//         hrEmail: user.email,
//       });
//       if (res.data.modifiedCount > 0) {
//         alert("Member removed successfully!");
//         refetch(); // Refresh the team list
//       }
//     } catch (error) {
//       console.error("Failed to remove member:", error);
//       alert("Error removing member.");
//     }
//   };

//   if (isLoading) {
//     return <div>Loading team members...</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Employee List</h1>

//       <div className="bg-white shadow-md p-4 rounded-md">
//         <h2 className="text-xl font-semibold mb-4">Team Members</h2>
//         {team?.length === 0 ? (
//           <p>No team members found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2">Image</th>
//                   <th className="px-4 py-2">Name</th>
//                   <th className="px-4 py-2">Type</th>
//                   <th className="px-4 py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {team?.map((member) => (
//                   <tr key={member._id} className="border-t">
//                     <td className="px-4 py-2 text-center">
//                       <img
//                         src={member.imageUrl}
//                         alt={member.name}
//                         className="w-10 h-10 rounded-full mx-auto"
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-center">{member.name}</td>
//                     <td className="px-4 py-2 text-center">
//                       {member.isAdmin ? (
//                         <span
//                           className="text-green-500 font-semibold"
//                           title="Admin"
//                         >
//                           Admin
//                         </span>
//                       ) : (
//                         <span
//                           className="text-blue-500 font-semibold"
//                           title="Normal Employee"
//                         >
//                           Employee
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-2 text-center">
//                       <button
//                         onClick={() => handleRemoveMember(member._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                       >
//                         Remove From Team
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyEmployeeList;

import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch team members
  const { data: team, refetch } = useQuery({
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
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch(); 
        }
      }
    });
    try {
    } catch (error) {
      console.error("Failed to remove member:", error);
      alert("Error removing member.");
    }
  };

  // Define columns for the data table
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.imageUrl}
          alt={row.name}
          className="w-10 h-10 rounded-full mx-auto"
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
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Remove From Team
        </button>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        {team?.length === 0 ? (
          <p>No team members found.</p>
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
                  backgroundColor: "#f4f4f5",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              },
              cells: {
                style: {
                  textAlign: "center",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyEmployeeList;
