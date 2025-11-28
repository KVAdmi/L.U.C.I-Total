
import React, { useState } from 'react';
import { Sparkles, Lightbulb, TrendingUp, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const IAPanel = ({ activeModule, assistantName }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  const getSuggestions = (module) => {
    const commonSuggestions = [
      { text: "Tus ingresos aumentaron 15% este mes.", icon: TrendingUp, color: 'text-emerald-500' },
      { text: "3 citas requieren confirmación para hoy.", icon: AlertTriangle, color: 'text-amber-500' },
    ];
    
    switch (module) {
      case 'agenda':
        return [{ text: "Detectado posible conflicto en la agenda para el jueves a las 11:00.", icon: AlertTriangle, color: 'text-red-500' }];
      case 'tareas':
        return [{ text: "Tarea 'Revisar propuesta' es de alta prioridad y vence pronto.", icon: Lightbulb, color: 'text-purple-500' }];
      default:
        return commonSuggestions;
    }
  };

  const suggestions = getSuggestions(activeModule);

  return (
    <aside className="w-80 border-l border-slate-200 dark:border-white/5 bg-background overflow-y-auto custom-scrollbar hidden xl:block">
      <div className="sticky top-0 z-10 bg-background border-b border-slate-200 dark:border-white/10 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--petroleo-primary))] to-[hsl(var(--petroleo-secondary))] flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">{assistantName}</h2>
              <p className="text-xs text-muted-foreground">Asistente IA Contextual</p>
            </div>
          </div>
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
            <div className="p-6 pt-4 space-y-4">
              {suggestions.map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-3">
                    <item.icon className={cn("w-5 h-5 mt-0.5", item.color)} />
                    <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-2">💡 Sugerencia Inteligente</p>
                <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed">
                  Basado en tus patrones, el mejor momento para tareas creativas es entre 9-11 AM.
                </p>
                <Button size="sm" className="mt-3 rounded-full">Agendar bloque</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default IAPanel;
