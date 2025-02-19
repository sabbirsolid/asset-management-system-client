import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const History = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: [user?.email, "returned"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/returnedRequest`, {
        params: {
          email: user?.email,
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Returned Assets History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {requests.length === 0 ? (
          <p>No returned items available.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <h3 className="font-semibold text-lg mb-2">{request.name}</h3>
              <p className="text-sm mb-1">
                Requested Quantity: {request.requestedQuantity}
              </p>
              <p className="text-sm mb-1">
                Status: <span className="text-green-500">{request.status}</span>
              </p>
              <p className="text-sm mb-1">
                Requested By: {request.requesterName}
              </p>
              <p className="text-sm mb-3">Notes: {request.notes}</p>
              <div className="flex justify-between w-full">
                <span className="text-sm">
                  Request Date:{" "}
                  {new Date(request.requestDate).toLocaleDateString()}
                </span>
                <span className="text-sm">
                  Approval Date:{" "}
                  {new Date(request.approvalDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
