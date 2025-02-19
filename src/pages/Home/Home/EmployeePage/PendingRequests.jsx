import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"; 
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const PendingRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: requests = [] } = useQuery({
    queryKey: ["pendingRequests", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/pendingRequest", {
        params: { email: user?.email },
      });
      return response.data;
    },
    enabled: !!user?.email,
  });

 
  if (requests.length === 0) {
    return (
      <div className="pt-20 p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        My Pending Requests
        </h2>
        <p className="text-center text-red-500 text-lg">No Requests to Show</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-20 rounded-lg shadow-md max-w-full md:max-w-2xl lg:max-w-3xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">My Pending Requests</h2>
      {requests.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {requests.map((req) => (
            <li
              key={req._id}
              className="py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center rounded-lg hover:bg-gray-100 transition duration-200 space-y-2 sm:space-y-0"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center w-full space-y-2 sm:space-y-0">
                <p className="font-semibold text-lg sm:text-xl -900 truncate">{req.name}</p>
                <p className="text-sm -500 sm:ml-4">Requested by: {req.requesterName}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <p className="text-sm font-semibold -600 sm:ml-4">Requested Quantity: {req.requestedQuantity}</p>
                <span
                  className={`text-sm font-bold ${
                    req.status === "returned" ? "text-green-500" : req.status === "pending" ? "text-yellow-500" : "text-red-500"
                  } sm:ml-4`}
                >
                  Status: {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center -500 text-lg">No pending requests.</p>
      )}
    </div>
  );
};

export default PendingRequests;
