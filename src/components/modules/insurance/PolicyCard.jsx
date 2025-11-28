
import React from 'react';
import { Shield, PlusCircle, Search, Edit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PanelCristal from '@/components/ui/PanelCristal';
import Badge from '@/components/ui/Badge';
import { AnimatePresence, motion } from 'framer-motion';

const PolicyCard = ({ policy, onEdit, onClose }) => {
  const { t } = useLanguage();
  
  if (!policy) return null;

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
    >
      <PanelCristal className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{t('insurance.currentPolicy')}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 transition-colors">
            <Search className="w-5 h-5"/>
          </button>
        </div>

        <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-200 to-green-300 dark:from-emerald-600 dark:to-green-700 mx-auto mb-4 flex items-center justify-center">
                 <Shield className="w-12 h-12 text-white dark:text-black/60"/>
            </div>
            <div>
              <p className="font-bold text-xl text-slate-900 dark:text-white">{policy.policyNumber}</p>
              <p className="text-sm text-slate-500 dark:text-white/60">{policy.client}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">{policy.type}</p>
            </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-white/50">Prima Anual:</span>
                <span className="font-bold text-lg text-slate-800 dark:text-white">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(policy.premium)}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-white/50">Estado:</span>
                <Badge variant={policy.status === 'active' ? 'success' : 'warning'}>
                    {policy.status === 'active' ? 'Activa' : 'Expirada'}
                </Badge>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-white/50">Vencimiento:</span>
                <span className="text-slate-700 dark:text-white/80">{policy.expiryDate}</span>
             </div>
        </div>
        
        <button onClick={onEdit} className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>{t('common.edit')}</span>
        </button>
      </PanelCristal>
    </motion.div>
  );
};

export const EmptyPolicyCard = ({ onNew }) => {
    const { t } = useLanguage();
    return (
        <PanelCristal className="p-4 h-full flex items-center justify-center">
             <div className="text-center py-4 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-lg w-full">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-slate-400 dark:text-white/40" />
                </div>
                <p className="text-slate-500 dark:text-white/60 mb-3 text-sm">{t('insurance.noPolicy')}</p>
                <button onClick={onNew} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-sm">
                    <PlusCircle className="w-4 h-4" />
                    <span>{t('insurance.searchPolicy')}</span>
                </button>
            </div>
        </PanelCristal>
    )
}

export default PolicyCard;
