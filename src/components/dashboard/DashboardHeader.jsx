import React, { use } from "react";
import { FiSun } from "react-icons/fi";
import { ThemeContext } from "../../context";
import { Moon } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";

const DashboardHeader = () => {
  const { theme, toggleTheme } = use(ThemeContext);
  const { user } = use(AuthContext);

  return (
    <header className=" bg-white dark:bg-gray-900 flex justify-between items-center  pb-4 border-b border-gray-200 dark:border-gray-600 p-6  ">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome, {user?.displayName}
      </h1>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-teal-700 dark:border-teal-400"
          />
        </div>
        <div className="flex items-center justify-center font-bold">
          <button
            onClick={toggleTheme}
            className="bg-gray-200 rounded-full p-2 h-10 w-10 flex items-center justify-center cursor-pointer"
          >
            {theme === "dark" ? (
              <FiSun className="text-black" size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
