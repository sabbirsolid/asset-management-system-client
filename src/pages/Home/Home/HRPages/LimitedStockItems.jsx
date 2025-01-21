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

  return (
    <div className=" shadow-lg rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl text-center font-semibold mb-4 ">
        Limited Stock Items
      </h2>
      {lowStockAssets.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {lowStockAssets.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700 truncate">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-red-500">
                  Qty: {item.quantity}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Company: <span className="font-medium">{item.company}</span>
              </p>
              <p className="text-xs text-gray-400">
                Managed by: {item.hrEmail}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No low stock items found.</p>
      )}
    </div>
  );
};

export default LimitedStockItems;