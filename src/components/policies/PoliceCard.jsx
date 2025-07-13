import React from "react";
import { Link } from "react-router";

const PoliceCard = ({ police }) => {
  return (
    <div
      key={police.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer "
    >
      <div className="relative">
        <img
          src={police.policeImage}
          alt={police.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {police.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {police.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {police.description.length > 200
            ? `${police.description.slice(0, 50)}...`
            : police.description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Age Range:</span>
            <span className="text-gray-900 dark:text-white">
              {police.minAge} - {police.maxAge} years
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Coverage:</span>
            <span className="text-gray-900 dark:text-white">
              {police.coverageRange}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Starting from:
            </span>
            <span className="text-teal-600 font-semibold">
              {police.basePremiumRate} TK / month
            </span>
          </div>
        </div>
        <Link to={`/all-policies/${police._id}`}>
          <button className="block w-full text-center bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PoliceCard;
