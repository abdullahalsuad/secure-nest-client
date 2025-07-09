import React from "react";

const ProfileLoading = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 flex items-start justify-center">
      <div className="max-w-4xl w-full bg-white/80 dark:bg-gray-900 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform">
        {/* Header with avatar skeleton */}
        <div className="relative md:w-full bg-gradient-to-br from-teal-300 to-teal-600 text-white p-8 md:p-10 flex flex-col items-center justify-center text-center">
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 w-32 h-32 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
            <div className="h-5 w-60 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse flex items-center justify-center" />
          </div>
        </div>

        {/* Body content skeleton */}
        <div className="p-8 md:p-10">
          {/* Title & button */}
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="h-10 w-20 rounded-lg bg-teal-200 dark:bg-teal-800 animate-pulse" />
          </div>

          {/* Profile details skeleton */}
          <div className="space-y-6">
            {[1, 2].map((_, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="mb-2 h-4 w-24 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <div className="h-6 w-full max-w-xs rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
              </div>
            ))}

            {/* Grid cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {[1, 2].map((_, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl shadow-md border
                    ${
                      idx === 0
                        ? "bg-gradient-to-br from-sky-50 to-blue-100 border-blue-100 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                        : "bg-gradient-to-br from-emerald-50 to-green-100 border-green-100 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="h-5 w-40 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                  </div>
                  <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
