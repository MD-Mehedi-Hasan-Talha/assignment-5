import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function PrivateRoute() {
  const { handleGetAuth, isLoading } = useAuth();

  const auth = handleGetAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {auth?.user?.role?.toLowerCase() === "admin" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
