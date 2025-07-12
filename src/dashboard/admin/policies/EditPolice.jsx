import React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useImageUpload from "../../../hooks/useImageUpload";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditPolice = ({ police, setIsEditModalOpen }) => {
  const { register, handleSubmit } = useForm();

  // custom hooks
  const axiosSecure = useAxiosSecure();
  const { images, handleImageUpload, uploading } = useImageUpload();

  const queryClient = useQueryClient();

  const { mutate: updatePolicy } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/policies/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Policy updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["polices"] });
    },
    onError: (err) => {
      toast.error(
        `Error deleting policy: ${err.response?.data?.message || err.message}`
      );
    },
  });
  // update police
  const onSubmit = async (data) => {
    const id = police._id;

    const updatedData = {
      ...data,
      policeImage: images,
    };

    updatePolicy({ id, updatedData });
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Edit Policy
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Policy Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Policy Title
          </label>
          <input
            type="text"
            defaultValue={police.title}
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            defaultValue={police.description}
            rows={4}
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={police.category}>{police.category}</option>
            <option value="Term Life">Term Life</option>
            <option value="Senior">Senior</option>
            <option value="Pension Plan">Pension Plan</option>
            <option value="Child Plan">Child Plan</option>
            <option value="Whole Life">Whole Life</option>
            <option value="Health + Life">Health + Life</option>
            <option value="ULIP">ULIP</option>
            <option value="Family Plan">Family Plan</option>
          </select>
        </div>

        {/* Age Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minimum Age
            </label>
            <input
              type="number"
              defaultValue={police.minAge}
              {...register("minAge", { required: true, min: 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Maximum Age
            </label>
            <input
              type="number"
              defaultValue={police.maxAge}
              {...register("maxAge", { required: true, min: 1 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min="1"
            />
          </div>
        </div>

        {/* Coverage Range + Duration + Base Premium Rate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coverage Range
            </label>
            <input
              type="text"
              defaultValue={police.coverageRange}
              {...register("coverageRange", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration Options
            </label>
            <input
              type="text"
              defaultValue={police.durationOptions}
              {...register("durationOptions", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Base Premium Rate
            </label>
            <input
              defaultValue={police.basePremiumRate}
              type="number"
              step="0.01"
              {...register("basePremiumRate", { required: true, min: 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Policy Picture
          </label>
          <input
            type="file"
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
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPolice;
