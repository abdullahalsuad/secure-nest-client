import AgentLayout from "../dashboard/agent/AgentLayout";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import AssignedCustomers from "../dashboard/agent/AssignedCustomers";
import MyBlogs from "../dashboard/agent/MyBlogs";
import BlogPosts from "../dashboard/common/blogs/BlogPosts";
import ClaimPolice from "../dashboard/agent/ClaimPolice";
import AgentRoute from "./guards/AgentRoute";
import ApplicationDetailsPage from "../dashboard/common/application/ApplicationDetailsPage";

const agentRoutes = {
  path: "/agent",
  element: (
    <AgentRoute>
      <AgentLayout />
    </AgentRoute>
  ),
  children: [
    {
      path: "claim",
      index: true,
      element: <ClaimPolice />,
    },
    {
      path: "assigned-customers",
      element: <AssignedCustomers />,
    },
    {
      path: "assigned-customers/:id",
      element: <ApplicationDetailsPage />,
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
      path: "update-profile",
      element: <UpdateProfile />,
    },
  ],
};

export default agentRoutes;
