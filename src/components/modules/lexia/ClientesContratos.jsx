import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  User, Search, Plus, Phone, Mail, MapPin, Building2,
  Briefcase, FileText, TrendingUp, DollarSign, Edit2,
  Eye, Star, Calendar, CheckCircle2, AlertCircle, Filter
} from 'lucide-react';

const ClientesContratos = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');

  const clientes = [
    {
      id: 1,
      nombre: 'Constructora del Valle S.A. de C.V.',
      tipo: 'Empresa',
      rfc: 'CDV990101ABC',
      contacto: 'Ing. Ricardo Pérez',
      telefono: '55-1234-5678',
      email: 'ricardo.perez@constructoravalle.mx',
      direccion: 'Av. Insurgentes Sur 1234, CDMX',
      casosActivos: 2,
      contratosActivos: 3,
      montoTotal: '$2,500,000.00',
      fechaAlta: '2023-05-15',
      ultimaInteraccion: '2024-11-20',
      status: 'activo',
      especialidad: 'Mercantil',
      starred: true
    },
    {
      id: 2,
      nombre: 'Juan Carlos Rodríguez López',
      tipo: 'Persona Física',
      rfc: 'ROLJ850612ABC',
      contacto: 'Juan Carlos Rodríguez',
      telefono: '55-9876-5432',
      email: 'jc.rodriguez@email.com',
      direccion: 'Calle Morelos 456, Estado de México',
      casosActivos: 1,
      contratosActivos: 1,
      montoTotal: '$450,000.00',
      fechaAlta: '2024-03-10',
      ultimaInteraccion: '2024-11-22',
      status: 'activo',
      especialidad: 'Laboral',
      starred: false
    },
    {
      id: 3,
      nombre: 'Grupo Empresarial del Norte',
      tipo: 'Empresa',
      rfc: 'GEN950815XYZ',
      contacto: 'Lic. Patricia Gómez',
      telefono: '81-5555-1234',
      email: 'patricia.gomez@gednorte.mx',
      direccion: 'Av. Constitución 789, Monterrey, NL',
      casosActivos: 3,
      contratosActivos: 5,
      montoTotal: '$8,000,000.00',
      fechaAlta: '2022-11-20',
      ultimaInteraccion: '2024-11-25',
      status: 'activo',
      especialidad: 'Fiscal',
      starred: true
    },
    {
      id: 4,
      nombre: 'Ana Laura Méndez',
      tipo: 'Persona Física',
      rfc: 'MELA920303DEF',
      contacto: 'Ana Laura Méndez',
      telefono: '81-7777-8888',
      email: 'ana.mendez@email.com',
      direccion: 'Av. San Pedro 321, San Pedro Garza García, NL',
      casosActivos: 1,
      contratosActivos: 1,
      montoTotal: 'N/A',
      fechaAlta: '2024-04-01',
      ultimaInteraccion: '2024-11-18',
      status: 'activo',
      especialidad: 'Familiar',
      starred: false
    },
    {
      id: 5,
      nombre: 'Inversiones Seguras S.C.',
      tipo: 'Empresa',
      rfc: 'ISE880920GHI',
      contacto: 'C.P. Jorge Hernández',
      telefono: '33-4444-9999',
      email: 'jorge.hernandez@inverseguros.mx',
      direccion: 'Av. Américas 567, Guadalajara, Jal',
      casosActivos: 1,
      contratosActivos: 2,
      montoTotal: '$3,200,000.00',
      fechaAlta: '2024-01-15',
      ultimaInteraccion: '2024-11-21',
      status: 'activo',
      especialidad: 'Penal',
      starred: false
    },
    {
      id: 6,
      nombre: 'Transportes del Bajío S.A.',
      tipo: 'Empresa',
      rfc: 'TDB870505JKL',
      contacto: 'Lic. Roberto Sánchez',
      telefono: '55-3333-4444',
      email: 'roberto.sanchez@transbajio.mx',
      direccion: 'Calzada de Tlalpan 890, CDMX',
      casosActivos: 0,
      contratosActivos: 0,
      montoTotal: '$1,200,000.00',
      fechaAlta: '2023-11-05',
      ultimaInteraccion: '2024-09-15',
      status: 'inactivo',
      especialidad: 'Administrativo',
      starred: false
    }
  ];

  const stats = [
    { label: 'Clientes Activos', value: '47', change: '+8', icon: User, color: 'blue' },
    { label: 'Contratos Vigentes', value: '89', change: '+12', icon: FileText, color: 'purple' },
    { label: 'Valor Cartera', value: '$42.5M', change: '+15%', icon: DollarSign, color: 'emerald' },
    { label: 'Nuevos Este Mes', value: '6', change: '+2', icon: TrendingUp, color: 'amber' }
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
      case 'activo': return isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'inactivo': return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
      default: return isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTipoColor = (tipo) => {
    return tipo === 'Empresa' 
      ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
      : isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700';
  };

  const getEspecialidadColor = (especialidad) => {
    const especialidades = {
      'Mercantil': isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      'Laboral': isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      'Fiscal': isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      'Familiar': isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-700',
      'Penal': isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700',
      'Administrativo': isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
    };
    return especialidades[especialidad] || (isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700');
  };

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.rfc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTipo === 'todos' || cliente.tipo.toLowerCase() === filterTipo;
    return matchesSearch && matchesFilter;
  });

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

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-ale-glass' : 'text-ale-slate'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, RFC o contacto..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none ${
                isDark 
                  ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                  : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
              }`}
            />
          </div>
          <select 
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className={`px-4 py-2 rounded-lg outline-none cursor-pointer ${
              isDark 
                ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
            }`}
          >
            <option value="todos">Todos los tipos</option>
            <option value="empresa">Empresas</option>
            <option value="persona física">Personas Físicas</option>
          </select>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isDark 
            ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
            : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
        }`}>
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {/* Clientes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredClientes.map((cliente, idx) => (
          <motion.div
            key={cliente.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-5 rounded-lg border transition-all hover:shadow-lg cursor-pointer ${
              isDark ? 'bg-ale-petrol border-ale-glass/30 hover:border-ale-neon/50' : 'bg-white border-ale-silver hover:border-ale-accent-cyan shadow-md'
            }`}
            onClick={() => setSelectedCliente(selectedCliente?.id === cliente.id ? null : cliente)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3 flex-1">
                <div className={`p-3 rounded-lg ${
                  cliente.tipo === 'Empresa' 
                    ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                    : isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                }`}>
                  {cliente.tipo === 'Empresa' ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {cliente.nombre}
                    </h3>
                    {cliente.starred && (
                      <Star className={`w-4 h-4 ${isDark ? 'text-amber-400 fill-amber-400' : 'text-amber-500 fill-amber-500'}`} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(cliente.status)}`}>
                      {cliente.status.charAt(0).toUpperCase() + cliente.status.slice(1)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTipoColor(cliente.tipo)}`}>
                      {cliente.tipo}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getEspecialidadColor(cliente.especialidad)}`}>
                      {cliente.especialidad}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    RFC: {cliente.rfc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <span className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {cliente.telefono}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                <span className={`text-sm truncate ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {cliente.email}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Casos</p>
                <p className={`text-lg font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {cliente.casosActivos}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Contratos</p>
                <p className={`text-lg font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {cliente.contratosActivos}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Monto</p>
                <p className={`text-xs font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                  {cliente.montoTotal}
                </p>
              </div>
            </div>

            {selectedCliente?.id === cliente.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-4 pt-4 border-t ${isDark ? 'border-ale-glass/30' : 'border-ale-silver'}`}
              >
                <div className="space-y-3 mb-4">
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                      Contacto Principal
                    </p>
                    <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {cliente.contacto}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                      Dirección
                    </p>
                    <div className="flex items-start gap-2">
                      <MapPin className={`w-4 h-4 mt-0.5 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                      <p className={`text-sm ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {cliente.direccion}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Alta</p>
                      <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {new Date(cliente.fechaAlta).toLocaleDateString('es-MX')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Última interacción</p>
                      <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {new Date(cliente.ultimaInteraccion).toLocaleDateString('es-MX')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDark 
                      ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
                      : 'bg-ale-accent-cyan/20 text-ale-accent-cyan hover:bg-ale-accent-cyan/30'
                  }`}>
                    <Eye className="w-4 h-4" />
                    Ver Perfil Completo
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${
                    isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'
                  }`}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientesContratos;