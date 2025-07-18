import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BlogDetailPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch single blog by ID
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading blog...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-red-500">
          Error loading blog: {error.message}
        </span>
      </div>
    );
  }

  return (
    <section className="py-12  my-20">
      <title>{blog.title}</title>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-700 shadow-md border border-gray-100 dark:border-0 p-4 rounded-xl">
        {/* Cover Image */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-8">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>By {blog.author || "Unknown Author"}</span>
          <span>•</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none prose-lg">
          <p>{blog.content}</p>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <a
            href="/blogs"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            ← Back to All Blogs
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
