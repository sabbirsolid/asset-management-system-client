import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useHR from '../../../hooks/useHR';
import useEmployee from '../../../hooks/useEmployee';
import useUserRoles from '../../../hooks/useUserRoles';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user, logOut} = useContext(AuthContext);
  // const [isHR, isLoading] = useHR();
  // const [isHR] = useHR();
  // const [isEmployee] = useEmployee()
  const{isHR, isEmployee}= useUserRoles();
  console.log(user);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  console.log('isHR:',isHR);
  console.log('isEmployee:',isEmployee);
  // const isEmployee = false;
  // const isHR = false;

  const links = isEmployee ? (
    <>
      <NavLink to="/" className="text-gray-300 hover:text-yellow-400 transition">Home</NavLink>
      <NavLink to="/my-assets" className="text-gray-300 hover:text-yellow-400 transition">My Assets</NavLink>
      <NavLink to="/my-team" className="text-gray-300 hover:text-yellow-400 transition">My Team</NavLink>
      <NavLink to="/request-asset" className="text-gray-300 hover:text-yellow-400 transition">Request for an Asset</NavLink>
      <NavLink to="/profile" className="text-gray-300 hover:text-yellow-400 transition">Profile</NavLink>
      <div className="flex items-center space-x-3">
        <img src={user?.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
        <span>{user?.displayName}</span>
        <button onClick={logOut} className="text-red-400 hover:text-red-600 transition">Logout</button>
      </div>
    </>
  ) : isHR ? (
    <>
      <NavLink to="/" className="text-gray-300 hover:text-yellow-400 transition">Home</NavLink>
      <NavLink to="/asset-list" className="text-gray-300 hover:text-yellow-400 transition">Asset List</NavLink>
      <NavLink to="/add-asset" className="text-gray-300 hover:text-yellow-400 transition">Add an Asset</NavLink>
      <NavLink to="/all-requests" className="text-gray-300 hover:text-yellow-400 transition">All Requests</NavLink>
      <NavLink to="/employee-list" className="text-gray-300 hover:text-yellow-400 transition">My Employee List</NavLink>
      <NavLink to="/add-employee" className="text-gray-300 hover:text-yellow-400 transition">Add an Employee</NavLink>
      <NavLink to="/profile" className="text-gray-300 hover:text-yellow-400 transition">Profile</NavLink>
      <div className="flex items-center space-x-3">
        <img src={user?.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
        <span>{user?.displayName}</span>
        <button onClick={logOut} className="text-red-400 hover:text-red-600 transition">Logout</button>
      </div>
    </>
  ) : (
    <>
      <NavLink to="/" className="text-gray-300 hover:text-yellow-400 transition">Home</NavLink>
      <NavLink to="/joinAsEmployee" className="text-gray-300 hover:text-yellow-400 transition">Join as Employee</NavLink>
      <NavLink to="/joinAsHRManager" className="text-gray-300 hover:text-yellow-400 transition">Join as HR Manager</NavLink>
      <NavLink to="/login" className="text-gray-300 hover:text-yellow-400 transition">Login</NavLink>
      {user && <button onClick={logOut} className="text-red-400 hover:text-red-600 transition">Logout</button>}
    </>
  );

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-yellow-400 text-xl font-bold">
              {isEmployee || isHR ? <>
              {
                isEmployee? 'Employee Logo':'HR Logo'
              }
              </> : 'XYZ'}
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-8">{links}</div>

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

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">{links}</div>
      </div>
    </nav>
  );
};

export default Navbar;
