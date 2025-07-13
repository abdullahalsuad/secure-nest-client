import { Link, useParams } from "react-router";
import DetailsSidebar from "../../components/policies/DetailsSidebar";
import MainContent from "../../components/policies/MainContent";
import PoliceInformation from "../../components/policies/PoliceInformation";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { MoveLeft } from "lucide-react";

const PolicyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all users
  const {
    data: police,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["police"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/polices/${id}`, {
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
      <div className="text-center text-red-500 dark:text-red-400 py-10 dark:bg-gray-900 mt-10">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 mt-10 mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10">
          <Link
            to={"/all-policies"}
            className="flex gap-4 hover:text-teal-600 duration-300"
          >
            {" "}
            <MoveLeft /> Back To Home
          </Link>
        </div>
        {/* Hero Section */}
        <PoliceInformation police={police} />

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <MainContent />

          {/* Sidebar */}
          <DetailsSidebar />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
