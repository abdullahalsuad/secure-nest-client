import React from "react";
import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";
import { CircleCheck, Ban, UserPlus } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch application by ID
  const {
    data: application,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["single-application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-application/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading application details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-red-500">
          Error loading application: {error.message}
        </div>
      </div>
    );
  }

  //   const healthIssues = application.healthIssues || {};

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Application Details</h1>
          <p className="opacity-90">{application?.policeName}</p>
        </div>

        {/* Status Badge */}
        <div className="flex justify-end p-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              application?.Status === "Approved"
                ? "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-100"
                : application?.Status === "Rejected"
                ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
            }`}
          >
            {application?.Status}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Applicant Info */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Applicant Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Full Name
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.fullName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.applicantNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  NID
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.nid}
                </p>
              </div>
            </div>
          </section>

          {/* Policy Info */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Policy Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Policy ID
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.policeId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Policy Name
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.policeName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Duration
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.duration}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Applied On
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {new Date(application?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>

          {/* Health Issues */}
          {/* <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Health Disclosure
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={healthIssues.diabetes || false}
                  disabled
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Diabetes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={healthIssues.heart || false}
                  disabled
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Heart Disease
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={healthIssues.asthma || false}
                  disabled
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Asthma
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={healthIssues.none || false}
                  disabled
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  No Issues
                </label>
              </div>
            </div>
          </section> */}

          {/* Nominee Info */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Nominee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.nomineeName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Relationship
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.relationship}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.nomineeNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Address
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {application?.nomineeAddress}
                </p>
              </div>
            </div>
          </section>

          {/* Assigned Agent */}
          {application?.assignedAgent?.agentID &&
            application?.assignedAgent.agentID !== "no-assigned" && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Assigned Agent
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <UserPlus size={20} className="text-teal-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {application?.assignedAgent.agentName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {application?.assignedAgent.agentEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

          {/* Status Update Button (only show if not Approved/Rejected) */}
          {application?.Status !== "Approved" &&
            application?.Status !== "Rejected" && (
              <section className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-4">
                <button
                  //   onClick={() => updateStatus("Approved")}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition"
                >
                  <CircleCheck size={18} /> Approve
                </button>
                <button
                  //   onClick={() => updateStatus("Rejected")}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition"
                >
                  <Ban size={18} /> Reject
                </button>
              </section>
            )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
