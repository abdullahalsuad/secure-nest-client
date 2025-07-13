import { ChartColumnBig, FileText } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const QuoteResult = ({ quote, setQuote, reset, policeId }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200">
      {!quote ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6">
          <div className="mb-6 p-4 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
            <ChartColumnBig size={64} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Generate Your Personalized Quote 🚀
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
            Enter your details on the left to instantly calculate and view your
            insurance premium and coverage summary.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personalized Quote
          </h3>

          <div className="space-y-6">
            {/* Coverage Summary */}
            <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-4">
                Coverage Summary
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-teal-700 dark:text-teal-300">
                    Coverage Amount
                  </p>
                  <p className="text-xl font-bold text-teal-900 dark:text-teal-100">
                    {(quote.coverage / 100000).toFixed(0)} Lakhs
                  </p>
                </div>
                <div>
                  <p className="text-sm text-teal-700 dark:text-teal-300">
                    Policy Term
                  </p>
                  <p className="text-xl font-bold text-teal-900 dark:text-teal-100">
                    {quote.duration} Years
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">
                  Monthly Premium
                </span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {quote.monthlyPremium.toLocaleString()} TK
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">
                  Annual Premium
                </span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {quote.annualPremium.toLocaleString()} TK
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-700 dark:text-green-300">
                  Total Premium
                </span>
                <span className="text-xl font-bold text-green-900 dark:text-green-100">
                  {quote.totalPremium.toLocaleString()} TK
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                What's Included:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tax benefits under Section 80C
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Quick claim settlement
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Online policy management
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 customer support
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Link to={`/application/${policeId}`}>
                <button className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold cursor-pointer">
                  Apply for Policy
                </button>
              </Link>
              <button
                onClick={() => {
                  reset(), setQuote(null);
                }}
                className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-center py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer mt-4"
              >
                Calculate New Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteResult;
