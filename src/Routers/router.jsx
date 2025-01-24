import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import JoinAsEmployee from "../pages/JoinAsEmpoyee/JoinAsEmployee";
import JoinAsHRManager from "../pages/JoinAsHRManager/JoinAsHRManager";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";
import AssetList from "../pages/ForHR/AssetList";
import AddAsset from "../pages/ForHR/AddAsset";
import HrRoute from "./HrRoute";
import RequestForAnAsset from "../pages/ForEmployee/RequestForAnAsset";
import MyRequests from "../pages/ForEmployee/MyRequestedAssets";
import AllRequests from "../pages/ForHR/AllRequests";
import HRProfile from "../pages/ForHR/HRProfile";
import EmployeeProfile from "../pages/ForEmployee/EmployeeProfile";
import AddEmployee from "../pages/ForHR/AddEmployee";
import MyEmployeeList from "../pages/ForHR/MyEmployeeList";
import MyTeamPage from "../pages/ForEmployee/MyTeam";
import Error from "../pages/Error/Error";
import EmployeeRoute from "./EmployeeRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "joinAsEmployee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "joinAsHRManager",
        element: <JoinAsHRManager></JoinAsHRManager>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "hr/assetList",
        element: (
          <HrRoute>
            <AssetList></AssetList>
          </HrRoute>
        ),
      },
      {
        path: "hr/addAsset",
        element: (
          <HrRoute>
            <AddAsset></AddAsset>
          </HrRoute>
        ),
      },
      {
        path: "hr/allRequests",
        element: (
          <HrRoute>
            <AllRequests></AllRequests>
          </HrRoute>
        ),
      },
      {
        path: "hr/hrProfile",
        element: (
          <HrRoute>
            <HRProfile></HRProfile>
          </HrRoute>
        ),
      },
      {
        path: "hr/addEmployee",
        element: (
          <HrRoute>
            <AddEmployee></AddEmployee>
          </HrRoute>
        ),
      },
      {
        path: "hr/myEmployeeList",
        element: (
          <HrRoute>
            <MyEmployeeList></MyEmployeeList>
          </HrRoute>
        ),
      },
      {
        path: "requestForAsset",
        element: (
          <EmployeeRoute>
            <RequestForAnAsset></RequestForAnAsset>,
          </EmployeeRoute>
        ),
      },
      {
        path: "myRequestedAssets",
        element: (
          <EmployeeRoute>
            <MyRequests></MyRequests>
          </EmployeeRoute>
        ),
      },
      {
        path: "employeeProfile",
        element: (
          <EmployeeRoute>
            <EmployeeProfile></EmployeeProfile>
          </EmployeeRoute>
        ),
      },
      {
        path: "myTeam",
        element: (
          <EmployeeRoute>
            <MyTeamPage></MyTeamPage>
          </EmployeeRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
