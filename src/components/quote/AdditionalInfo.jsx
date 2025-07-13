import React from "react";
import { ShieldCheck, Zap, Wallet } from "lucide-react"; // Import Lucide icons

const AdditionalInfo = () => {
  return (
    <div className="my-30 ">
      <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10 leading-tight ">
        Why Choose{" "}
        <span className="text-teal-600 dark:text-teal-400">
          Our Life Insurance
        </span>
        ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Comprehensive Coverage */}
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700  rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-teal-500 dark:text-teal-300 mb-5">
            <ShieldCheck size={48} strokeWidth={1.5} />
          </div>
          <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
            Comprehensive Coverage
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-base text-center">
            Protect your family's financial future with our **comprehensive life
            insurance plans** tailored to your needs.
          </p>
        </div>

        {/* Quick Processing */}
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700  rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-green-500 dark:text-green-300 mb-5">
            <Zap size={48} strokeWidth={1.5} />
          </div>
          <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
            Quick Processing
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-base text-center">
            Experience **fast application processing** and quick claim
            settlements when you need it most.
          </p>
        </div>

        {/* Affordable Premiums */}
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700  rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-purple-500 dark:text-purple-300 mb-5">
            <Wallet size={48} strokeWidth={1.5} />
          </div>
          <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
            Affordable Premiums
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-base text-center">
            Enjoy **competitive rates** with flexible payment options designed
            to suit your budget.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
