import React from "react";

const PolicyClearanceModal = ({
  loadingDetails,
  policy,
  application,

  closeModal,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
      >
        <X size={24} />
      </button>

      {loadingDetails ? (
        <p className="text-center text-gray-600">Loading details...</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-teal-700 flex items-center gap-2">
            <FileText size={24} /> Claim Details
          </h2>

          {/* Application Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <User size={20} /> Applicant Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Name:</strong> {application.fullName}
              </p>
              <p>
                <strong>Email:</strong> {application.email}
              </p>
              <p>
                <strong>Phone:</strong> {application.applicantNumber}
              </p>
              <p>
                <strong>Address:</strong> {application.address}
              </p>
              <p>
                <strong>Nominee:</strong> {application.nomineeName} (
                {application.relationship})
              </p>
              <p>
                <strong>Nominee Phone:</strong> {application.nomineeNumber}
              </p>
            </div>

            {/* Health Issues */}
            <div className="mt-4">
              <h4 className="font-medium mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <HeartPulse size={18} /> Health Issues:
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(application.healthIssues || {}).map(
                  ([key, value]) =>
                    value && (
                      <span
                        key={key}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    )
                )}
              </div>
            </div>
          </div>

          {/* Policy Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <FileText size={20} /> Policy Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Title:</strong> {policy.title}
              </p>
              <p>
                <strong>Category:</strong> {policy.category}
              </p>
              <p>
                <strong>Coverage:</strong> {policy.coverageRange}
              </p>
              <p>
                <strong>Base Premium:</strong> ₹{policy.basePremiumRate}
              </p>
              <p>
                <strong>Duration Options:</strong> {policy.durationOptions}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PolicyClearanceModal;
