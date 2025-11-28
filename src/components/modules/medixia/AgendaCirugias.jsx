import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, MapPin, User, 
  Users, Plus, Filter, Search, Video, Phone,
  AlertCircle, CheckCircle2, XCircle, Edit2,
  Stethoscope, Scissors, Heart, Activity
} from 'lucide-react';

const AgendaCirugias = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // day, week, month
  const [filterType, setFilterType] = useState('todos');

  const appointments = [
    {
      id: 1,
      type: 'consulta',
      patient: 'María González',
      time: '09:00',
      duration: 30,
      reason: 'Control diabetes',
      doctor: 'Dr. Ramírez',
      room: 'Consultorio 3',
      status: 'confirmado',
      priority: 'normal'
    },
    {
      id: 2,
      type: 'cirugia',
      patient: 'Carlos Hernández',
      time: '10:00',
      duration: 120,
      reason: 'Apendicectomía',
      doctor: 'Dr. Sánchez',
      room: 'Quirófano 1',
      status: 'preparacion',
      priority: 'urgente',
      anesthesia: 'General',
      team: ['Dr. Sánchez', 'Dra. López', 'Enf. Martínez']
    },
    {
      id: 3,
      type: 'consulta',
      patient: 'Ana Martínez',
      time: '11:30',
      duration: 45,
      reason: 'Control reumatología',
      doctor: 'Dra. Flores',
      room: 'Consultorio 1',
      status: 'confirmado',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'procedimiento',
      patient: 'Roberto Silva',
      time: '13:00',
      duration: 60,
      reason: 'Endoscopia digestiva',
      doctor: 'Dr. Vega',
      room: 'Sala Procedimientos',
      status: 'pendiente',
      priority: 'normal'
    },
    {
      id: 5,
      type: 'cirugia',
      patient: 'Laura Jiménez',
      time: '14:00',
      duration: 180,
      reason: 'Colecistectomía laparoscópica',
      doctor: 'Dr. Sánchez',
      room: 'Quirófano 2',
      status: 'confirmado',
      priority: 'programada',
      anesthesia: 'General',
      team: ['Dr. Sánchez', 'Dr. Ortiz', 'Enf. García', 'Enf. Torres']
    },
    {
      id: 6,
      type: 'consulta',
      patient: 'Pedro Ramírez',
      time: '16:00',
      duration: 30,
      reason: 'Primera consulta cardiología',
      doctor: 'Dr. Mendoza',
      room: 'Consultorio 2',
      status: 'confirmado',
      priority: 'normal'
    }
  ];

  const surgeryStats = [
    { label: 'Cirugías Hoy', value: '2', icon: Scissors, color: 'purple' },
    { label: 'Consultas', value: '4', icon: Stethoscope, color: 'blue' },
    { label: 'Quirófanos Activos', value: '2/3', icon: Activity, color: 'emerald' },
    { label: 'Tasa Éxito Semanal', value: '98%', icon: Heart, color: 'red' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmado': return isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pendiente': return isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'preparacion': return isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelado': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'cirugia': return Scissors;
      case 'procedimiento': return Activity;
      case 'consulta': return Stethoscope;
      default: return CalendarIcon;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'cirugia': return isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700';
      case 'procedimiento': return isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      case 'consulta': return isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'urgente': return { text: 'Urgente', color: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-700' };
      case 'programada': return { text: 'Programada', color: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-700' };
      default: return { text: 'Normal', color: isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-50 text-gray-700' };
    }
  };

  const getStatColor = (color) => {
    const colors = {
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      red: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {surgeryStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}
            >
              <div className={`p-3 rounded-lg w-fit mb-3 ${getStatColor(stat.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['day', 'week', 'month'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === mode
                  ? isDark 
                    ? 'bg-ale-neon/20 text-ale-neon border border-ale-neon'
                    : 'bg-ale-accent-cyan text-white'
                  : isDark
                    ? 'bg-ale-petrol/50 text-ale-glass hover:bg-ale-petrol'
                    : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
              }`}
            >
              {mode === 'day' && 'Día'}
              {mode === 'week' && 'Semana'}
              {mode === 'month' && 'Mes'}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`px-4 py-2 rounded-lg outline-none cursor-pointer text-sm ${
              isDark 
                ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
            }`}
          >
            <option value="todos">Todos</option>
            <option value="cirugia">Cirugías</option>
            <option value="consulta">Consultas</option>
            <option value="procedimiento">Procedimientos</option>
          </select>

          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isDark 
              ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
              : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
          }`}>
            <Plus className="w-5 h-5" />
            Nueva Cita
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
            Agenda del Día - {new Date().toLocaleDateString('es-MX', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          <div className="flex items-center gap-2">
            <CalendarIcon className={`w-5 h-5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
            <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
              {appointments.length} eventos programados
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {appointments.map((apt, idx) => {
            const TypeIcon = getTypeIcon(apt.type);
            const priority = getPriorityBadge(apt.priority);
            
            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 rounded-lg border-l-4 transition-all hover:shadow-lg ${
                  apt.type === 'cirugia' 
                    ? isDark ? 'border-purple-500 bg-ale-black/40' : 'border-purple-400 bg-purple-50/50'
                    : apt.type === 'procedimiento'
                      ? isDark ? 'border-blue-500 bg-ale-black/40' : 'border-blue-400 bg-blue-50/50'
                      : isDark ? 'border-emerald-500 bg-ale-black/40' : 'border-emerald-400 bg-emerald-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${getTypeColor(apt.type)}`}>
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-bold text-lg ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {apt.patient}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${priority.color}`}>
                              {priority.text}
                            </span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                            {apt.reason}
                          </p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(apt.status)}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-4 gap-3 mt-3">
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Hora</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {apt.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Duración</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {apt.duration} min
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Doctor</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {apt.doctor}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Ubicación</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {apt.room}
                            </p>
                          </div>
                        </div>
                      </div>

                      {apt.type === 'cirugia' && (
                        <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                                Equipo Quirúrgico
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {apt.team.map((member, i) => (
                                  <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                                    isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                                  }`}>
                                    {member}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Anestesia</p>
                              <p className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                                {apt.anesthesia}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className={`p-2 rounded-lg transition-all ${
                      isDark ? 'hover:bg-ale-glass/10 text-ale-glass hover:text-ale-white' : 'hover:bg-ale-silver text-ale-slate'
                    }`}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${
                      isDark ? 'hover:bg-emerald-500/20 text-emerald-400' : 'hover:bg-emerald-50 text-emerald-700'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${
                      isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-700'
                    }`}>
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgendaCirugias;