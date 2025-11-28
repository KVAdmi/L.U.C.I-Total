
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calendar, CheckCircle, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CardCristal from '@/components/ui/CardCristal';

const QuickStats = () => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  const stats = [
    { 
      label: t('dashboard.revenue') || 'Ingresos del Mes', 
      value: '$24,500', 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    { 
      label: t('dashboard.appointments') || 'Citas Hoy', 
      value: '8', 
      change: '+2', 
      icon: Calendar, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    { 
      label: t('dashboard.completedTasks') || 'Tareas Completadas', 
      value: '24/30', 
      change: '80%', 
      icon: CheckCircle, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    { 
      label: t('dashboard.growth') || 'Crecimiento', 
      value: '+18%', 
      change: 'vs mes anterior', 
      icon: TrendingUp, 
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    },
  ];

  return (
    <CardCristal className="overflow-hidden">
      <div className="p-6 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{t('dashboard.summary') || 'Resumen Ejecutivo'}</h2>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`text-xs font-medium ${stat.color}`}>{stat.change}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CardCristal>
  );
};

export default QuickStats;
