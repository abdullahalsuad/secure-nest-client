import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const NewsletterForm = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/subscribe", data);
      toast.success("🎉 Subscribed successfully!");
      reset();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="my-30 p-10 w-8/12 mx-auto bg-teal-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-0">
      <h2 className="text-2xl font-bold text-center mb-4 text-white dark:text-white">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-center text-white dark:text-gray-300 mb-6">
        Get the latest updates and exclusive content straight to your inbox.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-start justify-center md:items-center gap-4"
      >
        {/* Name Field */}
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
            className="w-full md:w-64 px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white dark:bg-gray-700 dark:text-white"
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="w-full md:w-auto">
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full md:w-64 px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white dark:bg-gray-700 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isSubmitting ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v1m0 14v1m8-8h1M4 12H3m15.36-6.36l.71.71M6.34 17.66l-.71.71m12.72 0l-.71-.71M6.34 6.34l-.71-.71"
                />
              </svg>
              <span>Subscribing...</span>
            </>
          ) : (
            "Subscribe Now"
          )}
        </button>
      </form>

      <p className="mt-4 text-xs text-center text-white dark:text-gray-400">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterForm;
