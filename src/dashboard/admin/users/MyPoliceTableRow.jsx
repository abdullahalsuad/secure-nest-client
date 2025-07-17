import React, { use, useState } from "react";
import { Star } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";

const MyPoliceTableRow = ({ application }) => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const { user } = use(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const { data: police } = useQuery({
    queryKey: ["my-police", application.policeId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/polices/${application.policeId}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await axiosSecure.post(
        "/reviews",
        {
          policyId: application.policeId,
          userId: application.userId,
          userName: user.displayName,
          profileImgUrl: user.photoURL,
          rating: parseInt(data.rating),
          feedback: data.feedback,
        },
        { withCredentials: true }
      );
      reset();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <>
      <tr className="transition-colors duration-150">
        <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
          {application.policeName}
        </td>

        <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
          {police?.coverageRange ?? "Loading..."}
        </td>

        <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
          {application.duration}
        </td>

        <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
          {police?.basePremiumRate ?? "Loading..."}
        </td>

        <td className="px-6 py-4 text-center text-sm">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold 
              ${
                application.Status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : application.Status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
              dark:${
                application.Status === "Approved"
                  ? "bg-green-400 text-green-100"
                  : application.Status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            `}
          >
            {application.Status}
          </span>
        </td>

        <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
          {new Date(application.createdAt).toLocaleString()}
        </td>

        <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
          {application.Status === "Rejected"
            ? application.rejectionReason
            : "No Messages"}
        </td>

        <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
          {application.Status === "Approved" ? (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-orange-600 hover:text-white hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md"
            >
              <Star size={16} /> Rate
            </button>
          ) : (
            <span className="text-red-300">
              Approval is required before review.
            </span>
          )}
        </td>
      </tr>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">⭐ Submit Review</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Star Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star}>
                      <input
                        type="radio"
                        value={star}
                        {...register("rating", { required: true })}
                        className="hidden"
                      />
                      <span className="text-2xl cursor-pointer text-yellow-400">
                        ★
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">
                  Feedback
                </label>
                <textarea
                  {...register("feedback", { required: true })}
                  rows="4"
                  className="w-full border border-gray-300 rounded p-2 dark:bg-gray-700 dark:text-white"
                  placeholder="Write your feedback..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPoliceTableRow;
