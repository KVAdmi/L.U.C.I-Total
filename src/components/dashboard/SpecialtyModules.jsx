
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Stethoscope, Scale, ShieldCheck, BookUser, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  { 
    id: 'medixia', 
    icon: Stethoscope, 
    labelKey: 'sidebar.medixia',
    descKey: 'dashboard.specialty_modules.medixia_desc',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-cyan-100',
    borderColor: 'border-cyan-400/50'
  },
  { 
    id: 'lexia', 
    icon: Scale, 
    labelKey: 'sidebar.lexia',
    descKey: 'dashboard.specialty_modules.lexia_desc',
    color: 'from-orange-500 to-amber-500',
    textColor: 'text-amber-100',
    borderColor: 'border-amber-400/50'
  },
  { 
    id: 'segurosia', 
    icon: ShieldCheck, 
    labelKey: 'sidebar.segurosia',
    descKey: 'dashboard.specialty_modules.segurosia_desc',
    color: 'from-emerald-500 to-green-500',
    textColor: 'text-green-100',
    borderColor: 'border-green-400/50'
  },
  { 
    id: 'contaia', 
    icon: BookUser, 
    labelKey: 'sidebar.contaia',
    descKey: 'dashboard.specialty_modules.contaia_desc',
    color: 'from-purple-500 to-violet-500',
    textColor: 'text-violet-100',
    borderColor: 'border-violet-400/50'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const SpecialtyModules = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-foreground">{t('dashboard.specialty_modules.title')}</h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {modules.map((module) => (
          <motion.button
            key={module.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(module.id)}
            className={cn(
              "relative group p-6 rounded-2xl text-white font-['Questrial'] transition-all duration-300 overflow-hidden flex flex-col items-start justify-between h-52",
              `bg-gradient-to-br ${module.color}`
            )}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="relative z-10 flex-shrink-0">
               <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                 <module.icon className="h-6 w-6" />
               </div>
            </div>
            
            <div className="relative z-10 mt-auto">
              <h3 className="text-xl font-bold uppercase tracking-wider">{t(module.labelKey)}</h3>
              <p className={cn("text-sm opacity-80", module.textColor)}>{t(module.descKey)}</p>
            </div>
            
            <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SpecialtyModules;
