import React from "react";

const PoliciesForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  handleImageUpload,
  uploading,
  isLoading,
}) => {
  return (
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

      {/* cover img  */}
      <div className="space-y-2">
        <label
          htmlFor="profilePicture"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Policy Picture
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
          <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
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
            min="0"
          />
          {errors.minAge && (
            <p className="mt-1 text-sm text-red-500">{errors.minAge.message}</p>
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
            min="1"
          />
          {errors.maxAge && (
            <p className="mt-1 text-sm text-red-500">{errors.maxAge.message}</p>
          )}
        </div>
      </div>

      {/* Coverage Range + Duration + Base Premium in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            placeholder="e.g. $50k - $1M"
          />
          {errors.coverageRange && (
            <p className="mt-1 text-sm text-red-500">
              {errors.coverageRange.message}
            </p>
          )}
        </div>

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
            placeholder="e.g. 10 years"
          />
          {errors.durationOptions && (
            <p className="mt-1 text-sm text-red-500">
              {errors.durationOptions.message}
            </p>
          )}
        </div>

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
            min="0"
          />
          {errors.basePremiumRate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.basePremiumRate.message}
            </p>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full md:w-auto px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 cursor-pointer ${
            isLoading ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {isLoading ? "Adding..." : "Add Policy"}
        </button>
      </div>
    </form>
  );
};

export default PoliciesForm;
