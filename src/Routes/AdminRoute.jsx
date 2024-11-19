import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import AdminQuizProvider from "../Providers/AdminQuizProvider";

export default function PrivateRoute() {
  const { handleGetAuth, isLoading } = useAuth();

  const auth = handleGetAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {auth?.user?.role?.toLowerCase() === "admin" ? (
        <AdminQuizProvider>
          <Outlet />
        </AdminQuizProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
