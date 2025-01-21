import Banner from "../Banner/Banner";
import About from "../About/About";
import Packages from "../Packages/Packages";
import useUserRoles from "../../../hooks/useUserRoles";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import PendingRequests from "./EmployeePage/PendingRequests";
import MonthlyRequests from "./EmployeePage/MonthlyRequests";
import NoAffiliationMessage from "./NoAffiliationMessage";
import PendingRequestsHR from "./HRPages/PendingRequestsHR";
import TopRequestedItem from "./HRPages/TopRequestedItem";
import PieChart from "./HRPages/PieChart";
import LimitedStockItems from "./HRPages/LimitedStockItems";
import EmployeeStatistics from "./HRPages/EmployeeStatistics";

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
          <PendingRequestsHR></PendingRequestsHR>
          <TopRequestedItem></TopRequestedItem>
          <PieChart></PieChart>
          <LimitedStockItems></LimitedStockItems>
          <EmployeeStatistics></EmployeeStatistics>
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
