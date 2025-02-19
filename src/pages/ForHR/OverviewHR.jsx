// import PieChart from "../Home/Home/HRPages/PieChart";
// import Stats from "./Stats";

// const OverviewHR = () => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
     
//     </div>
//   );
// };

// export default OverviewHR;

// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import useUserRoles from "../../hooks/useUserRoles";
// import { Chart as ChartJS, ArcElement } from "chart.js";


// ChartJS.register(ArcElement, );

// const OverviewHR = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const { userObject } = useUserRoles();

//   // Fetch HR statistics
//   const { data: statistics = {} } = useQuery({
//     queryKey: ["hrStatistics", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/hrStatistics", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   const { users = [], statusCounts = {} } = statistics;

//   // Fetch Request Type Data
//   const { data: requests = [] } = useQuery({
//     queryKey: ["allRequestsHR", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/allRequestsHR", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   // Pie Chart Data for Total Employees
//   const employeePieData = [
//     { name: "Users Limit", value: userObject.employeeCount || 0, color: "#22c55e" },
//     { name: "Current Users", value: users.length || 0, color: "#facc15" },
//   ];

//   // Bar Chart Data for Status Counts
//   const barData = [
//     { name: "Approved", total: statusCounts.approved || 0, color: "#22c55e" },
//     { name: "Rejected", total: statusCounts.rejected || 0, color: "#ef4444" },
//     { name: "Pending", total: statusCounts.pending || 0, color: "#facc15" },
//   ];

//   // Pie Chart Data for Request Types
//   const statusCountsData = requests.reduce((acc, request) => {
//     acc[request.type] = (acc[request.type] || 0) + 1;
//     return acc;
//   }, {});

//   const requestPieData = {
//     labels: Object.keys(statusCountsData),
//     datasets: [
//       {
//         data: Object.values(statusCountsData),
//         backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
//         HR Overview
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Request Type Overview Pie Chart */}
//         <div className="shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-medium text-center mb-4">Request Type Overview</h3>
//           {requests.length === 0 ? (
//             <p className="text-center text-red-500 text-lg">Nothing to Show</p>
//           ) : (
//             <div className="relative h-80">
//               <Pie data={requestPieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
//             </div>
//           )}
//         </div>

//         {/* Employee Status Pie Chart */}
//         <div className="shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-medium text-center mb-4">Total Employees</h3>
//           <div className="flex justify-center">
//             <ResponsiveContainer width={300} height={300}>
//               <PieChart>
//                 <Pie
//                   data={employeePieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   dataKey="value"
//                   label
//                 >
//                   {employeePieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Request Status Bar Chart */}
//       <div className="shadow-md rounded-lg p-6 mt-6">
//         <h3 className="text-lg font-medium text-center mb-4">Request Status</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={barData}>
//             <XAxis dataKey="name" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Bar dataKey="total" fill="#3b82f6" barSize={40} radius={[10, 10, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default OverviewHR;

// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import useUserRoles from "../../hooks/useUserRoles";
 
// import { 
//   PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
// } from "recharts";
// import PieChart from "../Home/Home/HRPages/PieChart";

// const OverviewHR = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const { userObject } = useUserRoles();

//   // Fetch HR statistics
//   const { data: statistics = {} } = useQuery({
//     queryKey: ["hrStatistics", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/hrStatistics", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   const { users = [], statusCounts = {} } = statistics;

//   // Pie Chart Data for Total Employees
//   const employeePieData = [
//     { name: "Users Limit", value: userObject.employeeCount || 0, color: "#22c55e" },
//     { name: "Current Users", value: users.length || 0, color: "#facc15" },
//   ];

//   // Bar Chart Data for Status Counts
//   const barData = [
//     { name: "Approved", total: statusCounts.approved || 0, color: "#22c55e" },
//     { name: "Rejected", total: statusCounts.rejected || 0, color: "#ef4444" },
//     { name: "Pending", total: statusCounts.pending || 0, color: "#facc15" },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
//         HR Overview
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Request Type Overview Pie Chart (Using Your PieChart Component) */}
//         <PieChart />

//         {/* Employee Status Pie Chart */}
//         <div className="shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-medium text-center mb-4">Total Employees</h3>
//           <div className="flex justify-center">
//             <ResponsiveContainer width={300} height={300}>
//               <RePieChart>
//                 <Pie
//                   data={employeePieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   dataKey="value"
//                   label
//                 >
//                   {employeePieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <RechartsTooltip />
//                 <Legend />
//               </RePieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Request Status Bar Chart */}
//       <div className="shadow-md rounded-lg p-6 mt-6">
//         <h3 className="text-lg font-medium text-center mb-4">Request Status</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={barData}>
//             <XAxis dataKey="name" />
//             <YAxis allowDecimals={false} />
//             <RechartsTooltip />
//             <Bar dataKey="total" fill="#3b82f6" barSize={40} radius={[10, 10, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default OverviewHR;

// import React, { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../Providers/AuthProvider";
// import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
// import { Chart as ChartJS, ArcElement } from "chart.js";
// import { Pie as ChartJSPie } from "react-chartjs-2";
// import useUserRoles from "../../hooks/useUserRoles";

// ChartJS.register(ArcElement);

// const OverviewHR = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const { userObject } = useUserRoles();

//   // Fetch HR Statistics
//   const { data: statistics = {} } = useQuery({
//     queryKey: ["hrStatistics", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/hrStatistics", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   const { users = [], statusCounts = {} } = statistics;

//   // Fetch All Requests
//   const { data: requests = [] } = useQuery({
//     queryKey: ["allRequestsHR", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/allRequestsHR", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   // Data for Recharts Pie Chart
//   const pieData = [
//     { name: "Users Limit", value: userObject.employeeCount || 0, color: "#22c55e" },
//     { name: "Current Users", value: users.length || 0, color: "#facc15" },
//   ];

