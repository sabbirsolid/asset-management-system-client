import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const HRStatistics = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: statistics = {} } = useQuery({
    queryKey: ["hrStatistics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/hrStatistics", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  const { users = [], statusCounts = {} } = statistics;

  return (
    <div className="shadow-md rounded-lg p-6 md:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Statistics
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-center mb-4">
          Total Employees
        </h3>
        <p className="text-3xl font-bold text-center text-blue-600">
          {users.length}
        </p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-center mb-4">Request Status</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg  shadow-sm bg-gray-50">
            <h4 className="text-sm text-center font-medium">Approved</h4>
            <p className="text-2xl text-center font-semibold text-green-500">
              {statusCounts.approved || 0}
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h4 className="text-sm text-center font-medium">Pending</h4>
            <p className="text-2xl text-center font-semibold text-yellow-500">
              {statusCounts.pending || 0}
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h4 className="text-sm text-center font-medium">Rejected</h4>
            <p className="text-2xl text-center font-semibold text-red-500">
              {statusCounts.rejected || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRStatistics;
