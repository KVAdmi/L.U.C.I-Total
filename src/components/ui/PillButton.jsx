
import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const pillButtonVariants = cva(
  "rounded-full font-medium transition-all duration-200 inline-flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        default: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
);


const PillButton = ({ 
  children, 
  variant, 
  size,
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(pillButtonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default PillButton;
