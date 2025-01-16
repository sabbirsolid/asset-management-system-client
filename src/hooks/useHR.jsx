import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useHR = () => {
  const { user,loading} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isHR, isLoading: isHRLoading } = useQuery({
    queryKey: [user?.email, "isHR"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/hr/${user.email}`);
      console.log(res);
      return res.data?.isHR;
    },
  });

  console.log(isHR);
  return [isHR, isHRLoading];
};
export default useHR;
