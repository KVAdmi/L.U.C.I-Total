
import React from 'react';
import { HeartPulse, Pill, ShieldAlert, BrainCircuit, FileScan, Upload, Bot, BarChart, FlaskConical, Dna, Video, FilePlus, Footprints, Clipboard, ShieldCheck, Link, Bus as Ambulance, Syringe, WrapText as NotepadText, Paperclip } from 'lucide-react';
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

const ActionGrid = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const showToast = () => {
        toast({
            title: "🚧 Acción no implementada",
            description: "Esta funcionalidad estará disponible en futuras actualizaciones.",
        });
    };

    const actions = [
        { id: 'vitalSigns', icon: HeartPulse, label: t('medical.actions.vitalSigns'), color: 'text-red-500' },
        { id: 'medication', icon: Pill, label: t('medical.actions.medication'), color: 'text-blue-500' },
        { id: 'allergy', icon: ShieldAlert, label: t('medical.actions.allergy'), color: 'text-yellow-500' },
        { id: 'aiDiagnosis', icon: BrainCircuit, label: t('medical.actions.aiDiagnosis'), color: 'text-purple-500' },
        { id: 'requestStudies', icon: FileScan, label: t('medical.actions.requestStudies'), color: 'text-indigo-500' },
        { id: 'uploadResults', icon: Upload, label: t('medical.actions.uploadResults'), color: 'text-gray-500' },
        { id: 'aiInterpretation', icon: Bot, label: t('medical.actions.aiInterpretation'), color: 'text-teal-500' },
        { id: 'prognosis', icon: BarChart, label: t('medical.actions.prognosis'), color: 'text-sky-500' },
        { id: 'severityAssessment', icon: ShieldCheck, label: t('medical.actions.severityAssessment'), color: 'text-orange-500' },
        { id: 'generatePrescription', icon: NotepadText, label: t('medical.actions.generatePrescription'), color: 'text-green-500' },
        { id: 'sendWhatsapp', icon: Paperclip, label: t('medical.actions.sendWhatsapp'), color: 'text-green-400' },
        { id: 'activateTeleconsultation', icon: Video, label: t('medical.actions.activateTeleconsultation'), color: 'text-blue-400' },
        { id: 'createRecord', icon: FilePlus, label: t('medical.actions.createRecord'), color: 'text-slate-500' },
        { id: 'recordEvolution', icon: Footprints, label: t('medical.actions.recordEvolution'), color: 'text-cyan-500' },
        { id: 'recordDischarge', icon: Clipboard, label: t('medical.actions.recordDischarge'), color: 'text-lime-500' },
        { id: 'aiMedicalNote', icon: Dna, label: t('medical.actions.aiMedicalNote'), color: 'text-pink-500' },
        { id: 'createDisability', icon: Link, label: t('medical.actions.createDisability'), color: 'text-fuchsia-500' },
        { id: 'createReferral', icon: Ambulance, label: t('medical.actions.createReferral'), color: 'text-rose-500' },
    ];

    return (
        <PanelCristal className="p-4">
             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Acciones Médicas</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2">
                {actions.map(action => (
                    <ActionButton key={action.id} icon={action.icon} label={action.label} onClick={showToast} className={action.color} />
                ))}
            </div>
        </PanelCristal>
    );
};

export default ActionGrid;
