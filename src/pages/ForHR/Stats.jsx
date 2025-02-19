import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useUserRoles from "../../hooks/useUserRoles";

const Stats = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {  userObject } = useUserRoles();

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

  // Data for Pie Chart
  const pieData = [
    { name: "Users Limit", value: userObject.employeeCount || 0, color: "#22c55e" },
    { name: "Current Users", value: users.length || 0, color: "#facc15" },
    // { name: "Rejected", value: statusCounts.rejected || 0, color: "#ef4444" },
  ];

  // Data for Bar Chart
  const barData = [
    { name: "Approved", total: statusCounts.approved || 0, color: "#22c55e" },
    { name: "Rejected", total: statusCounts.rejected || 0, color: "#ef4444" },
    { name: "Pending", total: statusCounts.pending || 0, color: "#facc15" },
  ];

  return (
    <div className="shadow-md rounded-lg p-6 md:p-8 bg-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Statistics
      </h2>

      {/* Total Employees Bar Chart */}
      <div className="mb-10">
        <h3 className="text-lg font-medium text-center mb-4">Request Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" barSize={40} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Request Status Pie Chart */}
      <div>
        <h3 className="text-lg font-medium text-center mb-4">Total Employees</h3>
        <div className="flex justify-center">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Stats;
