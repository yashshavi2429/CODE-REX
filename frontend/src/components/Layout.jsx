import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex h-screen bg-transparent text-slate-800 font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                <div className="relative z-10 p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
