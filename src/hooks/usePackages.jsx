import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePackages = () => {
  const { loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: packages,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["packages"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get("/packages")
      return res.data;
    },
  });
 
  return { packages, isLoading, refetch };
};

export default usePackages;
