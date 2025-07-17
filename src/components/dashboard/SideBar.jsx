import { use, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Home, LogOut, UserPen } from "lucide-react";
import { Menu, X } from "lucide-react";

import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const SideBar = ({ links }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, signOutUser, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      navigate("/");
      await signOutUser();
      console.log("logout success");
      toast.success("Logout successful.");
    } catch (error) {
      console.log(error);
    }
    setUser(null);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300  ${
        isSidebarCollapsed ? "w-24" : "w-64"
      } flex flex-col shadow-lg`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800">
        {!isSidebarCollapsed && (
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate px-4">
            Dashboard
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 px-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isSidebarCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/*  Links */}
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isActive
                  ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 font-medium"
                  : ""
              } ${isSidebarCollapsed ? "justify-center" : ""}`
            }
          >
            <link.icon className={!isSidebarCollapsed ? "mr-3" : ""} />
            {!isSidebarCollapsed && (
              <span className="truncate">{link.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
        {/* Avatar + Name/Email */}
        <div
          className={`flex items-center mb-3 ${
            isSidebarCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <img
              src={user?.photoURL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-700 dark:border-teal-400"
            />
          </div>

          {!isSidebarCollapsed && (
            <div className="truncate">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.displayName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>

        {/* Update profile */}
        <NavLink
          to="update-profile"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isActive
                ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 font-medium"
                : ""
            } ${isSidebarCollapsed ? "justify-center" : ""}`
          }
        >
          <UserPen className="h-5 w-5" />
          {!isSidebarCollapsed && (
            <span className="ml-3 text-sm">Update Profile</span>
          )}
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className={`flex items-center p-3 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!isSidebarCollapsed && <span className="ml-3 text-sm">Logout</span>}
        </button>

        {/* Go Home Button */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isActive
                ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 font-medium"
                : ""
            } ${isSidebarCollapsed ? "justify-center" : ""}`
          }
        >
          <Home className="h-5 w-5" />
          {!isSidebarCollapsed && <span className="ml-3 text-sm">Go Home</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;
