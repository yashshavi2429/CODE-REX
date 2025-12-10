import React from 'react';
import { Activity, Code2, Zap, Clock } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color, delay }) => (
    <div
        className="relative overflow-hidden glass-card p-6 rounded-2xl group hover:-translate-y-1"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${color}-100 to-${color}-50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100`}></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-50 to-white border border-${color}-100 shadow-sm group-hover:scale-110 transition-all duration-300`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            <span className={`flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full bg-${color}-50 text-${color}-600 border border-${color}-100`}>
                <span>{trend > 0 ? '+' : ''}{trend}%</span>
            </span>
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{label}</h3>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
    </div>
);

const Dashboard = () => {
    const userName = localStorage.getItem('userName') || 'User';

    return (
        <div className="space-y-8 p-2">
            <header className="relative">
                <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">{userName}!</span> 👋
                </h1>
                <p className="text-slate-500 text-lg">Here's what's happening with your projects today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Activity} label="Total Activity" value="1,234" trend={12} color="blue" delay={0} />
                <StatCard icon={Code2} label="Lines of Code" value="45.2k" trend={8} color="pink" delay={100} />
                <StatCard icon={Zap} label="AI Suggestions" value="892" trend={24} color="yellow" delay={200} />
                <StatCard icon={Clock} label="Hours Saved" value="128" trend={15} color="green" delay={300} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                            <span className="w-2 h-8 rounded-full bg-gradient-to-b from-pink-500 to-yellow-500"></span>
                            Recent Activity
                        </h2>
                        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group flex items-center justify-between p-4 bg-white/40 border border-white/60 rounded-2xl hover:bg-white/60 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-pink-100 flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                        <Code2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-slate-800 font-medium text-lg">Refactored Authentication</h4>
                                        <p className="text-sm text-slate-500">Project: <span className="text-pink-500/80 font-medium">E-commerce API</span></p>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400 font-medium bg-white/50 px-3 py-1 rounded-full">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 relative overflow-hidden group shadow-xl shadow-pink-500/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-pink-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3 relative z-10">
                        <Zap className="text-yellow-500 fill-yellow-500" />
                        AI Insights
                    </h2>

                    <div className="space-y-4 relative z-10">
                        <div className="p-5 bg-gradient-to-br from-purple-50 via-white to-purple-50 border border-purple-100 rounded-2xl hover:shadow-md transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                <p className="text-purple-600 text-sm font-semibold tracking-wide uppercase">Optimization</p>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">Your database queries in <code className="text-purple-600 bg-purple-100 px-1 py-0.5 rounded">UserController</code> could be optimized with indexing.</p>
                        </div>

                        <div className="p-5 bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-100 rounded-2xl hover:shadow-md transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase">Security</p>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">Dependency <code className="text-blue-600 bg-blue-100 px-1 py-0.5 rounded">lodash</code> has a new update addressing a vulnerability.</p>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white rounded-xl transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transform hover:-translate-y-0.5">
                        View All Insights
                        <Activity size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
