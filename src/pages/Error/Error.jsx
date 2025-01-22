import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md">
       
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">
          We can't seem to find the page you're looking for.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
