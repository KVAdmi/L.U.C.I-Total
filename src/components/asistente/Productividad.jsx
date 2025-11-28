
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  BarChart2, Zap, Briefcase, Users, Coffee, Clock, 
  TrendingUp, TrendingDown, Calendar, Target, Award,
  AlertCircle, CheckCircle2, ArrowRight, Download, Loader2
} from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { getStats, getInsights } from '@/lib/asistente/productivity';

const Productividad = ({ onBack }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [stats, setStats] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedPeriod]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, insightsData] = await Promise.all([
        getStats({ period: selectedPeriod }),
        getInsights({ focus: 'all', limit: 4 })
      ]);
      setStats(statsData);
      setInsights(insightsData);
    } catch (error) {
      console.error('Error loading productivity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const weekData = stats || {
    meetings: 35,
    focusedWork: 52,
    breaks: 8,
    admin: 5,
    totalHours: 42,
    productivityScore: 87,
    trend: 'up',
    trendValue: 12,
    optimalHours: '09:00 - 12:00',
    peakDay: 'Martes',
    mostFrequent: 'Desarrollo de proyectos',
    tasksCompleted: 47,
    tasksTotal: 54,
    averageTaskTime: '1.2 hrs',
  };

  const dailyBreakdown = [
    { day: 'Lun', productive: 7.5, meetings: 2.5, breaks: 1, total: 9 },
    { day: 'Mar', productive: 8.2, meetings: 1.8, breaks: 0.8, total: 9 },
    { day: 'Mié', productive: 6.8, meetings: 3.2, breaks: 1.2, total: 9 },
    { day: 'Jue', productive: 7.0, meetings: 2.8, breaks: 1.0, total: 9 },
    { day: 'Vie', productive: 7.1, meetings: 2.4, breaks: 1.1, total: 8.5 },
  ];

  const insightsData = insights.length > 0 ? insights : [
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'Productividad en aumento',
      description: 'Tu productividad ha incrementado 12% respecto a la semana pasada. Mantén el ritmo.',
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Muchas reuniones el miércoles',
      description: 'Dedicaste 3.2 hrs a reuniones. Considera bloquear tiempo para trabajo profundo.',
    },
    {
      type: 'tip',
      icon: Zap,
      title: 'Horario óptimo identificado',
      description: 'Eres más productivo entre 09:00 - 12:00. Agenda tareas complejas en este bloque.',
    },
  ];

  const mexicanHolidays = [
    { date: '1 Dic', name: 'Cambio de Gobierno', type: 'Oficial' },
    { date: '12 Dic', name: 'Día de la Virgen', type: 'Tradicional' },
    { date: '25 Dic', name: 'Navidad', type: 'Oficial' },
  ];

  const getInsightColor = (type) => {
    switch(type) {
      case 'positive': return isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'warning': return isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700';
      case 'tip': return isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700';
      default: return isDark ? 'bg-ale-petrol border-ale-glass/30' : 'bg-ale-pearl border-ale-silver';
    }
  };

  const maxHours = Math.max(...dailyBreakdown.map(d => d.total));

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title="Productividad" subtitle="Analytics y reportes de tu desempeño laboral" icon={BarChart2} />
      
      <div className="flex gap-3 mb-6">
        {['week', 'month', 'quarter'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === period
                ? isDark 
                  ? 'bg-ale-neon/20 text-ale-neon border border-ale-neon'
                  : 'bg-ale-accent-cyan text-white'
                : isDark
                  ? 'bg-ale-petrol/50 text-ale-glass hover:bg-ale-petrol'
                  : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
            }`}
          >
            {period === 'week' && 'Esta Semana'}
            {period === 'month' && 'Este Mes'}
            {period === 'quarter' && 'Trimestre'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}} 
          className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-ale-neon/20' : 'bg-ale-accent-cyan/20'}`}>
              <Target className={`w-5 h-5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
            </div>
            <span className={`flex items-center gap-1 text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              <TrendingUp className="w-4 h-4" />
              +{weekData.trendValue}%
            </span>
          </div>
          <p className={`text-sm mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Score Productividad</p>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{weekData.productivityScore}%</p>
        </motion.div>

        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}}
          transition={{delay: 0.1}}
          className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}
        >
          <div className={`p-2 rounded-lg mb-3 w-fit ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Clock className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <p className={`text-sm mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Horas Totales</p>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{weekData.totalHours}h</p>
        </motion.div>

        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}}
          transition={{delay: 0.2}}
          className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}
        >
          <div className={`p-2 rounded-lg mb-3 w-fit ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
            <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <p className={`text-sm mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Tareas Completadas</p>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
            {weekData.tasksCompleted}<span className="text-lg">{weekData.tasksTotal}</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}}
          transition={{delay: 0.3}}
          className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}
        >
          <div className={`p-2 rounded-lg mb-3 w-fit ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
            <Briefcase className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
          <p className={`text-sm mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Tiempo Promedio/Tarea</p>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{weekData.averageTaskTime}</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <h3 className={`text-xl mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Distribución de Tiempo (Esta Semana)</h3>
          <div className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
            <div className="mb-6">
              <p className={`text-sm mb-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Horario laboral: 9:00 AM - 6:00 PM (México)</p>
              <div className="flex gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${isDark ? 'bg-ale-neon' : 'bg-ale-accent-cyan'}`}></div>
                  <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>Trabajo enfocado ({weekData.focusedWork}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-500"></div>
                  <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>Reuniones ({weekData.meetings}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-500"></div>
                  <span className={isDark ? 'text-ale-glass' : 'text-ale-slate'}>Descansos ({weekData.breaks}%)</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-ale-black/20 rounded-full h-10 flex overflow-hidden mb-6">
              <div 
                style={{ width: `${weekData.focusedWork}%` }} 
                className={`flex items-center justify-center text-xs font-semibold ${isDark ? 'bg-ale-neon text-ale-black' : 'bg-ale-accent-cyan text-white'}`}
              >
                {weekData.focusedWork}%
              </div>
              <div 
                style={{ width: `${weekData.meetings}%` }} 
                className="bg-purple-500 flex items-center justify-center text-xs font-semibold text-white"
              >
                {weekData.meetings}%
              </div>
              <div 
                style={{ width: `${weekData.breaks}%` }} 
                className="bg-amber-500 flex items-center justify-center text-xs font-semibold text-white"
              >
                {weekData.breaks}%
              </div>
              <div 
                style={{ width: `${weekData.admin}%` }} 
                className={`flex items-center justify-center text-xs font-semibold ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
              >
                {weekData.admin}%
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Desglose Diario</h4>
              <div className="space-y-4">
                {dailyBreakdown.map((day, idx) => (
                  <div key={day.day}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{day.day}</span>
                      <span className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{day.total}h total</span>
                    </div>
                    <div className="relative h-6 bg-ale-black/10 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${(day.productive / maxHours) * 100}%` }} 
                        className={`absolute h-full ${isDark ? 'bg-ale-neon' : 'bg-ale-accent-cyan'}`}
                      ></div>
                      <div 
                        style={{ 
                          left: `${(day.productive / maxHours) * 100}%`,
                          width: `${(day.meetings / maxHours) * 100}%` 
                        }} 
                        className="absolute h-full bg-purple-500"
                      ></div>
                      <div 
                        style={{ 
                          left: `${((day.productive + day.meetings) / maxHours) * 100}%`,
                          width: `${(day.breaks / maxHours) * 100}%` 
                        }} 
                        className="absolute h-full bg-amber-500"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className={`text-xl mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Insights y Recomendaciones</h3>
            <div className="space-y-3">
              {insightsData.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{insight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className={`text-xl mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Días Festivos México</h3>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
              <div className="space-y-3">
                {mexicanHolidays.map((holiday, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{holiday.name}</p>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{holiday.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      holiday.type === 'Oficial' 
                        ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
                        : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {holiday.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol border border-ale-neon/30' : 'bg-ale-accent-cyan/10 border border-ale-accent-cyan/30'}`}>
            <div className="flex items-start gap-3 mb-3">
              <Zap className={`w-6 h-6 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
              <div>
                <h4 className={`font-semibold mb-1 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Horario Óptimo</h4>
                <p className={`text-2xl font-bold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>{weekData.optimalHours}</p>
                <p className={`text-xs mt-2 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                  Tu mejor momento para trabajo profundo
                </p>
              </div>
            </div>
          </div>

          <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            isDark 
              ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
              : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
          }`}>
            <Download className="w-5 h-5" />
            Descargar Reporte Mensual
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productividad;
