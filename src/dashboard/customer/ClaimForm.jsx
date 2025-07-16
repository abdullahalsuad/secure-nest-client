import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useImageUpload from "../../hooks/useImageUpload";
import { use } from "react";
import { AuthContext } from "../../context/AuthProvider";

const ClaimForm = ({ application, setIsModalOpen, setSelectedApplication }) => {
  const { images, handleImageUpload, uploading } = useImageUpload();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);
  const agentId = user?.uid;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitMutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/claims", data),
    onSuccess: () => {
      toast.success("Claim submitted successfully!");
      queryClient.invalidateQueries(["agent-assigned-applications", agentId]);
      reset();
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      toast.err(`Error submitting claim: ${errorMessage}`);
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    submitMutation.mutate({
      applicationId: application._id,
      policeId: application.policeId,
      customerName: application.fullName,
      assignedAgentId: application.assignedAgent.agentID,
      documentUrl: images,
      ...data,
    });
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Submit Claim for{" "}
        <span className="text-teal-500">
          {application.policyDetails?.title}
        </span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Policy Name (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Policy Name
          </label>
          <input
            type="text"
            value={application.policyDetails?.title}
            {...register("policeName")}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-md text-gray-900 dark:text-white"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Reason for Claim
          </label>
          <textarea
            {...register("reason", { required: "Reason is required" })}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason.message}</p>
          )}
        </div>

        {/* Document Picture */}
        <div className="space-y-2">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Document Picture
          </label>
          <div className="relative">
            <input
              required
              type="file"
              id="profileImg"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              disabled={uploading}
              className={`
              block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-4 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-500 file:text-white
              hover:file:bg-teal-600
              dark:file:bg-teal-600 dark:hover:file:bg-teal-700
              border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-500
              transition-colors
              ${uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            `}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </div>
  );
};

export default ClaimForm;
