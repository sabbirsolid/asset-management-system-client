import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUserRoles from "../../../hooks/useUserRoles";
import ThemeToggle from "../../../components/DarkMode/ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { isHR, isEmployee, userObject } = useUserRoles();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 font-semibold underline decoration-2 transition duration-200"
      : "text-white font-medium hover:text-yellow-300 transition duration-200";

  const renderLinks = () => {
    if (isEmployee) {
      return (
        <>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/myRequestedAssets" className={navLinkClass}>
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink to="/myTeam" className={navLinkClass}>
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink to="/requestForAsset" className={navLinkClass}>
              Request Asset
            </NavLink>
          </li>
          <li>
            <NavLink to="/employeeProfile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
        </>
      );
    }
    if (isHR) {
      return (
        <>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/hr/assetList" className={navLinkClass}>
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink to="/hr/addAsset" className={navLinkClass}>
              Add Asset
            </NavLink>
          </li>
          <li>
            <NavLink to="/hr/allRequests" className={navLinkClass}>
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/hr/myEmployeeList" className={navLinkClass}>
              Employee List
            </NavLink>
          </li>
          <li>
            <NavLink to="/hr/addEmployee" className={navLinkClass}>
              Add Employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/hr/hrProfile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
        </>
      );
    }
    return (
      <>
        <li>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/joinAsEmployee" className={navLinkClass}>
            Join as Employee
          </NavLink>
        </li>
        <li>
          <NavLink to="/joinAsHRManager" className={navLinkClass}>
            Join as HR Manager
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <div className="navbar  bg-gray-900 fixed z-50">
     <div className="w-11/12 mx-auto ">
       {/* Navbar Start */}
       <div className="navbar-start flex items-center">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <ul
              tabIndex={0}
              className=" dropdown-content mt-3 w-52 bg-black p-2 shadow-lg rounded-box z-[1]"
            >
              {renderLinks()}
              {user && (
                <li>
                  <button onClick={logOut} className="btn btn-sm mt-4">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
        {/* <NavLink to="/" className=" text-xl hidden lg:flex items-center">

        </NavLink> */}
        {isEmployee || isHR ? (
          userObject?.company ? (
            <img
              className="hidden lg:block w-[40px]"
              src={userObject?.companyLogo}
              alt="AMS"
            />
          ) : (
            <p className="ml-3 font-bold text-yellow-500">AMS</p>
          )
        ) : (
          <p className="ml-3 font-bold text-yellow-500">AMS</p>
        )}
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-5 px-1">{renderLinks()}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-3">
        {user && (
          <div className="flex items-center space-x-3">
            <img
              src={userObject?.photoURL || "/default-profile.png"}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="hidden sm:block text-white font-medium text-sm">
              {userObject?.name}
            </p>
            <button onClick={logOut} className="btn btn-sm">
              Logout
            </button>
          </div>
        )}
        {!user && (
          <NavLink to="/login" className="btn btn-sm">
            Login
          </NavLink>
        )}
        <ThemeToggle></ThemeToggle>
      </div>
     </div>
    </div>
  );
};

export default Navbar;
