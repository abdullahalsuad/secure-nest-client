import App from "../App";
import AllPoliciesPage from "../pages/all-policies/AllPoliciesPage";
import AgentsPage from "../pages/agents/AgentsPage";
import HomePages from "../pages/home/HomePages";
import FaqsPage from "../pages/FAQs/FaqsPage";
import Forbidden from "../components/forbidden/Forbidden";
import PolicyDetails from "../pages/all-policies/PolicyDetails";
import QuotePage from "../pages/quote/QuotePage";

const publicRoutes = {
  path: "/",
  element: <App />,
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
      path: "/quote",
      element: <QuotePage />,
    },
    {
      path: "/agents",
      element: <AgentsPage />,
    },
    {
      path: "/faqs",
      element: <FaqsPage />,
    },
    {
      path: "/forbidden",
      element: <Forbidden />,
    },
  ],
};

export default publicRoutes;
