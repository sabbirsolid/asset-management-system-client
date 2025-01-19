import { useEffect, useState } from "react";

import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/packages").then((res) => {
      console.log(res.data);
      setPackages(res.data);
    });
  }, []);
  // const packages = [
  //   {
  //     title: "5 Employees",
  //     price: "$5",
  //     description: "Maximum 5 employees for your team.",
  //   },
  //   {
  //     title: "10 Employees",
  //     price: "$8",
  //     description: "Maximum 10 employees for your team.",
  //   },
  //   {
  //     title: "20 Employees",
  //     price: "$15",
  //     description: "Maximum 20 employees for your team.",
  //   },
  // ];

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 shadow-lg rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4">{pkg.title}</h3>
              <p className="text-lg font-bold text-blue-500 mb-4">
                {pkg.price}
              </p>
              <p className="text-gray-700 mb-4">{pkg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
