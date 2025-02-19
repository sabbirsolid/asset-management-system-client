// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../Providers/AuthProvider";
// import { useContext } from "react";

// const RecommendedAssets = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);
//   const { data: recommendedAssets = [] } = useQuery({
//     queryKey: [user?.email, "assets"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/assets", {
//         params: {
//           email: user?.email,
//         },
//       });
//       return res.data;
//     },
//   });

//   return (
//     <section className="p-6  shadow rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Recommended Assets</h2>
//       {recommendedAssets.length === 0 ? (
//         <p className="text-red-600">No recommendations available.</p>
//       ) : (
//         <ul>
//           {recommendedAssets.map((asset) => (
//             <li key={asset.id} className="border-b py-2">
//               {asset.name} -{" "}
//               <span className="">{asset.category}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// };

// export default RecommendedAssets;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";

const RecommendedAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: recommendedAssets = [] } = useQuery({
    queryKey: [user?.email, "assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets", {
        params: {
          email: user?.email,
        },
      });
      return res.data;
    },
  });

  // Get 4 random assets
  const getRandomAssets = (assets) => {
    const shuffled = assets.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const randomAssets = getRandomAssets(recommendedAssets);

  return (
    <section className="p-6 shadow rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Recommended Assets</h2>
      {randomAssets.length === 0 ? (
        <p className="text-red-600 text-center">No recommendations available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {randomAssets.map((asset) => (
            <div
              key={asset.id}
              className="border rounded-lg p-4 flex flex-col items-center shadow-md"
            >
              
              <h3 className="font-semibold text-lg mb-2">{asset.name}</h3>
              <p className="text-sm text-gray-600">{asset.category}</p>
              <p className="text-sm text-gray-500">{asset.description || "No description available"}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedAssets;
