
import React from 'react';
import PanelCristal from '@/components/ui/PanelCristal';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, ClipboardList } from 'lucide-react';

const NurseAvatar = ({ name, avatarUrl, shift }) => (
  <div className="flex items-center gap-3">
    <img alt={name} class="h-10 w-10 rounded-full object-cover border-2 border-white/20" src={avatarUrl} />
    <div>
      <p className="font-semibold text-sm text-slate-800 dark:text-white">{name}</p>
      <p className="text-xs text-slate-500 dark:text-white/60">{shift}</p>
    </div>
  </div>
);

const TaskItem = ({ task, patient, time }) => (
    <div className="flex items-start gap-3 py-2 border-b border-white/5 last:border-b-0">
        <ClipboardList className="w-4 h-4 mt-1 text-teal-400"/>
        <div>
            <p className="text-sm font-medium text-slate-800 dark:text-white">{task}</p>
            <p className="text-xs text-slate-500 dark:text-white/60">{patient} - {time}</p>
        </div>
    </div>
);


const NursingDashboard = () => {
  const { t } = useLanguage();
  const nurses = [
    { name: "Laura Pérez", shift: "Turno Mañana (7-15h)", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" },
    { name: "Carlos Ruiz", shift: "Turno Mañana (7-15h)", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },
    { name: "Sofía Gómez", shift: "Turno Tarde (15-23h)", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956" },
  ];
   const tasks = [
    { task: "Administrar Paracetamol", patient: "Cama 101", time: "14:00h" },
    { task: "Toma de Signos Vitales", patient: "Cama 102", time: "14:30h" },
    { task: "Cambio de vendaje", patient: "Cama 105", time: "15:00h" },
  ];

  return (
    <PanelCristal className="p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">{t('hospital.nursingDashboard.title')}</h2>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-white/70 mb-2 flex items-center gap-2"><User className="w-4 h-4"/> {t('hospital.nursingDashboard.assignedNurses')}</h3>
            <div className="space-y-3">
                {nurses.map(nurse => <NurseAvatar key={nurse.name} {...nurse} />)}
            </div>
        </div>
         <div>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-white/70 mb-2 flex items-center gap-2"><ClipboardList className="w-4 h-4"/> {t('hospital.nursingDashboard.pendingTasks')}</h3>
             <div className="space-y-1">
                {tasks.map(task => <TaskItem key={task.task} {...task} />)}
            </div>
        </div>
      </div>
    </PanelCristal>
  );
};

export default NursingDashboard;
