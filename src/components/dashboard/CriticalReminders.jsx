import React from 'react';
import { Bell, FileSignature, CreditCard, AlertTriangle } from 'lucide-react';

const CriticalReminders = () => {
  const reminders = [
    {
      id: 1,
      type: 'documents',
      icon: FileSignature,
      title: '2 documentos pendientes de firma',
      urgency: 'high',
    },
    {
      id: 2,
      type: 'renewal',
      icon: AlertTriangle,
      title: 'Renovación póliza empresa',
      subtitle: '4 días',
      urgency: 'medium',
    },
    {
      id: 3,
      type: 'payment',
      icon: CreditCard,
      title: 'Factura proveedor atrasada',
      subtitle: '$45,000 MXN',
      urgency: 'high',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1B1E] backdrop-blur-xl rounded-xl p-6 border border-slate-200 dark:border-[#1a3a3f] hover:border-[#00BFA5]/40 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center">
          <Bell className="w-5 h-5 text-[#00BFA5]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recordatorios críticos</h3>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => {
          const IconComponent = reminder.icon;
          const isHigh = reminder.urgency === 'high';
          
          return (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
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
                  {reminder.subtitle && (
                    <div className="text-xs text-slate-600 dark:text-slate-400">{reminder.subtitle}</div>
                  )}
                </div>
                {isHigh && (
                  <div className="w-2 h-2 rounded-full bg-[#00BFA5]"></div>
                )}
              </div>
            </div>
          );
        })}
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
