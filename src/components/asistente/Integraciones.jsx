
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, CheckCircle, Zap, Calendar, Mail, ListTodo, 
  Briefcase, Video, MessageCircle, FileText, Database,
  Settings, AlertCircle, RefreshCw, ExternalLink, Shield,
  Clock, TrendingUp, ChevronDown, Check, X, Loader2
} from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { getConnections, connectService, disconnectService, syncData } from '@/lib/asistente/integrations';
import { useToast } from '@/components/ui/use-toast';

const Integraciones = ({ onBack }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();

  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setLoading(true);
    try {
      const data = await getConnections();
      const formatted = data.map(conn => ({
        id: conn.provider,
        name: conn.name,
        icon: Calendar,
        connected: conn.status === 'connected',
        category: 'Productividad',
        description: `Conectado desde ${new Date(conn.connectedAt).toLocaleDateString()}`,
        features: conn.dataTypes,
        lastSync: conn.lastSync,
        status: conn.health,
      }));
      if (formatted.length > 0) {
        setIntegrations(formatted);
      } else {
        setIntegrations(mockIntegrations);
      }
    } catch (error) {
      console.error('Error loading integrations:', error);
      setIntegrations(mockIntegrations);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (provider) => {
    setLoading(true);
    try {
      await syncData(provider);
      toast({ title: 'Sincronización completada', description: `${provider} actualizado` });
      loadIntegrations();
    } catch (error) {
      toast({ title: 'Error', description: 'No se pudo sincronizar', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const mockIntegrations = [
    { 
      id: 'google-calendar',
      name: 'Google Calendar', 
      icon: Calendar, 
      connected: true,
      category: 'Agenda',
      description: 'Sincroniza eventos bidireccional con Google Calendar',
      features: ['Creación automática de eventos', 'Detección de conflictos', 'Recordatorios sync', 'Invitaciones múltiples'],
      lastSync: '2025-11-27 08:30',
      status: 'Activo',
      eventsSync: 247,
      priority: 'high',
      mexicanSupport: true
    },
    { 
      id: 'outlook',
      name: 'Outlook Calendar', 
      icon: Mail, 
      connected: false,
      category: 'Agenda',
      description: 'Integra calendario y correo de Microsoft Outlook',
      features: ['Calendario empresarial', 'Correo corporativo', 'Reuniones Teams', 'Contactos compartidos'],
      lastSync: null,
      status: 'Disponible',
      eventsSync: 0,
      priority: 'medium',
      mexicanSupport: true
    },
    { 
      id: 'zoom',
      name: 'Zoom', 
      icon: Video, 
      connected: true,
      category: 'Videollamadas',
      description: 'Crea y gestiona reuniones de Zoom automáticamente',
      features: ['Links automáticos', 'Grabación en la nube', 'Transcripciones', 'Salas de espera'],
      lastSync: '2025-11-27 09:15',
      status: 'Activo',
      eventsSync: 83,
      priority: 'high',
      mexicanSupport: true
    },
    { 
      id: 'google-meet',
      name: 'Google Meet', 
      icon: Video, 
      connected: true,
      category: 'Videollamadas',
      description: 'Integración nativa con Google Meet',
      features: ['Creación instant', 'Grabación Drive', 'Subtítulos español', 'Compartir pantalla'],
      lastSync: '2025-11-27 08:45',
      status: 'Activo',
      eventsSync: 156,
      priority: 'high',
      mexicanSupport: true
    },
    { 
      id: 'whatsapp-business',
      name: 'WhatsApp Business', 
      icon: MessageCircle, 
      connected: true,
      category: 'Comunicación',
      description: 'API oficial de WhatsApp Business para México',
      features: ['Auto-respuestas', 'Mensajes masivos', 'Catálogos', 'Métricas detalladas'],
      lastSync: '2025-11-27 10:00',
      status: 'Activo',
      eventsSync: 1432,
      priority: 'critical',
      mexicanSupport: true
    },
    { 
      id: 'sat-facturacion',
      name: 'SAT Facturación', 
      icon: FileText, 
      connected: false,
      category: 'Facturación',
      description: 'Sistema de facturación electrónica del SAT México',
      features: ['CFDI 4.0', 'Timbrado automático', 'Cancelaciones', 'Reportes mensuales'],
      lastSync: null,
      status: 'Próximamente',
      eventsSync: 0,
      priority: 'critical',
      mexicanSupport: true
    },
    { 
      id: 'todoist',
      name: 'Todoist', 
      icon: ListTodo, 
      connected: false,
      category: 'Tareas',
      description: 'Gestión de tareas y proyectos personales',
      features: ['Sincronización tareas', 'Prioridades', 'Proyectos', 'Etiquetas'],
      lastSync: null,
      status: 'Disponible',
      eventsSync: 0,
      priority: 'low',
      mexicanSupport: false
    },
    { 
      id: 'trello',
      name: 'Trello', 
      icon: Briefcase, 
      connected: false,
      category: 'Proyectos',
      description: 'Tableros Kanban para gestión visual de proyectos',
      features: ['Tarjetas automáticas', 'Checklist sync', 'Fechas límite', 'Etiquetas'],
      lastSync: null,
      status: 'Disponible',
      eventsSync: 0,
      priority: 'low',
      mexicanSupport: false
    },
    { 
      id: 'asana',
      name: 'Asana', 
      icon: Check, 
      connected: true,
      category: 'Proyectos',
      description: 'Plataforma de gestión de trabajo en equipo',
      features: ['Tareas automáticas', 'Timelines', 'Reportes', 'Portfolios'],
      lastSync: '2025-11-26 18:20',
      status: 'Activo',
      eventsSync: 94,
      priority: 'medium',
      mexicanSupport: false
    },
    { 
      id: 'slack',
      name: 'Slack', 
      icon: MessageCircle, 
      connected: false,
      category: 'Comunicación',
      description: 'Mensajería corporativa para equipos',
      features: ['Notificaciones L.U.C.I.', 'Comandos /luci', 'Compartir archivos', 'Canales sync'],
      lastSync: null,
      status: 'Beta',
      eventsSync: 0,
      priority: 'low',
      mexicanSupport: false
    }
  ];

  const categories = ['Todos', 'Agenda', 'Videollamadas', 'Comunicación', 'Tareas', 'Proyectos', 'Facturación'];
  const [filterCategory, setFilterCategory] = useState('Todos');

  const filteredIntegrations = integrations.filter(int => 
    filterCategory === 'Todos' || int.category === filterCategory
  );

  const toggleConnection = (id) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, connected: !int.connected, lastSync: !int.connected ? new Date().toISOString() : null } : int
    ));
  };

  const getPriorityColor = (priority) => {
    const isDark = theme === 'dark';
    switch(priority) {
      case 'critical': return isDark ? 'text-red-400' : 'text-red-600';
      case 'high': return isDark ? 'text-amber-400' : 'text-amber-600';
      case 'medium': return isDark ? 'text-blue-400' : 'text-blue-600';
      case 'low': return isDark ? 'text-gray-400' : 'text-gray-600';
      default: return isDark ? 'text-ale-glass' : 'text-ale-slate';
    }
  };

  const connectedCount = integrations.filter(i => i.connected).length;
  const totalEvents = integrations.reduce((sum, i) => sum + i.eventsSync, 0);

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title="Integraciones" subtitle="Conecta L.U.C.I. con tus herramientas favoritas" icon={Share2} />
      
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-ale-neon/20' : 'bg-ale-accent-cyan/20'}`}>
              <CheckCircle className={`w-5 h-5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
            </div>
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Conectadas</p>
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{connectedCount}/{integrations.length}</p>
        </div>

        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-ale-neon/20' : 'bg-ale-accent-cyan/20'}`}>
              <RefreshCw className={`w-5 h-5 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
            </div>
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Total Syncs</p>
          </div>
          <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{totalEvents.toLocaleString()}</p>
        </div>

        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
              <Clock className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Última Sync</p>
          </div>
          <p className={`text-sm font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>Hace 5 min</p>
        </div>

        <div className={`p-5 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <Shield className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Seguridad</p>
          </div>
          <p className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Protegido</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filterCategory === cat
                ? isDark 
                  ? 'bg-ale-neon/20 text-ale-neon border border-ale-neon'
                  : 'bg-ale-accent-cyan text-white'
                : isDark
                  ? 'bg-ale-petrol/50 text-ale-glass hover:bg-ale-petrol'
                  : 'bg-ale-pearl text-ale-slate hover:bg-ale-silver'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 rounded-lg transition-all cursor-pointer ${
                selectedIntegration?.id === item.id
                  ? isDark ? 'bg-ale-petrol border-2 border-ale-neon' : 'bg-white border-2 border-ale-accent-cyan shadow-lg'
                  : isDark ? 'bg-ale-petrol/50 border border-ale-glass/30 hover:border-ale-glass' : 'bg-white border border-ale-silver hover:border-ale-accent-cyan/50 shadow-sm'
              }`}
              onClick={() => {
                setSelectedIntegration(item);
                setShowConfig(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    item.connected 
                      ? isDark ? 'bg-ale-neon/20' : 'bg-ale-accent-cyan/20'
                      : isDark ? 'bg-ale-glass/10' : 'bg-ale-silver'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      item.connected 
                        ? isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'
                        : isDark ? 'text-ale-glass' : 'text-ale-slate'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{item.name}</h3>
                    <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{item.category}</p>
                  </div>
                </div>
                {item.mexicanSupport && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700'
                  }`}>
                    MX
                  </span>
                )}
              </div>

              <p className={`text-sm mb-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{item.description}</p>

              <div className="flex items-center justify-between mb-4 text-xs">
                <span className={getPriorityColor(item.priority)}>
                  {item.priority === 'critical' && 'Crítico'}
                  {item.priority === 'high' && 'Alta prioridad'}
                  {item.priority === 'medium' && 'Media prioridad'}
                  {item.priority === 'low' && 'Baja prioridad'}
                </span>
                {item.connected && (
                  <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    <TrendingUp className="w-3 h-3" />
                    {item.eventsSync} eventos
                  </span>
                )}
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleConnection(item.id);
                }}
                className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                  item.connected 
                    ? isDark 
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30' 
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    : isDark
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon/30'
                      : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20 border border-ale-accent-cyan/30'
                }`}
              >
                {item.connected ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Conectado
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Conectar
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showConfig && selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfig(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-2xl w-full rounded-lg p-6 max-h-[80vh] overflow-y-auto ${
                isDark ? 'bg-ale-black border border-ale-glass' : 'bg-white shadow-2xl'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {React.createElement(selectedIntegration.icon, {
                    className: `w-12 h-12 ${
                      selectedIntegration.connected 
                        ? isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'
                        : isDark ? 'text-ale-glass' : 'text-ale-slate'
                    }`
                  })}
                  <div>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {selectedIntegration.name}
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      {selectedIntegration.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfig(false)}
                  className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Descripción
                  </h3>
                  <p className={`${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {selectedIntegration.description}
                  </p>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Características
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedIntegration.features.map(feature => (
                      <div 
                        key={feature}
                        className={`flex items-center gap-2 p-3 rounded-lg ${
                          isDark ? 'bg-ale-petrol' : 'bg-ale-pearl'
                        }`}
                      >
                        <Check className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                        <span className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedIntegration.connected && (
                  <div>
                    <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Estadísticas
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-ale-petrol' : 'bg-ale-pearl'}`}>
                        <p className={`text-2xl font-bold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                          {selectedIntegration.eventsSync}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Eventos sync</p>
                      </div>
                      <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-ale-petrol' : 'bg-ale-pearl'}`}>
                        <p className={`text-sm font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {selectedIntegration.status}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Estado</p>
                      </div>
                      <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-ale-petrol' : 'bg-ale-pearl'}`}>
                        <p className={`text-xs ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {new Date(selectedIntegration.lastSync).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Última sync</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => toggleConnection(selectedIntegration.id)}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      selectedIntegration.connected
                        ? isDark
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                          : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                        : isDark
                          ? 'bg-ale-neon/20 text-ale-neon hover:bg-ale-neon/30 border border-ale-neon'
                          : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal'
                    }`}
                  >
                    {selectedIntegration.connected ? 'Desconectar' : 'Conectar Ahora'}
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                      isDark
                        ? 'bg-ale-petrol/50 text-ale-white hover:bg-ale-petrol border border-ale-glass/30'
                        : 'bg-ale-pearl text-ale-charcoal hover:bg-ale-silver border border-ale-silver'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Configurar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Integraciones;