//   // Data for Recharts Bar Chart
//   const barData = [
//     { name: "Approved", total: statusCounts.approved || 0, color: "#22c55e" },
//     { name: "Rejected", total: statusCounts.rejected || 0, color: "#ef4444" },
//     { name: "Pending", total: statusCounts.pending || 0, color: "#facc15" },
//   ];

//   // Data for ChartJS Pie Chart
//   const requestStatusCounts = requests.reduce((acc, request) => {
//     acc[request.type] = (acc[request.type] || 0) + 1;
//     return acc;
//   }, {});

//   const chartJSData = {
//     labels: Object.keys(requestStatusCounts),
//     datasets: [
//       {
//         data: Object.values(requestStatusCounts),
//         backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const chartJSOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//     },
//   };

//   return (
//     <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
//       {/* Request Type Overview (ChartJS Pie Chart) */}
//       <section className="mb-6 md:mb-8">
//         <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-600">
//           Request Type Overview
//         </h2>
//         {requests.length === 0 ? (
//           <p className="text-center text-red-500 text-sm md:text-lg">Nothing to Show</p>
//         ) : (
//           <div className="relative h-48 md:h-64">
//             <ChartJSPie data={chartJSData} options={chartJSOptions} />
//           </div>
//         )}
//       </section>

//       {/* Statistics Section (Recharts) */}
//       <section>
//         <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-600">
//           Statistics
//         </h2>

//         {/* Responsive Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Bar Chart for Request Status */}
//           <div className="p-4 shadow-md rounded-lg">
//             <h3 className="text-sm md:text-lg font-medium text-center mb-2 md:mb-4">
//               Request Status
//             </h3>
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="total" fill="#3b82f6" barSize={30} radius={[10, 10, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart for Employee Overview */}
//           <div className="p-4 shadow-md rounded-lg">
//             <h3 className="text-sm md:text-lg font-medium text-center mb-2 md:mb-4">
//               Total Employees
//             </h3>
//             <ResponsiveContainer width="100%" height={200}>
//               <RechartsPieChart>
//                 <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default OverviewHR;

// import React, { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../Providers/AuthProvider";
// import {
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { Chart as ChartJS, ArcElement } from "chart.js";
// import { Pie as ChartJSPie } from "react-chartjs-2";
// import useUserRoles from "../../hooks/useUserRoles";

// ChartJS.register(ArcElement);

// const OverviewHR = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const { userObject } = useUserRoles();

//   // Fetch HR Statistics
//   const { data: statistics = {} } = useQuery({
//     queryKey: ["hrStatistics", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/hrStatistics", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   const { users = [], statusCounts = {} } = statistics;

//   // Fetch All Requests
//   const { data: requests = [] } = useQuery({
//     queryKey: ["allRequestsHR", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/allRequestsHR", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   // Data for Recharts Pie Chart
//   const pieData = [
//     { name: "Users Limit", value: userObject.employeeCount || 0, color: "#22c55e" },
//     { name: "Current Users", value: users.length || 0, color: "#facc15" },
//   ];

//   // Data for Recharts Bar Chart
//   const barData = [
//     { name: "Approved", total: statusCounts.approved || 0, color: "#22c55e" },
//     { name: "Rejected", total: statusCounts.rejected || 0, color: "#ef4444" },
//     { name: "Pending", total: statusCounts.pending || 0, color: "#facc15" },
//   ];

//   // Data for ChartJS Pie Chart
//   const requestStatusCounts = requests.reduce((acc, request) => {
//     acc[request.type] = (acc[request.type] || 0) + 1;
//     return acc;
//   }, {});

//   const chartJSData = {
//     labels: Object.keys(requestStatusCounts),
//     datasets: [
//       {
//         data: Object.values(requestStatusCounts),
//         backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const chartJSOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//     },
//   };

//   return (
//     <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
//       {/* Request Type Overview (ChartJS Pie Chart) */}
//       <section className="mb-6 md:mb-8">
//         <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-600">
//           Request Type Overview
//         </h2>
//         {requests.length === 0 ? (
//           <p className="text-center text-red-500 text-sm md:text-lg">Nothing to Show</p>
//         ) : (
//           <div className="relative h-48 md:h-64">
//             <ChartJSPie data={chartJSData} options={chartJSOptions} />
//           </div>
//         )}
//       </section>

//       {/* Statistics Section (Recharts) */}
//       <section>
//         <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-600">
//           Statistics
//         </h2>

//         {/* Responsive Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Bar Chart for Request Status */}
//           <div className="p-4 shadow-md rounded-lg">
//             <h3 className="text-sm md:text-lg font-medium text-center mb-2 md:mb-4">
//               Request Status
//             </h3>
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
//                 <XAxis dataKey="name" tick={{ fontSize: window.innerWidth < 768 ? 10 : 14 }} />
//                 <YAxis allowDecimals={false} tick={{ fontSize: window.innerWidth < 768 ? 10 : 14 }} />
//                 <Tooltip />
//                 <Bar
//                   dataKey="total"
//                   fill="#3b82f6"
//                   barSize={window.innerWidth < 768 ? 20 : 40}
//                   radius={[10, 10, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart for Employee Overview */}
//           <div className="p-4 shadow-md rounded-lg">
//             <h3 className="text-sm md:text-lg font-medium text-center mb-2 md:mb-4">
//               Total Employees
//             </h3>
//             <ResponsiveContainer width="100%" height={200}>
//               <RechartsPieChart>
//                 <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default OverviewHR;


import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
    { name: "Users Limit", value: userObject.employeeCount || 0, color: "#22c55e" },
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
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
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

