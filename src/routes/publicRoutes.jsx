import App from "../App";
import AllPoliciesPage from "../pages/all-policies/AllPoliciesPage";
import AgentsPage from "../pages/agents/AgentsPage";
import HomePages from "../pages/home/HomePages";
import Forbidden from "../components/forbidden/Forbidden";
import PolicyDetails from "../pages/all-policies/PolicyDetails";
import QuotePage from "../pages/quote/QuotePage";
import ProtectedRoute from "./guards/ProtectedRoute";
import BlogPage from "../pages/blog/BlogPage";
import ApplicationPage from "../pages/application/ApplicationPage";
import BlogDetailPage from "../pages/blog/BlogDetailPage";
import NotFoundPage from "../components/notfound/NotFoundPage";

const publicRoutes = {
  path: "/",
  element: <App />,
  errorElement: <NotFoundPage />,
  children: [
    {
      index: true,
      element: <HomePages />,
    },
    {
      path: "/all-policies",
      element: <AllPoliciesPage />,
    },
    {
      path: "/all-policies/:id",
      element: <PolicyDetails />,
    },
    {
      path: "/quote/:id",
      element: (
        <ProtectedRoute>
          <QuotePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/agents",
      element: <AgentsPage />,
    },
    {
      path: "/application/:policeId",
      element: (
        <ProtectedRoute>
          <ApplicationPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/blogs",
      element: <BlogPage />,
    },
    {
      path: "/blogs/:id",
      element: <BlogDetailPage />,
    },
    {
      path: "/forbidden",
      element: <Forbidden />,
    },
  ],
};

export default publicRoutes;
