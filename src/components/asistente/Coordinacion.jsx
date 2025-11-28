
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FilePlus, Zap, Calendar, Clock, CheckCircle2, UserPlus, Download, Send, ChevronDown, MapPin, Loader2 } from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { getTeam, scheduleTeam } from '@/lib/asistente/coordination';
import { useToast } from '@/components/ui/use-toast';

const Coordinacion = ({ onBack }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const [selectedProject, setSelectedProject] = useState('proyecto-alpha');
  const [showMinuteDetail, setShowMinuteDetail] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    setLoading(true);
    try {
      const data = await getTeam();
      setTeam(data);
    } catch (error) {
      console.error('Error loading team:', error);
      toast({ title: 'Error', description: 'No se pudo cargar el equipo', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  
  const projects = [
    { id: 'proyecto-alpha', name: 'Proyecto Alpha', members: 5, progress: 75 },
    { id: 'expansion-mx', name: 'Expansión México', members: 3, progress: 45 },
    { id: 'plataforma-2025', name: 'Plataforma 2025', members: 8, progress: 92 },
  ];
  
  const meetingMinutes = [
    { 
      id: 1,
      title: 'Reunión de Marketing Q4', 
      date: '2025-11-26',
      time: '10:00 - 11:30',
      location: 'Zoom',
      attendees: ['Ana García', 'Roberto Silva', 'Diana López'],
      summary: 'Revisión de estrategia Q4 2025 para mercado mexicano. Se acordó aumentar presupuesto digital en 30% y enfocar campañas en CDMX, Monterrey y Guadalajara.',
      tasks: [
        { task: 'Crear propuesta de campaña digital', assignedTo: 'Roberto Silva', deadline: '2025-11-30' },
        { task: 'Análisis de competencia México', assignedTo: 'Diana López', deadline: '2025-12-02' },
        { task: 'Presupuesto final Q4', assignedTo: 'Ana García', deadline: '2025-11-28' },
      ]
    },
    { 
      id: 2,
      title: 'Revisión Proyecto Alpha', 
      date: '2025-11-24',
      time: '14:00 - 15:00',
      location: 'Oficina CDMX - Sala B',
      attendees: ['Carlos Méndez', 'Laura Torres', 'Ana García'],
      summary: 'Avances del 75% completado. Backend finalizado, frontend en últimos ajustes. Fecha de lanzamiento confirmada: 15 de diciembre 2025.',
      tasks: [
        { task: 'Finalizar diseño responsive', assignedTo: 'Laura Torres', deadline: '2025-11-29' },
        { task: 'Testing integración API', assignedTo: 'Carlos Méndez', deadline: '2025-12-01' },
        { task: 'Documentación técnica', assignedTo: 'Carlos Méndez', deadline: '2025-12-05' },
      ]
    },
    { 
      id: 3,
      title: 'Kickoff Plataforma 2025', 
      date: '2025-11-20',
      time: '09:00 - 10:30',
      location: 'Oficina Monterrey',
      attendees: ['Ana García', 'Carlos Méndez', 'Laura Torres', 'Roberto Silva', 'Diana López'],
      summary: 'Inicio oficial del proyecto más ambicioso de L.U.C.I. Objetivo: plataforma completa de gestión empresarial para PyMEs mexicanas. Stack tecnológico aprobado: React, Node, PostgreSQL.',
      tasks: [
        { task: 'Arquitectura del sistema', assignedTo: 'Carlos Méndez', deadline: '2025-11-27' },
        { task: 'Wireframes iniciales', assignedTo: 'Laura Torres', deadline: '2025-11-28' },
        { task: 'Plan de marketing y ventas', assignedTo: 'Roberto Silva', deadline: '2025-12-03' },
      ]
    },
  ];

  const toggleMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const proposeBestTime = () => {
    if (selectedMembers.length === 0) {
      alert('Selecciona al menos un miembro del equipo');
      return;
    }
    alert('Mejor horario encontrado: Hoy 15:00 - 16:00 hrs (Hora CDMX)\nTodos los miembros seleccionados están disponibles.');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disponible': return isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
      case 'Ocupado': return isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600';
      case 'En reunión': return isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title="Coordinación de Equipos" subtitle="Sincroniza agendas, propone reuniones y genera minutas automáticas" icon={Users} />
      
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {projects.map(project => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedProject(project.id)}
            className={`p-5 rounded-lg cursor-pointer transition-all ${
              selectedProject === project.id
                ? isDark ? 'bg-ale-petrol border-2 border-ale-neon' : 'bg-white border-2 border-ale-accent-cyan shadow-lg'
                : isDark ? 'bg-ale-petrol/50 border border-ale-glass' : 'bg-ale-pearl border border-ale-silver'
            }`}
          >
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{project.name}</h3>
            <div className="flex items-center gap-2 text-sm mb-3">
              <Users className="w-4 h-4" />
              <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>{project.members} miembros</span>
            </div>
            <div className="relative w-full h-2 bg-ale-black/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute h-full ${isDark ? 'bg-ale-neon' : 'bg-ale-accent-cyan'}`}
              />
            </div>
            <span className={`text-xs mt-2 block ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{project.progress}% completado</span>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className={`text-xl mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Encontrar Mejor Horario</h3>
          <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
            <p className={`mb-4 text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
              Selecciona los miembros del equipo y L.U.C.I. encontrará el mejor horario común
            </p>
            
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
              {team.map(member => (
                <motion.div 
                  key={member.id}
                  whileHover={{ x: 4 }}
                  onClick={() => toggleMember(member.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedMembers.includes(member.id)
                      ? isDark ? 'bg-ale-neon/10 border-2 border-ale-neon' : 'bg-ale-accent-cyan/10 border-2 border-ale-accent-cyan'
                      : isDark ? 'bg-ale-black/30' : 'bg-ale-pearl'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                        isDark ? 'bg-ale-glass text-ale-black' : 'bg-ale-silver text-ale-charcoal'
                      }`}>
                        {member.avatar}
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{member.name}</p>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{member.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                  
                  <div className={`mt-3 pt-3 border-t ${isDark ? 'border-ale-glass/20' : 'border-ale-silver'}`}>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>{member.timezone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <Clock className="w-3 h-3" />
                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>Disponible: {member.nextAvailable}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={proposeBestTime}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                isDark 
                  ? 'bg-ale-petrol hover:bg-ale-neon/20 text-ale-neon border border-ale-neon' 
                  : 'bg-ale-accent-cyan hover:bg-ale-deep-teal text-white'
              }`}
            >
              <Zap className="w-5 h-5" /> 
              Proponer Mejor Horario ({selectedMembers.length} seleccionados)
            </button>
          </div>
        </div>

        <div>
          <h3 className={`text-xl mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Minutas de Reunión</h3>
          <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 rounded-lg transition-all ${
              isDark 
                ? 'bg-transparent border border-ale-glass text-ale-white hover:bg-ale-glass/10' 
                : 'bg-ale-pearl border border-ale-silver text-ale-charcoal hover:bg-ale-silver'
            }`}>
              <FilePlus className="w-4 h-4" /> Crear Minuta Automática
            </button>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {meetingMinutes.map(minute => (
                  <motion.div 
                    key={minute.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`rounded-lg overflow-hidden ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}
                  >
                    <div 
                      onClick={() => setShowMinuteDetail(showMinuteDetail === minute.id ? null : minute.id)}
                      className="p-4 cursor-pointer hover:bg-opacity-80 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{minute.title}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                              <Calendar className="w-3 h-3" />
                              {new Date(minute.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                              <Clock className="w-3 h-3" />
                              {minute.time}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: showMinuteDetail === minute.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`w-5 h-5 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showMinuteDetail === minute.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`px-4 pb-4 border-t ${isDark ? 'border-ale-glass/20' : 'border-ale-silver'}`}
                        >
                          <div className="pt-4 space-y-4">
                            <div>
                              <p className={`text-xs uppercase tracking-wide mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Ubicación</p>
                              <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{minute.location}</p>
                            </div>

                            <div>
                              <p className={`text-xs uppercase tracking-wide mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Asistentes</p>
                              <div className="flex flex-wrap gap-2">
                                {minute.attendees.map(attendee => (
                                  <span 
                                    key={attendee}
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      isDark ? 'bg-ale-neon/10 text-ale-neon' : 'bg-ale-accent-cyan/10 text-ale-deep-teal'
                                    }`}
                                  >
                                    {attendee}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className={`text-xs uppercase tracking-wide mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Resumen</p>
                              <p className={`text-sm leading-relaxed ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{minute.summary}</p>
                            </div>

                            <div>
                              <p className={`text-xs uppercase tracking-wide mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Tareas Asignadas</p>
                              <div className="space-y-2">
                                {minute.tasks.map((taskItem, idx) => (
                                  <div 
                                    key={idx}
                                    className={`p-3 rounded-md ${isDark ? 'bg-ale-petrol/50' : 'bg-white'}`}
                                  >
                                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{taskItem.task}</p>
                                    <div className="flex items-center justify-between text-xs">
                                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                                        Asignado: {taskItem.assignedTo}
                                      </span>
                                      <span className={isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}>
                                        Fecha límite: {new Date(taskItem.deadline).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                                isDark 
                                  ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20' 
                                  : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20'
                              }`}>
                                <Download className="w-4 h-4" /> Descargar PDF
                              </button>
                              <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                                isDark 
                                  ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20' 
                                  : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20'
                              }`}>
                                <Send className="w-4 h-4" /> Compartir
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordinacion;
