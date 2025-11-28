import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, AlertCircle, Bell,
  Plus, Search, Filter, CheckCircle2, User, Building2,
  Scale, TrendingUp, AlertTriangle, ChevronRight, MapPin
} from 'lucide-react';

const AgendaPlazos = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [viewMode, setViewMode] = useState('list'); // list, calendar
  const [filterUrgencia, setFilterUrgencia] = useState('todos');

  const plazos = [
    {
      id: 1,
      tipo: 'Audiencia',
      titulo: 'Audiencia de Desahogo de Pruebas',
      caso: 'CV-2024-001 - Juicio Ordinario Mercantil',
      fecha: '2024-12-05',
      hora: '10:00',
      ubicacion: '5° Juzgado Civil - CDMX, Sala 3',
      urgencia: 'alta',
      diasRestantes: 8,
      abogado: 'Lic. Roberto Martínez',
      preparacion: ['Testigos confirmados', 'Documentales listas', 'Argumentos preparados'],
      status: 'pendiente'
    },
    {
      id: 2,
      tipo: 'Audiencia',
      titulo: 'Audiencia de Conciliación',
      caso: 'LB-2024-023 - Juicio Laboral',
      fecha: '2024-12-02',
      hora: '09:30',
      ubicacion: 'Junta Local de Conciliación y Arbitraje',
      urgencia: 'alta',
      diasRestantes: 5,
      abogado: 'Lic. María Fernández',
      preparacion: ['Propuesta conciliatoria', 'Documentos del trabajador', 'Cálculos salariales'],
      status: 'pendiente'
    },
    {
      id: 3,
      tipo: 'Plazo Procesal',
      titulo: 'Ofrecimiento de Pruebas',
      caso: 'PN-2024-018 - Proceso Penal',
      fecha: '2024-12-08',
      hora: 'Todo el día',
      ubicacion: 'Sistema Acusatorio - Digital',
      urgencia: 'media',
      diasRestantes: 11,
      abogado: 'Lic. Jorge Hernández',
      preparacion: ['Pruebas periciales', 'Testigos citados', 'Documentales'],
      status: 'en-preparacion'
    },
    {
      id: 4,
      tipo: 'Sentencia',
      titulo: 'Sentencia Estimada',
      caso: 'AMP-2024-007 - Juicio de Amparo',
      fecha: '2024-12-10',
      hora: '12:00',
      ubicacion: '12° Juzgado de Distrito',
      urgencia: 'media',
      diasRestantes: 13,
      abogado: 'Lic. Patricia Silva',
      preparacion: ['Seguimiento diario', 'Preparar comunicado cliente'],
      status: 'esperando'
    },
    {
      id: 5,
      tipo: 'Audiencia',
      titulo: 'Firma de Convenio',
      caso: 'FM-2024-012 - Divorcio Incausado',
      fecha: '2024-11-30',
      hora: '11:00',
      ubicacion: '3° Juzgado Familiar - Monterrey',
      urgencia: 'alta',
      diasRestantes: 3,
      abogado: 'Lic. Sofía Ramírez',
      preparacion: ['Convenio firmado por partes', 'Documentos de bienes', 'Acuerdo custodia'],
      status: 'listo'
    },
    {
      id: 6,
      tipo: 'Plazo Procesal',
      titulo: 'Alegatos Finales',
      caso: 'CV-2024-001 - Juicio Ordinario Mercantil',
      fecha: '2024-12-15',
      hora: 'Todo el día',
      ubicacion: 'Por escrito',
      urgencia: 'baja',
      diasRestantes: 18,
      abogado: 'Lic. Roberto Martínez',
      preparacion: ['Borrador en revisión', 'Jurisprudencias seleccionadas'],
      status: 'en-preparacion'
    }
  ];

  const stats = [
    { label: 'Próximos 7 días', value: '12', icon: CalendarIcon, color: 'blue' },
    { label: 'Alta Urgencia', value: '5', icon: AlertCircle, color: 'red' },
    { label: 'Listos', value: '8', icon: CheckCircle2, color: 'emerald' },
    { label: 'En Preparación', value: '4', icon: Clock, color: 'amber' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      red: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      amber: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
    };
    return colors[color] || colors.blue;
  };

  const getUrgenciaColor = (urgencia) => {
    switch(urgencia) {
      case 'alta': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200';
      case 'media': return isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'baja': return isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'listo': return isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
      case 'en-preparacion': return isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      case 'pendiente': return isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700';
      case 'esperando': return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const getTipoIcon = (tipo) => {
    switch(tipo) {
      case 'Audiencia': return CalendarIcon;
      case 'Plazo Procesal': return Clock;
      case 'Sentencia': return Scale;
      default: return CalendarIcon;
    }
  };

  const getDiasColor = (dias) => {
    if (dias <= 3) return isDark ? 'text-red-400' : 'text-red-600';
    if (dias <= 7) return isDark ? 'text-amber-400' : 'text-amber-600';
    return isDark ? 'text-blue-400' : 'text-blue-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
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

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3">
          <select 
            value={filterUrgencia}
            onChange={(e) => setFilterUrgencia(e.target.value)}
            className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
              isDark 
                ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
            }`}
          >
            <option value="todos">Todas las urgencias</option>
            <option value="alta">Alta urgencia</option>
            <option value="media">Media urgencia</option>
            <option value="baja">Baja urgencia</option>
          </select>
          <div className="flex gap-2">
            {['list', 'calendar'].map(mode => (
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
                {mode === 'list' ? 'Lista' : 'Calendario'}
              </button>
            ))}
          </div>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isDark 
            ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
            : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
        }`}>
          <Plus className="w-5 h-5" />
          Agregar Plazo
        </button>
      </div>

      {/* Plazos List */}
      <div className="grid gap-4">
        {plazos.map((plazo, idx) => {
          const TipoIcon = getTipoIcon(plazo.tipo);
          
          return (
            <motion.div
              key={plazo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-5 rounded-lg border-l-4 ${
                plazo.urgencia === 'alta' 
                  ? isDark ? 'border-red-500 bg-ale-petrol' : 'border-red-500 bg-red-50/50'
                  : plazo.urgencia === 'media'
                    ? isDark ? 'border-amber-500 bg-ale-petrol' : 'border-amber-500 bg-amber-50/50'
                    : isDark ? 'border-blue-500 bg-ale-petrol' : 'border-blue-500 bg-blue-50/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    plazo.urgencia === 'alta' 
                      ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                      : plazo.urgencia === 'media'
                        ? isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                        : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <TipoIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {plazo.titulo}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getUrgenciaColor(plazo.urgencia)}`}>
                        {plazo.urgencia.charAt(0).toUpperCase() + plazo.urgencia.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(plazo.status)}`}>
                        {plazo.status.replace('-', ' ').charAt(0).toUpperCase() + plazo.status.slice(1)}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      {plazo.caso}
                    </p>

                    <div className="grid md:grid-cols-4 gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                        <div>
                          <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Fecha</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                            {new Date(plazo.fecha).toLocaleDateString('es-MX')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                        <div>
                          <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Hora</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                            {plazo.hora}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                        <div>
                          <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Abogado</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                            {plazo.abogado}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className={`w-4 h-4 ${getDiasColor(plazo.diasRestantes)}`} />
                        <div>
                          <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Faltan</p>
                          <p className={`text-sm font-bold ${getDiasColor(plazo.diasRestantes)}`}>
                            {plazo.diasRestantes} días
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className={`w-4 h-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                      <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        {plazo.ubicacion}
                      </span>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-white'}`}>
                      <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                        Preparación
                      </p>
                      <ul className="space-y-1">
                        {plazo.preparacion.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            <span className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border-l-4 ${
          isDark ? 'bg-ale-neon/10 border-ale-neon' : 'bg-ale-accent-cyan/10 border-ale-accent-cyan'
        }`}
      >
        <div className="flex items-center gap-3">
          <Bell className={`w-6 h-6 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
          <div>
            <p className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
              Recordatorio Automático Activo
            </p>
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
              Recibirás alertas 7 días, 3 días y 1 día antes de cada plazo
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AgendaPlazos;