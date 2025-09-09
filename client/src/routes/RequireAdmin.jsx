// client/src/routes/RequireAdmin.jsx
import { Navigate, useLocation } from "react-router-dom";
import useMe from "../hooks/useMe";

export default function RequireAdmin({ children }) {
  const { isAdmin, loading } = useMe();
  const loc = useLocation();

  if (loading) return null; // 필요시 스피너
  if (!isAdmin)
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return children;
}
