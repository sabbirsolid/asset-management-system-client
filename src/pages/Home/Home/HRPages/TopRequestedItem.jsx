import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TopRequestedItem = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: topItems = [] } = useQuery({
    queryKey: ["topRequestedItems", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/topRequestedItems", {
        params: { hrEmail: user?.email },
      });
      return res.data;
    },
  });

  if (topItems.length === 0) {
    return (
      <div className=" p-6 rounded-lg shadow-lg max-w-full sm:max-w-xl mx-auto overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Top Requested Items
        </h2>
        <p className="text-center text-red-500 text-lg">No Requests to Show</p>
      </div>
    );
  }

  return (
    <section className=" shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">
        Top Requested Items
      </h2>
      <div className="space-y-3">
        {topItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-md"
          >
            <span className="font-medium ">{item.name}</span>
            <span className="text-sm ">{item.count} requests</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRequestedItem;
