import React from "react";

const eligibility = [
  "Age between 18-65 years",
  "Bangladeshi citizen or expatriate (NRB)",
  "Good health condition",
  "Regular income source",
  "No history of serious medical conditions",
];

const exclusions = [
  "Death due to suicide within first year",
  "Death due to pre-existing conditions not disclosed",
  "Death due to participation in hazardous activities",
  "Death due to war or terrorism (unless covered by rider)",
];

const documents = [
  "Age proof (Birth certificate, National ID, Passport)",
  "Identity proof (National ID, Passport, Driving License)",
  "Address proof (Utility bills, National ID, Rent agreement)",
  "Income proof (Salary slips, Bank statements, Tax return)",
  "Medical reports (if required)",
  "Photographs",
];

const DetailsSidebar = () => {
  return (
    <div className="space-y-2 bg-white dark:bg-gray-800  rounded-xl  shadow-lg">
      <div className=" rounded-xl  p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Eligibility Criteria
        </h3>
        <ul className="space-y-2">
          {eligibility.map((criteria, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-4 h-4 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {criteria}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Required Documents */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Required Documents
        </h3>
        <ul className="space-y-2">
          {documents.map((document, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-4 h-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                <svg
                  className="w-2 h-2 text-green-600"
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
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {document}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exclusions */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Policy Exclusions
        </h3>
        <ul className="space-y-2">
          {exclusions.map((exclusion, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-4 h-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mt-0.5">
                <svg
                  className="w-2 h-2 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {exclusion}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Card */}
    </div>
  );
};

export default DetailsSidebar;
