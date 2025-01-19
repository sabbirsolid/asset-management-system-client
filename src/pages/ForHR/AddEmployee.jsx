import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddEmployee = () => {
  //   const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [packageLimit, setPackageLimit] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "users"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
    //   const hrMembers = await axiosSecure.get()
      //   console.log(res.data);
      setPackageLimit(parseInt(res.data.hrInfo.selectedPackage));
      setCurrentCount(res.data.hrMembers.length)
      return res.data;
    },
  });
  console.log(users);
  //   const {unemployedUsers, hrInfo}  = users;
  //   console.log(unemployedUsers, hrInfo);

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleAddSelectedMembers = async () => {
    try {
      const { data } = await axios.post("/api/hr/add-members", {
        userIds: selectedUsers,
      });
      alert(data.message);
      setSelectedUsers([]);
      setCurrentCount(data.updatedCount);
      setUsers(data.remainingUsers);
    } catch (error) {
      console.error("Error adding members:", error);
      alert("Failed to add selected members.");
    }
  };

  const handleAddOneMember = (id) =>{
    axiosSecure.patch(`/users`,{
        id: id,
        hrEmail: user.email,
        company: users.hrInfo.company

    })
    .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount>0){
            refetch();
            alert('Member Added Successfully')
        }
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Employee Page</h1>

      {/* Package Section */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Package Information</h2>
        <p>Current Employee Count: {currentCount}</p>
        <p>Package Limit: {packageLimit}</p>
        <button
          onClick={() => (window.location.href = "/upgrade-package")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Increase Limit
        </button>
      </div>

      {/* User List Section */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Available Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.unemployedUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{user.name}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={async () => {
                        await handleAddOneMember(user._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      Add to Team
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddSelectedMembers}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Selected Members to the Team
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
