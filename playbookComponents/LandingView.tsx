import React from 'react';
import { MousePointer2 } from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: 'signup' | 'login') => void;
  activeId?: string;
}

export const LandingView: React.FC<LandingViewProps> = ({ activeId }) => {
  return (
    <div className="text-center py-20 animate-in fade-in duration-1000">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
        <MousePointer2 size={12} /> System Ready
      </div>
      <h1 className="text-7xl font-black text-slate-900 mb-6 tracking-tight">
        Prototype <span className="text-indigo-600">Automation</span>
      </h1>
      <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
        This platform is orchestrated via the top control bar. Select an <span className="text-slate-900 font-semibold italic">Automation Preset</span> from the dropdown above to begin a visual walkthrough of the platform's core experiences.
      </p>
      
      <div className="flex flex-col items-center gap-4 animate-bounce duration-[2000ms]">
        <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Use Orchestrator Above</span>
      </div>
    </div>
  );
};