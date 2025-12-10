import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, Code, FolderGit2, LogOut, LogIn } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedName = localStorage.getItem('userName');
        setIsAuthenticated(!!token);
        if (storedName) {
            setUserName(storedName);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
        { icon: Code, label: 'Snippets', path: '/snippets' },
        { icon: FolderGit2, label: 'Projects', path: '/projects' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="w-64 glass border-r border-white/50 flex flex-col h-screen relative overflow-hidden">
            {/* Ambient Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl opacity-60"></div>
            </div>

            <div className="p-6 flex items-center space-x-3 border-b border-white/40 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 text-white font-bold text-xl">
                    C
                </div>
                <div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 tracking-tight block">CodeREX</span>
                    <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">AI Assistant</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 relative z-10 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-gradient-to-r from-pink-100/80 to-yellow-100/80 text-pink-700 shadow-sm border border-pink-200/50'
                                : 'text-slate-600 hover:bg-white/50 hover:text-pink-600 hover:pl-5'
                            }`
                        }
                    >
                        <item.icon size={22} className={`group-hover:scale-110 transition-transform duration-300 ${({ isActive }) => isActive ? 'text-pink-600' : 'group-hover:text-pink-500'}`} />
                        <span className="font-medium">{item.label}</span>
                        {/* Active Indicator */}
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0 transition-opacity duration-300 group-[.active]:opacity-100"></div>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/40 relative z-10">
                {isAuthenticated ? (
                    <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-yellow-400 p-0.5">
                                    <div className="w-full h-full rounded-full bg-white border-2 border-transparent"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{userName}</p>
                                    <p className="text-xs text-pink-500">Pro Plan</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-white/50 text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100 border border-transparent rounded-xl transition-all duration-300 text-sm font-medium group"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                ) : (
                    <NavLink
                        to="/login"
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3.5 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-pink-500/25 group"
                    >
                        <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>Sign In</span>
                    </NavLink>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
