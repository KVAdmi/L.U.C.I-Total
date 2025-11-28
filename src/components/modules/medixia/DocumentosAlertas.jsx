import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  FileText, Upload, Download, Eye, Trash2, Share2, 
  Search, Filter, Bell, AlertTriangle, AlertCircle,
  CheckCircle2, Clock, Calendar, Pill, User, FileType,
  X, Plus, Edit2, Folder, Tag, Star
} from 'lucide-react';

const DocumentosAlertas = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState('documentos'); // documentos, alertas
  const [filterType, setFilterType] = useState('todos');

  const documentos = [
    {
      id: 1,
      name: 'Estudio RMN - María González',
      type: 'Imagen',
      category: 'Radiología',
      patient: 'María González',
      date: '2024-01-15',
      size: '15.2 MB',
      tags: ['RMN', 'Columna Lumbar', 'Urgente'],
      starred: true
    },
    {
      id: 2,
      name: 'Análisis de Sangre - Carlos Hernández',
      type: 'Laboratorio',
      category: 'Análisis Clínicos',
      patient: 'Carlos Hernández',
      date: '2024-01-14',
      size: '234 KB',
      tags: ['Hemograma', 'Perfil Lipídico'],
      starred: false
    },
    {
      id: 3,
      name: 'Historial Clínico - Ana Martínez',
      type: 'Expediente',
      category: 'Historia Clínica',
      patient: 'Ana Martínez',
      date: '2024-01-13',
      size: '2.8 MB',
      tags: ['Reumatología', 'Crónico'],
      starred: true
    },
    {
      id: 4,
      name: 'ECG - Pedro Ramírez',
      type: 'Estudio',
      category: 'Cardiología',
      patient: 'Pedro Ramírez',
      date: '2024-01-12',
      size: '1.1 MB',
      tags: ['ECG', 'Control'],
      starred: false
    },
    {
      id: 5,
      name: 'Receta Digital - Laura Jiménez',
      type: 'Receta',
      category: 'Prescripciones',
      patient: 'Laura Jiménez',
      date: '2024-01-11',
      size: '156 KB',
      tags: ['Postoperatorio', 'Antibióticos'],
      starred: false
    },
    {
      id: 6,
      name: 'Consentimiento Quirúrgico - Roberto Silva',
      type: 'Legal',
      category: 'Documentos Legales',
      patient: 'Roberto Silva',
      date: '2024-01-10',
      size: '892 KB',
      tags: ['Cirugía', 'Firmado'],
      starred: false
    }
  ];

  const alertas = [
    {
      id: 1,
      type: 'medicacion',
      priority: 'alta',
      title: 'Medicación por Vencer',
      message: 'La receta de Metotrexato para Ana Martínez vence en 3 días',
      patient: 'Ana Martínez',
      date: '2024-01-15',
      time: '10:30',
      status: 'pendiente',
      actions: ['Renovar receta', 'Agendar cita']
    },
    {
      id: 2,
      type: 'cita',
      priority: 'media',
      title: 'Cita de Control Pendiente',
      message: 'María González requiere control postquirúrgico en 2 días',
      patient: 'María González',
      date: '2024-01-15',
      time: '09:15',
      status: 'pendiente',
      actions: ['Confirmar cita', 'Reagendar']
    },
    {
      id: 3,
      type: 'resultado',
      priority: 'alta',
      title: 'Resultados Críticos',
      message: 'Análisis de sangre de Carlos Hernández muestra valores anormales de colesterol',
      patient: 'Carlos Hernández',
      date: '2024-01-14',
      time: '16:45',
      status: 'pendiente',
      actions: ['Ver resultados', 'Notificar paciente']
    },
    {
      id: 4,
      type: 'seguimiento',
      priority: 'baja',
      title: 'Seguimiento Programado',
      message: 'Verificar evolución de tratamiento de hipertensión - Pedro Ramírez',
      patient: 'Pedro Ramírez',
      date: '2024-01-14',
      time: '14:20',
      status: 'completado',
      actions: ['Ver detalles']
    },
    {
      id: 5,
      type: 'medicacion',
      priority: 'media',
      title: 'Interacción Medicamentosa',
      message: 'Posible interacción entre Ibuprofeno y Enalapril - Laura Jiménez',
      patient: 'Laura Jiménez',
      date: '2024-01-13',
      time: '11:00',
      status: 'revisado',
      actions: ['Ajustar tratamiento']
    },
    {
      id: 6,
      type: 'documento',
      priority: 'baja',
      title: 'Documento Pendiente de Firma',
      message: 'Consentimiento informado requiere firma digital - Roberto Silva',
      patient: 'Roberto Silva',
      date: '2024-01-12',
      time: '08:30',
      status: 'pendiente',
      actions: ['Firmar documento']
    }
  ];

  const stats = [
    { label: 'Documentos Total', value: '1,247', icon: FileText, color: 'blue' },
    { label: 'Alertas Activas', value: '12', icon: Bell, color: 'red' },
    { label: 'Pendientes Revisar', value: '8', icon: AlertCircle, color: 'amber' },
    { label: 'Resueltas Hoy', value: '24', icon: CheckCircle2, color: 'emerald' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      red: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      amber: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
    };
    return colors[color] || colors.blue;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200';
      case 'media': return isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'baja': return isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pendiente': return isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700';
      case 'revisado': return isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      case 'completado': return isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'medicacion': return Pill;
      case 'cita': return Calendar;
      case 'resultado': return FileText;
      case 'seguimiento': return Clock;
      case 'documento': return FileType;
      default: return Bell;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Radiología': isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      'Análisis Clínicos': isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      'Historia Clínica': isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      'Cardiología': isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      'Prescripciones': isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      'Documentos Legales': isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700'
    };
    return colors[category] || (isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700');
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

      {/* Tabs */}
      <div className="flex gap-2">
        {['documentos', 'alertas'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? isDark 
                  ? 'bg-ale-neon/20 text-ale-neon border border-ale-neon'
                  : 'bg-ale-accent-cyan text-white shadow-sm'
                : isDark
                  ? 'bg-ale-petrol/50 text-ale-glass hover:bg-ale-petrol'
                  : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
            }`}
          >
            {tab === 'documentos' ? 'Documentos' : 'Alertas'}
          </button>
        ))}
      </div>

      {/* Documentos View */}
      {activeTab === 'documentos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-ale-glass' : 'text-ale-slate'
                }`} />
                <input
                  type="text"
                  placeholder="Buscar documentos..."
                  className={`pl-10 pr-4 py-2 rounded-lg outline-none ${
                    isDark 
                      ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                      : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
                  }`}
                />
              </div>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                    : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
                }`}
              >
                <option value="todos">Todos</option>
                <option value="imagen">Imágenes</option>
                <option value="laboratorio">Laboratorio</option>
                <option value="receta">Recetas</option>
                <option value="legal">Legales</option>
              </select>
            </div>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark 
                ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
            }`}>
              <Upload className="w-5 h-5" />
              Subir Documento
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentos.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 rounded-lg border transition-all hover:shadow-lg ${
                  isDark ? 'bg-ale-petrol border-ale-glass/30 hover:border-ale-neon/50' : 'bg-white border-ale-silver hover:border-ale-accent-cyan'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${getCategoryColor(doc.category)}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  {doc.starred && (
                    <Star className={`w-5 h-5 ${isDark ? 'text-amber-400 fill-amber-400' : 'text-amber-500 fill-amber-500'}`} />
                  )}
                </div>

                <h3 className={`font-bold mb-2 line-clamp-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {doc.name}
                </h3>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className={`w-4 h-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                    <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>{doc.patient}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                        {new Date(doc.date).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      {doc.size}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.map((tag, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-ale-black/40 text-ale-glass' : 'bg-ale-pearl text-ale-slate'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDark ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20' : 'bg-ale-accent-cyan/20 text-ale-accent-cyan hover:bg-ale-accent-cyan/30'
                  }`}>
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Download className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Alertas View */}
      {activeTab === 'alertas' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <select className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
              isDark 
                ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
            }`}>
              <option>Todas las alertas</option>
              <option>Alta prioridad</option>
              <option>Pendientes</option>
              <option>Completadas</option>
            </select>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}>
              <Bell className="w-5 h-5" />
              Marcar todas como leídas
            </button>
          </div>

          <div className="grid gap-4">
            {alertas.map((alerta, idx) => {
              const TypeIcon = getTypeIcon(alerta.type);
              
              return (
                <motion.div
                  key={alerta.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-5 rounded-lg border-l-4 ${
                    alerta.priority === 'alta' 
                      ? isDark ? 'border-red-500 bg-ale-petrol' : 'border-red-500 bg-red-50/50'
                      : alerta.priority === 'media'
                        ? isDark ? 'border-amber-500 bg-ale-petrol' : 'border-amber-500 bg-amber-50/50'
                        : isDark ? 'border-emerald-500 bg-ale-petrol' : 'border-emerald-500 bg-emerald-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3 flex-1">
                      <div className={`p-3 rounded-lg ${
                        alerta.priority === 'alta' 
                          ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                          : alerta.priority === 'media'
                            ? isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                            : isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                            {alerta.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(alerta.priority)}`}>
                            {alerta.priority.charAt(0).toUpperCase() + alerta.priority.slice(1)}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                          {alerta.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                            <User className="w-3 h-3" />
                            {alerta.patient}
                          </span>
                          <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                            <Calendar className="w-3 h-3" />
                            {new Date(alerta.date).toLocaleDateString('es-MX')}
                          </span>
                          <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                            <Clock className="w-3 h-3" />
                            {alerta.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alerta.status)}`}>
                      {alerta.status.charAt(0).toUpperCase() + alerta.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                    {alerta.actions.map((action, i) => (
                      <button key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        i === 0
                          ? isDark 
                            ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                            : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal'
                          : isDark
                            ? 'bg-ale-black/40 text-ale-glass hover:bg-ale-black/60'
                            : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
                      }`}>
                        {action}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentosAlertas;