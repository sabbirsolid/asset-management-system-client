import { createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-center text-3xl text-amber-500">Hello world!</div>,
  },
]);

export default router;