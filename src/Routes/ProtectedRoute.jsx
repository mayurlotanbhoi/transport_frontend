// src/Routes/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectedRoute = ({ roles = [], children }) => {
    // const isAuthenticated = useSelector((state) => state.auth.isLogin);
    // const userType = useSelector((state) => state.auth.userType);
    const userType = 'user'
    const isAuthenticated = true
    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" replace />;
    }

    if (roles.length && !roles.includes(userType)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <> {children ? children : <Outlet />} </>;
};

export default ProtectedRoute;
