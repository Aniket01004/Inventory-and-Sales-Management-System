import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../utils/auth";

function ProtectedRoute() {
  const auth = getAuth();
  console.log("ProtectedRoute auth:", auth);

  if (!auth) {
    console.log("Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;