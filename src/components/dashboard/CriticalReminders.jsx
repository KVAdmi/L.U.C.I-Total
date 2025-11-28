import React from 'react';
import { Bell, FileSignature, CreditCard, AlertTriangle, X, RefreshCw } from 'lucide-react';

const CriticalReminders = ({ reminders = [], loading = false, onDismiss, onRefresh }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'documents': return FileSignature;
      case 'renewal': return AlertTriangle;
      case 'payment': return CreditCard;
      default: return Bell;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0D1B1E] backdrop-blur-xl rounded-xl p-6 border border-slate-200 dark:border-[#1a3a3f] shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#00BFA5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recordatorios críticos</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-slate-200 dark:bg-white/5 rounded-lg"></div>
          <div className="h-16 bg-slate-200 dark:bg-white/5 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0D1B1E] backdrop-blur-xl rounded-xl p-6 border border-slate-200 dark:border-[#1a3a3f] hover:border-[#00BFA5]/40 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#00BFA5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recordatorios críticos</h3>
        </div>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-slate-600 dark:text-white/60" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-white/50">
            No hay recordatorios pendientes
          </div>
        ) : (
          reminders.map((reminder) => {
            const IconComponent = getIcon(reminder.type);
            const isHigh = reminder.priority === 'high';
            
            return (
              <div
                key={reminder.id}
                className={`p-4 rounded-lg border transition-all duration-200 group ${
                  isHigh 
                    ? 'bg-slate-50 dark:bg-[#1a2528] border-slate-300 dark:border-[#2a4a4f] hover:border-[#00BFA5]/40' 
                    : 'bg-slate-50 dark:bg-[#151f22] border-slate-200 dark:border-[#1f3338] hover:border-[#00BFA5]/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#0f1a1d] border border-slate-200 dark:border-[#1a3035] flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-[#00BFA5]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">{reminder.title}</div>
                    {reminder.description && (
                      <div className="text-xs text-slate-600 dark:text-slate-400">{reminder.description}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isHigh && (
                      <div className="w-2 h-2 rounded-full bg-[#00BFA5]"></div>
                    )}
                    {onDismiss && (
                      <button
                        onClick={() => onDismiss(reminder.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded transition-all"
                      >
                        <X className="w-4 h-4 text-slate-600 dark:text-white/60" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-[#1a3035]">
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium">
          3 acciones requieren atención inmediata
        </div>
      </div>
    </div>
  );
};

export default CriticalReminders;
