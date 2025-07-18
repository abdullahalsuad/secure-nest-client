import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Download, ShieldPlus } from "lucide-react";
import ClaimForm from "./ClaimForm";
import NoDataFound from "../../components/dashboard/NoDataFound";

// PDF generation
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const ClaimPolicy = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approvedPolicies", userId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/approved-policies/${userId}`);
      return data;
    },
  });

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  // Function to generate and download real PDF
  const handleDownloadPDF = async (application) => {
    const styles = StyleSheet.create({
      page: { padding: 30, fontFamily: "Helvetica" },
      header: {
        marginBottom: 20,
        textAlign: "center",
      },
      companyName: {
        fontSize: 16,
        fontWeight: "bold",
      },
      website: {
        fontSize: 10,
        color: "gray",
      },
      title: {
        fontSize: 18,
        marginVertical: 15,
        textAlign: "center",
        fontWeight: "bold",
        textDecoration: "underline",
      },
      section: { marginBottom: 12 },
      label: { fontSize: 12, lineHeight: 1.5 },
      approved: {
        fontSize: 12,
        fontWeight: "bold",
        color: "green",
      },
      footer: {
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: "center",
        fontSize: 10,
        color: "gray",
      },
    });

    const MyPDFDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.companyName}>Secure Nest</Text>
            <Text style={styles.companyName}>Dhaka,Bangladesh</Text>
            <Text style={styles.website}>www.securenest.com</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Policy Claim Certificate</Text>

          {/* Policyholder Information */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Policyholder Name: {application.fullName}
            </Text>
            <Text style={styles.label}>
              Policy Name: {application.policyDetails?.title || "N/A"}
            </Text>
            <Text style={styles.label}>
              Category: {application.policyDetails?.category || "N/A"}
            </Text>
            <Text style={styles.label}>
              Coverage: {application.policyDetails?.coverageRange || "N/A"}
            </Text>
            <Text style={styles.label}>
              Policy Duration: {application.duration || "N/A"}
            </Text>
          </View>

          {/* Contact and Agent Details */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Applicant Number: {application.applicantNumber || "N/A"}
            </Text>
            <Text style={styles.label}>
              Email: {application.userEmail || "N/A"}
            </Text>
            <Text style={styles.label}>
              Agent Name: {application.assignedAgent?.agentName || "N/A"} (
              {application.assignedAgent?.agentEmail || "N/A"})
            </Text>
          </View>

          {/* Nominee Details */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Nominee Name: {application.nomineeName || "N/A"}
            </Text>
            <Text style={styles.label}>
              Nominee Contact: {application.nomineeNumber || "N/A"}
            </Text>
          </View>

          {/* Health Info */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Health Declarations:{" "}
              {[
                application.healthIssues?.diabetes ? "Diabetes" : null,
                application.healthIssues?.heart ? "Heart Condition" : null,
                application.healthIssues?.asthma ? "Asthma" : null,
                application.healthIssues?.none ? "None" : null,
              ]
                .filter(Boolean)
                .join(", ") || "N/A"}
            </Text>
          </View>

          {/* Status */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Payment Status: {application.paymentStatues || "N/A"}
            </Text>
            <Text style={styles.approved}>
              Claim Status: {application.claimStatus || "N/A"}
            </Text>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Secure Nest © {new Date().getFullYear()} | www.securenest.com
          </Text>
        </Page>
      </Document>
    );

    const blob = await pdf(<MyPDFDocument />).toBlob();
    saveAs(blob, `${application.fullName}_claim_certificate.pdf`);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <title>Claim Policies</title>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Claim Policy
        </h2>
      </div>
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {[
                "Name",
                "Policy Name",
                "Category",
                "Coverage",
                "Policy Duration",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-[15px] font-bold text-white text-center uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {applications?.length > 0 ? (
              applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.fullName}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails?.category}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.policyDetails?.coverageRange}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.duration || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {application.claimStatus === "Not-Applied" ? (
                      <button
                        onClick={() => handleOpenModal(application)}
                        className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:bg-teal-500 dark:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md dark:border-0 mx-auto"
                      >
                        <ShieldPlus size={16} /> Claim
                      </button>
                    ) : (
                      <>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            application.claimStatus === "Approved"
                              ? "bg-green-100 text-green-700 dark:text-green-800"
                              : application.claimStatus === "Rejected"
                              ? "bg-red-100 text-red-700 dark:text-red-800"
                              : "bg-yellow-100 text-yellow-700 dark:text-yellow-800"
                          }`}
                        >
                          {application.claimStatus}
                        </span>

                        {application.claimStatus === "Approved" && (
                          <button
                            onClick={() => handleDownloadPDF(application)}
                            className="mt-2 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-600 hover:text-white text-sm transition-colors duration-200 ml-4"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-600 dark:text-gray-300"
                >
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Claim Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 flex justify-center items-start z-50 pt-10 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl relative p-6">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <ClaimForm
              application={selectedApplication}
              setIsModalOpen={setIsModalOpen}
              setSelectedApplication={setSelectedApplication}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimPolicy;
