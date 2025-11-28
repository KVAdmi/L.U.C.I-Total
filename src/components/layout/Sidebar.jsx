import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, ListChecks, MessageSquare, FileText, Users, DollarSign, 
  BrainCircuit, Settings, HeartPulse, Scale, ShieldCheck, BookUser, Newspaper
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// --- UNIVERSAL MODULES ---
const universalNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, path: '/agenda' },
  { id: 'comunicaciones', label: 'Comunicaciones', icon: MessageSquare, path: '/comunicaciones' },
  { id: 'documentos', label: 'Documentos', icon: FileText, path: '/documentos' },
  { id: 'contactos', label: 'Contactos', icon: Users, path: '/contactos' },
  { id: 'tareas', label: 'Tareas', icon: ListChecks, path: '/tareas' },
  { id: 'finanzas', label: 'Finanzas', icon: DollarSign, path: '/finanzas' },
  { id: 'news', label: 'News', icon: Newspaper, path: '/news' },
  { id: 'centro-ia', label: 'Centro IA', icon: BrainCircuit, path: '/centro-ia' },
  { id: 'configuracion', label: 'Configuración', icon: Settings, path: '/configuracion' },
];

// --- SPECIALTY MODULES (DEFINITIONS) ---
const specialtyModulesConfig = [
  { id: 'medixia', label: 'Médico', icon: HeartPulse, path: '/medixia' },
  { id: 'lexia', label: 'Legal', icon: Scale, path: '/lexia' },
  { id: 'segurosia', label: 'Seguros', icon: ShieldCheck, path: '/segurosia' },
  { id: 'contaia', label: 'Contabilidad', icon: BookUser, path: '/contaia' },
];



const NavItem = ({ item, activeModule, onNavigate, isSpecialty, theme }) => {
  const isActive = activeModule === item.id;
  
  const customStyles = isSpecialty ? {
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '0.8rem'
  } : {};

  return (
    <Link
      to={item.path}
      onClick={() => onNavigate(item.id)}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out",
        theme === 'dark' 
          ? "hover:bg-ale-petrol/60 hover:text-ale-white text-gray-300"
          : "hover:bg-ale-deep-teal/10 hover:text-ale-deep-teal text-ale-slate",
        isActive && (theme === 'dark' 
          ? "bg-ale-petrol text-ale-white shadow-md"
          : "bg-ale-deep-teal text-ale-white shadow-sm")
      )}
      style={customStyles}
    >
      <item.icon className="w-5 h-5 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
};


const Sidebar = ({ activeModule, onNavigate }) => {
  const { isTransitioning } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.aside 
      className={cn(
        "fixed left-0 top-0 h-full w-64 flex flex-col p-4 border-r transition-all duration-300",
        theme === 'dark'
          ? "bg-ale-black text-gray-300 border-ale-glass"
          : "bg-ale-white-bg text-ale-charcoal border-ale-border-light shadow-sm",
        isTransitioning && 'opacity-50'
      )}
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="flex items-center gap-3 px-2 mb-6">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          theme === 'dark'
            ? "bg-gradient-to-br from-ale-petrol to-ale-petrol/60"
            : "bg-gradient-to-br from-ale-deep-teal to-ale-accent-cyan"
        )}>
            <span className="text-2xl font-bold text-ale-white">L</span>
        </div>
        <div>
          <h1 className={cn(
            "text-lg font-bold",
            theme === 'dark' ? "text-ale-white" : "text-ale-charcoal"
          )}>L.U.C.I</h1>
          <p className={cn(
            "text-xs -mt-1",
            theme === 'dark' ? "text-gray-400" : "text-ale-slate"
          )}>CRM Universal</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar -mr-2 pr-2">
        {/* Universal Modules */}
        <nav className="space-y-2">
          {universalNavItems.map(item => <NavItem key={item.id} item={item} activeModule={activeModule} onNavigate={onNavigate} theme={theme} />)}
        </nav>
        
        {/* Specialty Module Block */}
        <div className="mt-6">
          <h2 className={cn(
            "px-4 text-xs font-semibold uppercase tracking-wider mb-2",
            theme === 'dark' ? "text-gray-500" : "text-ale-slate/60"
          )}>
            Módulos de Industria
          </h2>
          <nav className="space-y-2">
            {specialtyModulesConfig.map(item => <NavItem key={item.id} item={item} activeModule={activeModule} onNavigate={onNavigate} isSpecialty theme={theme} />)}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

