
import React from 'react';
import { User, PlusCircle, Search, Edit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PanelCristal from '@/components/ui/PanelCristal';
import { AnimatePresence, motion } from 'framer-motion';

const ClientCard = ({ client, onEdit, onClose }) => {
  const { t } = useLanguage();
  
  if (!client) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <PanelCristal className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{t('accounting.currentClient')}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 transition-colors">
            <Search className="w-5 h-5"/>
          </button>
        </div>

        <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-200 to-violet-300 dark:from-purple-600 dark:to-violet-700 mx-auto mb-4 flex items-center justify-center">
                 <User className="w-12 h-12 text-white dark:text-black/60"/>
            </div>
            <div>
              <p className="font-bold text-xl text-slate-900 dark:text-white">{client.name}</p>
              <p className="text-sm text-slate-500 dark:text-white/60">RFC: {client.rfc}</p>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mt-1">{client.regime}</p>
            </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-start gap-3"><strong className="text-slate-500 dark:text-white/50 w-24">Contacto:</strong> <span className="text-slate-700 dark:text-white/80">{client.contact || 'N/A'}</span></p>
        </div>

        <button onClick={onEdit} className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>{t('common.edit')}</span>
        </button>
      </PanelCristal>
    </motion.div>
  );
};

export const EmptyClientCard = ({ onNew }) => {
    const { t } = useLanguage();
    return (
        <PanelCristal className="p-4 h-full flex items-center justify-center">
             <div className="text-center py-4 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-lg w-full">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center mb-2">
                    <User className="w-6 h-6 text-slate-400 dark:text-white/40" />
                </div>
                <p className="text-slate-500 dark:text-white/60 mb-3 text-sm">{t('accounting.noClient')}</p>
                <button onClick={onNew} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors text-sm">
                    <PlusCircle className="w-4 h-4" />
                    <span>{t('accounting.searchClient')}</span>
                </button>
            </div>
        </PanelCristal>
    )
}

export default ClientCard;
