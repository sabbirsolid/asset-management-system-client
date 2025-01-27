import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRoles from "../../hooks/useUserRoles";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();

  const { userObject } = useUserRoles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const assetData = {
      name: data.name,
      type: data.type,
      quantity: parseInt(data.quantity),
      hrEmail: userObject.email,
      company: userObject.company,
    };

    axiosSecure.patch("/assets", assetData).then((res) => {
      if (res.data.modifiedCount > 0 || res.data.upsertedId) {
        reset();
        Swal.fire({
          title: "Asset added successfully!",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  return (
    <div className="p-6 lg:w-2/5 mx-auto border rounded-lg my-5">
      <Helmet>
        <title>Add Asset | AMS</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-4">Add an Asset</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <label className="block mb-1 font-bold">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="border p-2 rounded w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-bold">Product Type</label>
          <select
            {...register("type", { required: "Product type is required" })}
            className="border p-2 rounded  w-full"
          >
            <option value="">Select Type</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-Returnable</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-bold">Product Quantity</label>
          <input
            type="number"
            {...register("quantity", { required: "Quantity is required" })}
            className="border p-2 rounded  w-full"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500  text-white px-4 py-2 rounded"
          >
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
