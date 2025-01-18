import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserRoles from "../../hooks/useUserRoles";

const HRProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject, isLoading, refetch } = useUserRoles();
  //   console.log(userObject);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);
    axiosSecure.patch(`/hrProfile/${user.email}`, {name} ).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Profile Updated Successfully",
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    });
  };

  return (
    <form onSubmit={handleUpdate} className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">HR Profile</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="fullName">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="name"
          defaultValue={userObject?.name}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={userObject?.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>
      <button
        className={`w-full p-2 rounded text-white ${
          isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default HRProfile;
