import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ShieldPlus } from "lucide-react";
import ClaimForm from "./ClaimForm";

const ClaimPolicy = () => {
  const { user } = use(AuthContext);
  const userId = user?.uid;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approvedPolicies", userId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/approved-policies/${userId}`);
      return data;
    },
  });

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Policy Table */}
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {[
                "Name",
                "Policy Name",
                "Category",
                "Coverage",
                "Policy Duration",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-[15px] font-bold text-white text-center uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {applications.length > 0 ? (
              applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.fullName}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails?.category}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails?.coverageRange}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.duration || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {!application.claimStatus ? (
                      <button
                        onClick={() => handleOpenModal(application)}
                        className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:bg-teal-500 dark:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md dark:border-0 mx-auto"
                      >
                        <ShieldPlus size={16} /> Claim
                      </button>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                                ${
                                  application.claimStatus === "Approved"
                                    ? "bg-green-100 text-green-700 dark:text-green-800"
                                    : application.claimStatus === "Rejected"
                                    ? "bg-red-100 text-red-700 dark:text-red-800"
                                    : "bg-yellow-100 text-yellow-700 dark:text-yellow-800"
                                }
                              `}
                      >
                        {application.claimStatus}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-600 dark:text-gray-300"
                >
                  No approved policies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Claim Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0  flex justify-center items-start z-50 pt-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl relative p-6">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <ClaimForm
              application={selectedApplication}
              setIsModalOpen={setIsModalOpen}
              setSelectedApplication={setSelectedApplication}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimPolicy;
