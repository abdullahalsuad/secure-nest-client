import { useState, useEffect } from "react";
import NoDataFound from "../../components/dashboard/NoDataFound";
import PoliceCard from "../../components/policies/PoliceCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllPoliciesPages = () => {
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const axiosSecure = useAxiosSecure();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all users
  const {
    data: policies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/polices", { withCredentials: true });
      return res.data;
    },
  });

  const categories = [
    "all",
    "Term Life",
    "Whole Life",
    "Senior Plan",
    "Family Plan",
    "Investment",
    "Child Plan",
    "Women's Plan",
    "Business Plan",
    "Professional Plan",
  ];

  useEffect(() => {
    let filtered = policies;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (policy) => policy.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (policy) =>
          policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPolicies(filtered);
  }, [selectedCategory, searchTerm, policies]);

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

  return (
    <div className="min-h-screen py-12 mt-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Insurance{" "}
            <span className="text-teal-600 dark:text-teal-400">Policies</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find the perfect insurance plan for your needs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full lg:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full lg:w-1/3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {policies.map((police) => (
            <PoliceCard police={police} />
          ))}
        </div>

        {/* No Results */}
        {filteredPolicies.length === 0 && <NoDataFound />}
      </div>
    </div>
  );
};

export default AllPoliciesPages;
