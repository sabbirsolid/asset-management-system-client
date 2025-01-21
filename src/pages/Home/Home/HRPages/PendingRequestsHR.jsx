import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaClock } from "react-icons/fa";

const PendingRequestsHR = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch pending requests
  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pendingRequests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/pendingRequestsHR", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  return (
    <div className=" shadow-sm rounded-lg p-4 max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold  mb-4 text-center">
        Pending Requests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pendingRequests?.map((request) => (
          <div
            key={request._id}
            className="flex flex-col justify-between bg-gray-50 border border-gray-300 rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center space-x-2">
              <FaClock className="text-yellow-500 text-xl" />
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {request.name}
              </h3>
            </div>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Requester:</span>{" "}
              {request.requesterName}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Email:</span>{" "}
              {request.requesterEmail}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Quantity:</span>{" "}
              {request.requestedQuantity}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Notes:</span> {request.notes}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-full">
                {request.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequestsHR;