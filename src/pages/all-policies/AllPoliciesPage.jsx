import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import NoDataFound from "../../components/dashboard/NoDataFound";
import PoliceCard from "../../components/policies/PoliceCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiChevronDown } from "react-icons/fi";

const AllPoliciesPages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const axiosSecure = useAxiosSecure();

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
    if (currentPage > 1) params.set("page", currentPage.toString());
    setSearchParams(params);
  }, [selectedCategory, debouncedSearchTerm, currentPage, setSearchParams]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Fetch policies with filters
  const {
    data: policiesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["policies", selectedCategory, debouncedSearchTerm, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
      params.append("page", currentPage.toString());
      params.append("limit", "9");

      const res = await axiosSecure.get(`/polices?${params}`, {
        withCredentials: true,
      });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["policy-categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies/categories", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // Combine hardcoded categories with dynamic ones
  const categories = useMemo(() => {
    const defaultCategories = [
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

    const dynamicCategories = categoriesData?.data || [];
    const allCategories = [
      ...new Set([...defaultCategories, ...dynamicCategories]),
    ];

    return ["all", ...allCategories];
  }, [categoriesData]);

  const policies = policiesData?.data || [];
  const pagination = policiesData?.pagination;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    if (!pagination) return [];

    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading policies...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-10 dark:bg-gray-900">
        <p className="mb-4">Error loading policies: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 my-20">
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
                onChange={handleSearchChange}
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
          <div className="w-full lg:w-1/3 relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full appearance-none px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {(selectedCategory !== "all" || searchTerm) && (
            <div className="w-full lg:w-auto">
              <button
                onClick={clearFilters}
                className="w-full lg:w-auto px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        {pagination && (
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalPolicies
              )}{" "}
              of {pagination.totalPolicies} policies
              {(selectedCategory !== "all" || debouncedSearchTerm) && (
                <span className="ml-2">
                  {debouncedSearchTerm && `for "${debouncedSearchTerm}"`}
                  {selectedCategory !== "all" && ` in ${selectedCategory}`}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
          </div>
        )}

        {/* Policies Grid */}
        {policies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {policies.map((policy) => (
              <div
                key={policy._id}
                // onClick={() => handleCardClick(policy._id)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <PoliceCard police={policy} />
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className={`px-4 py-2 rounded-lg ${
                pagination.hasPrevPage
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {getPaginationNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  page === currentPage
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-4 py-2 rounded-lg ${
                pagination.hasNextPage
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPoliciesPages;
