// import { NavLink, Outlet } from "react-router-dom";
// import { useContext, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { PanelLeftOpen, X } from "lucide-react";
// import useUserRoles from "../../hooks/useUserRoles";
// import { AuthContext } from "../../Providers/AuthProvider";

// const Dashboard = () => {
//   const { loading } = useContext(AuthContext);
//   const { isHR, isEmployee, isLoading } = useUserRoles();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   if (loading || isLoading) {
//     return (
//       <div className="flex items-center min-h-screen justify-center h-full">
//         <span className="loading loading-infinity loading-lg"></span>
//       </div>
//     );
//   }

//   const menuItems = (
//     <>
//       {isHR && (
//         <>
//           <li>
//             <NavLink to={"/dashboard/hr/profile"}>Profile</NavLink>
//           </li>
//           <li>
//             <NavLink to={"/dashboard/hr/overview"}>Overview</NavLink>
//           </li>
//         </>
//       )}
//       {isEmployee && (
//         <>
//           <li>
//             <NavLink to={"/dashboard/employee/profile"}>
//               Employee Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to={"/dashboard/employee/overview"}>Overview</NavLink>
//           </li>
//         </>
//       )}
//       <div className="divider"></div>
//       <li>
//         <NavLink to={"/"}>Home</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="flex min-h-screen pt-16 overflow-hidden">
//       {/* Sidebar for Desktop */}
//       <div className="hidden md:block w-64  min-h-screen p-4">
//         <ul className="menu">{menuItems}</ul>
//       </div>

//       {/* Mobile Drawer Button */}
//       <button
//         onClick={() => setIsDrawerOpen(true)}
//         className="md:hidden mt-14 fixed top-4 left-4 z-50  shadow-md"
//       >
//         <PanelLeftOpen size={24} />
//       </button>

//       {/* Mobile Drawer */}
//       <Dialog
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         className="relative z-50"
//       >
//         {/* Drawer Overlay */}
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//         {/* Drawer Panel */}
//         <Dialog.Panel className="fixed top-0 left-0 w-64 h-full  shadow-lg p-4 transform transition-transform duration-300 ease-in-out">
//           {/* Close Button */}
//           <button
//             onClick={() => setIsDrawerOpen(false)}
//             className="absolute top-4 right-4 text-white"
//           >
//             <X size={24} />
//           </button>

//           <ul className="menu mt-10">{menuItems}</ul>
//         </Dialog.Panel>
//       </Dialog>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto p-4 md:p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { PanelLeftOpen, X } from "lucide-react";
import useUserRoles from "../../hooks/useUserRoles";
import { AuthContext } from "../../Providers/AuthProvider";

const Dashboard = () => {
  const { loading } = useContext(AuthContext);
  const { isHR, isEmployee, isLoading } = useUserRoles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (loading || isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center h-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  const menuItems = (
    <>
      {isHR && (
        <>
          <li>
            <NavLink to={"/dashboard/hr/overview"}>Overview</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/hr/profile"}>Profile</NavLink>
          </li>
        </>
      )}
      {isEmployee && (
        <>
          <li>
            <NavLink to={"/dashboard/employee/overview"}>Overview</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/employee/profile"}>
              Employee Profile
            </NavLink>
          </li>
        </>
      )}
      <div className="divider"></div>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen pt-16 overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block w-64 min-h-screen p-4">
        <ul className="menu">{menuItems}</ul>
      </div>

      {/* Mobile Drawer Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="md:hidden mt-14 fixed top-4 bg-white p-2 rounded-xl left-4 z-50 shadow-md"
      >
        <PanelLeftOpen size={24} />
      </button>

      {/* Mobile Drawer */}
      <Dialog
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="relative z-50"
      >
        {/* Drawer Overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Drawer Panel */}
        <Dialog.Panel className="fixed top-16 left-0 w-64 h-[80vh] md:h-full bg-slate-200  shadow-lg p-4 transform transition-transform duration-300 ease-in-out">
          {/* Close Button */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={24} />
          </button>

          <ul className="menu mt-10">{menuItems}</ul>
        </Dialog.Panel>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
