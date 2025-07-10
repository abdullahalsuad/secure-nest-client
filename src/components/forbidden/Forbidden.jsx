import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

// Forbidden Component - Displayed when access is denied
const Forbidden = () => {
  

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full transform scale-95 animate-scale-in-fast">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500" />{" "}
          {/* Using Lucide icon for consistency */}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h3>
        <p className="text-gray-700 text-lg mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to={"/"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
