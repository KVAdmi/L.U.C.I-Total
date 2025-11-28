
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Stethoscope, Scale, ShieldCheck, BookUser, Building2, CheckCircle } from 'lucide-react';

const modules = [
  { id: 'medixia', icon: Stethoscope, labelKey: 'sidebar.medixia' },
  { id: 'lexia', icon: Scale, labelKey: 'sidebar.lexia' },
  { id: 'segurosia', icon: ShieldCheck, labelKey: 'sidebar.segurosia' },
  { id: 'contaia', icon: BookUser, labelKey: 'sidebar.contaia' },
  { id: 'hospital', icon: Building2, labelKey: 'sidebar.hospital' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

const SystemHealth = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-foreground">{t('dashboard.health.title')}</h2>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {modules.map((module) => (
          <motion.div
            key={module.id}
            variants={itemVariants}
            className="flex flex-col items-center justify-center p-3 bg-background/30 rounded-lg border border-white/10"
          >
            <module.icon className="h-6 w-6 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground text-center uppercase tracking-wider">{t(module.labelKey)}</p>
            <div className="flex items-center text-emerald-400 mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              <p className="text-xs font-semibold">{t('dashboard.health.operational')}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SystemHealth;
