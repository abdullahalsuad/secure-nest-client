import App from "../App";
import AllPoliciesPage from "../pages/all-policies/AllPoliciesPage";
import AgentsPage from "../pages/agents/AgentsPage";
import HomePages from "../pages/home/HomePages";
import FaqsPage from "../pages/FAQs/FaqsPage";

const publicRoutes = {
  path: "/",
  element: <App />,
  children: [
    {
      index: true,
      element: <HomePages />,
    },
    {
      path: "all-policies",
      element: <AllPoliciesPage />,
    },
    {
      path: "agents",
      element: <AgentsPage />,
    },
    {
      path: "faqs",
      element: <FaqsPage />,
    },
  ],
};

export default publicRoutes;
