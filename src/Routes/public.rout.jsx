import React, { useState, ReactNode } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../pages/Landing/componats/Header.componats'
import { useSelector } from 'react-redux';

export default function PublicRout() {
    const isAuthenticated = useSelector((state) => state.auth.isLogin)
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
