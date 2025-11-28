
import React from 'react';
import { FilePlus, Upload, AlertOctagon, BrainCircuit, MessageSquare, Columns, FileSignature, Send, CreditCard, PieChart, UserPlus, UserCheck as UserSearch, RefreshCw, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import PanelCristal from '@/components/ui/PanelCristal';

const ActionButton = ({ icon: Icon, label, onClick, className }) => (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center gap-2 text-center p-2 rounded-xl transition-all duration-200 hover:scale-105", className)}>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-md">
            <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-slate-600 dark:text-white/70 leading-tight">{label}</span>
    </button>
);

const InsuranceActionGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = (actionName) => {
        toast({
            title: `🚧 ${actionName}`,
            description: "Esta acción aún no está implementada.",
        });
    };

    const actions = [
        { id: 'createPolicy', icon: FilePlus, label: t('insurance.actions.createPolicy'), color: 'text-blue-500' },
        { id: 'uploadEndorsement', icon: Upload, label: t('insurance.actions.uploadEndorsement'), color: 'text-sky-500' },
        { id: 'registerClaim', icon: AlertOctagon, label: t('insurance.actions.registerClaim'), color: 'text-red-500' },
        { id: 'aiClaimAssessment', icon: BrainCircuit, label: t('insurance.actions.aiClaimAssessment'), color: 'text-purple-500' },
        { id: 'insurerFollowUp', icon: MessageSquare, label: t('insurance.actions.insurerFollowUp'), color: 'text-slate-500' },
        { id: 'generateComparison', icon: Columns, label: t('insurance.actions.generateComparison'), color: 'text-indigo-500' },
        { id: 'generateAIQuote', icon: FileSignature, label: t('insurance.actions.generateAIQuote'), color: 'text-pink-500' },
        { id: 'sendDocument', icon: Send, label: t('insurance.actions.sendDocument'), color: 'text-cyan-500' },
        { id: 'registerPayment', icon: CreditCard, label: t('insurance.actions.registerPayment'), color: 'text-lime-500' },
        { id: 'viewCommissions', icon: PieChart, label: t('insurance.actions.viewCommissions'), color: 'text-green-500' },
        { id: 'createProspect', icon: UserPlus, label: t('insurance.actions.createProspect'), color: 'text-yellow-500' },
        { id: 'prospectFollowUp', icon: UserSearch, label: t('insurance.actions.prospectFollowUp'), color: 'text-amber-500' },
        { id: 'renewPolicy', icon: RefreshCw, label: t('insurance.actions.renewPolicy'), color: 'text-emerald-500' },
        { id: 'calculateAIPremium', icon: Calculator, label: t('insurance.actions.calculateAIPremium'), color: 'text-fuchsia-500' },
    ];

    return (
        <PanelCristal className="p-4">
             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Acciones de Seguros</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-2">
                {actions.map(action => (
                    <ActionButton key={action.id} icon={action.icon} label={action.label} onClick={() => showToast(action.label)} className={action.color} />
                ))}
            </div>
        </PanelCristal>
    );
};

export default InsuranceActionGrid;
