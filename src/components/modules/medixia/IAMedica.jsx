import React, { useState, Suspense } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Activity, AlertCircle, TrendingUp, Search,
  Microscope, Zap, Target, Eye, RotateCcw, ZoomIn,
  ZoomOut, Maximize2, Play, Pause, Volume2, FileText,
  Download, Share2, Sparkles, Layers, Box, Move3d
} from 'lucide-react';

// Placeholder 3D Viewer Component
// TODO: Implement with @react-three/fiber once libraries installed
const AnatomicalViewer3D = ({ selectedModel, isRotating }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full h-[500px] rounded-lg overflow-hidden ${
      isDark ? 'bg-ale-black border border-ale-glass/30' : 'bg-ale-pearl border border-ale-silver'
    }`}>
      {/* Placeholder for 3D Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Box className={`w-20 h-20 mx-auto ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'} animate-pulse`} />
          <div>
            <p className={`text-lg font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
              Visor 3D: {selectedModel}
            </p>
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
              Modelo anatómico interactivo
            </p>
          </div>
        </div>
      </div>

      {/* 3D Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <button className={`p-3 rounded-lg backdrop-blur-lg ${
          isDark ? 'bg-ale-petrol/80 text-ale-white hover:bg-ale-petrol' : 'bg-white/80 text-ale-charcoal hover:bg-white'
        } shadow-lg transition-all`}>
          {isRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button className={`p-3 rounded-lg backdrop-blur-lg ${
          isDark ? 'bg-ale-petrol/80 text-ale-white hover:bg-ale-petrol' : 'bg-white/80 text-ale-charcoal hover:bg-white'
        } shadow-lg transition-all`}>
          <RotateCcw className="w-5 h-5" />
        </button>
        <button className={`p-3 rounded-lg backdrop-blur-lg ${
          isDark ? 'bg-ale-petrol/80 text-ale-white hover:bg-ale-petrol' : 'bg-white/80 text-ale-charcoal hover:bg-white'
        } shadow-lg transition-all`}>
          <ZoomIn className="w-5 h-5" />
        </button>
        <button className={`p-3 rounded-lg backdrop-blur-lg ${
          isDark ? 'bg-ale-petrol/80 text-ale-white hover:bg-ale-petrol' : 'bg-white/80 text-ale-charcoal hover:bg-white'
        } shadow-lg transition-all`}>
          <ZoomOut className="w-5 h-5" />
        </button>
        <button className={`p-3 rounded-lg backdrop-blur-lg ${
          isDark ? 'bg-ale-petrol/80 text-ale-white hover:bg-ale-petrol' : 'bg-white/80 text-ale-charcoal hover:bg-white'
        } shadow-lg transition-all`}>
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Layer Toggle */}
      <div className="absolute top-4 right-4">
        <button className={`p-3 rounded-lg backdrop-blur-lg ${
          isDark ? 'bg-ale-petrol/80 text-ale-neon hover:bg-ale-petrol' : 'bg-white/80 text-ale-accent-cyan hover:bg-white'
        } shadow-lg transition-all`}>
          <Layers className="w-5 h-5" />
        </button>
      </div>

      {/* Model Info */}
      <div className={`absolute top-4 left-4 px-4 py-2 rounded-lg backdrop-blur-lg ${
        isDark ? 'bg-ale-petrol/80 text-ale-white' : 'bg-white/80 text-ale-charcoal'
      } shadow-lg`}>
        <div className="flex items-center gap-2">
          <Move3d className="w-4 h-4" />
          <span className="text-sm font-medium">Modo Interactivo</span>
        </div>
      </div>
    </div>
  );
};

const IAMedica = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedModel, setSelectedModel] = useState('Columna Lumbar');
  const [isRotating, setIsRotating] = useState(true);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);

  const anatomicalModels = [
    { id: 1, name: 'Columna Lumbar', category: 'Esqueleto', icon: '🦴', complexity: 'media' },
    { id: 2, name: 'Rodilla', category: 'Articulaciones', icon: '🦵', complexity: 'alta' },
    { id: 3, name: 'Cráneo', category: 'Esqueleto', icon: '💀', complexity: 'alta' },
    { id: 4, name: 'Corazón', category: 'Órganos', icon: '❤️', complexity: 'alta' },
    { id: 5, name: 'Pulmones', category: 'Órganos', icon: '🫁', complexity: 'media' },
    { id: 6, name: 'Hígado', category: 'Órganos', icon: '🩸', complexity: 'media' },
    { id: 7, name: 'Cerebro', category: 'Sistema Nervioso', icon: '🧠', complexity: 'alta' },
    { id: 8, name: 'Columna Cervical', category: 'Esqueleto', icon: '🦴', complexity: 'media' },
    { id: 9, name: 'Hombro', category: 'Articulaciones', icon: '💪', complexity: 'media' },
    { id: 10, name: 'Tórax Completo', category: 'Sistema', icon: '🫀', complexity: 'alta' }
  ];

  const aiDiagnostics = [
    {
      id: 1,
      patient: 'María González',
      symptoms: ['Dolor lumbar', 'Rigidez matutina', 'Hormigueo pierna derecha'],
      aiSuggestions: [
        { condition: 'Hernia discal L4-L5', probability: 78, severity: 'moderada' },
        { condition: 'Estenosis espinal', probability: 45, severity: 'leve' },
        { condition: 'Espondilosis', probability: 32, severity: 'leve' }
      ],
      recommendedModel: 'Columna Lumbar',
      recommendedTests: ['RMN Lumbar', 'Radiografía AP y lateral', 'EMG'],
      urgency: 'media'
    },
    {
      id: 2,
      patient: 'Carlos Hernández',
      symptoms: ['Dolor torácico', 'Disnea', 'Palpitaciones'],
      aiSuggestions: [
        { condition: 'Arritmia cardíaca', probability: 65, severity: 'moderada' },
        { condition: 'Angina de pecho', probability: 52, severity: 'alta' },
        { condition: 'Ansiedad', probability: 38, severity: 'leve' }
      ],
      recommendedModel: 'Corazón',
      recommendedTests: ['ECG', 'Ecocardiograma', 'Holter 24h'],
      urgency: 'alta'
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      symptoms: ['Dolor rodilla', 'Inflamación', 'Limitación movimiento'],
      aiSuggestions: [
        { condition: 'Gonartrosis', probability: 82, severity: 'moderada' },
        { condition: 'Condromalacia rotuliana', probability: 58, severity: 'leve' },
        { condition: 'Lesión meniscal', probability: 41, severity: 'moderada' }
      ],
      recommendedModel: 'Rodilla',
      recommendedTests: ['RMN Rodilla', 'Radiografía', 'Artroscopia'],
      urgency: 'media'
    }
  ];

  const stats = [
    { label: 'Análisis IA Hoy', value: '24', change: '+8', icon: Brain, color: 'purple' },
    { label: 'Precisión Promedio', value: '94%', change: '+2%', icon: Target, color: 'emerald' },
    { label: 'Modelos Consultados', value: '12', change: '+5', icon: Box, color: 'blue' },
    { label: 'Estudios Recomendados', value: '18', change: '+6', icon: FileText, color: 'amber' }
  ];

  const getStatColor = (color) => {
    const colors = {
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      amber: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
    };
    return colors[color] || colors.blue;
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'alta': return isDark ? 'text-red-400 bg-red-500/20' : 'text-red-700 bg-red-50';
      case 'moderada': return isDark ? 'text-amber-400 bg-amber-500/20' : 'text-amber-700 bg-amber-50';
      case 'leve': return isDark ? 'text-emerald-400 bg-emerald-500/20' : 'text-emerald-700 bg-emerald-50';
      default: return isDark ? 'text-gray-400 bg-gray-500/20' : 'text-gray-700 bg-gray-50';
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch(urgency) {
      case 'alta': return { text: 'Urgente', color: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200' };
      case 'media': return { text: 'Moderada', color: isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200' };
      default: return { text: 'Baja', color: isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 3D Viewer Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-ale-neon/20 text-ale-neon' : 'bg-ale-accent-cyan/20 text-ale-accent-cyan'}`}>
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    Visor Anatómico 3D
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Modelos educativos interactivos
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIExplanation(!showAIExplanation)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isDark 
                    ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                    : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                L.U.C.I. Explica
              </button>
            </div>

            <AnatomicalViewer3D selectedModel={selectedModel} isRotating={isRotating} />

            <AnimatePresence>
              {showAIExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 p-4 rounded-lg border-l-4 ${
                    isDark ? 'bg-ale-neon/10 border-ale-neon' : 'bg-ale-accent-cyan/10 border-ale-accent-cyan'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className={`w-5 h-5 mt-0.5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                    <div>
                      <p className={`font-semibold mb-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        L.U.C.I. - Explicación: {selectedModel}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        {selectedModel === 'Columna Lumbar' && 
                          'La columna lumbar está compuesta por 5 vértebras (L1-L5) que soportan la mayor parte del peso corporal. Los discos intervertebrales actúan como amortiguadores. Las hernias discales ocurren cuando el núcleo pulposo se desplaza, comprimiendo las raíces nerviosas.'
                        }
                        {selectedModel === 'Corazón' && 
                          'El corazón es un órgano muscular que bombea sangre por todo el cuerpo. Tiene 4 cavidades: aurículas (superiores) y ventrículos (inferiores). Las válvulas regulan el flujo sanguíneo unidireccional.'
                        }
                        {selectedModel === 'Rodilla' && 
                          'La articulación de la rodilla une el fémur, la tibia y la rótula. Los meniscos actúan como amortiguadores entre los huesos. Los ligamentos cruzados (ACL/PCL) proporcionan estabilidad rotacional.'
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Model Selector */}
        <div className="space-y-4">
          <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
              <Layers className="w-5 h-5" />
              Modelos Disponibles
            </h3>
            <div className="space-y-2 max-h-[560px] overflow-y-auto">
              {anatomicalModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.name)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedModel === model.name
                      ? isDark 
                        ? 'bg-ale-neon/20 border border-ale-neon'
                        : 'bg-ale-accent-cyan/20 border border-ale-accent-cyan'
                      : isDark
                        ? 'bg-ale-black/40 hover:bg-ale-black/60'
                        : 'bg-ale-pearl hover:bg-ale-silver'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{model.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {model.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        {model.category}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      model.complexity === 'alta' 
                        ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                        : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {model.complexity}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Diagnostics */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                Análisis con IA
              </h2>
              <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                Sugerencias diagnósticas basadas en síntomas
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {aiDiagnostics.map((diagnostic, idx) => {
            const urgencyBadge = getUrgencyBadge(diagnostic.urgency);
            
            return (
              <motion.div
                key={diagnostic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-5 rounded-lg border ${
                  isDark ? 'bg-ale-black/40 border-ale-glass/30' : 'bg-ale-pearl border-ale-silver'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {diagnostic.patient}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${urgencyBadge.color}`}>
                        {urgencyBadge.text}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {diagnostic.symptoms.map((symptom, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-ale-petrol text-ale-glass' : 'bg-white text-ale-slate border border-ale-silver'
                        }`}>
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedModel(diagnostic.recommendedModel)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isDark 
                        ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20'
                        : 'bg-ale-accent-cyan/20 text-ale-accent-cyan hover:bg-ale-accent-cyan/30'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    Ver Modelo 3D
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <p className={`text-sm font-semibold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                    Sugerencias Diagnósticas (IA)
                  </p>
                  {diagnostic.aiSuggestions.map((suggestion, i) => (
                    <div key={i} className={`p-3 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {suggestion.condition}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(suggestion.severity)}`}>
                          {suggestion.severity.charAt(0).toUpperCase() + suggestion.severity.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${suggestion.probability}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 + i * 0.1 }}
                            className={`h-full ${
                              suggestion.probability > 70 ? 'bg-red-500' :
                              suggestion.probability > 50 ? 'bg-amber-500' :
                              'bg-blue-500'
                            }`}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {suggestion.probability}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    Estudios Recomendados
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {diagnostic.recommendedTests.map((test, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                        isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {test}
                      </span>
                    ))}
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

export default IAMedica;