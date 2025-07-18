import React, { use } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import MyPoliceTableRow from "../admin/users/MyPoliceTableRow";
import NoDataFound from "../../components/dashboard/NoDataFound";

const MyPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  // Fetch all applications
  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications/${user.uid}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10 dark:bg-gray-900">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <title>My Policies</title>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          My Policies
        </h2>
      </div>
      {/*  content */}
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {[
                "Policy Name",
                "Coverage",
                "Duration",
                "Premium",
                "Status",
                "Date",
                "Rejection Reason",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <MyPoliceTableRow
                  key={application._id}
                  application={application}
                  isLoading={isLoading}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPolicies;
