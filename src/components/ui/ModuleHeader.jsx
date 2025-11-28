
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ModuleHeader = ({ title, breadcrumb = [], children, className }) => {
  return (
    <header className={cn(
      "bg-card border-b border-border p-4 sm:p-6 sticky top-0 z-10",
      className
    )}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          {breadcrumb.length > 0 && (
            <nav className="text-sm text-muted-foreground mb-2 flex items-center flex-wrap">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {item.path ? (
                    <Link to={item.path} className="hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                  {index < breadcrumb.length - 1 && (
                    <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          <h1 className="text-2xl font-bold text-foreground truncate">{title}</h1>
        </div>
        {children && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export default ModuleHeader;
