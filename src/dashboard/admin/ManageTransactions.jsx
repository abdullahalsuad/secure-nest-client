import React, { useState, useEffect } from "react";
import { Filter, Calendar, User, FileText } from "lucide-react"; // Icons for filter buttons

const ManageTransactions = () => {
  // Dummy data for Stripe payments
  const [payments, setPayments] = useState([
    {
      id: "txn_001",
      userEmail: "user1@example.com",
      policyName: "Health Plus",
      paidAmount: 120.0,
      date: "2023-07-01T10:30:00Z",
      status: "Success",
    },
    {
      id: "txn_002",
      userEmail: "user2@example.com",
      policyName: "Auto Premium",
      paidAmount: 250.5,
      date: "2023-06-28T14:15:00Z",
      status: "Success",
    },
    {
      id: "txn_003",
      userEmail: "user3@example.com",
      policyName: "Home Secure",
      paidAmount: 85.75,
      date: "2023-07-03T09:00:00Z",
      status: "Failed",
    },
    {
      id: "txn_004",
      userEmail: "user1@example.com",
      policyName: "Travel Guard",
      paidAmount: 45.0,
      date: "2023-06-20T11:45:00Z",
      status: "Success",
    },
    {
      id: "txn_005",
      userEmail: "user4@example.com",
      policyName: "Life Max",
      paidAmount: 300.0,
      date: "2023-07-02T16:00:00Z",
      status: "Success",
    },
  ]);

  const [totalIncome, setTotalIncome] = useState(0);

  // Calculate total income from successful payments
  useEffect(() => {
    const income = payments.reduce((sum, payment) => {
      return payment.status === "Success" ? sum + payment.paidAmount : sum;
    }, 0);
    setTotalIncome(income);
  }, [payments]);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-teal-100 text-teal-800 dark:bg-teal-700 dark:text-teal-100";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen  text-gray-900 dark:text-gray-100 font-inter">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Daily */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-4 rounded-lg shadow-md">
          <p className="text-sm uppercase tracking-wide font-semibold">
            Daily Income
          </p>
          <span className="text-2xl font-bold mt-1 block">
            {/* ${dailyIncome.toFixed(2)} */}$ 1000
          </span>
        </div>

        {/* Weekly */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-4 rounded-lg shadow-md">
          <p className="text-sm uppercase tracking-wide font-semibold">
            Weekly Income
          </p>
          <span className="text-2xl font-bold mt-1 block">
            {/* ${weeklyIncome.toFixed(2)} */}$ 1000
          </span>
        </div>

        {/* Monthly */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-lg shadow-md">
          <p className="text-sm uppercase tracking-wide font-semibold">
            Monthly Income
          </p>
          <span className="text-2xl font-bold mt-1 block">
            {/* ${monthlyIncome.toFixed(2)} */}$ 1000
          </span>
        </div>

        {/* Yearly */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-4 rounded-lg shadow-md">
          <p className="text-sm uppercase tracking-wide font-semibold">
            Yearly Income
          </p>
          <span className="text-2xl font-bold mt-1 block">
            {/* ${yearlyIncome.toFixed(2)} */}$ 1000
          </span>
        </div>
      </div>

      <div className="rounded-md shadow-lg">
        <div className="overflow-x-auto">
          {payments.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-md">
              No payments found.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg">
              <thead className="bg-gray-900 dark:bg-gray-700 rounded-md">
                <tr>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    User Email
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Policy Name
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Paid Amount
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                      {payment.userEmail}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                      {payment.policyName}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                      ${payment.paidAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                      {new Date(payment.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTransactions;
