
import React from 'react';

const ChartInteractive = ({ type = 'bar' }) => {
  if (type === 'bar') {
    return (
      <div className="h-48 flex items-end justify-between gap-2 px-4">
        {[65, 85, 45, 90, 70, 95, 60].map((height, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-gradient-to-t from-[#001E21] to-[#003336] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
              style={{ height: `${height}%` }}
            />
            <span className="text-white/40 text-xs">{['L', 'M', 'X', 'J', 'V', 'S', 'D'][idx]}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'donut') {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="20"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#001E21"
              strokeWidth="20"
              strokeDasharray="251.2 125.6"
              className="transition-all duration-500"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#003336"
              strokeWidth="20"
              strokeDasharray="125.6 251.2"
              strokeDashoffset="-251.2"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl font-bold">68%</p>
              <p className="text-white/60 text-xs">Progreso</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChartInteractive;
