import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const assetData = {
      name: data.name,
      type: data.type,
      quantity: parseInt(data.quantity),
    };
    console.log(assetData);
    axiosSecure.patch("http://localhost:5000/assets", data).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0 || res.data.upsertedId) {
        reset();
        alert("Asset added successfully!");
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add an Asset</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
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
            className="border p-2 rounded w-full"
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
            className="border p-2 rounded w-full"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
