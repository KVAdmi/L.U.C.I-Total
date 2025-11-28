
import React from 'react';
import { cn } from '@/lib/utils';

const CardCristal = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        "bg-white/50 border border-slate-200/80 shadow-sm",
        "dark:bg-white/5 dark:border-white/10 dark:shadow-2xl dark:shadow-black/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CardCristal;
