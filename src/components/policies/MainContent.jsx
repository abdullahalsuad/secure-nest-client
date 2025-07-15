import React from "react";
import { Link } from "react-router";

const benefits = [
  "High coverage at low premium",
  "Tax benefits under Section 80C",
  "Flexible premium payment options",
  "Optional riders available",
  "Quick claim settlement",
  "Online policy management",
];

const features = [
  {
    title: "Flexible Coverage",
    description: "Choose coverage amount based on your needs and affordability",
  },
  {
    title: "Premium Calculator",
    description: "Get instant premium quotes with our advanced calculator",
  },
  {
    title: "Online Application",
    description: "Complete application process online in minutes",
  },
  {
    title: "Quick Approval",
    description: "Fast policy approval with minimal documentation",
  },
];

const MainContent = () => {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Key Features */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-0">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-0">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Policy Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className=" rounded-2xl shadow-xl bg-gradient-to-br from-teal-600 via-gray-800 to-teal-700 p-20 text-white border border-gray-200 dark:border-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              Ready to Get Started?
            </h3>
            <p className="text-teal-100 text-sm max-w-md">
              Get a personalized quote in just a few minutes. No paperwork. No
              hassle.
            </p>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto">
            <Link to={"/quote"}>
              <button className="bg-white hover:bg-gray-100 text-teal-700 font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 w-full md:w-auto  cursor-pointer">
                Get Free Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
