import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const RequestsPerEmployee = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: requestsData = [], isLoading } = useQuery({
    queryKey: ["requestsPerEmployee", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/requestsPerEmployee", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  

  return (
    <div className="p-6 md:p-8 lg:p-12 shadow-lg rounded-lg max-w-full md:max-w-2xl lg:max-w-3xl mx-auto ">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Requests Per Employee
      </h2>
      <ul className="divide-y divide-gray-200">
        {requestsData.map((item) => (
          <li
            key={item._id}
            className="py-2 px-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-lg transition duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 w-full">
              <p className="   ">{item._id}</p>
            </div>
            <p className="">{item.requestCount} requests</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsPerEmployee;