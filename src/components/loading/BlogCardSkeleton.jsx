import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="relative">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
        <div className="absolute top-4 left-4 bg-gray-400 dark:bg-gray-600 rounded-full h-6 w-24" />
      </div>

      {/* Content Placeholder */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>

        {/* Description lines */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>

        {/* Meta info */}
        <div className="flex justify-between text-sm mt-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
