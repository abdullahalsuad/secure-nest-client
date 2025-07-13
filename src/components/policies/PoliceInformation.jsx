import React from "react";
import { Link } from "react-router";

const PoliceInformation = ({ police }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src={police.policeImage}
            alt={police.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <div className="mb-4">
            <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-semibold">
              {police.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {police.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {police.description}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Age Range
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {police.minAge} - {police.maxAge} years
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Coverage
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {police.coverageRange}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Starting Premium
              </p>
              <p className="font-semibold text-teal-600">
                {police.basePremiumRate} TK /month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Term Options
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {police.durationOptions}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/quote/${police._id}`}>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors text-center font-semibold cursor-pointer">
                Get Quote
              </button>
            </Link>
            <Link to={`/application/${police._id}`}>
              <button className="bg-teal-800 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors text-center font-semibold cursor-pointer">
                Apply for Policy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceInformation;
