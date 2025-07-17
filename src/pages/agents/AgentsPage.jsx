import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AgentsPage = () => {
  const axiosSecure = useAxiosSecure();
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all agents
  const {
    data: agents = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading agents...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-red-500">
          Error loading agents: {error.message}
        </span>
      </div>
    );
  }

  return (
    <section className="min-h-screen  py-20 my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Licensed{" "}
            <span className="text-teal-600 dark:text-teal-400">Agents</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real People. Real Coverage. Real Care
          </p>
        </div>

        {agents.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            No agents found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.userId}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition  border border-gray-200 dark:border-0"
              >
                {/* Initial Avatar */}
                <div className=" mb-4 flex items-center justify-center text-3xl text-white">
                  <img
                    src={agent.userProfile}
                    className="w-24 h-24 rounded-full border border-gray-400"
                    alt=""
                  />
                </div>

                {/* Agent Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {agent.userName || "Unnamed Agent"}
                </h3>

                {/* Experience */}
                <p className="text-teal-600 font-semibold">
                  {agent.experience || "Experience info not available"}
                </p>

                {/* Specialties */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {agent.specialties || "Specialties not specified"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentsPage;
