import React from "react";

const Divider = () => {
  return (
    <div className="my-6 flex items-center">
      <hr className="flex-grow border-gray-300 dark:border-gray-600" />
      <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
      <hr className="flex-grow border-gray-300 dark:border-gray-600" />
    </div>
  );
};

export default Divider;
