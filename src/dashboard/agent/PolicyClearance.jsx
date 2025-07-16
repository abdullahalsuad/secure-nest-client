import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CircleCheckBig,
  Eye,
  X,
  FileText,
  User,
  HeartPulse,
} from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [selectedClaim, setSelectedClaim] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [application, setApplication] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const {
    data: claims = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["claims"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/claims/${user.uid}`);
      return res.data;
    },
  });

  const updateClaimStatus = useMutation({
    mutationFn: ({ claimId, status, applicationId }) =>
      axiosSecure.patch(`/claims/${claimId}`, {
        claimStatus: status,
        applicationId,
      }),
    onSuccess: () => {
      toast.success("Claim Approved");
      queryClient.invalidateQueries(["claims"]);
    },
  });

  const openDetailsModal = async (claim) => {
    setLoadingDetails(true);
    setModalOpen(true);
    setSelectedClaim(claim);

    try {
      const appRes = await axiosSecure.get(
        `/single-application/${claim.applicationId}`
      );
      setApplication(appRes.data);

      const policyRes = await axiosSecure.get(`/polices/${claim.policeId}`);
      setPolicy(policyRes.data);
    } catch (err) {
      toast.error("Failed to load claim details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedClaim(null);
    setApplication(null);
    setPolicy(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading claims: {error.message}</div>;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Claims List
      </h2>

      {claims.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 dark:text-gray-400">No claims yet.</p>
        </div>
      ) : (
        <div className="rounded-md shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            <thead className="bg-gray-900 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider text-center">
                  Policy Name
                </th>
                <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider text-center">
                  Customer
                </th>
                <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider text-center">
                  Reason
                </th>
                <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {claims.map((claim) => (
                <tr key={claim._id}>
                  <td className="text-center px-6 py-4">{claim.policeName}</td>
                  <td className="text-center px-6 py-4">
                    {claim.customerName}
                  </td>
                  <td className="text-center px-6 py-4">{claim.reason}</td>
                  <td className="text-center px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        claim.claimStatus === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {claim.claimStatus || "Pending"}
                    </span>
                  </td>
                  <td className="text-center px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openDetailsModal(claim)}
                        className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:bg-teal-500 dark:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md shadow-sm hover:shadow-md dark:border-0 cursor-pointer"
                      >
                        <Eye size={16} /> View Details
                      </button>

                      {claim.claimStatus !== "Approved" && (
                        <button
                          onClick={() =>
                            updateClaimStatus.mutate({
                              claimId: claim._id,
                              applicationId: claim.applicationId,
                              status: "Approved",
                            })
                          }
                          className="flex items-center gap-1 text-emerald-600 hover:text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md shadow-sm hover:shadow-md dark:border-0"
                        >
                          <CircleCheckBig size={16} /> Approve Claim
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50  bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <X size={24} />
            </button>

            {loadingDetails ? (
              <p className="text-center text-gray-600">Loading details...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-teal-700 flex items-center gap-2">
                  <FileText size={24} /> Claim Details
                </h2>

                {/* Application Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <User size={20} /> Applicant Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>Name:</strong> {application.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong> {application.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {application.applicantNumber}
                    </p>
                    <p>
                      <strong>Address:</strong> {application.address}
                    </p>
                    <p>
                      <strong>Nominee:</strong> {application.nomineeName} (
                      {application.relationship})
                    </p>
                    <p>
                      <strong>Nominee Phone:</strong>{" "}
                      {application.nomineeNumber}
                    </p>
                  </div>

                  {/* Health Issues */}
                  <div className="mt-4">
                    <h4 className="font-medium mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <HeartPulse size={18} /> Health Issues:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(application.healthIssues || {}).map(
                        ([key, value]) =>
                          value && (
                            <span
                              key={key}
                              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full"
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                </div>

                {/* Policy Info */}
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <FileText size={20} /> Policy Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>Title:</strong> {policy.title}
                    </p>
                    <p>
                      <strong>Category:</strong> {policy.category}
                    </p>
                    <p>
                      <strong>Coverage:</strong> {policy.coverageRange}
                    </p>
                    <p>
                      <strong>Base Premium:</strong> ₹{policy.basePremiumRate}
                    </p>
                    <p>
                      <strong>Duration Options:</strong>{" "}
                      {policy.durationOptions}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyClearance;
