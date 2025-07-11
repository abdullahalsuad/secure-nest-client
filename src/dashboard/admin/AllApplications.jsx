import { Ban, UserPlus } from "lucide-react";
import React from "react";
import { FiEye } from "react-icons/fi";

const AllApplications = () => {
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Assigned Agent
              </th>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr className="transition-colors duration-150">
              <td className="px-6 py-4 text-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <img alt="" className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      name
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                mail
              </td>
              <td className="px-6 py-4 text-center text-sm">Status s</td>
              <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                Status
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                date
              </td>
              <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
                <button className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                  <UserPlus size={16} /> Assign Agent
                </button>
                <button className="flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                  <FiEye size={16} /> View
                </button>
                <button className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                  <Ban size={16} /> Rejected
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApplications;
