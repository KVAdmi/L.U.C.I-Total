
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, MoreVertical, Layout, List, 
  Clock, Play, Pause, RotateCcw, Calendar, CheckCircle2, 
  AlertCircle, Flag, User, Tag, GripVertical, ArrowRight,
  CheckSquare, Trash2, Link, Copy, Share2, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import PillButton from '@/components/ui/PillButton';
import Badge from '@/components/ui/Badge';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// --- Helper Components ---

const PriorityBadge = ({ priority, t }) => {
  const styles = {
    High: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20",
    Medium: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20",
    Low: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
  };
  
  // Map internal key to translation key
  const labelKey = priority === 'High' ? 'high' : priority === 'Medium' ? 'medium' : 'low';
  
  return (
    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide", styles[priority])}>
      {t(`tareas.${labelKey}`)}
    </span>
  );
};

const TaskCard = ({ task, onClick, onDragStart, t }) => (
  <motion.div
    layoutId={task.id}
    draggable
    onDragStart={(e) => onDragStart(e, task)}
    onClick={onClick}
    className="group relative bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all hover:border-emerald-400/50 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
  >
    <div className="flex justify-between items-start mb-2">
      <PriorityBadge priority={task.priority} t={t} />
      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded">
        <MoreVertical className="w-3 h-3 text-slate-400 dark:text-white/60" />
      </button>
    </div>
    
    <h4 className="text-slate-900 dark:text-white text-sm font-medium mb-3 leading-snug">{task.title}</h4>
    
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 dark:from-[#001E21] dark:to-[#003336] flex items-center justify-center text-[10px] text-white border border-slate-200 dark:border-white/10" title={task.assignee}>
          {task.assigneeInitials}
        </div>
        {task.project && (
           <span className="text-[10px] text-slate-500 dark:text-white/40 px-1.5 py-0.5 bg-slate-100 dark:bg-white/5 rounded border border-slate-200 dark:border-white/5 truncate max-w-[80px]">
             {task.project}
           </span>
        )}
      </div>
      
      <div className={cn(
        "flex items-center gap-1 text-[10px]",
        new Date(task.dueDate) < new Date() ? "text-red-500 dark:text-red-400" : "text-slate-400 dark:text-white/40"
      )}>
        <Calendar className="w-3 h-3" />
        <span>{new Date(task.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
      </div>
    </div>
  </motion.div>
);

const TaskRow = ({ task, onClick, t }) => (
  <div 
    onClick={onClick}
    className="grid grid-cols-12 gap-4 items-center p-3 hover:bg-slate-100 dark:hover:bg-white/5 border-b border-slate-200 dark:border-white/5 transition-colors cursor-pointer group text-sm"
  >
    <div className="col-span-1 flex justify-center">
       <PriorityBadge priority={task.priority} t={t} />
    </div>
    <div className="col-span-4 font-medium text-slate-900 dark:text-white truncate pl-2">
       {task.title}
    </div>
    <div className="col-span-2 text-slate-500 dark:text-white/60 truncate text-xs">
       {task.project}
    </div>
    <div className="col-span-2 flex items-center gap-2">
       <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-[10px] text-slate-700 dark:text-white">
         {task.assigneeInitials}
       </div>
       <span className="text-xs text-slate-500 dark:text-white/60 truncate">{task.assignee}</span>
    </div>
    <div className="col-span-2 text-xs text-slate-500 dark:text-white/60">
       {task.dueDate}
    </div>
    <div className="col-span-1 flex justify-end">
       <Badge variant="outline" className="text-[10px] text-slate-400 dark:text-white/40 group-hover:text-slate-700 dark:group-hover:text-white group-hover:border-slate-300 dark:group-hover:border-white/20">
          {task.status === 'todo' ? t('tareas.todo') : task.status === 'in-progress' ? t('tareas.inProgress') : t('tareas.done')}
       </Badge>
    </div>
  </div>
);

const PomodoroTimer = ({ t }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, short-break

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-[#001E21] dark:to-[#003336] border border-slate-700 dark:border-white/10 mt-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-emerald-400 text-sm font-bold flex items-center gap-2">
           <Clock className="w-4 h-4" /> {t('tareas.pomodoro')}
         </h3>
         <div className="flex gap-1 bg-black/20 rounded p-0.5">
            <button 
              onClick={() => { setMode('focus'); setTimeLeft(25*60); setIsRunning(false); }}
              className={cn("px-2 py-0.5 text-[10px] rounded transition-colors", mode === 'focus' ? "bg-white/20 text-white" : "text-white/40")}
            >
              {t('tareas.focus')}
            </button>
            <button 
              onClick={() => { setMode('short-break'); setTimeLeft(5*60); setIsRunning(false); }}
              className={cn("px-2 py-0.5 text-[10px] rounded transition-colors", mode === 'short-break' ? "bg-white/20 text-white" : "text-white/40")}
            >
              {t('tareas.break')}
            </button>
         </div>
      </div>
      
      <div className="text-4xl font-mono font-bold text-white text-center py-4 tracking-wider">
        {formatTime(timeLeft)}
      </div>

      <div className="flex justify-center gap-3 mt-2">
        <button 
          onClick={toggleTimer}
          className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition-colors shadow-lg shadow-emerald-900/20"
        >
          {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>
        <button 
          onClick={resetTimer}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---

const Tareas = ({ assistantName }) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState('kanban');
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useLanguage();
  const [tasks, setTasks] = useState([
    { id: 1, title: "Revisar contrato de proveedores A", priority: "High", status: "todo", assignee: "Ana M.", assigneeInitials: "AM", project: "Legal", dueDate: "2025-11-28" },
    { id: 2, title: "Actualizar reporte financiero Q3", priority: "Medium", status: "in-progress", assignee: "Carlos R.", assigneeInitials: "CR", project: "Finanzas", dueDate: "2025-11-30" },
    { id: 3, title: "Diseñar mockup nueva landing", priority: "Low", status: "todo", assignee: "Tu", assigneeInitials: "TU", project: "Marketing", dueDate: "2025-12-05" },
    { id: 4, title: "Aprobar presupuesto anual", priority: "High", status: "done", assignee: "Elena M.", assigneeInitials: "EM", project: "Dirección", dueDate: "2025-11-20" },
    { id: 5, title: "Contactar a clientes VIP", priority: "High", status: "todo", assignee: "Tu", assigneeInitials: "TU", project: "Ventas", dueDate: "2025-11-27" },
    { id: 6, title: "Migración de base de datos", priority: "Medium", status: "in-progress", assignee: "Soporte", assigneeInitials: "IT", project: "Tecnología", dueDate: "2025-12-15" },
  ]);

  const handleAction = (action) => {
    toast({
      title: t('common.action'),
      description: `${action} - Procesando solicitud...`
    });
  };

  // --- DnD Logic ---
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    if (taskId) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      const statusLabel = newStatus === 'todo' ? t('tareas.todo') : newStatus === 'in-progress' ? t('tareas.inProgress') : t('tareas.done');
      toast({
        title: "Estado actualizado",
        description: `Tarea movida a ${statusLabel}`
      });
    }
  };

  const filteredTasks = activeFilter === 'all' ? tasks : tasks.filter(t => t.priority.toLowerCase() === activeFilter);

  return (
    <div className="flex h-full max-h-screen overflow-hidden bg-slate-50 dark:bg-[#0F0F0F] transition-colors duration-300">
      
      {/* LEFT COLUMN - Filters & Stats */}
      <div className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0F0F0F]">
        <div className="p-4 border-b border-slate-200 dark:border-white/10">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-slate-900 dark:text-white font-bold text-lg">{t('tareas.title')}</h2>
             <button onClick={() => handleAction(t('tareas.create'))} className="p-1.5 bg-slate-900 dark:bg-[#001E21] text-white rounded hover:bg-slate-800 dark:hover:bg-[#003336] transition-colors border border-transparent dark:border-white/10">
               <Plus className="w-4 h-4" />
             </button>
           </div>

           <div className="flex bg-slate-200 dark:bg-white/5 p-1 rounded-lg mb-6">
              <button 
                onClick={() => setViewMode('kanban')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded transition-all",
                  viewMode === 'kanban' ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Layout className="w-3 h-3" /> {t('tareas.board')}
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded transition-all",
                  viewMode === 'list' ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <List className="w-3 h-3" /> {t('tareas.list')}
              </button>
           </div>

           <div className="space-y-1">
             <p className="px-2 text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider mb-2">{t('tareas.priority')}</p>
             {['all', 'high', 'medium', 'low'].map(p => (
               <button
                 key={p}
                 onClick={() => setActiveFilter(p)}
                 className={cn(
                   "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                   activeFilter === p 
                    ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white" 
                    : "text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                 )}
               >
                 <span className="capitalize">
                    {p === 'all' ? t('common.all') : p === 'high' ? t('tareas.high') : p === 'medium' ? t('tareas.medium') : t('tareas.low')}
                 </span>
                 <span className="text-xs opacity-50">
                   {p === 'all' ? tasks.length : tasks.filter(t => t.priority.toLowerCase() === p).length}
                 </span>
               </button>
             ))}
           </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
           <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-slate-100 dark:bg-white/5 rounded-lg p-3 border border-slate-200 dark:border-white/5">
                 <span className="block text-2xl font-bold text-slate-900 dark:text-white">{tasks.length}</span>
                 <span className="text-[10px] text-slate-500 dark:text-white/40">{t('tareas.total')}</span>
              </div>
              <div className="bg-red-100 dark:bg-red-500/10 rounded-lg p-3 border border-red-200 dark:border-red-500/10">
                 <span className="block text-2xl font-bold text-red-500 dark:text-red-400">2</span>
                 <span className="text-[10px] text-red-600/80 dark:text-red-400/60">{t('tareas.overdue')}</span>
              </div>
           </div>

           <PomodoroTimer t={t} />
        </div>
      </div>

      {/* CENTER COLUMN - Kanban / List */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0F0F0F] relative overflow-hidden">
         {/* Toolbar */}
         <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0 bg-white/90 dark:bg-[#0F0F0F]/95 backdrop-blur z-10">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-white/40" />
                  <input 
                    type="text" 
                    placeholder={t('tareas.filterPlaceholder')} 
                    className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-900 dark:text-white w-64 focus:outline-none focus:border-emerald-500"
                  />
               </div>
               <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                     <div className="w-7 h-7 rounded-full bg-blue-500 border border-white dark:border-[#0F0F0F] flex items-center justify-center text-[10px] text-white">AM</div>
                     <div className="w-7 h-7 rounded-full bg-purple-500 border border-white dark:border-[#0F0F0F] flex items-center justify-center text-[10px] text-white">CR</div>
                     <div className="w-7 h-7 rounded-full bg-slate-800 dark:bg-[#001E21] border border-white dark:border-[#0F0F0F] flex items-center justify-center text-[10px] text-white">+2</div>
                  </div>
               </div>
            </div>
            
            <div className="flex gap-2">
               <button onClick={() => handleAction(t('tareas.group'))} className="text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white text-sm flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <Filter className="w-4 h-4" /> {t('tareas.group')}
               </button>
               <button onClick={() => handleAction(t('tareas.reminders'))} className="text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white text-sm flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <Clock className="w-4 h-4" /> {t('tareas.reminders')}
               </button>
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 overflow-hidden p-6">
            {viewMode === 'kanban' ? (
              <div className="flex h-full gap-6 overflow-x-auto pb-2">
                {/* Column: Todo */}
                <div 
                   onDragOver={handleDragOver} 
                   onDrop={(e) => handleDrop(e, 'todo')}
                   className="flex-1 min-w-[280px] flex flex-col bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 max-h-full"
                >
                   <div className="p-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/40" />
                         <h3 className="font-medium text-slate-900 dark:text-white text-sm">{t('tareas.todo')}</h3>
                         <span className="text-xs text-slate-500 dark:text-white/40 bg-white dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-transparent">{filteredTasks.filter(t => t.status === 'todo').length}</span>
                      </div>
                      <button onClick={() => handleAction(t('tareas.create'))} className="text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"><Plus className="w-4 h-4" /></button>
                   </div>
                   <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3">
                      {filteredTasks.filter(t => t.status === 'todo').map(task => (
                         <TaskCard key={task.id} task={task} onClick={() => handleAction('Editar tarea')} onDragStart={handleDragStart} t={t} />
                      ))}
                   </div>
                </div>

                {/* Column: In Progress */}
                <div 
                   onDragOver={handleDragOver} 
                   onDrop={(e) => handleDrop(e, 'in-progress')}
                   className="flex-1 min-w-[280px] flex flex-col bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 max-h-full"
                >
                   <div className="p-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                         <h3 className="font-medium text-slate-900 dark:text-white text-sm">{t('tareas.inProgress')}</h3>
                         <span className="text-xs text-slate-500 dark:text-white/40 bg-white dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-transparent">{filteredTasks.filter(t => t.status === 'in-progress').length}</span>
                      </div>
                      <button onClick={() => handleAction(t('tareas.create'))} className="text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"><Plus className="w-4 h-4" /></button>
                   </div>
                   <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3">
                      {filteredTasks.filter(t => t.status === 'in-progress').map(task => (
                         <TaskCard key={task.id} task={task} onClick={() => handleAction('Editar tarea')} onDragStart={handleDragStart} t={t} />
                      ))}
                   </div>
                </div>

                {/* Column: Done */}
                <div 
                   onDragOver={handleDragOver} 
                   onDrop={(e) => handleDrop(e, 'done')}
                   className="flex-1 min-w-[280px] flex flex-col bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 max-h-full"
                >
                   <div className="p-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-400" />
                         <h3 className="font-medium text-slate-900 dark:text-white text-sm">{t('tareas.done')}</h3>
                         <span className="text-xs text-slate-500 dark:text-white/40 bg-white dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-transparent">{filteredTasks.filter(t => t.status === 'done').length}</span>
                      </div>
                      <button onClick={() => handleAction(t('tareas.create'))} className="text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"><Plus className="w-4 h-4" /></button>
                   </div>
                   <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3">
                      {filteredTasks.filter(t => t.status === 'done').map(task => (
                         <TaskCard key={task.id} task={task} onClick={() => handleAction('Editar tarea')} onDragStart={handleDragStart} t={t} />
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                 <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider">
                    <div className="col-span-1 text-center">{t('tareas.priority')}</div>
                    <div className="col-span-4 pl-2">Tarea</div>
                    <div className="col-span-2">Proyecto</div>
                    <div className="col-span-2">Asignado</div>
                    <div className="col-span-2">Fecha</div>
                    <div className="col-span-1 text-right">Estado</div>
                 </div>
                 <div className="overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar">
                    {filteredTasks.map(task => (
                       <TaskRow key={task.id} task={task} onClick={() => handleAction('Editar tarea')} t={t} />
                    ))}
                 </div>
              </div>
            )}
         </div>
      </div>

      {/* RIGHT COLUMN - IA Context */}
      <IAActionPanel 
        assistantName={assistantName} 
        context="tareas"
        className="border-l border-slate-200 dark:border-white/10"
      />

    </div>
  );
};

export default Tareas;
