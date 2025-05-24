
import {JSX, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.tsx";

interface RoleProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string[];
}

export default function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
    const auth = useContext(AuthContext);

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!auth.user || !allowedRoles.includes(auth.user.role || "")) {
        return <Navigate to="/" />;
    }

    return children;
}
