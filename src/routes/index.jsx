import { createBrowserRouter } from "react-router";

import publicRoutes from "./publicRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import agentRoutes from "./agentRoutes";
import customerRoutes from "./customerRoutes";

const router = createBrowserRouter([
  publicRoutes,
  authRoutes,
  adminRoutes,
  agentRoutes,
  customerRoutes,
]);

export default router;
