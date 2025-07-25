import CustomerLayout from "../dashboard/customer/CustomerLayout";
import UpdateProfile from "../components/dashboard/UpdateProfile";
import ProtectedRoute from "./guards/ProtectedRoute";
import MyPolicies from "../dashboard/customer/MyPolicies";
import MyPayments from "../dashboard/customer/MyPayments";
import ClaimPolicy from "../dashboard/customer/ClaimPolicy";
import NotFoundPage from "../components/notfound/NotFoundPage";
import PaymentCard from "../dashboard/customer/payment/PaymentCard";

const customerRoutes = {
  path: "/my-dashboard",
  errorElement: <NotFoundPage />,
  element: (
    <ProtectedRoute>
      <CustomerLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <MyPolicies />,
    },
    {
      path: "my-payments",
      element: <MyPayments />,
    },
    {
      path: "my-payments/:policeId/:applicationId",
      element: <PaymentCard />,
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
