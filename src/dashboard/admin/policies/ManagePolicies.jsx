import { CirclePlus, Edit, FileText, Trash, X } from "lucide-react";
import React, { useState } from "react";
import AddPolicies from "./AddPolicies"; // Make sure path is correct
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import NoDataFound from "../../../components/dashboard/NoDataFound";
import EditPolice from "./EditPolice";

const ManagePolicies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const queryClient = useQueryClient();

  //custom hooks
  const axiosSecure = useAxiosSecure();

  // delete
  const { mutate: deletePolicy } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/policies/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Policy deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["all-polices"] });
    },
    onError: (err) => {
      toast.error(
        `Error deleting policy: ${err.response?.data?.message || err.message}`
      );
    },
  });

  // Fetch all data
  const {
    data: polices = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-polices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-polices", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10 dark:bg-gray-900">
        Error loading users: {error.message}
      </div>
    );
  }

  // handle remove
  const handelDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deletePolicy(id);
    }
  };

  // handle edit
  const handelEdit = (police) => {
    setSelectedPolicy(police);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <title>Manage Policies</title>
      {/* Header & Add Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-teal-600 text-white font-medium text-sm rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200 flex justify-center items-center gap-2 cursor-pointer"
        >
          <CirclePlus />
          Add Polices
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md  overflow-hidden shadow-lg">
        {polices.length === 0 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg">
              <thead className="bg-gray-900 dark:bg-gray-700 rounded-md">
                <tr>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Policy Title
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Coverage Range
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Base Rate
                  </th>
                  <th className="px-6 py-3 text-[15px] font-bold text-white text-center dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {polices.map((police) => (
                  <tr
                    key={police._id}
                    className="transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {police.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {police.category}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {police.coverageRange}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {police.durationOptions}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {police.basePremiumRate} BTD
                    </td>
                    <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
                      <button
                        onClick={() => handelEdit(police)}
                        className="flex items-center gap-1 text-teal-600 hover:text-white hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md dark:bg-teal-600 dark:text-white dark:border-teal-600"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handelDelete(police._id)}
                        className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md  shadow-sm hover:shadow-md dark:bg-red-600 dark:text-white dark:border-red-600 cursor-pointer"
                      >
                        <Trash size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center lg:ml-60 lg:mt-20  p-4 ">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg  overflow-y-auto max-h-[90vh] border  border-gray-300 dark:border-gray-700 shadow-md">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl cursor-pointer"
            >
              <X />
            </button>

            <div className="p-6">
              <AddPolicies setIsModalOpen={setIsModalOpen} refetch={refetch} />
            </div>
          </div>
        </div>
      )}

      {/* Edit Policy Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center lg:ml-60 lg:mt-20  p-4">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] border border-gray-300 dark:border-gray-700">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl cursor-pointer"
            >
              <X />
            </button>
            <div className="p-6">
              <EditPolice
                police={selectedPolicy}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePolicies;
