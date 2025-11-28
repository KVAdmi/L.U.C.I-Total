
import React from 'react';
import { BarChart, TrendingUp, DollarSign } from 'lucide-react';
import PanelCristal from '@/components/ui/PanelCristal';
import { motion } from 'framer-motion';

const ChartPlaceholder = ({ title }) => {
  const bars = [
    { height: '60%', delay: 0.1 },
    { height: '40%', delay: 0.2 },
    { height: '80%', delay: 0.3 },
    { height: '50%', delay: 0.4 },
    { height: '70%', delay: 0.5 },
    { height: '30%', delay: 0.6 },
  ];

  return (
    <PanelCristal className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800 dark:text-white">{title}</h3>
        <BarChart className="w-5 h-5 text-slate-400 dark:text-white/40" />
      </div>
      <div className="flex-1 flex items-end justify-around gap-2 px-2 border-b border-dashed border-slate-300 dark:border-white/10 pb-2">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="w-full bg-teal-500/50 rounded-t-md"
            initial={{ height: 0 }}
            animate={{ height: bar.height }}
            transition={{ duration: 0.5, delay: bar.delay, type: 'spring', stiffness: 100 }}
          />
        ))}
      </div>
      <div className="flex justify-around mt-1">
        {['E', 'F', 'M', 'A', 'M', 'J'].map(month => (
          <span key={month} className="text-xs text-slate-400 dark:text-white/40">{month}</span>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="flex items-center text-emerald-500">
             <TrendingUp className="w-4 h-4 mr-1"/>
             <span className="text-sm font-bold">+15.2%</span>
           </div>
           <span className="text-xs text-slate-500 dark:text-white/50">vs mes anterior</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-white/70">
            <DollarSign className="w-4 h-4"/>
            <span className="text-sm font-semibold">MXN</span>
        </div>
      </div>
    </PanelCristal>
  );
};

export default ChartPlaceholder;
