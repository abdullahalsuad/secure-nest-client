import AdminLayout from "../dashboard/admin/AdminLayout";
import AdminOverview from "../dashboard/admin/AdminOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import ManageUsers from "../dashboard/admin/users/ManageUsers";
import AdminRoute from "./guards/AdminRoute";
import ManagePolicies from "../dashboard/admin/policies/ManagePolicies";
import ManageTransactions from "../dashboard/admin/ManageTransactions";
import ManageBlogs from "../dashboard/admin/ManageBlogs";
import AllApplications from "../dashboard/admin/applications/AllApplications";
import BlogPosts from "../dashboard/common/blogs/BlogPosts";
import ApplicationDetailsPage from "../dashboard/common/application/ApplicationDetailsPage";
import NotFoundPage from "../components/notfound/NotFoundPage";

const adminRoutes = {
  path: "/admin",
  errorElement: <NotFoundPage />,
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    {
      index: true,
      element: <AdminOverview />,
    },

    {
      path: "applications",
      element: <AllApplications />,
    },
    {
      path: "applications/:id",
      element: <ApplicationDetailsPage />,
    },
    {
      path: "users",
      element: <ManageUsers />,
    },

    {
      path: "policies",
      element: <ManagePolicies />,
    },
    {
      path: "transactions",
      element: <ManageTransactions />,
    },
    {
      path: "manage-blogs",
      element: <ManageBlogs />,
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

export default adminRoutes;
