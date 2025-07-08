import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import AuthLayout from "../pages/authpage/AuthLayouts";
import LoginPage from "../pages/authpage/LoginPage";
import RegisterPage from "../pages/authpage/RegisterPage";

const router = createBrowserRouter([
  // nav routes
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  // auth routes
  {
    path: "/authpage",
    element: <AuthLayout />,

    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/authpage/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
