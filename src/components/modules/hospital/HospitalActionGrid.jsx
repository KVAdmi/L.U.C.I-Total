
import React from 'react';
import { Bed, UserPlus, CalendarPlus, Syringe, ClipboardList, Package, Stethoscope, AlertTriangle, FileText, Bot, Monitor, Scissors } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import PanelCristal from '@/components/ui/PanelCristal';

const ActionButton = ({ icon: Icon, label, onClick, className }) => (
  <button onClick={onClick} className={cn("flex items-center gap-3 text-left p-3 rounded-xl transition-all duration-200 hover:bg-white/10", className)}>
    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-md">
      <Icon className="w-5 h-5 text-teal-400" />
    </div>
    <span className="text-sm font-semibold text-slate-800 dark:text-white/80">{label}</span>
  </button>
);

const HospitalActionGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = (actionName) => {
        toast({
            title: `🚧 ${actionName}`,
            description: "Esta acción aún no está implementada.",
        });
    };

    const actions = [
        { id: 'registerOccupiedBed', icon: Bed, label: t('hospital.actions.registerOccupiedBed') },
        { id: 'assignNurse', icon: UserPlus, label: t('hospital.actions.assignNurse') },
        { id: 'orCoordination', icon: Scissors, label: t('hospital.actions.orCoordination')},
        { id: 'createShift', icon: CalendarPlus, label: t('hospital.actions.createShift') },
        { id: 'registerMedication', icon: Syringe, label: t('hospital.actions.registerMedication') },
        { id: 'medicalRound', icon: Stethoscope, label: t('hospital.actions.medicalRound') },
        { id: 'createShiftReport', icon: ClipboardList, label: t('hospital.actions.createShiftReport') },
        { id: 'patientMonitoring', icon: Monitor, label: t('hospital.actions.patientMonitoring')},
        { id: 'medicalInventory', icon: Package, label: t('hospital.actions.medicalInventory') },
        { id: 'registerPatientFall', icon: AlertTriangle, label: t('hospital.actions.registerPatientFall'), color: "text-red-400" },
        { id: 'generateDailyReport', icon: FileText, label: t('hospital.actions.generateDailyReport') },
        { id: 'criticalAlerts', icon: Bot, label: t('hospital.actions.criticalAlerts') },
    ];

    return (
        <PanelCristal className="p-4 h-full">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Acciones Rápidas</h2>
            <div className="space-y-2 overflow-y-auto h-[calc(100%-40px)] custom-scrollbar pr-2">
                {actions.map(action => (
                    <ActionButton key={action.id} icon={action.icon} label={action.label} onClick={() => showToast(action.label)} className={action.color} />
                ))}
            </div>
        </PanelCristal>
    );
};

export default HospitalActionGrid;
