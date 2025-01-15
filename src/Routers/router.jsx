import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import JoinAsEmployee from "../pages/JoinAsEmpoyee/JoinAsEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "joinAsEmployee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
    ],
  },
]);

export default router;
