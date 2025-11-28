import React from 'react';
import { Flame, Home, Briefcase, Users } from 'lucide-react';

const TodayTasks = () => {
  const tasks = {
    high: [
      { id: 1, title: 'Revisar propuesta de expansión Andorra', category: 'empresa' },
      { id: 2, title: 'Hablar con el notario', category: 'empresa' },
    ],
    personal: [
      { id: 3, title: 'Pedirle a la señora del aseo limpiar terraza', category: 'casa' },
      { id: 4, title: 'Revisar cotización seguro auto', category: 'casa' },
    ],
    delegable: [
      { id: 5, title: 'Enviar reporte mensual equipo', category: 'empresa' },
      { id: 6, title: 'Agendar mantenimiento oficina', category: 'empresa' },
    ],
  };

  return (
    <div className="bg-white dark:bg-white/[.07] backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-[#00BFA5]/30 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-[#00BFA5]" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tareas del día</h3>
      </div>

      <div className="space-y-4">
        {/* High Priority */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white/90">Prioridad alta</span>
          </div>
          <div className="space-y-2">
            {tasks.high.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20 hover:border-red-300 dark:hover:border-red-500/40 transition-colors">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-2 border-red-400/70 dark:border-red-400/50 bg-transparent checked:bg-red-500 checked:border-red-500 cursor-pointer"
                />
                <span className="text-sm text-slate-900 dark:text-white/90 flex-1">{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal - Casa */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white/90">Casa</span>
          </div>
          <div className="space-y-2">
            {tasks.personal.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-2 border-slate-400 dark:border-white/30 bg-transparent checked:bg-[#00BFA5] checked:border-[#00BFA5] cursor-pointer"
                />
                <span className="text-sm text-slate-800 dark:text-white/80 flex-1">{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delegables */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white/90">Delegables</span>
          </div>
          <div className="space-y-2">
            {tasks.delegable.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-2 border-slate-400 dark:border-white/30 bg-transparent checked:bg-[#00BFA5] checked:border-[#00BFA5] cursor-pointer"
                />
                <span className="text-sm text-slate-800 dark:text-white/80 flex-1">{task.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayTasks;
