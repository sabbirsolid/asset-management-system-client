import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const LimitedStockItems = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Fetch limited stock assets
  const { data: lowStockAssets = [] } = useQuery({
    queryKey: ["lowStockAssets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/assetLowStock", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  if (lowStockAssets.length === 0) {
    return (
      <div className=" p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Limited Stock Items
        </h2>
        <p className="text-center text-red-500 text-lg">No Assets to Show</p>
      </div>
    );
  }

  return (
    <div className=" shadow-lg rounded-lg p-4 md:p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 ">
        Limited Stock Items
      </h2>
      {lowStockAssets.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {lowStockAssets.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow "
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold  truncate">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-red-500">
                  Qty: {item.quantity}
                </span>
              </div>
              <p className="text-sm  mb-1">
                Company: <span className="font-medium">{item.company}</span>
              </p>
              <p className="text-xs ">
                Managed by: {item.hrEmail}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className=" text-sm">No low stock items found.</p>
      )}
    </div>
  );
};

export default LimitedStockItems;
