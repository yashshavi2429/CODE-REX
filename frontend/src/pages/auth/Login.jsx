import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (email && password) {
                // Mock success
                localStorage.setItem('token', 'mock-token');
                // For mock login, extracting name from email or defaulting to 'User'
                const mockName = email.split('@')[0];
                const capitalizedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
                localStorage.setItem('userName', capitalizedName);
                navigate('/');
            } else {
                setError('Please enter both email and password.');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-md w-full glass rounded-3xl overflow-hidden relative z-10">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20 text-white font-bold text-2xl">
                            C
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Sign in to continue to your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/50 border border-white/50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:bg-white transition-all shadow-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">Password</label>
                                <a href="#" className="text-sm text-pink-600 hover:text-pink-500 transition-colors font-medium">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/50 border border-white/50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:bg-white transition-all shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50/80 border border-red-100 rounded-xl text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-pink-600 hover:text-pink-500 font-bold transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
