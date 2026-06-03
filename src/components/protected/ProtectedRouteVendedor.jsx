import { Navigate, Outlet } from "react-router";

const ProtectedRouteVendedor = () => {
  const rol = localStorage.getItem("rol");

  if (rol !== "vendedor") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRouteVendedor;
