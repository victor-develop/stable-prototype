
import React from 'react';
import { LogIn } from 'lucide-react';
import { AutomatedInput } from '../components/AutomatedInput';
import { PlaybookButton } from '../components/PlaybookButton';

interface LoginViewProps {
  formValues: Record<string, string>;
  onFormChange: (key: string, value: string) => void;
  activeId?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({ formValues, onFormChange, activeId }) => {
  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6 text-emerald-600">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
        </div>
        <div className="space-y-4">
          <AutomatedInput 
            id="login-form#email" 
            label="Email" 
            value={formValues.email || ''} 
            onChange={(v) => onFormChange('email', v)} 
            isActive={activeId === 'login-form#email'}
          />
          <AutomatedInput 
            id="login-form#password" 
            label="Password" 
            type="password"
            value={formValues.password || ''} 
            onChange={(v) => onFormChange('password', v)} 
            isActive={activeId === 'login-form#password'}
          />
          <PlaybookButton 
            id="login-submit"
            variant="secondary"
            className="w-full py-4 mt-2"
            isActive={activeId === 'login-submit'}
          >
            Sign In
          </PlaybookButton>
        </div>
      </div>
    </div>
  );
};
