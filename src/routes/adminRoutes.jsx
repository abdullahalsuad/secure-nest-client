import AdminLayout from "../dashboard/admin/AdminLayout";
import AdminOverview from "../dashboard/admin/AdminOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import ManageUsers from "../dashboard/admin/ManageUsers";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminOverview />,
    },
    {
      path: "update-profile",
      element: <UpdateProfile />,
    },
    {
      path: "users",
      element: <ManageUsers />,
    },
  ],
};

export default adminRoutes;
