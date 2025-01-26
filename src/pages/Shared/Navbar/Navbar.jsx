import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUserRoles from "../../../hooks/useUserRoles";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { isHR, isEmployee, userObject } = useUserRoles();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold underline border-yellow-400 transition"
      : "text-gray-300 hover:text-yellow-400 transition";

  const ProfileSection = () => (
    <div className="flex items-center space-x-3">
      <img
        src={userObject?.photoURL || "/default-profile.png"}
        alt={userObject?.displayName || "User Profile"}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="text-sm font-medium">{userObject?.name || "Guest"}</span>
      <button
        onClick={logOut}
        className="text-red-400 hover:text-red-600 transition"
      >
        Logout
      </button>
    </div>
  );

  const renderLinks = () => {
    if (isEmployee) {
      return (
        <>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/myRequestedAssets" className={navLinkClass}>
            My Assets
          </NavLink>
          <NavLink to="/myTeam" className={navLinkClass}>
            My Team
          </NavLink>
          <NavLink to="/requestForAsset" className={navLinkClass}>
            Request for an Asset
          </NavLink>
          <NavLink to="/employeeProfile" className={navLinkClass}>
            Profile
          </NavLink>
          <ProfileSection />
        </>
      );
    }
    if (isHR) {
      return (
        <>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/hr/assetList" className={navLinkClass}>
            Asset List
          </NavLink>
          <NavLink to="/hr/addAsset" className={navLinkClass}>
            Add an Asset
          </NavLink>
          <NavLink to="/hr/allRequests" className={navLinkClass}>
            All Requests
          </NavLink>
          <NavLink to="/hr/myEmployeeList" className={navLinkClass}>
            My Employee List
          </NavLink>
          <NavLink to="/hr/addEmployee" className={navLinkClass}>
            Add an Employee
          </NavLink>
          <NavLink to="/hr/hrProfile" className={navLinkClass}>
            Profile
          </NavLink>
          <ProfileSection />
        </>
      );
    }
    return (
      <>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/joinAsEmployee" className={navLinkClass}>
          Join as Employee
        </NavLink>
        <NavLink to="/joinAsHRManager" className={navLinkClass}>
          Join as HR Manager
        </NavLink>
        {user ? (
          ""
        ) : (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </>
        )}
        {user && (
          <>
            <button
              onClick={logOut}
              className="text-red-400 hover:text-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-yellow-400 text-xl font-bold">
              {isEmployee || isHR ? (
                userObject?.company ? (
                  <>
                    <img
                      className="w-[50px] object-contain"
                      src={userObject?.companyLogo}
                      alt="AMS"
                    />
                  </>
                ) : (
                  "AMS"
                )
              ) : (
                "AMS"
              )}
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">{renderLinks()}</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-yellow-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 flex flex-col space-y-1">
            {renderLinks()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
