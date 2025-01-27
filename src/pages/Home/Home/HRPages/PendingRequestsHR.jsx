import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaClock } from "react-icons/fa";

const PendingRequestsHR = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pendingRequests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/pendingRequestsHR", {
        params: { email: user.email },
      });
      return res.data;
    },
  });
  if (pendingRequests.length === 0) {
    return (
      <div className="my-10 p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Pending Requests
        </h2>
        <p className="text-center text-red-500 text-lg">No Requests to Show</p>
      </div>
    );
  }

  return (
    <section className="bg-white my-10 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Pending Requests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pendingRequests.map((request) => (
          <div
            key={request._id}
            className="flex flex-col bg-gray-50 border rounded-md p-4 space-y-2 hover:shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <FaClock className="text-yellow-500" />
              <p className="font-medium text-gray-700">{request.name}</p>
            </div>
            <p className="text-sm text-gray-500">
              Requester: {request.requesterName}
            </p>
            <p className="text-sm text-gray-500">
              Email: {request.requesterEmail}
            </p>
            <p className="text-sm text-gray-500">Notes: {request.notes}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingRequestsHR;
