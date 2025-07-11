import AdminLayout from "../dashboard/admin/AdminLayout";
import AdminOverview from "../dashboard/admin/AdminOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import ManageUsers from "../dashboard/admin/ManageUsers";
import AdminRoute from "./guards/AdminRoute";
import AllApplications from "../dashboard/admin/AllApplications";
import ManagePolicies from "../dashboard/admin/ManagePolicies";
import ManageTransactions from "../dashboard/admin/ManageTransactions";
import ManageBlogs from "../dashboard/admin/ManageBlogs";
import BlogPosts from "../dashboard/admin/BlogPosts";

const adminRoutes = {
  path: "/admin",
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
      path: "update-profile",
      element: <UpdateProfile />,
    },
  ],
};

export default adminRoutes;
