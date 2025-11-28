
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Brain, Coffee, Sun, Wind, Clock, AlertTriangle, 
  CheckCircle, XCircle, Calendar, TrendingUp, Loader2
} from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { getSuggestions, acceptSuggestion, declineSuggestion } from '@/lib/asistente/proactive';
import { useToast } from '@/components/ui/use-toast';

const AgendaProactiva = ({ onBack }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const data = await getSuggestions({ context: 'today', limit: 5 });
      setSuggestions(data);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      toast({ title: 'Error', description: 'No se pudieron cargar sugerencias', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const suggestion = suggestions.find(s => s.id === id);
      if (suggestion && suggestion.actions && suggestion.actions[0]) {
        await acceptSuggestion(id, suggestion.actions[0]);
        setAcceptedSuggestions(prev => [...prev, id]);
        toast({ title: 'Sugerencia aceptada', description: 'Se aplicaron los cambios' });
      }
    } catch (error) {
      console.error('Error accepting suggestion:', error);
      toast({ title: 'Error', description: 'No se pudo aplicar', variant: 'destructive' });
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineSuggestion(id);
      setAcceptedSuggestions(prev => [...prev, -id]);
      toast({ title: 'Sugerencia rechazada', description: 'No se aplicarán cambios' });
    } catch (error) {
      console.error('Error declining suggestion:', error);
    }
  };

  // Mock suggestions for fallback
  const mockSuggestions = [
    { 
      id: 1,
      title: 'Bloquear tiempo de enfoque',
      description: 'Detecté que tienes 3 horas libres mañana. ¿Quieres que bloquee tiempo para trabajo profundo?',
      icon: Brain, 
      color: theme === 'dark' ? 'text-cyan-400' : 'text-ale-accent-cyan',
      priority: 'high'
    },
    { 
      id: 2,
      title: 'Conflicto de horario detectado',
      description: 'Tienes 2 reuniones programadas al mismo tiempo el jueves a las 3 PM. ¿Reprogramo una?',
      icon: AlertTriangle, 
      color: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600',
      priority: 'urgent'
    },
    { 
      id: 3,
      title: 'Tiempo de descanso recomendado',
      description: 'Has trabajado 6 horas seguidas. Sugiero un break de 15 minutos antes de tu siguiente reunión.',
      icon: Coffee, 
      color: theme === 'dark' ? 'text-orange-400' : 'text-orange-600',
      priority: 'medium'
    },
    { 
      id: 4,
      title: 'Optimizar ruta de reuniones',
      description: 'Tienes 3 reuniones presenciales mañana. Puedo reorganizarlas para reducir tiempo de traslado.',
      icon: TrendingUp, 
      color: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      priority: 'medium'
    },
  ];

  const displaySuggestions = suggestions.length > 0 ? suggestions : mockSuggestions;

  const getPriorityBadge = (priority) => {
    const styles = {
      urgent: theme === 'dark' 
        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
        : 'bg-red-100 text-red-700 border-red-300',
      high: theme === 'dark'
        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
        : 'bg-cyan-100 text-cyan-700 border-cyan-300',
      medium: theme === 'dark'
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        : 'bg-yellow-100 text-yellow-700 border-yellow-300',
    };
    
    return (
      <span className={cn(
        'px-2 py-1 text-xs rounded-full border uppercase font-medium',
        styles[priority]
      )}>
        {priority === 'urgent' ? 'Urgente' : priority === 'high' ? 'Alta' : 'Media'}
      </span>
    );
  };

  return (
    <div className={cn(
      "p-8 min-h-screen font-['Questrial']",
      theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-ale-white-bg'
    )}>
      <SubmoduleHeader 
        onBack={onBack} 
        title="Agenda Proactiva con IA" 
        subtitle="Sugerencias inteligentes para optimizar tu tiempo"
        icon={Brain} 
      />
      
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-lg border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}
        >
          <div className="flex items-center gap-3">
            <Calendar className={cn(
              "w-8 h-8",
              theme === 'dark' ? 'text-ale-neon' : 'text-ale-accent-cyan'
            )} />
            <div>
              <p className={cn(
                "text-2xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
              )}>8</p>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
              )}>Eventos hoy</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "p-4 rounded-lg border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}
        >
          <div className="flex items-center gap-3">
            <Clock className={cn(
              "w-8 h-8",
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            )} />
            <div>
              <p className={cn(
                "text-2xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
              )}>3.5h</p>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
              )}>Tiempo libre</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "p-4 rounded-lg border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className={cn(
              "w-8 h-8",
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            )} />
            <div>
              <p className={cn(
                "text-2xl font-bold",
                theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
              )}>92%</p>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
              )}>Productividad</p>
            </div>
          </div>
        </motion.div>
      </div>

      <h3 className={cn(
        "text-xl mb-6 font-medium",
        theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
      )}>Sugerencias Inteligentes de IA</h3>
      
      <div className="space-y-4">
        {suggestions.map((s, index) => {
          const Icon = s.icon;
          const isAccepted = acceptedSuggestions.includes(s.id);
          const isDeclined = acceptedSuggestions.includes(-s.id);
          
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className={cn(
                "p-5 rounded-lg flex items-start gap-5 border transition-all",
                theme === 'dark'
                  ? 'bg-[#1F1F1F] border-ale-glass hover:border-ale-neon'
                  : 'bg-white border-ale-border-light hover:border-ale-accent-cyan hover:shadow-md',
                (isAccepted || isDeclined) && 'opacity-50'
              )}
            >
              <Icon className={cn("w-8 h-8 shrink-0", s.color)} />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className={cn(
                    "font-medium",
                    theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
                  )}>{s.title}</h4>
                  {getPriorityBadge(s.priority)}
                </div>
                <p className={cn(
                  "text-sm",
                  theme === 'dark' ? 'text-gray-300' : 'text-ale-slate'
                )}>{s.description}</p>
              </div>
              
              {!isAccepted && !isDeclined && (
                <div className="flex gap-2 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAccept(s.id)}
                    className={cn(
                      "px-4 py-2 text-sm rounded-md transition-all flex items-center gap-2",
                      theme === 'dark'
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    )}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Aceptar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDecline(s.id)}
                    className={cn(
                      "px-4 py-2 text-sm rounded-md transition-all flex items-center gap-2",
                      theme === 'dark'
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    )}
                  >
                    <XCircle className="w-4 h-4" />
                    Rechazar
                  </motion.button>
                </div>
              )}
              
              {isAccepted && (
                <span className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                )}>
                  <CheckCircle className="w-4 h-4" />
                  Aceptada
                </span>
              )}
              
              {isDeclined && (
                <span className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  theme === 'dark' ? 'text-red-400' : 'text-red-700'
                )}>
                  <XCircle className="w-4 h-4" />
                  Rechazada
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Preferencias de agenda */}
      <div className="mt-12">
        <h3 className={cn(
          "text-xl mb-6 font-medium",
          theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
        )}>Mis Preferencias de Agenda</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className={cn(
            "p-4 rounded-lg flex items-center justify-between border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}>
            <span className={cn(
              theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
            )}>Bloquear tiempo de enfoque automáticamente</span>
            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
          </div>
          <div className={cn(
            "p-4 rounded-lg flex items-center justify-between border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}>
            <span className={cn(
              theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
            )}>Alertas de conflictos de horario</span>
            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
          </div>
          <div className={cn(
            "p-4 rounded-lg flex items-center justify-between border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}>
            <span className={cn(
              theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
            )}>Recordar breaks de descanso</span>
            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
          </div>
          <div className={cn(
            "p-4 rounded-lg flex items-center justify-between border",
            theme === 'dark' 
              ? 'bg-[#1F1F1F] border-ale-glass' 
              : 'bg-white border-ale-border-light'
          )}>
            <span className={cn(
              theme === 'dark' ? 'text-white' : 'text-ale-charcoal'
            )}>Optimización de rutas automática</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .toggle { 
          appearance: none; 
          width: 40px; 
          height: 20px; 
          background-color: ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}; 
          border-radius: 9999px; 
          position: relative; 
          transition: background-color 0.2s; 
          cursor: pointer; 
        }
        .toggle:checked { 
          background-color: ${theme === 'dark' ? '#003336' : '#0A4D5C'}; 
        }
        .toggle::before { 
          content: ''; 
          position: absolute; 
          width: 16px; 
          height: 16px; 
          background: white; 
          border-radius: 50%; 
          top: 2px; 
          left: 2px; 
          transition: transform 0.2s; 
        }
        .toggle:checked::before { 
          transform: translateX(20px); 
        }
      `}</style>
    </div>
  );
};

export default AgendaProactiva;
