import { Star } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyPoliceTableRow = ({ application }) => {
  const axiosSecure = useAxiosSecure();

  // Fetch police
  const { data: police } = useQuery({
    queryKey: ["my-police"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/polices/${application.policeId}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  return (
    <tr className="transition-colors duration-150">
      <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
        {application.policeName}
      </td>

      <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
        {police?.coverageRange ?? "Loading..."}
      </td>

      <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
        {application.duration}
      </td>

      <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
        {police?.basePremiumRate ?? "Loading..."}
      </td>

      <td className="px-6 py-4 text-center text-sm">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold 
                      ${
                        application.Status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : application.Status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                      dark:${
                        application.Status === "Approved"
                          ? "bg-green-400 text-green-100"
                          : application.Status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    `}
        >
          {application.Status}
        </span>
      </td>

      <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white">
        {new Date(application.createdAt).toLocaleString()}
      </td>
      <td className="px-6 py-4 text-sm font-medium flex justify-center gap-4">
        <button className="flex items-center gap-1 text-orange-600 hover:text-white hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
          <Star size={16} /> Rate
        </button>
        {/* <button className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 px-4 py-1.5 border border-gray-300 rounded-md cursor-pointer shadow-sm hover:shadow-md">
          <Ban size={16} /> Rejected
        </button> */}
      </td>
    </tr>
  );
};

export default MyPoliceTableRow;
