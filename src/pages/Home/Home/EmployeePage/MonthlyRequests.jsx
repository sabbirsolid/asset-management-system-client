import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const MonthlyRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
  } = useQuery({
    queryKey: ["monthlyRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/employeeMonthlyRequests/${user?.email}`
      );
      return response.data;
    },
  });


  if (requests.length === 0) {
    return (
      <div className=" p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          My Monthly Requests
        </h2>
        <p className="text-center text-red-500 text-lg">No Requests to Show</p>
      </div>
    );
  }

  return (
    <div className=" p-6 rounded-lg shadow-lg max-w-full sm:max-w-4xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        My Monthly Requests
      </h2>
      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className=" p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold ">{req.name}</h3>
                  <p className="text-sm ">{req.requesterName}</p>
                </div>
                <div className="text-sm font-semibold">
                  <p>Requested Quantity: {req.requestedQuantity}</p>
                  <p>{new Date(req.requestDate).toLocaleDateString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center  text-lg">No requests made this month.</p>
      )}
    </div>
  );
};

export default MonthlyRequests;
