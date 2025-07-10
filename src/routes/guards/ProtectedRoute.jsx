import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  let { user, loading } = use(AuthContext);

  let location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate state={location.pathname} to="/auth"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
