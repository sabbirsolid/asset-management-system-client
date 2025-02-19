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

  if (requests.length === 0) {
    return (
      <div className="my-10 p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Request Type Overview
        </h2>
        <p className="text-center text-red-500 text-lg">Nothing to Show</p>
      </div>
    );
  }

  return (
    <section className=" shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Request Type Overview
      </h2>
      <div className="relative h-80">
        <Pie data={data} options={options} />
      </div>
    </section>
  );
};

export default PieChart;
