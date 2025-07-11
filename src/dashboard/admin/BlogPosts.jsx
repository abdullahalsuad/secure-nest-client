import React from "react";
import { useForm } from "react-hook-form";

const BlogPosts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    // You can send this data to an API or process it further
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Blog Post</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter blog title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Content</label>
        <textarea
          rows={10}
          {...register("content", { required: "Content is required" })}
          placeholder="Write your blog content here..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
        ></textarea>
        {errors.content && (
          <span className="text-red-500 text-sm">{errors.content.message}</span>
        )}
      </div>

      {/* Image URL Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Image URL
        </label>
        <input
          type="url"
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg "
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Author  */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Author</label>
        <input
          type="text"
          value="Admin User"
          readOnly
          className="w-full px-3 py-2 bg-gray-100 rounded-md cursor-not-allowed border border-gray-300"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          value="Admin User"
          placeholder="Enter your email"
          readOnly
          className="w-full px-3 py-2 bg-gray-100 rounded-md cursor-not-allowed border border-gray-300"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-200"
      >
        Publish
      </button>
    </form>
  );
};

export default BlogPosts;
