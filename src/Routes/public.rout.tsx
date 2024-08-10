import React, { useState, ReactNode } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../pages/Landing/componats/Header.componats'

export default function PublicRout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
