import { FileText } from "lucide-react";
import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <FileText size={50} className="text-teal-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        No Data Available
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        It looks like there is no data to display. Try adding some or adjusting
        the filters.
      </p>
    </div>
  );
};

export default NoDataFound;
