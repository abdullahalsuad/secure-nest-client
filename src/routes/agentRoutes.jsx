import AgentLayout from "../dashboard/agent/AgentLayout";
import AgentOverview from "../dashboard/agent/AgentOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import AssignedCustomers from "../dashboard/agent/AssignedCustomers";
import MyBlogs from "../dashboard/agent/MyBlogs";
import BlogPosts from "../dashboard/admin/BlogPosts";
import ClaimPolice from "../dashboard/agent/ClaimPolice";
import AgentRoute from "./guards/AgentRoute";

const agentRoutes = {
  path: "/agent",
  element: (
    <AgentRoute>
      <AgentLayout />
    </AgentRoute>
  ),
  children: [
    {
      index: true,
      element: <AgentOverview />,
    },
    {
      path: "update-profile",
      element: <UpdateProfile />,
    },
    {
      path: "assigned-customers",
      element: <AssignedCustomers />,
    },
    {
      path: "my-blogs",
      element: <MyBlogs />,
    },
    {
      path: "blog-posts",
      element: <BlogPosts />,
    },
    {
      path: "claim",
      element: <ClaimPolice />,
    },
  ],
};

export default agentRoutes;
