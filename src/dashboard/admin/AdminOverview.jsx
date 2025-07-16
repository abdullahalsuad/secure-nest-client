import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch total users
  const { data: users = 0, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin_users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.count || res.data.length || 0;
    },
  });

  // Fetch total agents
  const { data: agents = 0, isLoading: loadingAgents } = useQuery({
    queryKey: ["admin_agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data.count || res.data.length || 0;
    },
  });

  // Fetch total policies
  const { data: policies = 0, isLoading: loadingPolicies } = useQuery({
    queryKey: ["admin_policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/polices");
      return res.data.count || res.data.length || 0;
    },
  });

  // Fetch total applications
  const { data: applications = 0, isLoading: loadingApplications } = useQuery({
    queryKey: ["admin_applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data.count || res.data.length || 0;
    },
  });

  // Fetch total claims
  const { data: claims = 0, isLoading: loadingClaims } = useQuery({
    queryKey: ["admin_claims"],
    queryFn: async () => {
      const res = await axiosSecure.get("/claims");
      return res.data.count || res.data.length || 0;
    },
  });

  const loading =
    loadingUsers ||
    loadingAgents ||
    loadingPolicies ||
    loadingApplications ||
    loadingClaims;

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={users} />
        <StatCard title="Total Agents" value={agents} />
        <StatCard title="Total Policies" value={policies} />
        <StatCard title="Total Applications" value={applications} />
        <StatCard title="Total Claims" value={claims} />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center text-center">
    <h2 className="text-3xl font-semibold text-gray-800 dark:text-teal-300">
      {value}
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{title}</p>
  </div>
);

export default AdminOverview;
