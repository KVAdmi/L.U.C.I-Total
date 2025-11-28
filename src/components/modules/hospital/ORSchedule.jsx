
import React from 'react';
import PanelCristal from '@/components/ui/PanelCristal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scissors, Clock, CheckCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const ORItem = ({ room, time, procedure, surgeon, status }) => {
  const statusConfig = {
    scheduled: { label: 'Programada', variant: 'warning' },
    inProgress: { label: 'En Proceso', variant: 'success' },
    available: { label: 'Disponible', variant: 'secondary' }
  };
  
  return (
    <div className={cn(
      "p-3 rounded-lg flex gap-4 items-center transition-all",
      status === 'inProgress' ? 'bg-teal-500/10 border-l-4 border-teal-500' : 'bg-white/5'
    )}>
        <div className="text-center w-16 flex-shrink-0">
            <p className="font-bold text-lg text-slate-800 dark:text-white">{room}</p>
            <p className="text-xs text-slate-500 dark:text-white/60">{time}</p>
        </div>
        <div className="flex-1">
            <p className="font-semibold text-sm text-slate-800 dark:text-white">{procedure}</p>
            <p className="text-xs text-slate-500 dark:text-white/60">Dr. {surgeon}</p>
        </div>
        <Badge variant={statusConfig[status].variant}>{statusConfig[status].label}</Badge>
    </div>
  );
};


const ORSchedule = () => {
  const { t } = useLanguage();
  const schedule = [
    { room: "Q. 1", time: "13:00", procedure: "Apendicectomía", surgeon: "Morales", status: "inProgress" },
    { room: "Q. 2", time: "14:30", procedure: "Colecistectomía", surgeon: "Herrera", status: "scheduled" },
    { room: "Q. 3", time: "16:00", procedure: "Artroscopia de rodilla", surgeon: "Campos", status: "scheduled" },
    { room: "Q. 4", time: "", procedure: "-", surgeon: "-", status: "available" },
  ];

  return (
    <PanelCristal className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">{t('hospital.orSchedule.title')}</h2>
      <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {schedule.map(item => <ORItem key={item.room} {...item} />)}
      </div>
    </PanelCristal>
  );
};

export default ORSchedule;
