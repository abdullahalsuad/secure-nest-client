import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthProvider";
import { ChevronDown, Eye } from "lucide-react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import NoDataFound from "../../components/dashboard/NoDataFound";

const AssignedCustomers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const agentId = user?.uid;

  // Fetch applications assigned to this agent
  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agent-assigned-applications", agentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-applications/${agentId}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // Mutation: Update application status
  const updateApplicationStatus = useMutation({
    mutationFn: ({ applicationId, status }) =>
      axiosSecure.patch(`/applications/${applicationId}`, {
        Status: status,
      }),
    onSuccess: () => {
      toast.success(`Application status updated `);
      queryClient.invalidateQueries(["agent-assigned-applications", agentId]);
    },
  });

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading applications: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen ">
      <title>Assigned Applications</title>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Your Assigned Applications
      </h2>

      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {[
                "Policy Name",
                "Customer",
                "Email",
                "Date",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-[15px] font-bold text-white text-center uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  {/* Policy Name */}
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {application.policeName}
                  </td>

                  {/* Customer Name */}
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {application.fullName}
                  </td>

                  {/* Applicant Number */}
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {application.applicantNumber}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {new Date(application.createdAt).toLocaleString()}
                  </td>

                  {/* Status Dropdown */}

                  <td className="px-6 py-4 text-center text-sm">
                    <div className="relative">
                      <select
                        value={application.Status}
                        onChange={(e) =>
                          updateApplicationStatus.mutate({
                            applicationId: application._id,
                            status: e.target.value,
                          })
                        }
                        className="block w-full appearance-none px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-8 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>

                      {/* Custom dropdown icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <ChevronDown />
                      </div>
                    </div>
                  </td>

                  {/* View Details Button */}
                  <td className="px-6 py-4 text-sm text-center">
                    <Link to={`${application._id}`}>
                      <button className="flex items-center justify-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 transition px-4 py-1.5 border border-gray-300 rounded-md dark:bg-teal-600 dark:text-white dark:border-teal-600 cursor-pointer mx-auto">
                        <Eye size={16} /> View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedCustomers;
