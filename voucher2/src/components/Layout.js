// src/components/Layout.js
import React from 'react';
import TopBar from './pages/TopBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <TopBar />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
