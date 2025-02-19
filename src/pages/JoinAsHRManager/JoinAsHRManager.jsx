import { useForm } from "react-hook-form";
import axios from "axios";
// payments
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFormJoin from "../Payment/CheckOutFormJoin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
const JoinAsHRManager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const imgbb_key = import.meta.env.VITE_IMGBB_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

  // const [packages, setPackages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const axiosPublic = useAxiosPublic();
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const password = data.password;

    const selectedPack = packages.find((pack) => pack._id === data.package);
    const profilePic = { image: data.profilePic[0] };
    const companyLogo = { image: data.companyLogo[0] };

    const resProfilePic = await axios.post(image_hosting_api, profilePic, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const resCompanyLogo = await axios.post(image_hosting_api, companyLogo, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // Combined validation for uppercase and lowercase
    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      setError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    const userInfo = {
      name: data.name,
      email: data.email,
      password: password,
      company: data.companyName,
      companyLogo: resCompanyLogo.data.data.display_url,
      photoURL: resProfilePic.data.data.display_url,
      role: "HRManager",
      selectedPackagePrice: selectedPack.price,
      employeeCount: selectedPack.numberOfEmployees,
    };

    setUserInfo(userInfo);

    axiosPublic
      .post("/create-payment-intent", {
        price: parseInt(data.package),
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Join as HR | AMS</title>
      </Helmet>
      <div
        className="flex justify-center items-center py-10 pt-20 min-h-screen"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-8 shadow-lg rounded-lg w-full max-w-md  border"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Join as HR Manager
          </h2>

          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("name")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="companyLogo"
            >
              Your Photo
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              {...register("profilePic")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              {...register("companyName")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="companyLogo"
            >
              Company Logo
            </label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              accept="image/*"
              {...register("companyLogo")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <label
            htmlFor="password"
            className="block text-sm font-medium "
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              {...register("password")}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3  focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              {...register("dob")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block  font-medium mb-2"
              htmlFor="package"
            >
              Select a Package
            </label>
            <select
              id="package"
              name="package"
              {...register("package")}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {packages?.map((pack) => (
                <option value={pack._id}>
                  {pack.title} - ${pack.price}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
          <p className="text-center mt-2">
            Already Joined?{" "}
            <Link to="/login" className="underline text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* payments */}
      {clientSecret && (
        <div className="my-10 w-9/12 mx-auto">
          <h1 className="text-3xl text-center font-bold">Pay Now</h1>
          <Elements stripe={stripePromise}>
            <CheckOutFormJoin clientSecret={clientSecret} userInfo={userInfo} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default JoinAsHRManager;
