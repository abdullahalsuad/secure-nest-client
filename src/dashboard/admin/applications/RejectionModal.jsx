import { useForm } from "react-hook-form";

const RejectionModal = ({ isOpen, onClose, onSubmit, applicationId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(applicationId, data.feedback)
        )}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 className="text-lg font-bold mb-4">Rejection Reason</h3>
        <textarea
          {...register("feedback", {
            required: "Feedback is required",
          })}
          placeholder="Enter reason for rejection..."
          rows={4}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        {errors.feedback && (
          <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              reset();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RejectionModal;
