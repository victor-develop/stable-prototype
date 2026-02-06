import React, { useEffect, useState } from 'react';

interface Props {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  isActive?: boolean;
}

export const AutomatedInput: React.FC<Props> = ({ id, label, type = 'text', value, onChange, isActive = false }) => {
  const [isPulseActive, setIsPulseActive] = useState(false);

  // Briefly pulse when external value changes or becomes active via automation
  useEffect(() => {
    if (value || isActive) {
      setIsPulseActive(true);
      const timer = setTimeout(() => setIsPulseActive(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value, isActive]);

  return (
    <div className="mb-4 relative group">
      <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-700'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 outline-none
            ${isActive || isPulseActive 
              ? 'border-indigo-500 ring-4 ring-indigo-200 bg-indigo-50 scale-[1.02] shadow-lg shadow-indigo-100' 
              : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white'}
          `}
        />
        {isActive && (
          <div className="absolute inset-0 rounded-lg border-2 border-indigo-400 animate-ping pointer-events-none opacity-20" />
        )}
      </div>
    </div>
  );
};