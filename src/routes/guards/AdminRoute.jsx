import React, { Children, use } from "react";

import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import useUserRole from "../../hooks/useUserRole";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { userRole, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user || userRole !== "Admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default AdminRoute;
