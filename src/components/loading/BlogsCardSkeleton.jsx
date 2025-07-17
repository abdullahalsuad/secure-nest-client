import React from "react";

const BlogsCardSkeleton = () => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />

        {/* Content lines */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />

        {/* Meta Info */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20" />
          </div>
          <div className="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </article>
  );
};

export default BlogsCardSkeleton;
