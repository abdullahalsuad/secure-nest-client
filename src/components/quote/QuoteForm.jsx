import React from "react";
// No need to import CustomSelect anymore
import { ChevronDown } from "lucide-react"; // Still useful for a custom arrow visual hint

const QuoteForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isSubmitting,
  // No longer need setValue or watch directly passed from QuotePage for <select>
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Age *
        </label>
        <input
          type="number"
          id="age"
          {...register("age", {
            required: "Age is required",
            min: { value: 18, message: "Age must be at least 18" },
            max: { value: 80, message: "Age cannot exceed 80" },
          })}
          min="18"
          max="80"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Enter your age"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Gender *
        </label>
        <div className="relative">
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="appearance-none w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 cursor-pointer"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      {/* Coverage Amount */}
      <div>
        <label
          htmlFor="coverageAmount"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Coverage Amount (BTD ) *
        </label>
        <div className="relative">
          <select
            id="coverageAmount"
            {...register("coverageAmount", {
              required: "Coverage amount is required",
            })}
            className="appearance-none w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 cursor-pointer"
          >
            <option value="">Select Coverage Amount</option>
            <option value="1000000">BTD 10 Lakhs</option>
            <option value="2500000">BTD 25 Lakhs</option>
            <option value="5000000">BTD 50 Lakhs</option>
            <option value="7500000">BTD 75 Lakhs</option>
            <option value="10000000">BTD 1 Crore</option>
            <option value="15000000">BTD 1.5 Crores</option>
            <option value="20000000">BTD 2 Crores</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
        {errors.coverageAmount && (
          <p className="mt-1 text-sm text-red-500">
            {errors.coverageAmount.message}
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Policy Duration (Years) *
        </label>
        <div className="relative">
          <select
            id="duration"
            {...register("duration", {
              required: "Policy duration is required",
            })}
            className="appearance-none w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 cursor-pointer"
          >
            <option value="">Select Duration</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="25">25 Years</option>
            <option value="30">30 Years</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
        {errors.duration && (
          <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
        )}
      </div>

      {/* Smoker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Do you smoke? *
        </label>
        <div className="flex space-x-4">
          <label htmlFor="smoker-no" className="flex items-center">
            <input
              type="radio"
              id="smoker-no"
              value="no"
              {...register("smoker", {
                required: "Please select if you smoke",
              })}
              className="mr-2 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-gray-700 dark:text-gray-300">No</span>
          </label>
          <label htmlFor="smoker-yes" className="flex items-center">
            <input
              type="radio"
              id="smoker-yes"
              value="yes"
              {...register("smoker", {
                required: "Please select if you smoke",
              })}
              className="mr-2 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-gray-700 dark:text-gray-300">Yes</span>
          </label>
        </div>
        {errors.smoker && (
          <p className="mt-1 text-sm text-red-500">{errors.smoker.message}</p>
        )}
      </div>

      {/* Occupation */}
      <div>
        <label
          htmlFor="occupation"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          {...register("occupation")}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Enter your occupation"
        />
      </div>

      {/* Annual Income */}
      <div>
        <label
          htmlFor="annualIncome"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Annual Income (BTD)
        </label>
        <div className="relative">
          <select
            id="annualIncome"
            {...register("annualIncome")}
            className="appearance-none w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 cursor-pointer"
          >
            <option value="">Select Annual Income</option>
            <option value="300000">BTD 3 Lakhs</option>
            <option value="500000">BTD 5 Lakhs</option>
            <option value="800000">BTD 8 Lakhs</option>
            <option value="1200000">BTD 12 Lakhs</option>
            <option value="1500000">BTD 15 Lakhs</option>
            <option value="2000000">BTD 20 Lakhs+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Calculating...
          </div>
        ) : (
          "Calculate Quote"
        )}
      </button>
    </form>
  );
};

export default QuoteForm;
