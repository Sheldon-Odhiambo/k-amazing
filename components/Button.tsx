
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ariaLabel,
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#FFD8BE] focus:ring-offset-2";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1",
    secondary: "bg-[#FFD8BE] text-slate-900 hover:bg-[#ffcdab] shadow-lg hover:shadow-xl hover:-translate-y-1",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white hover:-translate-y-1"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Subtle hover glare effect */}
      <div className="absolute inset-0 w-full h-full bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none"></div>
    </button>
  );
};
