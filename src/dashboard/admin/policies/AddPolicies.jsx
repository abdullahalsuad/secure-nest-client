import React from "react";
import { useForm } from "react-hook-form";

const AddPolicies = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Policy Data Submitted:", data);
    // You can send this data to your backend here

    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg border  border-gray-300 dark:border-gray-700 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Add New Policy
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Policy Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Policy Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Policy title is required" })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g. Senior Life Cover"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select Category</option>
            <option value="Term Life">Term Life</option>
            <option value="Senior">Senior</option>
            <option value="Pension Plan">Pension Plan</option>
            <option value="Child Plan">Child Plan</option>
            <option value="Whole Life">Whole Life</option>
            <option value="Health + Life">Health + Life</option>
            <option value="ULIP">ULIP</option>
            <option value="Family Plan">Family Plan</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Describe the policy..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Age Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minimum Age
            </label>
            <input
              type="number"
              {...register("minAge", {
                required: "Minimum age is required",
                min: { value: 0, message: "Minimum age must be at least 0" },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g. 18"
            />
            {errors.minAge && (
              <p className="mt-1 text-sm text-red-500">
                {errors.minAge.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Maximum Age
            </label>
            <input
              type="number"
              {...register("maxAge", {
                required: "Maximum age is required",
                min: { value: 1, message: "Must be greater than 0" },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g. 65"
            />
            {errors.maxAge && (
              <p className="mt-1 text-sm text-red-500">
                {errors.maxAge.message}
              </p>
            )}
          </div>
        </div>

        {/* Coverage Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Coverage Range
          </label>
          <input
            type="text"
            {...register("coverageRange", {
              required: "Coverage range is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g. $50,000 - $1,000,000"
          />
          {errors.coverageRange && (
            <p className="mt-1 text-sm text-red-500">
              {errors.coverageRange.message}
            </p>
          )}
        </div>

        {/* Duration Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration Options
          </label>
          <input
            type="text"
            {...register("durationOptions", {
              required: "Duration options are required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g. 10 years, 20 years, Lifetime"
          />
          {errors.durationOptions && (
            <p className="mt-1 text-sm text-red-500">
              {errors.durationOptions.message}
            </p>
          )}
        </div>

        {/* Base Premium Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Base Premium Rate
          </label>
          <input
            type="number"
            step="0.01"
            {...register("basePremiumRate", {
              required: "Base premium rate is required",
              min: { value: 0, message: "Must be a positive number" },
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g. 50.99"
          />
          {errors.basePremiumRate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.basePremiumRate.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
          >
            Add Policy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPolicies;
