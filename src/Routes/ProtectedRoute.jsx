// src/Routes/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectedRoute = ({ roles = [], children }) => {
    const { isLogin: isAuthenticated } = useSelector((state) => state.auth);
    // const userType = useSelector((state) => state.auth.userType);
    const userType = 'user'
    console.log('isAuthenticated', isAuthenticated)
    // console.log("const isAuthenticated = useSelector((state) => state.auth.isLogin)", useSelector((state) => state.auth.isLogin))
    // const isAuthenticated = useSelector((state) => state.auth.isLogin)

    // if (!isAuthenticated) {
    //     return <Navigate to="/" replace />;
    // }

    if (roles.length && !roles.includes(userType)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <> {children ? children : <Outlet />} </>;
};

export default ProtectedRoute;
