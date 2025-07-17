import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BlogCardSkeleton from "../loading/BlogCardSkeleton";

const LatestBlogs = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch latest 4 blogs
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-blogs", {
        withCredentials: true,
      });
      return res.data.slice(0, 4);
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading blogs: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.summary || blog.content.substring(0, 120)}...
                </p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center gap-1"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* All Blogs Button */}
        <div className="mt-10 text-center">
          <Link
            to="/blogs"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestBlogs;
