import { Navigate, Outlet } from "react-router";

const ProtectedRouteComprador = () => {
  const rol = localStorage.getItem("rol");

  if (rol !== "comprador") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRouteComprador;