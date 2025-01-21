import React, { useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePackages from "../../hooks/usePackages";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Payment/CheckOutForm";
import useUserRoles from "../../hooks/useUserRoles";
import Swal from "sweetalert2";
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
const AddEmployee = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [packageLimit, setPackageLimit] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { packages } = usePackages();
  const { userObject } = useUserRoles();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "users"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      setPackageLimit(res.data.hrInfo.employeeCount);
      setCurrentCount(res.data.hrMembers.length);
      return res.data;
    },
  });

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleAddSelectedMembers = () => {
    const updateInfo = {
      userIds: selectedUsers,
      hrEmail: user.email,
      company: userObject.company,
      companyLogo: userObject.companyLogo,
    };
    axiosSecure.patch("/multipleUsersAdd", updateInfo).then((res) => {
      if (res.data[0].modifiedCount > 0) {
        Swal.fire({
          title: "Users Added Successfully",
          icon: "success",
          draggable: true,
        });
        setSelectedUsers([]);
        refetch();
      }
    });
  };

  const handleAddOneMember = (id) => {
    axiosSecure
      .patch(`/usersAdd`, {
        id: id,
        hrEmail: user.email,
        company: users.hrInfo.company,
        companyLogo: users.hrInfo.companyLogo,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          alert("Member Added Successfully");
        }
      });
  };

  const handlePackageSelection = (e) => {
    const selectedId = e.target.value;
    console.log("id:", selectedId);
    const selectedPack = packages.find((pack) => pack._id === selectedId);
    setSelectedPackage(selectedPack);
    axiosSecure
      .post("/create-payment-intent", {
        price: parseInt(selectedPack.price),
      })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });

    setShowPayment(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Employee Page</h1>

      {/* Package Section */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Package Information</h2>
        <p>Current Employee Count: {currentCount}</p>
        <p>Employee Limit: {packageLimit}</p>
        {/* <select
          id="package"
          name="package"
          onClick={handlePackageSelection}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a package</option>
          {packages?.map((pack) => (
            <option key={pack._id} value={pack}>
              {pack.title} - ${pack.price}
            </option>
          ))}
        </select> */}
        <select
          id="package"
          name="package"
          onChange={handlePackageSelection}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a package</option>
          {packages?.map((pack) => (
            <option key={pack.id} value={pack._id}>
              {pack.title} - ${pack.price}
            </option>
          ))}
        </select>

        {showPayment && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Confirm Payment</h3>
            <p>
              Selected Package: {selectedPackage?.title} - $
              {selectedPackage?.price}
            </p>
            {clientSecret && (
              <div className="my-10 w-9/12 mx-auto">
                <h1 className="text-3xl text-center font-bold">Pay Now</h1>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    clientSecret={clientSecret}
                    refetch={refetch}
                    selectedPackage={selectedPackage}
                  />
                </Elements>
              </div>
            )}
          </div>
        )}
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
                      onClick={() => {
                        handleAddOneMember(user._id);
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
