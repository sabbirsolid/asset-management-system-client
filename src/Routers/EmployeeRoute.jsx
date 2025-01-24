import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useUserRoles from "../hooks/useUserRoles";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isEmployee, isLoading } = useUserRoles();
  if (loading || isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  if (user && isEmployee) {
    return <div>{children}</div>;
  }
};

export default EmployeeRoute;
