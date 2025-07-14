import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";

import EditBlogModal from "../common/blogs/EditBlogModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import NoDataFound from "../../components/dashboard/NoDataFound";

const ManageBlogs = () => {
  const queryClient = useQueryClient();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  // Get blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  // Delete blog
  const { mutate: deleteBlog } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      toast.success("Blog deleted");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => toast.error("Failed to delete blog"),
  });

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(id);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="rounded-md shadow-lg overflow-hidden">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg">
          <thead className="bg-gray-900 dark:bg-gray-700">
            <tr>
              {["Title", "Author", "Content", "Date", "Actions"].map((head) => (
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
                <td colSpan={5} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white truncate max-w-xs">
                    {blog.content.substring(0, 40)}...
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 transition px-3 py-1.5 border border-gray-300 dark:bg-teal-600 dark:text-white dark:border-teal-600 rounded-md cursor-pointer"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 transition px-3 py-1.5 border border-gray-300 dark:bg-red-600 dark:text-white dark:border-red-600 rounded-md cursor-pointer"
                    >
                      <Trash size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBlog(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageBlogs;
