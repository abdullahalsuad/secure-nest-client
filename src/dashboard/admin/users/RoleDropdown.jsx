import { ChevronDown } from "lucide-react";
import React from "react";

const RoleDropdown = ({ currentRole, handleRoleChange, isPending }) => {
  return (
    <div className="text-center text-sm relative inline-block">
      <select
        onChange={handleRoleChange}
        defaultValue={currentRole}
        disabled={isPending}
        className="appearance-none px-4 py-1.5 pr-8 rounded-md dark:bg-gray-700 bg-white text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none cursor-pointer "
      >
        <option value="Customer">Customer</option>
        <option value="Agent">Agent</option>
        <option value="Admin">Admin</option>
      </select>

      {/* Custom arrow icon */}
      <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 ">
        <ChevronDown />
      </div>

      {isPending && (
        <span className="ml-2 text-xs text-gray-500">Updating...</span>
      )}
    </div>
  );
};

export default RoleDropdown;
