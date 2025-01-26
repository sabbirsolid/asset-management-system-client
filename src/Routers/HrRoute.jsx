import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useUserRoles from "../hooks/useUserRoles";
import { Navigate } from "react-router-dom";

const HrRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isHR, isLoading } = useUserRoles();
  if (loading || isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (user && isHR) {
    return <div>{children}</div>;
  }
  return <Navigate to="/login" replace />;
};

export default HrRoute;
