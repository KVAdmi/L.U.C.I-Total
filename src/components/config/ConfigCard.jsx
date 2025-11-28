
import React from 'react';
import { cn } from '@/lib/utils';

const ConfigCard = ({ title, description, children, footer, className }) => {
  return (
    <div className={cn("bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm", className)}>
      <div className="p-6 border-b border-slate-200 dark:border-white/10">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        {description && <p className="text-sm text-slate-500 dark:text-white/60 mt-1">{description}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="p-4 bg-slate-50 dark:bg-black/20 border-t border-slate-200 dark:border-white/10 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ConfigCard;
