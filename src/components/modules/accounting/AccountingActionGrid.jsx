
import React from 'react';
import { Upload, FileScan, Search, ListChecks, FileText, CalendarCheck, CreditCard, Landmark, ShieldCheck as CheckShield, AlertTriangle, Calculator, FileCheck2, BrainCircuit, BarChart } from 'lucide-react';
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

const AccountingActionGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = (actionName) => {
        toast({
            title: `🚧 ${actionName}`,
            description: "Esta acción aún no está implementada.",
        });
    };

    const actions = [
        { id: 'importXML', icon: Upload, label: t('accounting.actions.importXML'), color: 'text-blue-500' },
        { id: 'readCFDI', icon: FileScan, label: t('accounting.actions.readCFDI'), color: 'text-sky-500' },
        { id: 'findDeductions', icon: Search, label: t('accounting.actions.findDeductions'), color: 'text-emerald-500' },
        { id: 'classifyExpense', icon: ListChecks, label: t('accounting.actions.classifyExpense'), color: 'text-purple-500' },
        { id: 'monthlyReturn', icon: FileText, label: t('accounting.actions.monthlyReturn'), color: 'text-slate-500' },
        { id: 'annualReturn', icon: CalendarCheck, label: t('accounting.actions.annualReturn'), color: 'text-indigo-500' },
        { id: 'receivePayments', icon: CreditCard, label: t('accounting.actions.receivePayments'), color: 'text-lime-500' },
        { id: 'generateFinancials', icon: Landmark, label: t('accounting.actions.generateFinancials'), color: 'text-pink-500' },
        { id: 'validateSAT', icon: CheckShield, label: t('accounting.actions.validateSAT'), color: 'text-green-500' },
        { id: 'fiscalAlerts', icon: AlertTriangle, label: t('accounting.actions.fiscalAlerts'), color: 'text-red-500' },
        { id: 'calculateTaxes', icon: Calculator, label: t('accounting.actions.calculateTaxes'), color: 'text-yellow-500' },
        { id: 'generateReceipt', icon: FileCheck2, label: t('accounting.actions.generateReceipt'), color: 'text-cyan-500' },
        { id: 'aiAudit', icon: BrainCircuit, label: t('accounting.actions.aiAudit'), color: 'text-fuchsia-500' },
        { id: 'cashFlowAnalysis', icon: BarChart, label: t('accounting.actions.cashFlowAnalysis'), color: 'text-orange-500' },
    ];

    return (
        <PanelCristal className="p-4 flex-1">
             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Acciones Contables</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-2">
                {actions.map(action => (
                    <ActionButton key={action.id} icon={action.icon} label={action.label} onClick={() => showToast(action.label)} className={action.color} />
                ))}
            </div>
        </PanelCristal>
    );
};

export default AccountingActionGrid;
