import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie as ChartJSPie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import useUserRoles from "../../hooks/useUserRoles";
import { useContext } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewHR = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { userObject } = useUserRoles();

  // Fetch HR Statistics
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

  // Fetch All Requests
  const { data: requests = [] } = useQuery({
    queryKey: ["allRequestsHR", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/allRequestsHR", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  // Data for Recharts Pie Chart
  const pieData = [
    {
      name: "Users Limit",
      value: userObject.employeeCount || 0,
      color: "#22c55e",
    },
    { name: "Current Users", value: users.length || 0, color: "#facc15" },
  ];

  // Data for Recharts Bar Chart
  const barData = [
    { name: "Approved", total: statusCounts.approved || 0, color: "#22c55e" },
    { name: "Rejected", total: statusCounts.rejected || 0, color: "#ef4444" },
    { name: "Pending", total: statusCounts.pending || 0, color: "#facc15" },
  ];

  // Data for ChartJS Pie Chart
  const requestStatusCounts = requests.reduce((acc, request) => {
    acc[request.type] = (acc[request.type] || 0) + 1;
    return acc;
  }, {});

  const chartJSData = {
    labels: Object.keys(requestStatusCounts),
    datasets: [
      {
        data: Object.values(requestStatusCounts),
        backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };

  const chartJSOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className=" p-4 md:p-6 rounded-lg shadow-lg">
      {/* Request Type Overview (ChartJS Pie Chart) */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center text-blue-600">
          Request Type Overview
        </h2>
        {requests.length === 0 ? (
          <p className="text-center text-red-500 text-lg">Nothing to Show</p>
        ) : (
          <div className="relative h-64 md:h-80">
            <ChartJSPie data={chartJSData} options={chartJSOptions} />
          </div>
        )}
      </section>

      {/* Statistics Section (Recharts) */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center text-blue-600">
          Statistics
        </h2>

        {/* Total Employees Bar Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-center mb-4">
            Request Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#3b82f6"
                barSize={40}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Request Status Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-center mb-4">
            Total Employees
          </h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
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
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewHR;
