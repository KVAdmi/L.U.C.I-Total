
import React from 'react';
import { FileText, CalendarDays, Calendar, LineChart, Inbox, Database, ScanSearch, BrainCircuit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import PanelCristal from '@/components/ui/PanelCristal';

const ModuleButton = ({ icon: Icon, label, onClick, className, size = 'default' }) => {
    const sizeClasses = {
      default: "aspect-square",
      wide: "aspect-[2/1] sm:col-span-2"
    };

    return (
      <button 
        onClick={onClick}
        className={cn(
          "relative group w-full rounded-2xl p-4 flex flex-col justify-end transition-all duration-300 overflow-hidden",
          "bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-black/50",
          "hover:bg-white/80 dark:hover:bg-black/50 hover:border-white/50 dark:hover:border-black/70 hover:scale-[1.02]",
          "shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl",
          sizeClasses[size]
        )}
      >
        <div className={cn("absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110", className)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-lg text-slate-800 dark:text-white mt-auto z-10 text-left">{label}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
      </button>
    );
};

const AccountingModuleGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = (moduleName) => {
        toast({
            title: `🚧 ${moduleName}`,
            description: "Este módulo aún no está implementado.",
        });
    };

    const modules = [
        { id: 'returns', icon: FileText, label: t('accounting.modules.returns'), color: 'bg-blue-500', size: 'wide' },
        { id: 'monthly', icon: CalendarDays, label: t('accounting.modules.monthly'), color: 'bg-emerald-500' },
        { id: 'annual', icon: Calendar, label: t('accounting.modules.annual'), color: 'bg-teal-500' },
        { id: 'financialStatements', icon: LineChart, label: t('accounting.modules.financialStatements'), color: 'bg-purple-500' },
        { id: 'satInbox', icon: Inbox, label: t('accounting.modules.satInbox'), color: 'bg-red-500' },
        { id: 'cfdis', icon: Database, label: t('accounting.modules.cfdis'), color: 'bg-yellow-500' },
        { id: 'xmlValidation', icon: ScanSearch, label: t('accounting.modules.xmlValidation'), color: 'bg-sky-500' },
        { id: 'aiReports', icon: BrainCircuit, label: t('accounting.modules.aiReports'), color: 'bg-indigo-500' },
    ];

    return (
        <PanelCristal className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar">
                {modules.map(module => (
                    <ModuleButton 
                        key={module.id} 
                        icon={module.icon} 
                        label={module.label} 
                        onClick={() => showToast(module.label)}
                        className={module.color}
                        size={module.size}
                    />
                ))}
            </div>
        </PanelCristal>
    );
};

export default AccountingModuleGrid;
