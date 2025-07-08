import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLoginButtons = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
        <FcGoogle />
        <span className="text-sm">Google</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
