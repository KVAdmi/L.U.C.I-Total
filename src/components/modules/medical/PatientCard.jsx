
import React from 'react';
import { User, PlusCircle, Search, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import PanelCristal from '@/components/ui/PanelCristal';
import { AnimatePresence, motion } from 'framer-motion';

const PatientCard = ({ patient, onEdit, onClose }) => {
  const { t } = useLanguage();
  
  if (!patient) return null;

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
    >
      <PanelCristal className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{t('medical.currentPatient')}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 transition-colors">
            <Search className="w-5 h-5"/>
          </button>
        </div>

        <div className="text-center">
            <img alt="Patient Avatar" className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-white/10 object-cover mx-auto mb-4" src={patient.avatar} />
            <div>
              <p className="font-bold text-xl text-slate-900 dark:text-white">{patient.name}</p>
              <p className="text-sm text-slate-500 dark:text-white/60">ID: {patient.id} &bull; {patient.age} {t('medical.years')}</p>
            </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 text-slate-400"/> <span className="text-slate-700 dark:text-white/80">{patient.email || 'N/A'}</span></p>
            <p className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 text-slate-400"/> <span className="text-slate-700 dark:text-white/80">{patient.phone || 'N/A'}</span></p>
            <p className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-slate-400"/> <span className="text-slate-700 dark:text-white/80">{patient.address || 'N/A'}</span></p>
        </div>

        <button onClick={onEdit} className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>{t('common.edit')}</span>
        </button>
      </PanelCristal>
    </motion.div>
  );
};


export const EmptyPatientCard = ({ onNew }) => {
    const { t } = useLanguage();
    return (
        <PanelCristal className="p-4 h-full flex items-center justify-center">
             <div className="text-center py-4 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-lg w-full">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center mb-2">
                    <User className="w-6 h-6 text-slate-400 dark:text-white/40" />
                </div>
                <p className="text-slate-500 dark:text-white/60 mb-3 text-sm">{t('medical.noPatient')}</p>
                <button onClick={onNew} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors text-sm">
                    <PlusCircle className="w-4 h-4" />
                    <span>{t('medical.searchPatient')}</span>
                </button>
            </div>
        </PanelCristal>
    )
}

export default PatientCard;
