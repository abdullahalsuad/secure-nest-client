import { CirclePlus, Edit, Trash, X } from "lucide-react";
import React, { useState } from "react";
import AddPolicies from "./AddPolicies"; // Make sure path is correct

const ManagePolicies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header & Add Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-teal-600 text-white font-medium text-sm rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200 flex justify-center items-center gap-2 cursor-pointer"
        >
          <CirclePlus />
          Add Polices
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg">
            <thead className="bg-gray-900 dark:bg-gray-700 rounded-md">
              <tr>
                <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Policy Title
                </th>
                <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Coverage Range
                </th>
                <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Base Rate
                </th>
                <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="transition-colors duration-150">
                <td className="px-6 py-4 text-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Sample Policy
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  Term Life
                </td>
                <td className="px-6 py-4 text-center text-sm">$50k - $1M</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  20 Years
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  $50/month
                </td>
                <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <Edit size={16} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <Trash size={16} /> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  lg:ml-65  ">
          <div className=" relative max-w-4xl w-full max-h-[90vh]  p-6 lg:mt-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute top-15 right-15 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl"
            >
              <X />
            </button>

            <AddPolicies />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePolicies;
