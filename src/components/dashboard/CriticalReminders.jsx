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
      color: 'red',
    },
    {
      id: 2,
      type: 'renewal',
      icon: AlertTriangle,
      title: 'Renovación póliza empresa',
      subtitle: '4 días',
      urgency: 'medium',
      color: 'yellow',
    },
    {
      id: 3,
      type: 'payment',
      icon: CreditCard,
      title: 'Factura proveedor atrasada',
      subtitle: '$45,000 MXN',
      urgency: 'high',
      color: 'red',
    },
  ];

  const getUrgencyStyles = (color) => {
    const styles = {
      red: 'bg-red-500/10 border-red-500/30 hover:border-red-500/50',
      yellow: 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50',
      green: 'bg-green-500/10 border-green-500/30 hover:border-green-500/50',
    };
    return styles[color] || styles.yellow;
  };

  const getIconColor = (color) => {
    const colors = {
      red: 'text-red-400',
      yellow: 'text-yellow-400',
      green: 'text-green-400',
    };
    return colors[color] || colors.yellow;
  };

  return (
    <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#00BFA5]/30 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-[#00BFA5]" />
        <h3 className="text-lg font-bold text-white">Recordatorios críticos</h3>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => {
          const IconComponent = reminder.icon;
          return (
            <div
              key={reminder.id}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${getUrgencyStyles(reminder.color)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${getIconColor(reminder.color)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white mb-1">{reminder.title}</div>
                  {reminder.subtitle && (
                    <div className="text-xs text-white/60">{reminder.subtitle}</div>
                  )}
                </div>
                {reminder.urgency === 'high' && (
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-white/50 text-center">
          3 acciones requieren atención inmediata
        </div>
      </div>
    </div>
  );
};

export default CriticalReminders;
