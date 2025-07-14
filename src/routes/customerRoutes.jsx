import CustomerLayout from "../dashboard/customer/CustomerLayout";
import CustomerOverview from "../dashboard/customer/CustomerOverview";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import ProtectedRoute from "./guards/ProtectedRoute";
import MyPolicies from "../dashboard/admin/users/MyPolicies";
import MyPayments from "../dashboard/customer/MyPayments";
import ClaimPolicy from "../dashboard/customer/ClaimPolicy";

const customerRoutes = {
  path: "/my-dashboard",
  element: (
    <ProtectedRoute>
      <CustomerLayout />
    </ProtectedRoute>
  ),
  children: [
    // {
    //   index: true,
    //   element: <CustomerOverview />,
    // },
    {
      path: "my-policies",
      element: <MyPolicies />,
    },
    {
      path: "my-payments",
      element: <MyPayments />,
    },
    {
      path: "claim-policy",
      element: <ClaimPolicy />,
    },
    {
      path: "update-profile",
      element: <UpdateProfile />,
    },
  ],
};

export default customerRoutes;
