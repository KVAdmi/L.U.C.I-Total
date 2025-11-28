import React from 'react';
import { DollarSign, Heart, Users as UsersIcon, Plane } from 'lucide-react';

const ExecutiveSummary = () => {
  const summaryCards = [
    {
      id: 1,
      title: 'Finanzas',
      icon: DollarSign,
      data: {
        cashflow: '+$42,500',
        status: 'positive',
        subtitle: 'Ingresos vs Gastos (Semana)',
        progress: 78,
      },
      color: 'green',
    },
    {
      id: 2,
      title: 'Salud',
      icon: Heart,
      data: {
        steps: '8,245',
        subtitle: 'pasos hoy',
        progress: 68,
      },
      color: 'red',
    },
    {
      id: 3,
      title: 'Equipo',
      icon: UsersIcon,
      data: {
        active: '12',
        subtitle: 'miembros activos',
        alerts: '2 cumpleaños hoy',
      },
      color: 'blue',
    },
    {
      id: 4,
      title: 'Logística',
      icon: Plane,
      data: {
        upcoming: '1 vuelo',
        subtitle: 'próximos 7 días',
        details: 'CDMX → MTY (Lun)',
      },
      color: 'purple',
    },
  ];

  const getColorStyles = (color) => {
    const styles = {
      green: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        progress: 'bg-green-500',
      },
      red: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        progress: 'bg-red-500',
      },
      blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        progress: 'bg-blue-500',
      },
      purple: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        progress: 'bg-purple-500',
      },
    };
    return styles[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card) => {
        const IconComponent = card.icon;
        const colorStyles = getColorStyles(card.color);
        
        return (
          <div
            key={card.id}
            className="bg-white/[.07] backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-[#00BFA5]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white/90">{card.title}</span>
              <div className={`w-10 h-10 rounded-lg ${colorStyles.bg} border ${colorStyles.border} flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${colorStyles.text}`} />
              </div>
            </div>

            <div className="space-y-2">
              <div className={`text-2xl font-bold ${colorStyles.text}`}>
                {card.data.cashflow || card.data.steps || card.data.active || card.data.upcoming}
              </div>
              <div className="text-xs text-white/60">{card.data.subtitle}</div>
              
              {card.data.progress && (
                <div className="pt-2">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorStyles.progress} rounded-full transition-all duration-500`}
                      style={{ width: `${card.data.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {card.data.alerts && (
                <div className="text-xs text-white/70 pt-1">{card.data.alerts}</div>
              )}
              
              {card.data.details && (
                <div className="text-xs text-white/70 pt-1">{card.data.details}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExecutiveSummary;
