import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Briefcase, Search, Filter, Plus, Eye, Edit2, Trash2,
  FileText, Calendar, User, MapPin, AlertCircle, CheckCircle2,
  Clock, TrendingUp, Scale, Gavel, Building2, Phone, Mail,
  Download, Share2, Archive, Tag, ChevronRight, Star
} from 'lucide-react';

const CasosExpedientes = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedCaso, setSelectedCaso] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const casos = [
    {
      id: 1,
      numero: 'CV-2024-001',
      titulo: 'Juicio Ordinario Mercantil',
      cliente: 'Constructora del Valle S.A. de C.V.',
      contraparte: 'Inmobiliaria Moderna S.A.',
      tipo: 'Civil',
      especialidad: 'Mercantil',
      juzgado: '5° Juzgado Civil - CDMX',
      etapa: 'Ofrecimiento de Pruebas',
      status: 'activo',
      prioridad: 'alta',
      monto: '$2,500,000.00',
      fechaInicio: '2024-01-15',
      proximoEvento: 'Audiencia Desahogo - 2024-12-05',
      abogado: 'Lic. Roberto Martínez',
      documentos: 45,
      tags: ['Incumplimiento Contrato', 'Mercantil', 'Urgente'],
      descripcion: 'Demanda por incumplimiento de contrato de compraventa de inmueble. Se reclama pago de cantidad líquida y exigible derivada de cláusula penal.'
    },
    {
      id: 2,
      numero: 'LB-2024-023',
      titulo: 'Juicio Laboral - Despido Injustificado',
      cliente: 'Juan Carlos Rodríguez López',
      contraparte: 'Industrias Mexicanas S.A.',
      tipo: 'Laboral',
      especialidad: 'Individual',
      juzgado: 'Junta Local de Conciliación y Arbitraje',
      etapa: 'Conciliación',
      status: 'activo',
      prioridad: 'media',
      monto: '$450,000.00',
      fechaInicio: '2024-03-20',
      proximoEvento: 'Audiencia Conciliación - 2024-12-02',
      abogado: 'Lic. María Fernández',
      documentos: 28,
      tags: ['Despido', 'Laboral', 'Reinstalación'],
      descripcion: 'Demanda de reinstalación y pago de salarios caídos por despido injustificado. Se reclama antigüedad de 8 años.'
    },
    {
      id: 3,
      numero: 'AMP-2024-007',
      titulo: 'Juicio de Amparo Indirecto',
      cliente: 'Grupo Empresarial del Norte',
      contraparte: 'Secretaría de Hacienda',
      tipo: 'Amparo',
      especialidad: 'Fiscal',
      juzgado: '12° Juzgado de Distrito',
      etapa: 'Resolución Pendiente',
      status: 'activo',
      prioridad: 'alta',
      monto: '$8,000,000.00',
      fechaInicio: '2024-02-10',
      proximoEvento: 'Sentencia Estimada - 2024-12-10',
      abogado: 'Lic. Patricia Silva',
      documentos: 67,
      tags: ['Amparo', 'Fiscal', 'SHCP'],
      descripcion: 'Amparo contra resolución administrativa que determina crédito fiscal. Se alegan vicios en el procedimiento de fiscalización.'
    },
    {
      id: 4,
      numero: 'FM-2024-012',
      titulo: 'Divorcio Incausado',
      cliente: 'Ana Laura Méndez',
      contraparte: 'Carlos Alberto Sánchez',
      tipo: 'Familiar',
      especialidad: 'Divorcio',
      juzgado: '3° Juzgado Familiar - Monterrey',
      etapa: 'Convenio',
      status: 'activo',
      prioridad: 'baja',
      monto: 'N/A',
      fechaInicio: '2024-04-05',
      proximoEvento: 'Firma de Convenio - 2024-11-30',
      abogado: 'Lic. Sofía Ramírez',
      documentos: 18,
      tags: ['Divorcio', 'Familiar', 'Convenio'],
      descripcion: 'Divorcio incausado por mutuo consentimiento. Liquidación de sociedad conyugal y custodia compartida de menores.'
    },
    {
      id: 5,
      numero: 'PN-2024-018',
      titulo: 'Proceso Penal - Fraude',
      cliente: 'Inversiones Seguras S.C.',
      contraparte: 'Varios',
      tipo: 'Penal',
      especialidad: 'Delitos Patrimoniales',
      juzgado: 'Juzgado de Control - Sistema Acusatorio',
      etapa: 'Investigación Complementaria',
      status: 'activo',
      prioridad: 'alta',
      monto: '$3,200,000.00',
      fechaInicio: '2024-01-28',
      proximoEvento: 'Audiencia Intermedia - 2024-12-08',
      abogado: 'Lic. Jorge Hernández',
      documentos: 92,
      tags: ['Penal', 'Fraude', 'Patrimonial'],
      descripcion: 'Denuncia por fraude específico y peculado. Se investiga desvío de recursos de inversión inmobiliaria.'
    },
    {
      id: 6,
      numero: 'AD-2024-005',
      titulo: 'Juicio Contencioso Administrativo',
      cliente: 'Transportes del Bajío S.A.',
      contraparte: 'SCT - Secretaría de Comunicaciones',
      tipo: 'Administrativo',
      especialidad: 'Regulatorio',
      juzgado: 'Tribunal Federal de Justicia Administrativa',
      etapa: 'Demanda Admitida',
      status: 'archivado',
      prioridad: 'baja',
      monto: '$1,200,000.00',
      fechaInicio: '2023-11-10',
      proximoEvento: 'Concluido',
      abogado: 'Lic. Roberto Martínez',
      documentos: 34,
      tags: ['Administrativo', 'SCT', 'Concluido'],
      descripcion: 'Impugnación de multa por incumplimiento normativo. Caso resuelto favorablemente en primera instancia.'
    }
  ];

  const stats = [
    { label: 'Casos Activos', value: '23', change: '+3', icon: Briefcase, color: 'blue' },
    { label: 'Audiencias Esta Semana', value: '8', change: '+2', icon: Calendar, color: 'purple' },
    { label: 'Alta Prioridad', value: '5', change: '0', icon: AlertCircle, color: 'red' },
    { label: 'Monto en Litigio', value: '$42.5M', change: '+8%', icon: TrendingUp, color: 'emerald' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      red: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'activo': return isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'archivado': return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
      case 'suspendido': return isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700';
      case 'media': return isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700';
      case 'baja': return isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const getTipoColor = (tipo) => {
    const tipos = {
      'Civil': isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      'Laboral': isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      'Amparo': isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      'Familiar': isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-700',
      'Penal': isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      'Administrativo': isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
    };
    return tipos[tipo] || (isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700');
  };

  const filteredCasos = casos.filter(caso => {
    const matchesSearch = caso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caso.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || caso.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{stat.label}</p>
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') 
                    ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                    : isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-ale-glass' : 'text-ale-slate'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por caso, cliente o número..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none ${
                isDark 
                  ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                  : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
              }`}
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
              isDark 
                ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
            }`}
          >
            <option value="todos">Todos los casos</option>
            <option value="activo">Activos</option>
            <option value="archivado">Archivados</option>
            <option value="suspendido">Suspendidos</option>
          </select>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isDark 
            ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
            : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
        }`}>
          <Plus className="w-5 h-5" />
          Nuevo Caso
        </button>
      </div>

      {/* Casos List */}
      <div className="grid gap-4">
        {filteredCasos.map((caso, idx) => (
          <motion.div
            key={caso.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedCaso(selectedCaso?.id === caso.id ? null : caso)}
            className={`p-5 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
              selectedCaso?.id === caso.id
                ? isDark 
                  ? 'bg-ale-petrol border-ale-neon'
                  : 'bg-ale-pearl border-ale-accent-cyan'
                : isDark 
                  ? 'bg-ale-petrol/50 border-ale-glass/30 hover:border-ale-glass'
                  : 'bg-white border-ale-silver hover:border-ale-accent-cyan/50 shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-mono px-2 py-1 rounded ${
                    isDark ? 'bg-ale-black/40 text-ale-neon' : 'bg-ale-silver text-ale-charcoal'
                  }`}>
                    {caso.numero}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(caso.status)}`}>
                    {caso.status.charAt(0).toUpperCase() + caso.status.slice(1)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPrioridadColor(caso.prioridad)}`}>
                    {caso.prioridad.charAt(0).toUpperCase() + caso.prioridad.slice(1)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTipoColor(caso.tipo)}`}>
                    {caso.tipo}
                  </span>
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {caso.titulo}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                  {caso.descripcion}
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${
                selectedCaso?.id === caso.id ? 'rotate-90' : ''
              } ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
            </div>

            <div className="grid md:grid-cols-4 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <User className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <div>
                  <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Cliente</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {caso.cliente}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <div>
                  <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Juzgado</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {caso.juzgado}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Scale className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <div>
                  <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Etapa</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {caso.etapa}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <div>
                  <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Documentos</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {caso.documentos}
                  </p>
                </div>
              </div>
            </div>

            {selectedCaso?.id === caso.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-4 pt-4 border-t ${isDark ? 'border-ale-glass/30' : 'border-ale-silver'}`}
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                      Información Adicional
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Contraparte:</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {caso.contraparte}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Monto:</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {caso.monto}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Abogado:</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {caso.abogado}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                      Fechas Importantes
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Inicio:</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {new Date(caso.fechaInicio).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Próximo evento:</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {caso.proximoEvento}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                    Etiquetas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caso.tags.map((tag, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                        isDark ? 'bg-ale-black/40 text-ale-glass' : 'bg-ale-pearl text-ale-slate'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                      : 'bg-ale-accent-cyan/20 text-ale-accent-cyan hover:bg-ale-accent-cyan/30'
                  }`}>
                    <Eye className="w-4 h-4" />
                    Ver Expediente
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Edit2 className="w-4 h-4" />
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
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CasosExpedientes;