import AuthLayout from "../pages/authpage/AuthLayouts";
import LoginPage from "../pages/authpage/LoginPage";
import RegisterPage from "../pages/authpage/RegisterPage";

const authRoutes = {
  path: "/authpage",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
};

export default authRoutes;
