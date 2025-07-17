import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PoliceCard from "../../components/policies/PoliceCard";
import PoliceCardSkeleton from "../loading/PoliceCardSkeleton";

const PopularPolicies = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: policies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popular-policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-police", {
        withCredentials: true,
      });
      return res.data.policies;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <PoliceCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching policies: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Popular{" "}
          <span className="text-teal-600 dark:text-teal-400">Policies</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy) => (
            <PoliceCard police={policy} key={policy._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularPolicies;
