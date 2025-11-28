import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Calculator, DollarSign, Clock, Scale, TrendingUp,
  FileText, Plus, Minus, Percent, Calendar, User,
  AlertCircle, CheckCircle2, Download, Share2, Save
} from 'lucide-react';

const MinutasDanos = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState('minutas'); // minutas, danos
  
  // Calculadora de Minutas
  const [horasConsulta, setHorasConsulta] = useState(0);
  const [horasInvestigacion, setHorasInvestigacion] = useState(0);
  const [horasAudiencias, setHorasAudiencias] = useState(0);
  const [horasRedaccion, setHorasRedaccion] = useState(0);
  const [tarifaHora, setTarifaHora] = useState(1500);
  const [gastosAdicionales, setGastosAdicionales] = useState(0);
  const [iva, setIva] = useState(16);

  // Calculadora de Daños
  const [tipoDano, setTipoDano] = useState('moral');
  const [montoBase, setMontoBase] = useState(0);
  const [factorMultiplicador, setFactorMultiplicador] = useState(1.5);
  const [diasPerdidos, setDiasPerdidos] = useState(0);
  const [ingresoMensual, setIngresoMensual] = useState(0);
  const [gastosMedicos, setGastosMedicos] = useState(0);

  // Cálculos Minutas
  const totalHoras = Number(horasConsulta) + Number(horasInvestigacion) + Number(horasAudiencias) + Number(horasRedaccion);
  const subtotalHonorarios = totalHoras * tarifaHora;
  const totalGastos = Number(gastosAdicionales);
  const subtotal = subtotalHonorarios + totalGastos;
  const ivaAmount = subtotal * (iva / 100);
  const totalMinutas = subtotal + ivaAmount;

  // Cálculos Daños
  const ingresoDiario = ingresoMensual / 30;
  const lucrosCesantes = diasPerdidos * ingresoDiario;
  const danoMoral = montoBase * factorMultiplicador;
  const totalDanos = Number(montoBase) + lucrosCesantes + danoMoral + Number(gastosMedicos);

  const stats = [
    { label: 'Minutas Este Mes', value: '23', icon: FileText, color: 'blue' },
    { label: 'Honorarios Cobrados', value: '$487K', icon: DollarSign, color: 'emerald' },
    { label: 'Horas Registradas', value: '324', icon: Clock, color: 'purple' },
    { label: 'Promedio por Hora', value: '$1,850', icon: TrendingUp, color: 'amber' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      amber: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
    };
    return colors[color] || colors.blue;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
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
        {['minutas', 'danos'].map(tab => (
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
            {tab === 'minutas' ? 'Calculadora de Minutas' : 'Calculadora de Daños y Perjuicios'}
          </button>
        ))}
      </div>

      {/* Minutas Calculator */}
      {activeTab === 'minutas' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Calculator className={`w-6 h-6 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <h3 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  Registro de Horas
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Horas de Consulta
                  </label>
                  <input
                    type="number"
                    value={horasConsulta}
                    onChange={(e) => setHorasConsulta(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Horas de Investigación
                  </label>
                  <input
                    type="number"
                    value={horasInvestigacion}
                    onChange={(e) => setHorasInvestigacion(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Horas en Audiencias
                  </label>
                  <input
                    type="number"
                    value={horasAudiencias}
                    onChange={(e) => setHorasAudiencias(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Horas de Redacción
                  </label>
                  <input
                    type="number"
                    value={horasRedaccion}
                    onChange={(e) => setHorasRedaccion(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>

                <div className={`pt-4 border-t ${isDark ? 'border-ale-glass/30' : 'border-ale-silver'}`}>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Tarifa por Hora (MXN)
                  </label>
                  <input
                    type="number"
                    value={tarifaHora}
                    onChange={(e) => setTarifaHora(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Gastos Adicionales (MXN)
                  </label>
                  <input
                    type="number"
                    value={gastosAdicionales}
                    onChange={(e) => setGastosAdicionales(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    IVA (%)
                  </label>
                  <input
                    type="number"
                    value={iva}
                    onChange={(e) => setIva(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="16"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  Cálculo de Minuta
                </h3>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Total de Horas
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {totalHoras.toFixed(2)} hrs
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Honorarios por Horas
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {formatCurrency(subtotalHonorarios)}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Gastos Adicionales
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {formatCurrency(totalGastos)}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                      Subtotal
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                      IVA ({iva}%)
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                      {formatCurrency(ivaAmount)}
                    </span>
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${isDark ? 'bg-emerald-500/20 border-2 border-emerald-500/30' : 'bg-emerald-50 border-2 border-emerald-200'}`}>
                  <div className="text-center">
                    <p className={`text-sm mb-2 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      TOTAL A COBRAR
                    </p>
                    <p className={`text-4xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {formatCurrency(totalMinutas)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                      : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
                  }`}>
                    <Save className="w-5 h-5" />
                    Guardar
                  </button>
                  <button className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    isDark 
                      ? 'bg-ale-glass/10 text-ale-glass hover:bg-ale-glass/20'
                      : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
                  }`}>
                    <Download className="w-5 h-5" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daños Calculator */}
      {activeTab === 'danos' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Scale className={`w-6 h-6 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <h3 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  Datos del Daño
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Tipo de Daño
                  </label>
                  <select
                    value={tipoDano}
                    onChange={(e) => setTipoDano(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none cursor-pointer ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                  >
                    <option value="moral">Daño Moral</option>
                    <option value="patrimonial">Daño Patrimonial</option>
                    <option value="mixto">Daño Mixto</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Monto Base del Daño (MXN)
                  </label>
                  <input
                    type="number"
                    value={montoBase}
                    onChange={(e) => setMontoBase(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Factor Multiplicador (Gravedad)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={factorMultiplicador}
                      onChange={(e) => setFactorMultiplicador(e.target.value)}
                      className="flex-1"
                    />
                    <span className={`text-lg font-bold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                      {factorMultiplicador}x
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    1.0 = Leve | 3.0 = Moderado | 5.0 = Grave
                  </p>
                </div>

                <div className={`pt-4 border-t ${isDark ? 'border-ale-glass/30' : 'border-ale-silver'}`}>
                  <h4 className={`font-semibold mb-3 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    Lucro Cesante
                  </h4>
                  
                  <div className="mb-3">
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Ingreso Mensual (MXN)
                    </label>
                    <input
                      type="number"
                      value={ingresoMensual}
                      onChange={(e) => setIngresoMensual(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg outline-none ${
                        isDark 
                          ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                          : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                      }`}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Días Laborales Perdidos
                    </label>
                    <input
                      type="number"
                      value={diasPerdidos}
                      onChange={(e) => setDiasPerdidos(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg outline-none ${
                        isDark 
                          ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                          : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                      }`}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Gastos Médicos (MXN)
                  </label>
                  <input
                    type="number"
                    value={gastosMedicos}
                    onChange={(e) => setGastosMedicos(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-ale-black/40 text-ale-white border border-ale-glass/30' 
                        : 'bg-ale-pearl text-ale-charcoal border border-ale-silver'
                    }`}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className={`w-6 h-6 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <h3 className={`text-xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  Cuantificación de Daños
                </h3>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Daño Base
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {formatCurrency(Number(montoBase))}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                      Daño Moral (x{factorMultiplicador})
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                      {formatCurrency(danoMoral)}
                    </span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                    Afectación psicológica y emocional
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                      Lucro Cesante
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                      {formatCurrency(lucrosCesantes)}
                    </span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    {diasPerdidos} días × {formatCurrency(ingresoDiario)}/día
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
                  <div className="flex justify-between">
                    <span className={`text-sm font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                      Gastos Médicos
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                      {formatCurrency(Number(gastosMedicos))}
                    </span>
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${isDark ? 'bg-red-500/20 border-2 border-red-500/30' : 'bg-red-50 border-2 border-red-200'}`}>
                  <div className="text-center">
                    <p className={`text-sm mb-2 ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                      TOTAL RECLAMABLE
                    </p>
                    <p className={`text-4xl font-bold ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                      {formatCurrency(totalDanos)}
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-neon/10 border border-ale-neon/30' : 'bg-ale-accent-cyan/10 border border-ale-accent-cyan/30'}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        Nota Legal
                      </p>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        Esta cuantificación es estimativa. Los tribunales determinarán el monto final basándose en pruebas y precedentes jurisprudenciales.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                      : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
                  }`}>
                    <Save className="w-5 h-5" />
                    Guardar
                  </button>
                  <button className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    isDark 
                      ? 'bg-ale-glass/10 text-ale-glass hover:bg-ale-glass/20'
                      : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
                  }`}>
                    <Download className="w-5 h-5" />
                    Reporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinutasDanos;