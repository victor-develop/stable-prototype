
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FLOWS } from '../presets';
import { Flow, Command } from '../types';
import { Search, Play, Pause, RotateCcw, ChevronUp, ChevronDown, Terminal, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onExecute: (cmd: Command) => Promise<void>;
  isExecuting: boolean;
  setIsExecuting: (val: boolean) => void;
  resetApp: () => void;
}

export const PlaybookOrchestrator: React.FC<Props> = ({ onExecute, isExecuting, setIsExecuting, resetApp }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  
  const stopRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFlows = useMemo(() => {
    return FLOWS.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredFlows.length / itemsPerPage);
  const paginatedFlows = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredFlows.slice(start, start + itemsPerPage);
  }, [filteredFlows, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handlePlay = async () => {
    if (!selectedFlow) return;
    
    setIsExecuting(true);
    stopRef.current = false;
    
    // Initial Seed
    await selectedFlow.seeds();

    for (let i = 0; i < selectedFlow.commands.length; i++) {
      if (stopRef.current) break;
      setCurrentStep(i);
      await onExecute(selectedFlow.commands[i]);
      await new Promise(r => setTimeout(r, 900));
    }
    
    setIsExecuting(false);
  };

  const handleStop = () => {
    stopRef.current = true;
    setIsExecuting(false);
  };

  const handleReset = () => {
    handleStop();
    setCurrentStep(-1);
    resetApp();
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-700 shadow-2xl">
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100 py-4 overflow-visible' : 'max-h-0 opacity-0 py-0 overflow-hidden'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-6">
          
          {/* Search & Selector */}
          <div className="relative flex-1 group w-full" ref={dropdownRef}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors z-10">
              <Search size={18} />
            </div>
            <input 
              type="text"
              placeholder="Select or search UX Playbook presets..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
              value={searchTerm}
              onFocus={() => setIsDropdownOpen(true)}
              onClick={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedFlow(null);
              }}
            />
            
            {/* Improved Autocomplete Dropdown with Pagination */}
            {isDropdownOpen && !selectedFlow && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="max-h-80 overflow-y-auto">
                  {paginatedFlows.length > 0 ? (
                    paginatedFlows.map(flow => (
                      <button
                        key={flow.id}
                        className="w-full text-left px-4 py-3 hover:bg-indigo-600/20 transition-colors border-b border-slate-700 last:border-none text-white group"
                        onClick={() => {
                          setSelectedFlow(flow);
                          setSearchTerm('');
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="font-semibold text-indigo-300 group-hover:text-white transition-colors">{flow.name}</div>
                        <div className="text-xs text-slate-400 line-clamp-1 group-hover:text-slate-200">{flow.description}</div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-sm text-slate-500 italic text-center">No flows found matching "{searchTerm}"</div>
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="bg-slate-900/80 px-4 py-2 flex items-center justify-between border-t border-slate-700 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                      disabled={currentPage === 0}
                      className="p-1 hover:bg-slate-700 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="p-1 hover:bg-slate-700 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Active Flow Status */}
          {selectedFlow && (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300 text-white">
              <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">Active Preset</span>
                <span className="text-sm font-medium">{selectedFlow.name}</span>
              </div>
              
              <div className="flex gap-2">
                {!isExecuting ? (
                  <button 
                    onClick={handlePlay}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg font-bold transition-all transform active:scale-95 shadow-lg shadow-indigo-900/20"
                  >
                    <Play size={18} fill="currentColor" /> Play Flow
                  </button>
                ) : (
                  <button 
                    onClick={handleStop}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-5 py-2.5 rounded-lg font-bold transition-all"
                  >
                    <Pause size={18} fill="currentColor" /> Stop
                  </button>
                )}
                <button 
                  onClick={handleReset}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
                  title="Reset App"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={() => { setSelectedFlow(null); setCurrentStep(-1); }}
                  className="text-xs text-slate-400 underline ml-2 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Command Log Viewer */}
        {selectedFlow && (
          <div className="max-w-7xl mx-auto px-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Terminal size={12} /> Execution Log
                 </span>
                 <span className="text-[10px] font-mono text-slate-400">
                    Step {currentStep + 1} of {selectedFlow.commands.length}
                 </span>
               </div>
               <div className="space-y-1 h-24 overflow-y-auto scrollbar-hide text-white">
                 {selectedFlow.commands.map((cmd, idx) => (
                   <div 
                    key={idx} 
                    className={`flex items-center gap-3 text-xs mono py-1 px-2 rounded transition-colors ${
                      idx === currentStep 
                        ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-500' 
                        : idx < currentStep ? 'text-slate-500' : 'text-slate-600'
                    }`}
                   >
                     <span className="w-4 text-[10px] opacity-50">{idx + 1}</span>
                     <span className="flex-1 truncate">{cmd.description}</span>
                     <span className="text-[10px] opacity-40 uppercase">{cmd.type}</span>
                     {idx < currentStep && <CheckCircle2 size={12} className="text-emerald-500" />}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Tab */}
      <div className="flex justify-center h-0 relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-900 border border-slate-700 border-t-0 text-slate-400 hover:text-white px-8 py-1 rounded-b-2xl transition-all shadow-xl flex items-center gap-2 group whitespace-nowrap"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">
            {isOpen ? 'Collapse Orchestrator' : 'Orchestrator'}
          </span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
};
