import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  FileText, Search, Plus, Download, Eye, Edit2, Copy,
  Sparkles, Brain, AlertTriangle, CheckCircle2, Clock,
  Tag, Star, Trash2, Share2, FileCheck, FileX, Filter
} from 'lucide-react';

const DocumentosPlantillas = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState('plantillas'); // plantillas, generados
  const [selectedCategoria, setSelectedCategoria] = useState('todos');

  const plantillas = [
    {
      id: 1,
      nombre: 'Contrato de Compraventa',
      categoria: 'Civil',
      subcategoria: 'Contratos',
      descripcion: 'Contrato de compraventa de bien inmueble con cláusulas estándar',
      usos: 127,
      ultimoUso: '2024-11-25',
      variables: ['Vendedor', 'Comprador', 'Bien', 'Precio', 'Condiciones'],
      tags: ['Compraventa', 'Inmueble', 'Civil'],
      starred: true
    },
    {
      id: 2,
      nombre: 'Demanda Ordinaria Mercantil',
      categoria: 'Mercantil',
      subcategoria: 'Demandas',
      descripcion: 'Demanda de juicio ordinario mercantil por incumplimiento de contrato',
      usos: 89,
      ultimoUso: '2024-11-20',
      variables: ['Actor', 'Demandado', 'Prestaciones', 'Hechos', 'Fundamentos'],
      tags: ['Demanda', 'Mercantil', 'Ordinario'],
      starred: true
    },
    {
      id: 3,
      nombre: 'Contestación de Demanda',
      categoria: 'Procesal',
      subcategoria: 'Contestaciones',
      descripcion: 'Contestación genérica con excepciones y defensas',
      usos: 156,
      ultimoUso: '2024-11-22',
      variables: ['Demandado', 'Actor', 'Excepciones', 'Defensas', 'Pruebas'],
      tags: ['Contestación', 'Defensas', 'Procesal'],
      starred: false
    },
    {
      id: 4,
      nombre: 'Amparo Indirecto',
      categoria: 'Amparo',
      subcategoria: 'Recursos',
      descripcion: 'Demanda de amparo indirecto contra actos de autoridad',
      usos: 64,
      ultimoUso: '2024-11-18',
      variables: ['Quejoso', 'Autoridad', 'Acto Reclamado', 'Garantías', 'Conceptos'],
      tags: ['Amparo', 'Indirecto', 'Constitucional'],
      starred: true
    },
    {
      id: 5,
      nombre: 'Convenio Divorcio',
      categoria: 'Familiar',
      subcategoria: 'Convenios',
      descripcion: 'Convenio de divorcio incausado con liquidación de sociedad conyugal',
      usos: 98,
      ultimoUso: '2024-11-23',
      variables: ['Cónyuge1', 'Cónyuge2', 'Bienes', 'Custodia', 'Pensión'],
      tags: ['Divorcio', 'Familiar', 'Convenio'],
      starred: false
    },
    {
      id: 6,
      nombre: 'Recurso de Revocación Fiscal',
      categoria: 'Fiscal',
      subcategoria: 'Recursos',
      descripción: 'Recurso de revocación contra resoluciones del SAT',
      usos: 73,
      ultimoUso: '2024-11-19',
      variables: ['Contribuyente', 'Resolución', 'Agravios', 'Fundamentos', 'Pruebas'],
      tags: ['Fiscal', 'SAT', 'Revocación'],
      starred: false
    }
  ];

  const documentosGenerados = [
    {
      id: 1,
      nombre: 'Demanda Mercantil - Constructora del Valle',
      plantilla: 'Demanda Ordinaria Mercantil',
      cliente: 'Constructora del Valle S.A.',
      fechaGeneracion: '2024-11-25',
      generadoPor: 'IA - L.U.C.I.',
      status: 'revisado',
      aiScore: 95,
      aiWarnings: 0,
      aiSuggestions: 2
    },
    {
      id: 2,
      nombre: 'Contestación Laboral - Industrias Mexicanas',
      plantilla: 'Contestación de Demanda',
      cliente: 'Industrias Mexicanas S.A.',
      fechaGeneracion: '2024-11-22',
      generadoPor: 'IA - L.U.C.I.',
      status: 'pendiente',
      aiScore: 88,
      aiWarnings: 1,
      aiSuggestions: 5
    },
    {
      id: 3,
      nombre: 'Amparo Fiscal - Grupo Empresarial',
      plantilla: 'Amparo Indirecto',
      cliente: 'Grupo Empresarial del Norte',
      fechaGeneracion: '2024-11-20',
      generadoPor: 'IA - L.U.C.I.',
      status: 'aprobado',
      aiScore: 97,
      aiWarnings: 0,
      aiSuggestions: 1
    }
  ];

  const stats = [
    { label: 'Plantillas', value: '47', icon: FileText, color: 'blue' },
    { label: 'Docs Generados', value: '156', icon: Sparkles, color: 'purple' },
    { label: 'Precisión IA', value: '94%', icon: Brain, color: 'emerald' },
    { label: 'Ahorrados (hrs)', value: '234', icon: Clock, color: 'amber' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      amber: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'aprobado': return isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
      case 'revisado': return isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      case 'pendiente': return isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700';
      default: return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoriaColor = (categoria) => {
    const categorias = {
      'Civil': isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      'Mercantil': isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      'Procesal': isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      'Amparo': isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      'Familiar': isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-700',
      'Fiscal': isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
    };
    return categorias[categoria] || (isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700');
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
        {['plantillas', 'generados'].map(tab => (
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
            {tab === 'plantillas' ? 'Biblioteca de Plantillas' : 'Documentos Generados por IA'}
          </button>
        ))}
      </div>

      {/* Plantillas View */}
      {activeTab === 'plantillas' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-ale-glass' : 'text-ale-slate'
                }`} />
                <input
                  type="text"
                  placeholder="Buscar plantillas..."
                  className={`pl-10 pr-4 py-2 rounded-lg outline-none ${
                    isDark 
                      ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                      : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
                  }`}
                />
              </div>
              <select 
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
                className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                    : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
                }`}
              >
                <option value="todos">Todas las categorías</option>
                <option value="civil">Civil</option>
                <option value="mercantil">Mercantil</option>
                <option value="familiar">Familiar</option>
                <option value="fiscal">Fiscal</option>
                <option value="amparo">Amparo</option>
              </select>
            </div>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark 
                ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
            }`}>
              <Plus className="w-5 h-5" />
              Nueva Plantilla
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantillas.map((plantilla, idx) => (
              <motion.div
                key={plantilla.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 rounded-lg border transition-all hover:shadow-lg ${
                  isDark ? 'bg-ale-petrol border-ale-glass/30 hover:border-ale-neon/50' : 'bg-white border-ale-silver hover:border-ale-accent-cyan'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${getCategoriaColor(plantilla.categoria)}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  {plantilla.starred && (
                    <Star className={`w-5 h-5 ${isDark ? 'text-amber-400 fill-amber-400' : 'text-amber-500 fill-amber-500'}`} />
                  )}
                </div>

                <h3 className={`font-bold mb-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {plantilla.nombre}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                  {plantilla.descripcion}
                </p>

                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className={`px-2 py-1 rounded-full ${getCategoriaColor(plantilla.categoria)}`}>
                    {plantilla.categoria}
                  </span>
                  <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                    {plantilla.usos} usos
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {plantilla.tags.slice(0, 3).map((tag, i) => (
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
                    <Sparkles className="w-4 h-4" />
                    Generar con IA
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Generados View */}
      {activeTab === 'generados' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
              Documentos generados automáticamente con revisión de IA
            </p>
          </div>

          <div className="grid gap-4">
            {documentosGenerados.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-5 rounded-lg border ${
                  isDark ? 'bg-ale-petrol border-ale-glass/30' : 'bg-white border-ale-silver shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {doc.nombre}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                        Plantilla: {doc.plantilla}
                      </span>
                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                        Cliente: {doc.cliente}
                      </span>
                      <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                        {new Date(doc.fechaGeneracion).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={`p-2 rounded-lg transition-all ${
                      isDark ? 'hover:bg-ale-neon/20 text-ale-neon' : 'hover:bg-ale-accent-cyan/20 text-ale-accent-cyan'
                    }`}>
                      <Download className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${
                      isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                    }`}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain className={`w-5 h-5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                      <span className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        Análisis de IA - L.U.C.I.
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${
                          doc.aiScore >= 90 
                            ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                            : doc.aiScore >= 80
                              ? isDark ? 'text-blue-400' : 'text-blue-600'
                              : isDark ? 'text-amber-400' : 'text-amber-600'
                        }`}>
                          {doc.aiScore}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>/ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className={`p-3 rounded-lg ${
                      doc.aiWarnings === 0
                        ? isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
                        : isDark ? 'bg-amber-500/10' : 'bg-amber-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {doc.aiWarnings === 0 ? (
                          <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        ) : (
                          <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                        )}
                        <span className={`text-sm font-semibold ${
                          doc.aiWarnings === 0
                            ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                            : isDark ? 'text-amber-400' : 'text-amber-700'
                        }`}>
                          {doc.aiWarnings} Advertencias
                        </span>
                      </div>
                      <p className={`text-xs ${
                        doc.aiWarnings === 0
                          ? isDark ? 'text-emerald-300' : 'text-emerald-600'
                          : isDark ? 'text-amber-300' : 'text-amber-600'
                      }`}>
                        {doc.aiWarnings === 0 ? 'Sin errores detectados' : 'Revisar puntos señalados'}
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                          {doc.aiSuggestions} Sugerencias
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                        Mejoras opcionales disponibles
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FileCheck className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                        <span className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                          Validado
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                        Estructura y formato correctos
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentosPlantillas;