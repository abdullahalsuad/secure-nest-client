// import { createBrowserRouter } from "react-router";
// import App from "../App";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import AuthLayout from "../pages/authpage/AuthLayouts";
// import LoginPage from "../pages/authpage/LoginPage";
// import RegisterPage from "../pages/authpage/RegisterPage";
// import AdminLayout from "../dashboard/admin/AdminLayout";
// import AdminOverview from "../dashboard/admin/AdminOverview";
// import AgentLayout from "../dashboard/agent/AgentLayout";
// import AgentOverview from "../dashboard/agent/AgentOverview";
// import CustomerLayout from "../dashboard/customer/CustomerLayout";
// import CustomerOverview from "../dashboard/customer/CustomerOverview";
// import UpdateProfile from "../components/dashboard/UpdateProfile";

// const router = createBrowserRouter([
//   // nav routes
//   {
//     path: "/",
//     element: <App />,

//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//     ],
//   },

//   // auth routes
//   {
//     path: "/authpage",
//     element: <AuthLayout />,

//     children: [
//       {
//         index: true,
//         element: <LoginPage />,
//       },
//       {
//         path: "/authpage/register",
//         element: <RegisterPage />,
//       },
//     ],
//   },

//   // dashboards

//   // admin
//   {
//     path: "/admin",
//     element: <AdminLayout />,

//     children: [
//       {
//         index: true,
//         element: <AdminOverview />,
//       },
//       {
//         path: "update-profile",
//         element: <UpdateProfile />,
//       },
//     ],
//   },

//   // agent
//   {
//     path: "/agent",
//     element: <AgentLayout />,

//     children: [
//       {
//         index: true,
//         element: <AgentOverview />,
//       },
//       {
//         path: "update-profile",
//         element: <UpdateProfile />,
//       },
//     ],
//   },

//   // customer
//   {
//     path: "/my-dashboard",
//     element: <CustomerLayout />,

//     children: [
//       {
//         index: true,
//         element: <CustomerOverview />,
//       },
//       {
//         path: "update-profile",
//         element: <UpdateProfile />,
//       },
//     ],
//   },
// ]);

// export default router;
