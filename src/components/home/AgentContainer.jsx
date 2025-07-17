import Marquee from "react-fast-marquee";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AgentContainer = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: agents = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-agents"],
    queryFn: async () => {
      const response = await axiosSecure.get("/agents");
      return response.data;
    },
  });
  if (isLoading) return <div className="text-center">Loading agents...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load agents.</div>
    );

  return (
    <>
      <div>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Meet Our{" "}
            <span className="text-teal-600 dark:text-teal-400">Agents</span>
          </h2>
        </div>

        {/* Bottom Marquee - Right to Left */}
        <div className="overflow-hidden">
          <Marquee speed={50} gradient={false} direction="left" play={true}>
            {agents.map((agent) => (
              <div
                key={agent.userId}
                className="w-[300px] bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition border border-gray-200 dark:border-0 ml-4"
              >
                {/* Initial Avatar */}
                <div className="mb-4 flex items-center justify-center text-3xl text-white">
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
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default AgentContainer;
