
import React from 'react';

interface PlaybookButtonProps {
  id: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isActive?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const PlaybookButton: React.FC<PlaybookButtonProps> = ({
  id,
  onClick,
  children,
  variant = 'primary',
  isActive = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = "px-6 py-2.5 rounded-xl font-bold transition-all duration-300 relative overflow-hidden active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200",
    secondary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200",
    outline: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
  };

  const activeStyles = isActive 
    ? "ring-4 ring-indigo-400/50 scale-105 bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
    : "";

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${activeStyles} ${className}`}
    >
      {isActive && (
        <span className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
      )}
      {children}
    </button>
  );
};
