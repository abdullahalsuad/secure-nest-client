import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const BlogPage = () => {
  const axiosSecure = useAxiosSecure();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all blogs
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading blogs...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-red-500">
          Error loading blogs: {error.message}
        </span>
      </div>
    );
  }

  return (
    <section className="min-h-screen  py-16 px-4 my-20">
      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Insurance{" "}
            <span className="text-teal-600 dark:text-teal-400">Blogs</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your go-to source for advice, updates, and real-world coverage
            insights.
          </p>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            No blogs found. Please check back later.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  {/* Meta Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {blog.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div>
                      <Link to={`/blogs/${blog._id}`}>
                        <button className="px-5 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors duration-200 dark:bg-teal-500 dark:hover:bg-teal-600 cursor-pointer">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
