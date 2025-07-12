import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import UserRoleSelect from "./UserRoleSelect";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", { withCredentials: true });
      return res.data;
    },
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10 dark:bg-gray-900">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6  min-h-screen">
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  rounded-md bg-white dark:bg-gray-800  shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700 rounded-md ">
            <tr>
              <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>

              <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Join Date
              </th>

              <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="transition-colors duration-150">
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10   rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      <img
                        src={user.userProfile}
                        alt=""
                        className="w-10 h-10   rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.userName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {user.userEmail}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  {user.userRole === "Admin" ? (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-white">
                      ADMIN
                    </span>
                  ) : user.userRole === "Agent" ? (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white">
                      AGENT
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-white">
                      CUSTOMER
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
                  {/* btn to change role */}

                  <UserRoleSelect
                    userId={user.userId}
                    currentRole={user.userRole}
                  />

                  {/* <button className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                        <Trash size={16} /> Delete
                      </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
