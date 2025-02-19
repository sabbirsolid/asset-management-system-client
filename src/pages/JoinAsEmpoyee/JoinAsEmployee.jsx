import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const JoinAsEmployee = () => {
  const { createUserWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const imgbb_key = import.meta.env.VITE_IMGBB_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

  const onSubmit = async (data) => {
    const profilePic = { image: data.profilePic[0] };
    const resProfilePic = await axios.post(image_hosting_api, profilePic, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const password = data.password;
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
          .then(() => {
            // navigate(location?.state ? location.state : "/");
            const userInfo = {
              name: data.name,
              email: data.email,
              role: "employee",
              photoURL: resProfilePic.data.data.display_url,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "You have successfully created an account",
                  showConfirmButton: true,
                });
              }
            });
            reset();
            navigate("/");
          })
          .catch((error) => {
            setError(`Failed to update profile: ${error.message}`);
          });
      })
      .catch((error) => {
        setError(`Failed to register: ${error.message}`);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle().then((res) => {
      const userInfo = {
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        role: "employee",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "You have successfully created an account",
            showConfirmButton: true,
          });
          navigate("/");
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 pt-20">
      <Helmet>
        <title>Join as Employee | AMS</title>
      </Helmet>
      <div className=" shadow-lg rounded-lg p-6 max-w-md w-full border ">
        <h2 className="text-2xl font-bold text-center  mb-4">
          Join as an Employee
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium "
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              {...register("name")}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
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

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium "
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              {...register("dob")}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500  py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm ">Or sign up using</p>
          <button
            onClick={handleSignInWithGoogle}
            className="mt-2 flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Continue with Google
          </button>
        </div>
        <p className="text-center mt-2">
          Already Joined?{" "}
          <Link to="/login" className="underline text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinAsEmployee;
