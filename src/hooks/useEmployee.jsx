import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useEmployee = () => {
  const { user,loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isEmployee, isLoading } = useQuery({
    queryKey: [user?.email, "isEmployee"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/employee/${user.email}`);
      console.log(res);
      return res.data?.isEmployee;
    },
  });

  console.log(isEmployee);
  return [isEmployee, isLoading];
};
export default useEmployee;
