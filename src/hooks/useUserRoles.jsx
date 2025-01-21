import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserRoles = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "roles"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/roles/${user.email}`);
      // console.log(res);
      return res.data;
    },
  });

  const isHR = roleData?.isHR || false;
  const isEmployee = roleData?.isEmployee || false;
  const userObject = roleData?.user || null;

  return { isHR, isEmployee, userObject, isLoading,refetch };
};

export default useUserRoles;
