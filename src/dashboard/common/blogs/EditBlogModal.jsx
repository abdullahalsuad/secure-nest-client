import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EditBlogModal = ({ blog, onClose }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/blogs/${blog._id}`, updatedData);
    },
    onSuccess: () => {
      toast.success("Blog updated successfully");
      queryClient.invalidateQueries(["blogs"]);
      onClose();
    },
    onError: () => toast.error("Failed to update blog"),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Blog Post</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full mt-1 p-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Content</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={6}
              className="w-full mt-1 p-2 border rounded"
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Image URL</label>
            <input
              type="url"
              {...register("imageUrl")}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 cursor-pointer"
            >
              {isLoading ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
