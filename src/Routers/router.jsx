import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import JoinAsEmployee from "../pages/JoinAsEmpoyee/JoinAsEmployee";
import JoinAsHRManager from "../pages/JoinAsHRManager/JoinAsHRManager";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
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
        path: 'login',
        element: <Login></Login>
      }
    ],
  },
]);

export default router;
