import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const isAuth = localStorage.getItem('email') !== null;

    if (!isAuth) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default ProtectedRoute;