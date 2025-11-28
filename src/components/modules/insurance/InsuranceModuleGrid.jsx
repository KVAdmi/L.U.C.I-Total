
import React from 'react';
import { Shield, RefreshCw, AlertTriangle, KeyRound as UserRoundSearch, FileSignature, FilePlus, Users, Percent } from 'lucide-react';
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


const InsuranceModuleGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = (moduleName) => {
        toast({
            title: `🚧 ${moduleName}`,
            description: "Este módulo aún no está implementado.",
        });
    };

    const modules = [
        { id: 'policies', icon: Shield, label: t('insurance.modules.policies'), color: 'bg-blue-500' },
        { id: 'renewals', icon: RefreshCw, label: t('insurance.modules.renewals'), color: 'bg-emerald-500' },
        { id: 'claims', icon: AlertTriangle, label: t('insurance.modules.claims'), color: 'bg-red-500' },
        { id: 'prospects', icon: UserRoundSearch, label: t('insurance.modules.prospects'), color: 'bg-yellow-500' },
        { id: 'quotes', icon: FileSignature, label: t('insurance.modules.quotes'), color: 'bg-purple-500' },
        { id: 'endorsements', icon: FilePlus, label: t('insurance.modules.endorsements'), color: 'bg-sky-500' },
        { id: 'beneficiaries', icon: Users, label: t('insurance.modules.beneficiaries'), color: 'bg-indigo-500' },
        { id: 'commissions', icon: Percent, label: t('insurance.modules.commissions'), color: 'bg-green-500' },
    ];

    return (
        <PanelCristal className="h-full p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 h-full overflow-y-auto custom-scrollbar">
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
        </PanelCristal>
    );
};

export default InsuranceModuleGrid;
