import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

function RoleProtectedRoute({ children, allowedRoles }) {
  const auth = getAuth();

  if (!auth || !allowedRoles.includes(auth.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleProtectedRoute;