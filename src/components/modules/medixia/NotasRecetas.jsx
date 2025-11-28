import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, Calendar, User,
  Pill, Printer, Mail, Download, Edit2, Trash2,
  Clock, CheckCircle2, AlertCircle, Stethoscope,
  ClipboardList, Save, X, FileSignature
} from 'lucide-react';

const NotasRecetas = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState('notas'); // notas, recetas
  const [showNewNote, setShowNewNote] = useState(false);
  const [showNewRecipe, setShowNewRecipe] = useState(false);

  const notasRecientes = [
    {
      id: 1,
      patient: 'María González',
      date: '2024-01-15',
      time: '09:30',
      type: 'SOAP',
      subjetivo: 'Paciente refiere dolor en rodilla derecha desde hace 3 días. Intensidad 6/10.',
      objetivo: 'Edema moderado en rodilla derecha. Rango de movimiento limitado. Temperatura local normal.',
      evaluacion: 'Probable tendinitis rotuliana. Requiere estudios de imagen.',
      plan: 'Solicitar radiografía. Prescribir AINES. Reposo relativo. Control en 7 días.',
      doctor: 'Dr. Ramírez'
    },
    {
      id: 2,
      patient: 'Carlos Hernández',
      date: '2024-01-15',
      time: '11:00',
      type: 'Control',
      contenido: 'Control postoperatorio apendicectomía. Herida quirúrgica en buen estado, sin signos de infección. Paciente sin dolor significativo. Deambulación adecuada. Se retiran puntos en 7 días.',
      doctor: 'Dr. Sánchez'
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      date: '2024-01-14',
      time: '16:45',
      type: 'Seguimiento',
      contenido: 'Paciente con artritis reumatoide en tratamiento. Refiere mejoría del dolor articular. Rigidez matutina reducida de 2h a 45min. Continuar con esquema actual.',
      doctor: 'Dra. Flores'
    }
  ];

  const recetasRecientes = [
    {
      id: 1,
      patient: 'María González',
      date: '2024-01-15',
      medications: [
        { name: 'Ibuprofeno', dose: '400mg', frequency: 'Cada 8 horas', duration: '7 días' },
        { name: 'Omeprazol', dose: '20mg', frequency: 'Cada 24 horas', duration: '7 días' }
      ],
      diagnosis: 'Tendinitis rotuliana',
      doctor: 'Dr. Ramírez',
      status: 'activa'
    },
    {
      id: 2,
      patient: 'Pedro Ramírez',
      date: '2024-01-14',
      medications: [
        { name: 'Atorvastatina', dose: '20mg', frequency: 'Cada 24 horas (noche)', duration: '30 días' },
        { name: 'Ácido acetilsalicílico', dose: '100mg', frequency: 'Cada 24 horas', duration: '30 días' },
        { name: 'Enalapril', dose: '10mg', frequency: 'Cada 12 horas', duration: '30 días' }
      ],
      diagnosis: 'Hipertensión arterial + Dislipidemia',
      doctor: 'Dr. Mendoza',
      status: 'activa'
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      date: '2024-01-10',
      medications: [
        { name: 'Metotrexato', dose: '15mg', frequency: 'Semanal', duration: 'Continuo' },
        { name: 'Ácido fólico', dose: '5mg', frequency: '24h después del metotrexato', duration: 'Continuo' },
        { name: 'Prednisona', dose: '5mg', frequency: 'Cada 24 horas', duration: '30 días' }
      ],
      diagnosis: 'Artritis reumatoide',
      doctor: 'Dra. Flores',
      status: 'activa'
    }
  ];

  const stats = [
    { label: 'Notas Hoy', value: '12', icon: FileText, color: 'blue' },
    { label: 'Recetas Emitidas', value: '8', icon: Pill, color: 'purple' },
    { label: 'Pendientes Firma', value: '3', icon: FileSignature, color: 'amber' },
    { label: 'Templates Usados', value: '5', icon: ClipboardList, color: 'emerald' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      amber: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
    };
    return colors[color] || colors.blue;
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
        {['notas', 'recetas'].map(tab => (
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
            {tab === 'notas' ? 'Notas Médicas' : 'Recetas'}
          </button>
        ))}
      </div>

      {/* Notas View */}
      {activeTab === 'notas' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-ale-glass' : 'text-ale-slate'
                }`} />
                <input
                  type="text"
                  placeholder="Buscar notas..."
                  className={`pl-10 pr-4 py-2 rounded-lg outline-none ${
                    isDark 
                      ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                      : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
                  }`}
                />
              </div>
              <select className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
                isDark 
                  ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                  : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
              }`}>
                <option>Todas las notas</option>
                <option>SOAP</option>
                <option>Control</option>
                <option>Seguimiento</option>
              </select>
            </div>
            <button 
              onClick={() => setShowNewNote(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isDark 
                  ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                  : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
              }`}
            >
              <Plus className="w-5 h-5" />
              Nueva Nota
            </button>
          </div>

          <div className="grid gap-4">
            {notasRecientes.map((nota, idx) => (
              <motion.div
                key={nota.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-5 rounded-lg ${
                  isDark ? 'bg-ale-petrol hover:bg-ale-petrol/80' : 'bg-white hover:bg-ale-pearl shadow-md'
                } transition-all cursor-pointer`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {nota.patient}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {nota.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <Calendar className="w-4 h-4" />
                        {new Date(nota.date).toLocaleDateString('es-MX')}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <Clock className="w-4 h-4" />
                        {nota.time}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <User className="w-4 h-4" />
                        {nota.doctor}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={`p-2 rounded-lg ${
                      isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                    }`}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg ${
                      isDark ? 'hover:bg-ale-neon/20 text-ale-neon' : 'hover:bg-ale-accent-cyan/20 text-ale-accent-cyan'
                    }`}>
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {nota.type === 'SOAP' ? (
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                      <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                        Subjetivo
                      </p>
                      <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {nota.subjetivo}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                      <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                        Objetivo
                      </p>
                      <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {nota.objetivo}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                          Evaluación
                        </p>
                        <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {nota.evaluacion}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                          Plan
                        </p>
                        <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {nota.plan}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    {nota.contenido}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recetas View */}
      {activeTab === 'recetas' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-ale-glass' : 'text-ale-slate'
                }`} />
                <input
                  type="text"
                  placeholder="Buscar recetas..."
                  className={`pl-10 pr-4 py-2 rounded-lg outline-none ${
                    isDark 
                      ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                      : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
                  }`}
                />
              </div>
              <select className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
                isDark 
                  ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                  : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
              }`}>
                <option>Activas</option>
                <option>Vencidas</option>
                <option>Todas</option>
              </select>
            </div>
            <button 
              onClick={() => setShowNewRecipe(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isDark 
                  ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                  : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
              }`}
            >
              <Plus className="w-5 h-5" />
              Nueva Receta
            </button>
          </div>

          <div className="grid gap-4">
            {recetasRecientes.map((receta, idx) => (
              <motion.div
                key={receta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-5 rounded-lg ${
                  isDark ? 'bg-ale-petrol hover:bg-ale-petrol/80' : 'bg-white hover:bg-ale-pearl shadow-md'
                } transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {receta.patient}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        receta.status === 'activa'
                          ? isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                          : isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {receta.status === 'activa' ? 'Activa' : 'Vencida'}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'} mb-1`}>
                      Diagnóstico: {receta.diagnosis}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <Calendar className="w-4 h-4" />
                        {new Date(receta.date).toLocaleDateString('es-MX')}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <User className="w-4 h-4" />
                        {receta.doctor}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={`p-2 rounded-lg ${
                      isDark ? 'hover:bg-ale-neon/20 text-ale-neon' : 'hover:bg-ale-accent-cyan/20 text-ale-accent-cyan'
                    }`}>
                      <Printer className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg ${
                      isDark ? 'hover:bg-blue-500/20 text-blue-400' : 'hover:bg-blue-50 text-blue-700'
                    }`}>
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg ${
                      isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                    }`}>
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {receta.medications.map((med, i) => (
                    <div key={i} className={`p-3 rounded-lg border-l-4 ${
                      isDark ? 'border-purple-500 bg-ale-black/40' : 'border-purple-400 bg-purple-50/50'
                    }`}>
                      <div className="flex items-start gap-3">
                        <Pill className={`w-5 h-5 mt-0.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                        <div className="flex-1">
                          <p className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                            {med.name} - {med.dose}
                          </p>
                          <div className="flex gap-4 mt-1 text-sm">
                            <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                              {med.frequency}
                            </span>
                            <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>
                              Duración: {med.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotasRecetas;