import AgentLayout from "../dashboard/agent/AgentLayout";
import AgentOverview from "../dashboard/agent/AgentOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";

const agentRoutes = {
  path: "/agent",
  element: <AgentLayout />,
  children: [
    {
      index: true,
      element: <AgentOverview />,
    },
    {
      path: "update-profile",
      element: <UpdateProfile />,
    },
  ],
};

export default agentRoutes;
