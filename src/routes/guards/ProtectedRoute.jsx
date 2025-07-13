import { use } from "react";
import { Navigate, useLocation } from "react-router";

import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { AuthContext } from "../../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  let { user, loading } = use(AuthContext);

  let location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate state={location.pathname} to="/authpage"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
