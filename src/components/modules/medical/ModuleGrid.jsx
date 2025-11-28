
import React from 'react';
import { Users, FileText, Calendar, Video, Pill, Beaker, Scan, BedDouble, BarChartBig, Brain, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import PanelCristal from '@/components/ui/PanelCristal';

const ModuleButton = ({ icon: Icon, label, onClick, className }) => (
  <button 
    onClick={onClick}
    className={cn(
      "relative group w-full aspect-square rounded-2xl p-4 flex flex-col justify-end transition-all duration-300 overflow-hidden",
      "bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-black/50",
      "hover:bg-white/80 dark:hover:bg-black/50 hover:border-white/50 dark:hover:border-black/70 hover:scale-[1.02]",
      "shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl"
    )}
  >
    <div className={cn("absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110", className)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="font-bold text-lg text-slate-800 dark:text-white mt-auto z-10 text-left">{label}</span>
     <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
  </button>
);


const ModuleGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = (moduleName) => {
        toast({
            title: `🚧 ${moduleName}`,
            description: "Este módulo aún no está implementado.",
        });
    };

    const modules = [
        { id: 'patients', icon: Users, label: t('medical.modules.patients'), color: 'bg-blue-500' },
        { id: 'record', icon: FileText, label: t('medical.modules.record'), color: 'bg-teal-500' },
        { id: 'appointments', icon: Calendar, label: t('medical.modules.appointments'), color: 'bg-purple-500' },
        { id: 'teleconsultation', icon: Video, label: t('medical.modules.teleconsultation'), color: 'bg-sky-500' },
        { id: 'prescriptions', icon: Pill, label: t('medical.modules.prescriptions'), color: 'bg-green-500' },
        { id: 'labs', icon: Beaker, label: t('medical.modules.labs'), color: 'bg-orange-500' },
        { id: 'imaging', icon: Scan, label: t('medical.modules.imaging'), color: 'bg-indigo-500' },
        { id: 'hospital', icon: BedDouble, label: t('medical.modules.hospital'), color: 'bg-red-500' },
        { id: 'indicators', icon: BarChartBig, label: t('medical.modules.indicators'), color: 'bg-yellow-500' },
        { id: 'prognosis', icon: Brain, label: t('medical.modules.prognosis'), color: 'bg-pink-500' },
        { id: 'logistics', icon: Truck, label: t('medical.modules.logistics'), color: 'bg-slate-500' },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map(module => (
                <ModuleButton 
                    key={module.id} 
                    icon={module.icon} 
                    label={module.label} 
                    onClick={() => showToast(module.label)}
                    className={module.color}
                />
            ))}
        </div>
    );
};

export default ModuleGrid;
