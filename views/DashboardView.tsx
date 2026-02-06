
import React from 'react';
import { LayoutDashboard, Bell, Settings, Layout } from 'lucide-react';
import { PlaybookButton } from '../components/PlaybookButton';

interface DashboardViewProps {
  user: {
    username: string;
    isLoggedIn: boolean;
    role: string;
  } | null;
  activeId?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user, activeId }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <LayoutDashboard className="text-indigo-600" /> Dashboard
          </h1>
          <p className="text-slate-500">Welcome back, {user?.username || 'Guest'}</p>
        </div>
        <div className="flex gap-4">
          <PlaybookButton id="notify-btn" variant="outline" className="p-2.5 rounded-lg" isActive={activeId === 'notify-btn'}>
            <Bell size={20} className="text-slate-400" />
          </PlaybookButton>
          <PlaybookButton id="settings-btn" variant="outline" className="p-2.5 rounded-lg" isActive={activeId === 'settings-btn'}>
            <Settings size={20} className="text-slate-400" />
          </PlaybookButton>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <Layout size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Stat Metric {i}</h3>
            <div className="text-2xl font-black text-slate-900">
              {Math.floor(Math.random() * 1000)} units
            </div>
            <div className="mt-4 text-xs font-medium text-emerald-500 bg-emerald-50 inline-block px-2 py-1 rounded">
              +12.5% this week
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <LayoutDashboard size={160} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Internal System Audit</h2>
          <p className="text-slate-400 max-w-lg mb-6">
            Real-time monitoring enabled for all production endpoints. Automated playbooks are currently simulating user behavior to verify health checks.
          </p>
          <PlaybookButton id="view-report" variant="outline" className="bg-white border-none text-slate-900" isActive={activeId === 'view-report'}>
            View Full Report
          </PlaybookButton>
        </div>
      </div>
    </div>
  );
};
