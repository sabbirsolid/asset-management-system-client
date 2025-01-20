import Banner from "../Banner/Banner";
import About from "../About/About";
import Packages from "../Packages/Packages";
import useUserRoles from "../../../hooks/useUserRoles";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import PendingRequests from "./EmployeePage/PendingRequests";
import MonthlyRequests from "./EmployeePage/MonthlyRequests";
import NoAffiliationMessage from "./NoAffiliationMessage";

const Home = () => {
  const { isHR, isEmployee } = useUserRoles();
  const { user } = useContext(AuthContext);

  return (
    <div>
      {isEmployee && (
        <>
          <PendingRequests />
          <MonthlyRequests />
        </>
      )}
      {isHR && !isEmployee && (
        <>
          <PendingRequests />
        </>
      )}
      {!isHR && !isEmployee && (
        <>
          <Banner />
          <About />
          <Packages />
          <NoAffiliationMessage />
        </>
      )}
    </div>
  );
};

export default Home;
