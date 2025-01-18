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
        path: "requestForAsset",
        element: <RequestForAnAsset></RequestForAnAsset>,
      },
      {
        path: "myRequestedAssets",
        element: <MyRequests></MyRequests>,
      },
      {
        path: "employeeProfile",
        element: <EmployeeProfile></EmployeeProfile>
      },
    ],
  },
]);

export default router;
