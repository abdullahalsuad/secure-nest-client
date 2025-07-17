import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CreditCard, Download } from "lucide-react";
import { useNavigate } from "react-router";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const navigate = useNavigate();
  //handling payment
  const handlePay = (policeId, applicationId) => {
    navigate(`${policeId}/${applicationId}`);
  };

  // Fetch all applications
  const {
    data: myApprovedPolices = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-payment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-policies/${user.uid}`, {
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
                <td colSpan={7} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : myApprovedPolices.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              myApprovedPolices.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails.title}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails.coverageRange}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.duration}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails.basePremiumRate}
                  </td>

                  <td className="px-6 py-4 text-center text-sm">
                    <span
                      className={`items-center px-3 py-1 rounded-full  font-medium ${
                        application.paymentStatues === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.paymentStatues}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-sm">
                    <button
                      disabled={application.paymentStatues === "Paid"}
                      onClick={() =>
                        handlePay(
                          application.policyDetails._id,
                          application._id
                        )
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2 border rounded text-sm transition-colors duration-200 
                      ${
                        application.paymentStatues === "Paid"
                          ? "border-gray-400 text-gray-400 cursor-not-allowed bg-gray-100"
                          : "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer"
                      }
                    `}
                    >
                      <CreditCard className="w-4 h-4" />

                      {application.paymentStatues === "Paid"
                        ? "Already Paid"
                        : " Pay Now"}
                    </button>
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

export default MyPayments;
