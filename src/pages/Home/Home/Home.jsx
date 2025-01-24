// import Banner from "../Banner/Banner";
// import About from "../About/About";
// import Packages from "../Packages/Packages";
// import useUserRoles from "../../../hooks/useUserRoles";

// import PendingRequests from "./EmployeePage/PendingRequests";
// import MonthlyRequests from "./EmployeePage/MonthlyRequests";
// import NoAffiliationMessage from "./NoAffiliationMessage";
// import PendingRequestsHR from "./HRPages/PendingRequestsHR";
// import TopRequestedItem from "./HRPages/TopRequestedItem";
// import PieChart from "./HRPages/PieChart";
// import LimitedStockItems from "./HRPages/LimitedStockItems";

// import RequestsPerEmployee from "./HRPages/RequestsPerEmployee";
// import NoticeBoard from "./HRPages/NoticeBoard";
// import NoticeBoardEmp from "./EmployeePage/noticeBoardEmp";
// import HRStatistics from "./HRPages/HRStatistics";

// const Home = () => {
//   const { isHR, isEmployee } = useUserRoles();

//   return (
//     <div>
//       {isEmployee && (
//         <>
//           <PendingRequests />
//           <MonthlyRequests />
//           <NoticeBoardEmp></NoticeBoardEmp>
//         </>
//       )}
//       {isHR && !isEmployee && (
//         <>
//           <PendingRequestsHR></PendingRequestsHR>
//           <TopRequestedItem></TopRequestedItem>
//           <PieChart></PieChart>
//           <LimitedStockItems></LimitedStockItems>
//           <HRStatistics></HRStatistics>
//           <RequestsPerEmployee></RequestsPerEmployee>
//           <NoticeBoard></NoticeBoard>

//         </>
//       )}
//       {!isHR && !isEmployee && (
//         <>
//           <Banner />
//           <About />
//           <Packages />
//           <NoAffiliationMessage />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;

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
import { motion } from "framer-motion";
import PaymentHistory from "./HRPages/PaymentHistory";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";


const Home = () => {
  const { isHR, isEmployee } = useUserRoles();
  const {  loading } = useContext(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <Helmet>
        <title>Home | AMS</title>
      </Helmet>
      {/* Tailwind CSS to add spacing between sections */}
      {isEmployee && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          <motion.div variants={childVariants}>
            <PendingRequests />
          </motion.div>
          <motion.div variants={childVariants}>
            <MonthlyRequests />
          </motion.div>
          <motion.div variants={childVariants}>
            <NoticeBoardEmp />
          </motion.div>
        </motion.div>
      )}
      {isHR && !isEmployee && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          <motion.div variants={childVariants}>
            <PendingRequestsHR />
          </motion.div>
          <motion.div variants={childVariants}>
            <TopRequestedItem />
          </motion.div>
          <motion.div variants={childVariants}>
            <PieChart />
          </motion.div>
          <motion.div variants={childVariants}>
            <LimitedStockItems />
          </motion.div>
          <motion.div variants={childVariants}>
            <HRStatistics />
          </motion.div>
          <motion.div variants={childVariants}>
            <RequestsPerEmployee />
          </motion.div>
          <motion.div variants={childVariants}>
            <NoticeBoard />
          </motion.div>
          <motion.div variants={childVariants}>
            <PaymentHistory />
          </motion.div>
        </motion.div>
      )}
      {!isHR && !isEmployee && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          <motion.div variants={childVariants}>
            <Banner />
          </motion.div>
          <motion.div variants={childVariants}>
            <About />
          </motion.div>
          <motion.div variants={childVariants}>
            <Packages />
          </motion.div>
          <motion.div variants={childVariants}>
            <NoAffiliationMessage />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
