import React from "react";

const PoliceCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
        <div className="absolute top-4 right-4 bg-gray-400 dark:bg-gray-600 rounded-full h-6 w-20" />
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>

        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default PoliceCardSkeleton;
