import React from "react";

const RoleDropdown = ({ currentRole, handleRoleChange, isPending }) => {
  return (
    <div className="text-center text-sm">
      <select
        onChange={handleRoleChange}
        defaultValue={currentRole}
        disabled={isPending}
        className="px-4 py-1.5 rounded-md text-[12px] font-semibold cursor-pointer transition-all duration-200 border border-gray-400"
      >
        <option value="Customer">Customer</option>
        <option value="Agent">Agent</option>
        <option value="Admin">Admin</option>
      </select>

      {isPending && (
        <span className="ml-2 text-xs text-gray-500">Updating...</span>
      )}
    </div>
  );
};

export default RoleDropdown;
