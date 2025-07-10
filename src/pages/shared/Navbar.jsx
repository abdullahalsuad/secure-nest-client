import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState, useContext, use } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { CiDark, CiLight } from "react-icons/ci";
import { ThemeContext } from "../../context";
import { Handshake, LayoutDashboard, UserRoundPen } from "lucide-react";
import useUserRole from "../../hooks/useUserRole";

// Centralized Nav Config
const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Policies", path: "/all-policies" },
  { name: "Agents", path: "/agents" },
  { name: "FAQs", path: "/faqs" },
];

const getUserNavLinks = (role) => {
  if (role === "Admin") {
    return [
      {
        name: "My Dashboard",
        path: "/my-dashboard",
        icon: <UserRoundPen size={25} />,
      },
      {
        name: "Admin Dashboard",
        path: "/admin",
        icon: <LayoutDashboard size={25} />,
      },
      {
        name: "Agent Dashboard",
        path: "/agent",
        icon: <Handshake size={25} />,
      },
    ];
  } else if (role === "Agent") {
    return [
      {
        name: "Agent Dashboard",
        path: "/agent",
        icon: <Handshake size={25} />,
      },
      {
        name: "My Dashboard",
        path: "/my-dashboard",
        icon: <UserRoundPen size={25} />,
      },
    ];
  } else if (role === "Customer") {
    return [
      {
        name: "My Dashboard",
        path: "/my-dashboard",
        icon: <UserRoundPen size={25} />,
      },
    ];
  } else {
    return [];
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = use(ThemeContext);
  const { userRole, roleLoading } = useUserRole();

  const filteredUserNavLinks = getUserNavLinks(userRole);

  const handleLinkClick = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    try {
      setIsUserMenuOpen(false);
      await signOutUser();
      navigate("/");
      toast.success("Logout successful.");
    } catch (error) {
      console.log(error);
    }
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 dark:bg-gray-800/30 backdrop-blur shadow-lg z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center justify-center mt-4">
            <NavLink to="/" className="text-2xl font-bold  tracking-tight">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-700 to-teal-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold">Secure Nest</span>
              </div>
            </NavLink>
          </div>

          {/* Centered Nav Links */}
          <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-base font-medium text-teal-900 dark:text-teal-300"
                    : "text-base font-medium text-gray-900 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-500 transition"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle & User Avatar / Right Section */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-4 p-2 rounded-full text-gray-300 dark:text-black bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <CiLight size={24} /> : <CiDark size={24} />}
            </button>
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 focus:outline-none cursor-pointer"
                >
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-700 dark:border-teal-400"
                  />
                  <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {user?.displayName}
                  </span>
                  {isUserMenuOpen ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </button>
              ) : (
                <>
                  <Link
                    to="/authpage"
                    className="px-5 py-2.5 text-sm font-medium text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-700 dark:border-gray-600 rounded-md hover:bg-teal-70 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 dark:focus:ring-teal-500 transition mr-4 cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/authpage/register"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gray-700 dark:bg-teal-600 border border-transparent rounded-md hover:bg-gray-800 dark:hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 dark:focus:ring-teal-500 transition cursor-pointer"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {user && (
                    <>
                      <div className="m-4 px-2">
                        <button className="flex items-center space-x-3 focus:outline-none cursor-pointer my-4">
                          <img
                            src={user?.photoURL}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-teal-700 dark:border-teal-400"
                          />
                          <div className="flex flex-col items-start">
                            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                              {user?.displayName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {user?.email}
                            </p>
                          </div>
                        </button>
                      </div>
                      <hr className="border-t border-gray-200 dark:border-gray-700 my-1" />

                      {/* Profile links */}
                      {!roleLoading &&
                        filteredUserNavLinks.map((link, index) => (
                          <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                              isActive
                                ? "block px-4 py-3 text-sm font-medium text-teal-400 hover:bg-teal-70 dark:hover:bg-gray-700"
                                : "block px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-teal-70 dark:hover:bg-gray-700 hover:text-teal-400"
                            }
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="flex items-center gap-2">
                              {link.icon} {link.name}
                            </span>
                          </NavLink>
                        ))}

                      <hr className="border-t border-gray-200 dark:border-gray-700 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <IoIosLogOut size={25} /> Logout
                        </span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="text-gray-900 dark:text-gray-300 focus:outline-none mr-3 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <CiLight size={24} /> : <CiDark size={24} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 dark:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-3 transition-colors duration-300">
          <div className="flex flex-col space-y-3 px-4 pt-3">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "py-3 text-base font-medium text-teal-400"
                    : "py-3 text-base font-medium text-gray-900 dark:text-gray-300 hover:text-teal-400"
                }
                onClick={handleLinkClick}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <>
                  {!roleLoading &&
                    filteredUserNavLinks.map((link, index) => (
                      <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) =>
                          isActive
                            ? "block py-2 text-sm font-medium text-teal-400 hover:bg-teal-70 dark:hover:bg-gray-700"
                            : "block py-2 text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-teal-70 dark:hover:bg-gray-700 hover:text-teal-400"
                        }
                        onClick={handleLinkClick}
                      >
                        <span className="flex items-center gap-2">
                          {link.icon} {link.name}
                        </span>
                      </NavLink>
                    ))}

                  <button className="flex items-center space-x-3 focus:outline-none cursor-pointer my-4 w-full">
                    <img
                      src={user?.photoURL}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-teal-700 dark:border-teal-400"
                    />
                    <div className="flex flex-col items-start">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {user?.displayName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </button>
                  <button
                    className="border border-red-400 bg-white dark:bg-gray-700 rounded-md w-full text-left py-3 text-base font-medium text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer flex items-center justify-center gap-2"
                    onClick={handleSignOut}
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <div className="my-4">
                  <Link
                    to="/authpage"
                    className="px-5 py-2.5 text-sm font-medium text-black dark:text-white bg-white dark:bg-gray-700 border border-gray-700 dark:border-gray-600 rounded-md hover:bg-teal-70 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 dark:focus:ring-teal-500 transition mr-4 w-full text-center"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                  <Link
                    to="/authpage/register"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gray-700 dark:bg-teal-600 border border-transparent rounded-md hover:bg-gray-800 dark:hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 dark:focus:ring-teal-500 transition w-full text-center"
                    onClick={handleLinkClick}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
