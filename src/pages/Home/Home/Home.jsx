import Banner from "../Banner/Banner";
import About from "../About/About";
import Packages from "../Packages/Packages";
import useUserRoles from "../../../hooks/useUserRoles";

import PendingRequests from "./EmployeePage/PendingRequests";
import MonthlyRequests from "./EmployeePage/MonthlyRequests";
import NoAffiliationMessage from "./NoAffiliationMessage";
import PendingRequestsHR from "./HRPages/PendingRequestsHR";
import TopRequestedItem from "./HRPages/TopRequestedItem";
import PieChart from "./HRPages/PieChart";
import LimitedStockItems from "./HRPages/LimitedStockItems";

import RequestsPerEmployee from "./HRPages/RequestsPerEmployee";
import NoticeBoard from "./HRPages/NoticeBoard";
import NoticeBoardEmp from "./EmployeePage/noticeBoardEmp";
import HRStatistics from "./HRPages/HRStatistics";

const Home = () => {
  const { isHR, isEmployee } = useUserRoles();

  return (
    <div>
      {isEmployee && (
        <>
          <PendingRequests />
          <MonthlyRequests />
          <NoticeBoardEmp></NoticeBoardEmp>
        </>
      )}
      {isHR && !isEmployee && (
        <>
          <PendingRequestsHR></PendingRequestsHR>
          <TopRequestedItem></TopRequestedItem>
          <PieChart></PieChart>
          <LimitedStockItems></LimitedStockItems>
          <HRStatistics></HRStatistics>
          <RequestsPerEmployee></RequestsPerEmployee>
          <NoticeBoard></NoticeBoard>

          
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
