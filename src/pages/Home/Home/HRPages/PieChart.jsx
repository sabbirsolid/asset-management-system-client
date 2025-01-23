// import React, { useContext } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { AuthContext } from "../../../../Providers/AuthProvider";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   // Fetch requests data
//   const { data: requests = [] } = useQuery({
//     queryKey: ["allRequestsHR", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/allRequestsHR", {
//         params: { email: user?.email },
//       });
//       return res.data;
//     },
//   });

//   // Process data to count occurrences of each type
//   const statusCounts = requests.reduce((acc, request) => {
//     acc[request.type] = (acc[request.type] || 0) + 1;
//     return acc;
//   }, {});

//   // Prepare chart data
//   const data = {
//     labels: Object.keys(statusCounts),
//     datasets: [
//       {
//         data: Object.values(statusCounts),
//         backgroundColor: [
//           "#4CAF50", // Returnable
//           "#FF5722", // Non-Returnable
//           "#FFC107", // Other types
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   // Chart options for responsive and professional sizing
//   const options = {
//     maintainAspectRatio: false, // Allow container control over the aspect ratio
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           boxWidth: 20,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => {
//             const label = tooltipItem.label || "";
//             const value = tooltipItem.raw || 0;
//             return `${label}: ${value}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className=" shadow-md rounded-lg p-4">
//       <h2 className="text-xl font-semibold mb-4 text-center">
//         Request Type Overview
//       </h2>
//       <div className="relative h-64 md:h-80 lg:h-96">
//         <Pie data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default PieChart;

import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Providers/AuthProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: requests = [] } = useQuery({
    queryKey: ["allRequestsHR", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/allRequestsHR", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  const statusCounts = requests.reduce((acc, request) => {
    acc[request.type] = (acc[request.type] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Request Type Overview
      </h2>
      <div className="relative h-80">
        <Pie data={data} options={options} />
      </div>
    </section>
  );
};

export default PieChart;

