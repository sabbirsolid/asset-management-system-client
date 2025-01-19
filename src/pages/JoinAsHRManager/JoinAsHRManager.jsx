import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { auth } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";

// payments
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Payment/CheckOutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
const JoinAsHRManager = () => {
  const { createUserWithEmail, loading, signInWithGoogle, setPrice } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const imgbb_key = import.meta.env.VITE_IMGBB_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axiosPublic.get("/packages").then((res) => {
      console.log(res.data);
      setPackages(res.data);
    });
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const password = data.password;
    const imageFile = { image: data.companyLogo[0] };
    const response = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(response.data.data.display_url);
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

    createUserWithEmail(data.email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: "Nai",
        })
          .then((res) => {
            // navigate(location?.state ? location.state : "/");

            const userInfo = {
              name: data.name,
              email: data.email,
              company: data.companyName,
              companyLogo: response.data.data.display_url,
              role: "HRManager",
              selectedPackage: data.package,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                alert(
                  "data is saved to the database, data of:",
                  res.user?.displayName
                );
              }
            });
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "You have successfully created an account",
              showConfirmButton: true,
            });
            // reset();
            // navigate("/payment");
            axiosSecure
              .post("/create-payment-intent", {
                price: parseInt(data.package),
              })
              .then((res) => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
              });
          })
          .catch((error) => {
            setError(`Failed to update profile: ${error.message}`);
          });
      })
      .catch((error) => {
        setError(`Failed to register: ${error.message}`);
      });
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   const password = data.password;
  //   // Combined validation for uppercase and lowercase
  //   if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
  //     setError(
  //       "Password must contain at least one uppercase and one lowercase letter."
  //     );
  //     return;
  //   }
  //   if (password.length < 6) {
  //     setError("Password must be at least 6 characters long.");
  //     return;
  //   }
  //   setError("");

  //   createUserWithEmail(data.email, password)
  //     .then(() => {
  //       updateProfile(auth.currentUser, {
  //         displayName: data.name,
  //         photoURL: "Nai",
  //       })
  //         .then(() => {
  //           navigate("/");
  //           // navigate(location?.state ? location.state : "/");
  //           const userInfo = {
  //             name: data.name,
  //             email: data.email,
  //             role: "employee",
  //           };
  //           axiosPublic.post("/users", userInfo).then((res) => {
  //             console.log(res.data);
  //             if (res.data.insertedId) {
  //               alert("data is saved to the database, data of:", data.name);
  //             }
  //           });
  //           Swal.fire({
  //             position: "top-center",
  //             icon: "success",
  //             title: "You have successfully created an account",
  //             showConfirmButton: true,
  //           });
  //           reset();
  //         })
  //         .catch((error) => {
  //           setError(`Failed to update profile: ${error.message}`);
  //         });
  //     })
  //     .catch((error) => {
  //       setError(`Failed to register: ${error.message}`);
  //     });
  // };

  // const handleSignInWithGoogle = () => {
  //   signInWithGoogle().then((res) => {
  //     const userInfo = {
  //       name: res.user.displayName,
  //       email: res.user.email,
  //       role: "HRManager",
  //     };
  //     axiosPublic.post("/users", userInfo).then((res) => {
  //       console.log(res.data);
  //       if (res.data.insertedId) {
  //         alert(
  //           "data is saved to the database, data of:",
  //           data.user.displayName
  //         );
  //       }
  //     });
  //     console.log(res.user);
  //     Swal.fire({
  //       position: "top-center",
  //       icon: "success",
  //       title: "You have successfully created an account",
  //       showConfirmButton: true,
  //     });
  //   });
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner text-info text-5xl"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Join as HR Manager
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
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
              className="block text-gray-700 font-medium mb-2"
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
              className="block text-gray-700 font-medium mb-2"
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
              className="block text-gray-700 font-medium mb-2"
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
            className="block text-sm font-medium text-gray-700"
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
              className="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
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
              className="block text-gray-700 font-medium mb-2"
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
                <option value={pack.price}>
                  {pack.title} - ${pack.price}
                </option>
              ))}
              {/* <option value="5">5 Members - $5</option>
            <option value="10">10 Members - $8</option>
            <option value="20">20 Members - $15</option> */}
            </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
      </div>
      {/* payments */}
      {clientSecret && (
        <div className="my-10 w-9/12 mx-auto">
          <h1 className="text-3xl text-center font-bold">Pay Now</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
      {/* <GoogleLogin></GoogleLogin> */}
      {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Or sign up using</p>
        <button
          onClick={handleSignInWithGoogle}
          className="mt-2 flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Continue with Google
        </button>
      </div> */}
    </div>
  );
};

export default JoinAsHRManager;
