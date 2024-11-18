import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function PublicRoute() {
  const { handleGetAuth } = useAuth();

  const auth = handleGetAuth();

  return <>{!auth ? <Outlet /> : <Navigate to="/" />}</>;
}
