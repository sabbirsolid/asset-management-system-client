import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const OverviewEmployee = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch requests (MyRequestedAssets Data)
  const { data: requests = [], isLoading } = useQuery({
    queryKey: [user?.email, "requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/filteredRequests", {});
      return res.data;
    },
  });

  // Pie and Bar Chart Data
  const pieData = {
    labels: ["Pending", "Approved", "Returned"],
    datasets: [
      {
        label: "Request Status",
        data: [
          requests.filter((req) => req.status === "pending").length,
          requests.filter((req) => req.status === "approved").length,
          requests.filter((req) => req.status === "returned").length,
        ],
        backgroundColor: ["#FF5733", "#4CAF50", "#9E9E9E"],
      },
    ],
  };

  const barData = {
    labels: ["Returnable", "Non-Returnable"],
    datasets: [
      {
        label: "Asset Type",
        data: [
          requests.filter((req) => req.type === "returnable").length,
          requests.filter((req) => req.type === "non-returnable").length,
        ],
        backgroundColor: "#2196F3",
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 lg:w-8/12 mx-auto">
      <Helmet>
        <title>Overview | AMS</title>
      </Helmet>
      <h1 className="text-2xl text-center font-bold mb-4">Overview</h1>

      {/* Request Charts */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h2 className="text-xl mb-2">Request Status</h2>
          <Pie data={pieData} />
        </div>
        <div className="p-4 border  rounded">
          <h2 className="text-xl mb-2">Asset Type Distribution</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default OverviewEmployee;
