
import React from 'react';

interface SocialIconProps {
  href: string;
  iconClass: string;
  label: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ href, iconClass, label }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="text-slate-600 hover:text-sky-600 transition-all duration-300 ease-in-out group flex flex-col items-center gap-2"
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center text-3xl transform group-hover:-translate-y-1 transition-transform duration-300">
        <i className={iconClass}></i>
      </div>
      <span className="font-medium text-sm">{label}</span>
    </a>
  );
};
