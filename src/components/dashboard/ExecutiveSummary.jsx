import React from 'react';
import { DollarSign, Heart, Users as UsersIcon, Plane } from 'lucide-react';

const ExecutiveSummary = () => {
  const summaryCards = [
    {
      id: 1,
      title: 'Finanzas',
      icon: DollarSign,
      value: '+$42,500',
      subtitle: 'Ingresos vs Gastos (Semana)',
      progress: 78,
    },
    {
      id: 2,
      title: 'Salud',
      icon: Heart,
      value: '8,245',
      subtitle: 'pasos hoy',
      progress: 68,
    },
    {
      id: 3,
      title: 'Equipo',
      icon: UsersIcon,
      value: '12',
      subtitle: 'miembros activos',
      detail: '2 cumpleaños hoy',
    },
    {
      id: 4,
      title: 'Logística',
      icon: Plane,
      value: '1 vuelo',
      subtitle: 'próximos 7 días',
      detail: 'CDMX → MTY (Lun)',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card) => {
        const IconComponent = card.icon;
        
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-[#0D1B1E] backdrop-blur-xl rounded-xl p-5 border border-slate-200 dark:border-[#1a3a3f] hover:border-[#00BFA5]/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{card.title}</span>
              <div className="w-10 h-10 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-[#00BFA5]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {card.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">{card.subtitle}</div>
              
              {card.progress && (
                <div className="pt-2">
                  <div className="h-1.5 bg-slate-200 dark:bg-[#1a2528] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00BFA5] rounded-full transition-all duration-500"
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {card.detail && (
                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 font-medium">{card.detail}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExecutiveSummary;
