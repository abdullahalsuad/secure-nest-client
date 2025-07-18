import { Ban, ChevronDown, CircleCheck, Eye, UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import RejectionModal from "./RejectionModal";
import NoDataFound from "../../../components/dashboard/NoDataFound";

const AllApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // State for dropdown
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState("");

  // State for rejection modal
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedAppIdForRejection, setSelectedAppIdForRejection] =
    useState(null);

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

  // Fetch all agents
  const {
    data: agents = [],
    isLoading: agentsLoading,
    error: agentsError,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // Mutation to update application status (Approved/Rejected)
  const updateApplicationStatus = useMutation({
    mutationFn: ({ applicationId, status, rejectionReason }) =>
      axiosSecure.patch(
        `/applications/${applicationId}`,
        { Status: status, rejectionReason },
        {
          withCredentials: true,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-applications"]);
    },
  });

  // Mutation to assign agent
  const assignAgentMutation = useMutation({
    mutationFn: ({ applicationId, agent }) =>
      axiosSecure.patch(
        `/applications/assign-agent/${applicationId}`,
        {
          agentEmail: agent.email,
          agentName: agent.name,
          agentID: agent.id,
        },
        {
          withCredentials: true,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-applications"]);
      setSelectedAppId(null);
      setSelectedAgentId("");
    },
  });

  if (error || agentsError) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10 dark:bg-gray-900">
        Error loading data
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <title>Applications</title>
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
                "Agent",
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
                <td colSpan={7} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application._id}
                  className="transition-colors duration-150"
                >
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
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        application.Status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : application.Status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      } dark:${
                        application.Status === "Approved"
                          ? "bg-green-400 text-green-100"
                          : application.Status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-900"
                      }`}
                    >
                      {application.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {new Date(application.createdAt).toLocaleString()}
                  </td>
                  {/* Assign Agent Button */}
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {application.assignedAgent.agentID === "no-assigned" &&
                    application.Status !== "Rejected" ? (
                      <button
                        onClick={() => setSelectedAppId(application._id)}
                        className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md"
                      >
                        <UserPlus size={16} /> Assign Agent
                      </button>
                    ) : (
                      <span className="text-sm text-green-600">
                        {application.assignedAgent.agentName}
                      </span>
                    )}
                    {/* Show select dropdown if selected */}
                    {selectedAppId === application._id && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="relative w-full max-w-xs">
                          {!agentsLoading && (
                            <>
                              <select
                                className="appearance-none block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-8"
                                value={selectedAgentId}
                                onChange={(e) => {
                                  const selectedId = e.target.value;
                                  setSelectedAgentId(selectedId);
                                  const agent = agents.find(
                                    (a) => a.userId === e.target.value
                                  );
                                  if (agent) {
                                    assignAgentMutation.mutate({
                                      applicationId: application._id,
                                      agent: {
                                        id: agent.userId,
                                        name: agent.userName,
                                        email: agent.userEmail,
                                      },
                                    });
                                  }
                                }}
                              >
                                <option value="">-- Select Agent --</option>
                                {agents.map((agent) => (
                                  <option
                                    key={agent.userId}
                                    value={agent.userId}
                                  >
                                    {agent.userName}
                                  </option>
                                ))}
                              </select>
                              {/* Custom dropdown arrow */}
                              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                <ChevronDown />
                              </div>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedAppId(null)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <X />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium flex items-center gap-4">
                    {/* Approve / Reject Buttons */}
                    {application.Status !== "Approved" &&
                      application.Status !== "Rejected" && (
                        <>
                          <button
                            onClick={() =>
                              updateApplicationStatus.mutate({
                                applicationId: application._id,
                                status: "Approved",
                              })
                            }
                            className="flex items-center gap-1 text-green-600 hover:text-white hover:bg-green-600 dark:bg-green-500 dark:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 dark:border-green-500 rounded-md cursor-pointer shadow-sm hover:shadow-md"
                          >
                            <CircleCheck size={16} /> Approve
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAppIdForRejection(application._id);
                              setShowRejectionModal(true);
                            }}
                            className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:bg-red-500 dark:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 dark:border-red-500 rounded-md cursor-pointer shadow-sm hover:shadow-md"
                          >
                            <Ban size={16} /> Reject
                          </button>
                        </>
                      )}

                    {/* View Button */}
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

      {/* Rejection Modal */}
      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => {
          setShowRejectionModal(false);
          setSelectedAppIdForRejection(null);
        }}
        onSubmit={(appId, feedback) => {
          updateApplicationStatus.mutate({
            applicationId: appId,
            status: "Rejected",
            rejectionReason: feedback,
          });
          setShowRejectionModal(false);
          setSelectedAppIdForRejection(null);
        }}
        applicationId={selectedAppIdForRejection}
      />
    </div>
  );
};

export default AllApplications;
