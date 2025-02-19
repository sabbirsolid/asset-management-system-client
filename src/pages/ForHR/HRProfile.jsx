import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserRoles from "../../hooks/useUserRoles";
import { Helmet } from "react-helmet-async";

const HRProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject, refetch } = useUserRoles();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    axiosSecure.patch(`/hrProfile/${user.email}`, { name }).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Profile data updated successfully!",
          icon: "success",
          draggable: true,
        });
        refetch();
      }
    });
  };

  return (
    <div className="p-20 min-h-screen ">
      <form
        onSubmit={handleUpdate}
        className="p-6 border rounded-lg max-w-lg mx-auto"
      >
        <Helmet>
          <title>HR Profile | AMS</title>
        </Helmet>
        <h1 className="text-2xl text-center font-bold mb-4">HR Profile</h1>

        {/* Profile Image Section */}
        <div className="mb-6 text-center">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-gray-300">
            {userObject?.photoURL ? (
              <img
                src={userObject.photoURL}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full ">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
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
            className="w-full border p-2 rounded "
          />
        </div>
        <button className="w-full p-2 rounded btn text-white bg-blue-500 ">
          Update
        </button>
      </form>
    </div>
  );
};

export default HRProfile;
