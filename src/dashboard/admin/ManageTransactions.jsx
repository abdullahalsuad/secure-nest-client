import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const gradientClasses = {
  pink: "from-pink-500 to-pink-700",
  purple: "from-purple-500 to-purple-700",
  blue: "from-blue-500 to-blue-700",
  teal: "from-teal-500 to-teal-700",
};

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all payments
  const {
    data: payments = [],
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      return res.data;
    },
  });

  // Fetch income statistics
  const {
    data: incomeStats = {},
    isLoading: incomeLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["income-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/income-stats");
      return res.data.data;
    },
  });

  if (paymentsLoading || incomeLoading) return <p>Loading...</p>;
  if (paymentsError || incomeError)
    return <p>Error loading data: {(paymentsError || incomeError).message}</p>;

  return (
    <div className="p-6 space-y-6 min-h-screen text-gray-900 dark:text-gray-100 font-inter">
      <title>Manage Transactions</title>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          label="Total Income"
          value={incomeStats.totalIncome}
          from="pink"
        />
        <SummaryCard
          label="Weekly Income"
          value={incomeStats.weeklyIncome}
          from="purple"
        />
        <SummaryCard
          label="Monthly Income"
          value={incomeStats.monthlyIncome}
          from="blue"
        />
        <SummaryCard
          label="Yearly Income"
          value={incomeStats.yearlyIncome}
          from="teal"
        />
      </div>

      {/* Payments Table */}
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {[
                "Transaction ID",
                "User Email",
                "Policy Name",
                "Paid Amount",
                "Date",
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
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-6 py-4 text-center text-sm font-medium">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  {payment.email}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  {payment.policeName || "N/A"}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  ${payment.amount?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-700 dark:text-teal-100">
                    PAID
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, from }) => {
  const gradientClass = gradientClasses[from] || "from-gray-500 to-gray-700";

  return (
    <div
      className={`bg-gradient-to-r ${gradientClass} text-white px-6 py-4 rounded-lg shadow-md`}
    >
      <p className="text-sm uppercase tracking-wide font-semibold">{label}</p>
      <span className="text-2xl font-bold mt-1 block">
        ${value?.toFixed(2) || "0.00"}
      </span>
    </div>
  );
};

export default ManageTransactions;
