import CustomerLayout from "../dashboard/customer/CustomerLayout";
import CustomerOverview from "../dashboard/customer/CustomerOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";

const customerRoutes = {
  path: "/my-dashboard",
  element: <CustomerLayout />,
  children: [
    {
      index: true,
      element: <CustomerOverview />,
    },
    {
      path: "update-profile",
      element: <UpdateProfile />,
    },
  ],
};

export default customerRoutes;
