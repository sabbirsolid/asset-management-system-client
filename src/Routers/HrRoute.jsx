import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useUserRoles from "../hooks/useUserRoles";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const HrRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { isHR, isLoading } = useUserRoles();
  if (loading || isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }
  if (user && isHR) {
    return <div>{children}</div>;
  }
};

export default HrRoute;
