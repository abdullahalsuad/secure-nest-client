import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ClaimForm = ({ application, setIsModalOpen, setSelectedApplication }) => {
  //   console.log(application);

  const axiosSecure = useAxiosSecure();

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

        {/* Document URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Document Image URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/document.jpg"
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
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
