
import React from 'react';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Timeline = ({ items }) => {
  const typeColors = {
    contact: 'bg-blue-500',
    document: 'bg-purple-500',
    meeting: 'bg-emerald-500',
    task: 'bg-amber-500'
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-3 h-3 rounded-full",
              typeColors[item.type] || 'bg-white/30'
            )} />
            {idx < items.length - 1 && (
              <div className="w-px h-full bg-white/10 mt-1" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-white/40 text-xs mb-1">{item.time}</p>
            <p className="text-white text-sm font-medium mb-0.5">{item.title}</p>
            <p className="text-white/60 text-xs">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
