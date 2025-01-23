import React, { useState, useContext } from "react";
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

  const { data: users, refetch } = useQuery({
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
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
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
          confirmButtonColor: "#3085d6",
        });
        setSelectedUsers([]);
        refetch();
      }
    });
  };

  const handleAddOneMember = (id) => {
    axiosSecure
      .patch(`/usersAdd`, {
        id,
        hrEmail: user.email,
        company: users.hrInfo.company,
        companyLogo: users.hrInfo.companyLogo,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Member Added Successfully",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      });
  };

  const handlePackageSelection = (e) => {
    const selectedId = e.target.value;
    const selectedPack = packages.find((pack) => pack._id === selectedId);
    setSelectedPackage(selectedPack);

    axiosSecure
      .post("/create-payment-intent", { price: parseInt(selectedPack.price) })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });

    setShowPayment(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Add Employee</h1>

      {/* Package Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Package Information</h2>
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <p className="text-gray-600">Current Employees: <span className="font-medium">{currentCount}</span></p>
          <p className="text-gray-600">Employee Limit: <span className="font-medium">{packageLimit}</span></p>
        </div>
        <select
          id="package"
          name="package"
          onChange={handlePackageSelection}
          className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a package</option>
          {packages?.map((pack) => (
            <option key={pack._id} value={pack._id}>
              {pack.title} - ${pack.price}
            </option>
          ))}
        </select>

        {showPayment && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Confirm Payment</h3>
            <p className="text-gray-600 mb-4">
              Selected Package: <span className="font-medium">{selectedPackage?.title}</span> - ${" "}
              <span className="font-medium">{selectedPackage?.price}</span>
            </p>
            {clientSecret && (
              <div className="my-6">
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
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Available Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium">Select</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.unemployedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                      className="form-checkbox text-blue-600 h-4 w-4"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleAddOneMember(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddSelectedMembers}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none w-full"
        >
          Add Selected Members
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
