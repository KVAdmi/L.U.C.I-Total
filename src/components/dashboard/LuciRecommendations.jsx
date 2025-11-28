import React from 'react';
import { Sparkles, Clock, Calendar, TrendingUp } from 'lucide-react';

const LuciRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      type: 'traffic',
      icon: Clock,
      title: 'Puedes mover tu cita de las 4 PM',
      description: 'Hay tráfico atípico en Reforma. Sugerencia: Reprogramar para las 3 PM o 5:30 PM.',
      action: 'Reprogramar',
      priority: 'medium',
    },
    {
      id: 2,
      type: 'renewal',
      icon: Calendar,
      title: 'Renovación de seguro próxima',
      description: 'Tu seguro de salud vence en 12 días. ¿Quieres revisar opciones o renovar automáticamente?',
      action: 'Revisar opciones',
      priority: 'high',
    },
    {
      id: 3,
      type: 'optimization',
      icon: TrendingUp,
      title: 'Agenda muy cargada hoy',
      description: 'Tienes 8 reuniones programadas. Sugerencia: Delegar 2 tareas al equipo para optimizar tu tiempo.',
      action: 'Ver sugerencias',
      priority: 'low',
    },
  ];

  const getPriorityStyles = (priority) => {
    const styles = {
      high: 'border-red-500/30 bg-red-500/5',
      medium: 'border-yellow-500/30 bg-yellow-500/5',
      low: 'border-blue-500/30 bg-blue-500/5',
    };
    return styles[priority] || styles.medium;
  };

  return (
    <div className="bg-gradient-to-br from-[#001E21] to-[#003336] rounded-2xl p-6 border border-[#00BFA5]/30 shadow-xl shadow-[#00BFA5]/10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-[#00BFA5]/20 border border-[#00BFA5]/40 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#00BFA5]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">L.U.C.I te recomienda hoy</h3>
          <p className="text-sm text-white/60">Sugerencias inteligentes para optimizar tu día</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const IconComponent = rec.icon;
          return (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border backdrop-blur-sm hover:border-[#00BFA5]/50 transition-all duration-200 ${getPriorityStyles(rec.priority)}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-[#00BFA5]" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-white mb-1">{rec.title}</div>
                  <div className="text-sm text-white/70 mb-3">{rec.description}</div>
                  <button className="px-4 py-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 rounded-lg text-sm font-semibold text-[#001E21] transition-colors">
                    {rec.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
        <div className="text-xs text-white/50">
          Actualizado hace 5 minutos
        </div>
        <button className="text-sm font-semibold text-[#00BFA5] hover:text-[#00BFA5]/80 transition-colors">
          Ver todas las recomendaciones →
        </button>
      </div>
    </div>
  );
};

export default LuciRecommendations;
