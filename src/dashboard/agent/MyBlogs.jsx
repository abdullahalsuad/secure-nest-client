import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";

import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import NoDataFound from "../../components/dashboard/NoDataFound";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Get user's blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["userBlogs", user._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-blogs/${user.uid}`);
      return res.data;
    },
  });

  // Delete blog
  const { mutate: deleteBlog, isLoading: deleting } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      toast.success("Blog deleted");
      queryClient.invalidateQueries(["userBlogs"]);
    },
    onError: () => toast.error("Failed to delete blog"),
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="overflow-x-auto shadow-md rounded-md">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {["Title", "Author", "Date", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-[15px] font-bold text-white text-center uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="transition-colors duration-150">
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 transition px-4 py-1.5 border border-gray-300 rounded-md dark:bg-teal-600 dark:text-white dark:border-teal-600 cursor-pointer">
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 transition px-4 py-1.5 border border-gray-300 rounded-md dark:bg-red-600 dark:text-white dark:border-red-600 cursor-pointer"
                    >
                      <Trash size={16} />
                      {deleting ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBlogs;
