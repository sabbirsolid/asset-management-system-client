import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const handleSignInWithGoogle = () => {
    signInWithGoogle().then((res) => {
      if (res?.user) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "You have successfully Logged in!",
          showConfirmButton: true,
        });
      }
    });
  };

  return (
    <div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Or sign up using</p>
        <button
          onClick={handleSignInWithGoogle}
          className="mt-2 flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
