import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CircleX, UserRoundPen } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RoleDropdown from "./RoleDropdown";

const UserRoleSelect = ({ userId, currentRole }) => {
  const axiosSecure = useAxiosSecure();
  const [isChangeRole, setIsChangeRole] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, role }) => {
      const response = await axiosSecure.patch(`/role/${userId}`, {
        role,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Role updated successfully:", data);
      toast.success("Role updated successfully");
    },
    onError: (err) => {
      console.error("Failed to update role:", err);
      toast.err(`Error: ${err.response?.data?.message || err.message}`);
    },
  });

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    mutate({ userId, role: newRole });
    setIsChangeRole(false);
  };

  return (
    <>
      {isChangeRole ? (
        <div className="flex gap-2">
          <RoleDropdown
            handleRoleChange={handleRoleChange}
            isPending={isPending}
            currentRole={currentRole}
          />
          <button
            onClick={() => setIsChangeRole(false)}
            className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md"
          >
            <CircleX size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsChangeRole(true)}
          className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md"
        >
          <UserRoundPen size={16} /> Change role
        </button>
      )}
    </>
  );
};

export default UserRoleSelect;
