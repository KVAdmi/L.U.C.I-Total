
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, AlertTriangle, Navigation, FileText, Send, 
  Clock, MapPin, Calendar, Car, AlertCircle, 
  CheckCircle2, X, Plus, TrendingUp, Zap, Loader2
} from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { useToast } from '@/components/ui/use-toast';
import { getReminders, createReminder, updateReminder } from '@/lib/asistente/reminders';

const Recordatorios = ({ onBack }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    setLoading(true);
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (error) {
      console.error('Error loading reminders:', error);
      toast({ title: 'Error', description: 'No se pudieron cargar recordatorios', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateReminder(id, { status: 'completed' });
      setReminders(reminders.filter(r => r.id !== id));
      toast({ title: 'Completado', description: 'Recordatorio marcado como completado' });
    } catch (error) {
      console.error('Error completing reminder:', error);
      toast({ title: 'Error', description: 'No se pudo completar', variant: 'destructive' });
    }
  };

  const mockRemindersDisplay = [
    { 
      id: 1, 
      time: '09:45', 
      type: 'preparation',
      priority: 'high',
      text: 'Preparar presentación para reunión de las 10:00', 
      icon: FileText, 
      location: 'Sala de Juntas A',
      estimatedTime: '15 min',
      relatedEvent: 'Reunión con Director General',
      actions: ['Revisar slides', 'Imprimir documentos', 'Preparar demo']
    },
    { 
      id: 2, 
      time: '13:30', 
      type: 'traffic',
      priority: 'critical',
      text: 'Alerta de tráfico intenso en Insurgentes Sur - CDMX', 
      icon: Car, 
      location: 'Oficina Centro - Reforma 250',
      estimatedTime: '45 min + 20 min tráfico',
      relatedEvent: 'Reunión con Cliente VIP',
      trafficLevel: 'Alto',
      alternativeRoute: 'Viaducto - Periférico Sur',
      timeSaved: '12 min'
    },
    { 
      id: 3, 
      time: '16:00', 
      type: 'confirmation',
      priority: 'medium',
      text: 'Confirmar asistencia a cena de equipo - Restaurante Quintonil', 
      icon: AlertTriangle, 
      location: 'Polanco, CDMX',
      estimatedTime: '10 min respuesta',
      relatedEvent: 'Team Building Q4',
      attendees: 12,
      rsvpDeadline: '18:00 hrs'
    },
    {
      id: 4,
      time: '08:00',
      type: 'location',
      priority: 'medium',
      text: 'Recordatorio al llegar a la oficina: Enviar cotización a Universidad del Norte',
      icon: MapPin,
      location: 'Oficina CDMX - Insurgentes 1234',
      estimatedTime: '5 min',
      relatedEvent: 'Seguimiento Prospecto Educación',
      triggerType: 'Ubicación'
    },
    {
      id: 5,
      time: '10:30',
      type: 'deadline',
      priority: 'high',
      text: 'Fecha límite: Envío de propuesta a Gobierno de Jalisco',
      icon: AlertCircle,
      location: 'Remoto',
      estimatedTime: '30 min revisión',
      relatedEvent: 'Licitación Pública GDL-2026',
      daysRemaining: 0,
      hoursRemaining: 3.5
    }
  ];

  const handleLateMessage = (reminder) => {
    toast({ 
      title: 'Mensaje enviado', 
      description: `Se notificó a los participantes que llegarás 15 minutos tarde.` 
    });
  };

  const handleDismiss = (id) => {
    toast({ 
      title: 'Recordatorio desactivado', 
      description: 'Se ha marcado como completado.' 
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return isDark ? 'border-red-500 bg-red-500/10' : 'border-red-400 bg-red-50';
      case 'high': return isDark ? 'border-amber-500 bg-amber-500/10' : 'border-amber-400 bg-amber-50';
      case 'medium': return isDark ? 'border-blue-500 bg-blue-500/10' : 'border-blue-400 bg-blue-50';
      case 'low': return isDark ? 'border-gray-500 bg-gray-500/10' : 'border-gray-400 bg-gray-50';
      default: return isDark ? 'border-ale-glass/30 bg-ale-petrol/30' : 'border-ale-silver bg-ale-pearl';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'preparation': return FileText;
      case 'traffic': return Car;
      case 'confirmation': return AlertTriangle;
      case 'location': return MapPin;
      case 'deadline': return AlertCircle;
      default: return Bell;
    }
  };

  const cityTrafficStatus = [
    { city: 'Ciudad de México', status: 'Alto', color: 'red', percentage: 78 },
    { city: 'Monterrey', status: 'Moderado', color: 'amber', percentage: 45 },
    { city: 'Guadalajara', status: 'Bajo', color: 'green', percentage: 25 },
  ];

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title="Recordatorios Inteligentes" subtitle="Alertas predictivas basadas en ubicación, horario y tráfico en México" icon={Bell} />
      
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-red-500/20' : 'bg-red-100'}`}>
              <AlertCircle className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'}`}>
              Críticos
            </span>
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
            {reminders.filter(r => r.priority === 'critical').length}
          </p>
          <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Requieren atención inmediata</p>
        </div>

        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
              <Clock className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
              Próximos
            </span>
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
            {reminders.length}
          </p>
          <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Recordatorios programados hoy</p>
        </div>

        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
              <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
              Completados
            </span>
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>18</p>
          <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Esta semana</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Recordatorios de Hoy</h3>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isDark 
                ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon/30'
                : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20 border border-ale-accent-cyan/30'
            }`}>
              <Plus className="w-4 h-4" />
              Nuevo Recordatorio
            </button>
          </div>

          {reminders.map((reminder, index) => {
            const Icon = getTypeIcon(reminder.type);
            return (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedReminder(selectedReminder?.id === reminder.id ? null : reminder)}
                className={`p-5 rounded-lg cursor-pointer transition-all border-l-4 ${getPriorityColor(reminder.priority)} ${
                  selectedReminder?.id === reminder.id
                    ? isDark ? 'border-ale-neon' : 'border-ale-accent-cyan shadow-lg'
                    : isDark ? 'border-ale-glass/30 hover:border-ale-glass' : 'border-ale-silver hover:border-ale-accent-cyan/50 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    reminder.priority === 'critical' 
                      ? isDark ? 'bg-red-500/20' : 'bg-red-100'
                      : reminder.priority === 'high'
                        ? isDark ? 'bg-amber-500/20' : 'bg-amber-100'
                        : isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      reminder.priority === 'critical' 
                        ? isDark ? 'text-red-400' : 'text-red-600'
                        : reminder.priority === 'high'
                          ? isDark ? 'text-amber-400' : 'text-amber-600'
                          : isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-semibold ${
                            reminder.priority === 'critical' 
                              ? isDark ? 'text-red-400' : 'text-red-600'
                              : reminder.priority === 'high'
                                ? isDark ? 'text-amber-400' : 'text-amber-600'
                                : isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'
                          }`}>
                            {reminder.time} hrs
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            reminder.priority === 'critical' 
                              ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                              : reminder.priority === 'high'
                                ? isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                                : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {reminder.priority === 'critical' && 'Urgente'}
                            {reminder.priority === 'high' && 'Alta'}
                            {reminder.priority === 'medium' && 'Media'}
                          </span>
                        </div>
                        <p className={`font-medium mb-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{reminder.text}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-xs mb-3">
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <MapPin className="w-3 h-3" />
                        {reminder.location}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        <Clock className="w-3 h-3" />
                        {reminder.estimatedTime}
                      </span>
                      {reminder.type === 'traffic' && (
                        <span className={`flex items-center gap-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                          <Car className="w-3 h-3" />
                          Tráfico {reminder.trafficLevel}
                        </span>
                      )}
                    </div>

                    {selectedReminder?.id === reminder.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-3 mt-3 border-t" style={{ borderColor: isDark ? 'rgba(191, 200, 207, 0.1)' : '#E8ECEF' }}
                      >
                        <p className={`text-sm mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                          Evento relacionado: <span className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{reminder.relatedEvent}</span>
                        </p>
                        
                        {reminder.type === 'traffic' && reminder.alternativeRoute && (
                          <div className={`p-3 rounded-lg mb-3 ${isDark ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200'}`}>
                            <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                              Ruta alternativa sugerida
                            </p>
                            <p className={`text-xs ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                              {reminder.alternativeRoute} - Ahorras {reminder.timeSaved}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {reminder.type === 'traffic' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleLateMessage(reminder); }}
                              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                isDark 
                                  ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                              }`}
                            >
                              <Send className="w-4 h-4" />
                              Avisar que voy tarde
                            </button>
                          )}
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDismiss(reminder.id); }}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              isDark 
                                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Marcar completado
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className={`text-xl mb-4 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Tráfico en Tiempo Real</h3>
            <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
              <div className="space-y-4">
                {cityTrafficStatus.map(city => (
                  <div key={city.city}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Navigation className={`w-4 h-4 ${
                          city.color === 'red' 
                            ? isDark ? 'text-red-400' : 'text-red-600'
                            : city.color === 'amber'
                              ? isDark ? 'text-amber-400' : 'text-amber-600'
                              : isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <span className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {city.city}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        city.color === 'red' 
                          ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
                          : city.color === 'amber'
                            ? isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-600'
                            : isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {city.status}
                      </span>
                    </div>
                    <div className="w-full bg-ale-black/20 rounded-full h-2 overflow-hidden">
                      <div 
                        style={{ width: `${city.percentage}%` }}
                        className={`h-full transition-all ${
                          city.color === 'red' 
                            ? 'bg-red-500'
                            : city.color === 'amber'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-4 pt-4 border-t text-xs ${isDark ? 'border-ale-glass/20 text-ale-glass' : 'border-ale-silver text-ale-slate'}`}>
                Última actualización: Hace 3 min
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol border border-ale-neon/30' : 'bg-ale-accent-cyan/10 border border-ale-accent-cyan/30'}`}>
            <div className="flex items-start gap-3">
              <Zap className={`w-6 h-6 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
              <div>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Recordatorio Inteligente</h4>
                <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                  L.U.C.I. aprende tus patrones y te avisa con anticipación considerando:
                </p>
                <ul className={`text-xs mt-2 space-y-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                  <li>• Tráfico en tiempo real (CDMX, MTY, GDL)</li>
                  <li>• Tu ubicación actual</li>
                  <li>• Horarios preferidos</li>
                  <li>• Importancia del evento</li>
                  <li>• Días festivos mexicanos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recordatorios;
