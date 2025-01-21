import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TopRequestedItem = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch top requested items
  const { data: topItems = [] } = useQuery({
    queryKey: ["topRequestedItems", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/topRequestedItems", {
        params: { hrEmail: user?.email },
      });
      return res.data;
    },
  });

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center sm:text-xl">Top Requested Items</h2>
      <div className="space-y-4">
        {topItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <span className="font-medium text-gray-800 truncate text-base sm:text-sm">{item.name}</span>
            <span className="text-sm text-gray-600">{item.count} requests</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRequestedItem;
