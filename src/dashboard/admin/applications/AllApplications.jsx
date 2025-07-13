import { Ban, CircleCheck, TicketCheck, UserPlus } from "lucide-react";
import React from "react";
import { FiEye } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllApplications = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all applications
  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications", {
        withCredentials: true,
      });
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
    <div className="p-6 space-y-6 min-h-screen">
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Policy Name
              </th>
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
                Date
              </th>
              <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {applications.map((application) => (
              <tr className="transition-colors duration-150">
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {application.policeName}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {application.fullName}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {application.applicantNumber}
                </td>

                <td className="px-6 py-4 text-center text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold 
                      ${
                        application.Status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : application.Status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                      dark:${
                        application.Status === "Approved"
                          ? "bg-green-800 text-green-100"
                          : application.Status === "Rejected"
                          ? "bg-red-800 text-red-100"
                          : "bg-yellow-800 text-yellow-100"
                      }
                    `}
                  >
                    {application.Status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                  {new Date(application.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
                  <button className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <UserPlus size={16} /> Assign Agent
                  </button>
                  <button className="flex items-center gap-1 text-green-600 hover:text-white hover:bg-green-600 dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <CircleCheck size={16} /> Approved
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
                    <Ban size={16} /> Rejected
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApplications;
