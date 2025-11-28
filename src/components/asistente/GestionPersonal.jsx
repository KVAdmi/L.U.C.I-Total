
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Gift, Mail, Phone, MapPin, Building2, Calendar, 
  Briefcase, Star, Edit2, Trash2, UserPlus, Search, 
  Filter, TrendingUp, MessageCircle, FileText, ExternalLink,
  Award, BookOpen, ChevronDown, ChevronRight, Loader2
} from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { getProfile, updateProfile } from '@/lib/asistente/personal';
import { useToast } from '@/components/ui/use-toast';

const GestionPersonal = ({ onBack }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [showDetail, setShowDetail] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({ title: 'Error', description: 'No se pudo cargar el perfil', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    {
      id: 1,
      name: 'Dr. Carlos Hernández',
      role: 'Director General',
      company: 'Hospital San José',
      category: 'Cliente VIP',
      email: 'carlos.hernandez@hospitalsj.mx',
      phone: '+52 81 8123 4567',
      rfc: 'HERC850415AB3',
      curp: 'HERC850415HNLRRL08',
      location: 'Monterrey, N.L.',
      avatar: 'CH',
      lastContact: '2025-11-25',
      nextAction: 'Seguimiento póliza empresarial',
      interactions: 47,
      revenue: '$450,000 MXN',
      tags: ['Salud', 'Empresarial', 'Alta prioridad'],
      notes: 'Interesado en expandir cobertura para 50 empleados adicionales. Decisor final.',
      birthday: '15 de Abril',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/carloshernandez',
        website: 'https://hospitalsj.mx'
      },
      history: [
        { date: '2025-11-25', type: 'Llamada', description: 'Seguimiento póliza Q4 2025' },
        { date: '2025-11-18', type: 'Reunión', description: 'Presentación de coberturas adicionales' },
        { date: '2025-11-10', type: 'Email', description: 'Envío de propuesta personalizada' },
      ]
    },
    {
      id: 2,
      name: 'Lic. María Rodríguez',
      role: 'Rectora',
      company: 'Universidad Tecnológica del Norte',
      category: 'Cliente',
      email: 'maria.rodriguez@utn.edu.mx',
      phone: '+52 33 3456 7890',
      rfc: 'RODM780920MN5',
      curp: 'RODM780920MJCLZR03',
      location: 'Guadalajara, Jal.',
      avatar: 'MR',
      lastContact: '2025-11-22',
      nextAction: 'Renovación convenio institucional',
      interactions: 32,
      revenue: '$280,000 MXN',
      tags: ['Educación', 'Convenio', 'Institucional'],
      notes: 'Convenio vigente hasta marzo 2026. Evaluar descuentos por volumen de alumnos.',
      birthday: '20 de Septiembre',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/mariarodriguez',
        website: 'https://utn.edu.mx'
      },
      history: [
        { date: '2025-11-22', type: 'Reunión', description: 'Revisión de convenio anual' },
        { date: '2025-11-01', type: 'Email', description: 'Reporte de siniestralidad trimestral' },
      ]
    },
    {
      id: 3,
      name: 'Ing. Roberto Sánchez',
      role: 'CEO',
      company: 'TechMex Solutions',
      category: 'Prospecto',
      email: 'roberto.sanchez@techmex.com.mx',
      phone: '+52 55 1234 5678',
      rfc: 'SANR901105CD8',
      curp: 'SANR901105HDFNBS04',
      location: 'Ciudad de México',
      avatar: 'RS',
      lastContact: '2025-11-20',
      nextAction: 'Primera reunión agendada',
      interactions: 3,
      revenue: '$0 MXN',
      tags: ['Tecnología', 'Startup', 'Prospecto caliente'],
      notes: 'Startup en crecimiento, 25 empleados. Buscan paquete empresarial completo. Presupuesto: $200k-300k MXN anuales.',
      birthday: '05 de Noviembre',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/robertosanchez',
        website: 'https://techmex.com.mx'
      },
      history: [
        { date: '2025-11-20', type: 'Llamada', description: 'Primera llamada de prospección' },
        { date: '2025-11-18', type: 'Email', description: 'Envío de información general' },
      ]
    },
    {
      id: 4,
      name: 'Dra. Ana Martínez',
      role: 'Directora Administrativa',
      company: 'Gobierno del Estado de Jalisco',
      category: 'Gobierno',
      email: 'ana.martinez@jalisco.gob.mx',
      phone: '+52 33 3030 3000 ext. 1234',
      rfc: 'MARA830615JL2',
      curp: 'MARA830615MJCRNN09',
      location: 'Guadalajara, Jal.',
      avatar: 'AM',
      lastContact: '2025-11-15',
      nextAction: 'Licitación pública Q1 2026',
      interactions: 18,
      revenue: '$1,200,000 MXN',
      tags: ['Gobierno', 'Licitación', 'Público'],
      notes: 'Contacto clave para licitaciones estatales. Proceso formal, requiere documentación completa.',
      birthday: '15 de Junio',
      socialLinks: {
        website: 'https://jalisco.gob.mx'
      },
      history: [
        { date: '2025-11-15', type: 'Reunión', description: 'Información sobre licitación 2026' },
        { date: '2025-10-30', type: 'Email', description: 'Envío de documentación técnica' },
      ]
    },
    {
      id: 5,
      name: 'Lic. Fernando López',
      role: 'Gerente de Compras',
      company: 'Grupo Industrial del Bajío',
      category: 'Proveedor',
      email: 'fernando.lopez@gib.com.mx',
      phone: '+52 442 234 5678',
      rfc: 'LOPF880320QR9',
      curp: 'LOPF880320HGTPRS05',
      location: 'Querétaro, Qro.',
      avatar: 'FL',
      lastContact: '2025-11-12',
      nextAction: 'Cotización materiales oficina',
      interactions: 12,
      revenue: '-$85,000 MXN',
      tags: ['Proveedor', 'Materiales', 'Confiable'],
      notes: 'Proveedor confiable de mobiliario y materiales de oficina. Buenos precios y entrega puntual.',
      birthday: '20 de Marzo',
      socialLinks: {
        website: 'https://gib.com.mx'
      },
      history: [
        { date: '2025-11-12', type: 'Email', description: 'Solicitud de cotización' },
        { date: '2025-10-28', type: 'Llamada', description: 'Seguimiento de pedido anterior' },
      ]
    }
  ];

  const categories = ['Todos', 'Cliente VIP', 'Cliente', 'Prospecto', 'Gobierno', 'Proveedor'];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || contact.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Cliente VIP': return isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Cliente': return isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Prospecto': return isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Gobierno': return isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Proveedor': return isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-50 text-orange-700 border-orange-200';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title="Gestión de Contactos 360°" subtitle="Vista completa de clientes, prospectos y relaciones comerciales" icon={User} />
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
          <input
            type="text"
            placeholder="Buscar por nombre, empresa o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all ${
              isDark 
                ? 'bg-ale-petrol text-ale-white placeholder-ale-glass border border-ale-glass/30 focus:border-ale-neon' 
                : 'bg-white text-ale-charcoal placeholder-ale-slate border border-ale-silver focus:border-ale-accent-cyan shadow-sm'
            }`}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`pl-9 pr-8 py-3 rounded-lg outline-none cursor-pointer transition-all appearance-none ${
                isDark 
                  ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                  : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
              }`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <button className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
            isDark 
              ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon' 
              : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
          }`}>
            <UserPlus className="w-5 h-5" />
            Nuevo Contacto
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedContact(contact);
                setShowDetail(true);
              }}
              className={`p-5 rounded-lg cursor-pointer transition-all ${
                selectedContact?.id === contact.id
                  ? isDark ? 'bg-ale-petrol border-2 border-ale-neon' : 'bg-white border-2 border-ale-accent-cyan shadow-lg'
                  : isDark ? 'bg-ale-petrol/50 border border-ale-glass/30 hover:border-ale-glass' : 'bg-white border border-ale-silver hover:border-ale-accent-cyan/50 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold ${
                  isDark ? 'bg-ale-neon/20 text-ale-neon' : 'bg-ale-accent-cyan/20 text-ale-accent-cyan'
                }`}>
                  {contact.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{contact.name}</h3>
                      <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{contact.role}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(contact.category)}`}>
                      {contact.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-3 h-3" />
                    <span className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{contact.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      <MapPin className="w-3 h-3" />
                      {contact.location}
                    </span>
                    <span className={`flex items-center gap-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      <TrendingUp className="w-3 h-3" />
                      {contact.interactions} interacciones
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedContact && showDetail ? (
            <motion.div
              key={selectedContact.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-6 rounded-lg max-h-[600px] overflow-y-auto ${
                isDark ? 'bg-ale-petrol border border-ale-glass/30' : 'bg-white border border-ale-silver shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold ${
                    isDark ? 'bg-ale-neon/20 text-ale-neon' : 'bg-ale-accent-cyan/20 text-ale-accent-cyan'
                  }`}>
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{selectedContact.name}</h2>
                    <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{selectedContact.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-neon/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-600'
                  }`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className={`uppercase text-xs mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Empresa</p>
                      <p className={isDark ? 'text-ale-white' : 'text-ale-charcoal'}>{selectedContact.company}</p>
                    </div>
                    <div>
                      <p className={`uppercase text-xs mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Ubicación</p>
                      <p className={isDark ? 'text-ale-white' : 'text-ale-charcoal'}>{selectedContact.location}</p>
                    </div>
                    <div>
                      <p className={`uppercase text-xs mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>RFC</p>
                      <p className={`font-mono ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{selectedContact.rfc}</p>
                    </div>
                    <div>
                      <p className={`uppercase text-xs mb-1 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>CURP</p>
                      <p className={`font-mono text-xs ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{selectedContact.curp}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Contacto</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedContact.email}`} className={isDark ? 'text-ale-neon hover:underline' : 'text-ale-accent-cyan hover:underline'}>
                        {selectedContact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${selectedContact.phone}`} className={isDark ? 'text-ale-white' : 'text-ale-charcoal'}>
                        {selectedContact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gift className="w-4 h-4" />
                      <span className={isDark ? 'text-ale-white' : 'text-ale-charcoal'}>{selectedContact.birthday}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Estadísticas</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                      <p className={`text-2xl font-semibold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>{selectedContact.interactions}</p>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Interacciones</p>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                      <p className={`text-lg font-semibold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>{selectedContact.revenue}</p>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Revenue</p>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                      <p className={`text-xs ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{selectedContact.lastContact}</p>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Último contacto</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map(tag => (
                      <span 
                        key={tag}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark ? 'bg-ale-neon/10 text-ale-neon' : 'bg-ale-accent-cyan/10 text-ale-accent-cyan'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Notas</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {selectedContact.notes}
                  </p>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Próxima Acción</h3>
                  <div className={`p-3 rounded-lg flex items-center gap-3 ${isDark ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-50 border border-amber-200'}`}>
                    <Calendar className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                      {selectedContact.nextAction}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Historial de Interacciones</h3>
                  <div className="space-y-2">
                    {selectedContact.history.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-semibold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                            {item.type}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                            {new Date(item.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(191, 200, 207, 0.1)' : '#E8ECEF' }}>
                  <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20' 
                      : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20'
                  }`}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20' 
                      : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20'
                  }`}>
                    <Mail className="w-4 h-4" /> Email
                  </button>
                  <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20' 
                      : 'bg-ale-accent-cyan/10 text-ale-accent-cyan hover:bg-ale-accent-cyan/20'
                  }`}>
                    <Phone className="w-4 h-4" /> Llamar
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex items-center justify-center h-[600px] rounded-lg ${
                isDark ? 'bg-ale-petrol/50 border border-ale-glass/30' : 'bg-ale-pearl border border-ale-silver'
              }`}
            >
              <div className="text-center">
                <User className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                <p className={`text-lg ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                  Selecciona un contacto para ver detalles
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GestionPersonal;
