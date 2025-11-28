import React from 'react';
import { Flame, Home, Briefcase, Users, RefreshCw } from 'lucide-react';

const TodayTasks = ({ tasks = [], loading = false, onTaskToggle, onRefresh }) => {
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');
  const personal = tasks.filter(t => t.category === 'personal' && t.status !== 'completed');
  const delegable = tasks.filter(t => t.delegable && t.status !== 'completed');

  if (loading) {
    return (
      <div className="bg-white dark:bg-white/[.07] backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-[#00BFA5]" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tareas del día</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-slate-200 dark:bg-white/5 rounded-lg"></div>
          <div className="h-16 bg-slate-200 dark:bg-white/5 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/[.07] backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-[#00BFA5]/30 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#00BFA5]" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tareas del día</h3>
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

      <div className="space-y-4">
        {/* High Priority */}
        {highPriority.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white/90">Prioridad alta</span>
            </div>
            <div className="space-y-2">
              {highPriority.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20 hover:border-red-300 dark:hover:border-red-500/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => onTaskToggle && onTaskToggle(task.id)}
                    className="mt-0.5 w-4 h-4 rounded border-2 border-red-400/70 dark:border-red-400/50 bg-transparent checked:bg-red-500 checked:border-red-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-900 dark:text-white/90 flex-1">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal - Casa */}
        {personal.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white/90">Casa</span>
            </div>
            <div className="space-y-2">
              {personal.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => onTaskToggle && onTaskToggle(task.id)}
                    className="mt-0.5 w-4 h-4 rounded border-2 border-slate-400/70 dark:border-slate-400/50 bg-transparent checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-900 dark:text-white/90 flex-1">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delegables */}
        {delegable.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white/90">Delegables</span>
            </div>
            <div className="space-y-2">
              {delegable.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => onTaskToggle && onTaskToggle(task.id)}
                    className="mt-0.5 w-4 h-4 rounded border-2 border-slate-400/70 dark:border-slate-400/50 bg-transparent checked:bg-yellow-500 checked:border-yellow-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-900 dark:text-white/90 flex-1">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-white/50">
            No hay tareas pendientes
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayTasks;
