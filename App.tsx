
import React, { useState } from 'react';
import { PlaybookOrchestrator } from './system/PlaybookOrchestrator';
import { useCommandExecutor } from './system/useCommandExecutor';
import { AppState } from './types';
import { Play } from 'lucide-react';

// View imports from the Experience Layer
import { LandingView } from './views/LandingView';
import { SignupView } from './views/SignupView';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';

const INITIAL_STATE: AppState = {
  currentView: 'landing',
  user: null,
  formValues: {},
  activeElementId: undefined
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const { execute } = useCommandExecutor(state, setState);

  const updateFormValue = (key: string, value: string) => {
    setState(prev => ({
      ...prev,
      formValues: { ...prev.formValues, [key]: value }
    }));
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
  };

  const renderView = () => {
    const commonProps = { activeId: state.activeElementId };
    
    switch (state.currentView) {
      case 'signup':
        return <SignupView {...commonProps} formValues={state.formValues} onFormChange={updateFormValue} />;
      case 'login':
        return <LoginView {...commonProps} formValues={state.formValues} onFormChange={updateFormValue} />;
      case 'dashboard':
        return <DashboardView {...commonProps} user={state.user} />;
      default:
        return (
          <LandingView 
            {...commonProps}
            onNavigate={(view) => setState(p => ({ ...p, currentView: view }))} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PlaybookOrchestrator 
        onExecute={execute} 
        isExecuting={isExecuting}
        setIsExecuting={setIsExecuting}
        resetApp={handleReset}
      />
      
      <main className="relative flex-1 py-12 px-4">
        {isExecuting && (
          <div className="fixed inset-0 pointer-events-none z-40 bg-indigo-500/5 animate-pulse">
             <div className="absolute top-4 left-4 flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ring-4 ring-indigo-500/20">
                <Play size={10} fill="currentColor" /> AUTOMATION RUNNING
             </div>
          </div>
        )}

        <div className="container mx-auto">
          {renderView()}
        </div>
      </main>

      <footer className="fixed bottom-4 left-4 text-slate-400 text-[10px] font-mono uppercase tracking-[0.2em] pointer-events-none z-10">
        Prototype Automation OS v1.0.8 // Ready
      </footer>
    </div>
  );
}
