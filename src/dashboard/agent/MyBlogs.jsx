import { Ban, Edit, Trash } from "lucide-react";
import React from "react";

const MyBlogs = () => {
  return (
    <div className="p-6 space-y-6  min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4"></div>

      <div className="rounded-md  shadow-lg">
        <div className="overflow-x-auto">
          {/* {users.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No users found.
            </div>
          ) : ( */}
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  rounded-md bg-white dark:bg-gray-800  shadow-lg">
            <thead className="bg-gray-900 dark:bg-gray-700 rounded-md ">
              <tr>
                <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Publish Date
                </th>

                <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>

                <th className="px-6 py-3 text-[15px] font-bold  text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* {users.map((user) => ( */}
              <tr className="transition-colors duration-150">
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  anme
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {/* {user.userEmail} */}mail
                </td>

                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  Status
                </td>

                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {/* {new Date(user.createdAt).toLocaleString()} */}date
                </td>

                <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <Edit size={16} /> View
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <Trash size={16} /> Delete
                  </button>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
