
import React from 'react';
import { UserPlus } from 'lucide-react';
import { AutomatedInput } from '../components/AutomatedInput';
import { PlaybookButton } from '../components/PlaybookButton';

interface SignupViewProps {
  formValues: Record<string, string>;
  onFormChange: (key: string, value: string) => void;
  activeId?: string;
}

export const SignupView: React.FC<SignupViewProps> = ({ formValues, onFormChange, activeId }) => {
  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6 text-indigo-600">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <UserPlus size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
        </div>
        <div className="space-y-4">
          <AutomatedInput 
            id="signup-form#username" 
            label="Username" 
            value={formValues.username || ''} 
            onChange={(v) => onFormChange('username', v)} 
            isActive={activeId === 'signup-form#username'}
          />
          <AutomatedInput 
            id="signup-form#email" 
            label="Email Address" 
            value={formValues.email || ''} 
            onChange={(v) => onFormChange('email', v)} 
            isActive={activeId === 'signup-form#email'}
          />
          <AutomatedInput 
            id="signup-form#password" 
            label="Password" 
            type="password"
            value={formValues.password || ''} 
            onChange={(v) => onFormChange('password', v)} 
            isActive={activeId === 'signup-form#password'}
          />
          <PlaybookButton 
            id="signup-submit"
            className="w-full py-4 mt-2"
            isActive={activeId === 'signup-submit'}
          >
            Sign Up Now
          </PlaybookButton>
        </div>
      </div>
    </div>
  );
};
