import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, UserPlus, Filter, Users, TrendingUp, 
  Calendar, Phone, Mail, MapPin, FileText, 
  Activity, AlertCircle, Heart, Thermometer,
  Droplet, Weight, Ruler, Clock, ChevronRight,
  Download, Share2, Edit2, Eye
} from 'lucide-react';

const ExpedientesPacientes = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todos');

  const patients = [
    {
      id: 1,
      name: 'María González Pérez',
      age: 45,
      gender: 'Femenino',
      avatar: 'MG',
      phone: '+52 81 1234 5678',
      email: 'maria.gonzalez@email.com',
      address: 'Av. Constitución 123, Monterrey, N.L.',
      bloodType: 'O+',
      allergies: ['Penicilina', 'Polen'],
      chronicConditions: ['Diabetes Tipo 2', 'Hipertensión'],
      lastVisit: '2025-11-20',
      nextAppointment: '2025-12-05',
      status: 'Activo',
      riskLevel: 'Medio',
      vitalSigns: {
        bp: '130/85',
        hr: 78,
        temp: 36.5,
        weight: 68,
        height: 165,
        bmi: 25.0
      },
      recentVisits: [
        { date: '2025-11-20', reason: 'Control diabetes', doctor: 'Dr. Ramírez' },
        { date: '2025-10-15', reason: 'Consulta general', doctor: 'Dr. Ramírez' },
        { date: '2025-09-10', reason: 'Análisis de sangre', doctor: 'Dra. Torres' }
      ],
      medications: [
        { name: 'Metformina', dose: '850mg', frequency: 'Cada 12 hrs', status: 'Activo' },
        { name: 'Losartán', dose: '50mg', frequency: 'Cada 24 hrs', status: 'Activo' }
      ]
    },
    {
      id: 2,
      name: 'Carlos Hernández Ruiz',
      age: 32,
      gender: 'Masculino',
      avatar: 'CH',
      phone: '+52 33 9876 5432',
      email: 'carlos.hernandez@email.com',
      address: 'Calle Juárez 456, Guadalajara, Jal.',
      bloodType: 'A+',
      allergies: ['Ninguna conocida'],
      chronicConditions: ['Ninguna'],
      lastVisit: '2025-11-25',
      nextAppointment: '2025-12-15',
      status: 'Activo',
      riskLevel: 'Bajo',
      vitalSigns: {
        bp: '120/80',
        hr: 72,
        temp: 36.7,
        weight: 75,
        height: 178,
        bmi: 23.7
      },
      recentVisits: [
        { date: '2025-11-25', reason: 'Chequeo anual', doctor: 'Dr. Sánchez' },
        { date: '2025-06-10', reason: 'Vacunación', doctor: 'Enf. López' }
      ],
      medications: []
    },
    {
      id: 3,
      name: 'Ana Laura Martínez',
      age: 67,
      gender: 'Femenino',
      avatar: 'AL',
      phone: '+52 55 5555 1234',
      email: 'ana.martinez@email.com',
      address: 'Col. Roma Norte, CDMX',
      bloodType: 'B+',
      allergies: ['Aspirina'],
      chronicConditions: ['Artritis Reumatoide', 'Osteoporosis'],
      lastVisit: '2025-11-22',
      nextAppointment: '2025-11-30',
      status: 'Activo',
      riskLevel: 'Alto',
      vitalSigns: {
        bp: '145/90',
        hr: 85,
        temp: 36.3,
        weight: 62,
        height: 160,
        bmi: 24.2
      },
      recentVisits: [
        { date: '2025-11-22', reason: 'Control reumatología', doctor: 'Dra. Flores' },
        { date: '2025-11-10', reason: 'Densitometría ósea', doctor: 'Dr. Vega' },
        { date: '2025-10-28', reason: 'Ajuste medicamentos', doctor: 'Dra. Flores' }
      ],
      medications: [
        { name: 'Metotrexato', dose: '15mg', frequency: 'Semanal', status: 'Activo' },
        { name: 'Ácido Fólico', dose: '5mg', frequency: 'Diario', status: 'Activo' },
        { name: 'Calcio + Vitamina D', dose: '600mg', frequency: 'Cada 12 hrs', status: 'Activo' }
      ]
    },
    {
      id: 4,
      name: 'Roberto Silva Mendoza',
      age: 28,
      gender: 'Masculino',
      avatar: 'RS',
      phone: '+52 81 8888 9999',
      email: 'roberto.silva@email.com',
      address: 'San Pedro Garza García, N.L.',
      bloodType: 'AB+',
      allergies: ['Ninguna conocida'],
      chronicConditions: ['Ninguna'],
      lastVisit: '2025-11-18',
      nextAppointment: null,
      status: 'Inactivo',
      riskLevel: 'Bajo',
      vitalSigns: {
        bp: '115/75',
        hr: 68,
        temp: 36.6,
        weight: 72,
        height: 180,
        bmi: 22.2
      },
      recentVisits: [
        { date: '2025-11-18', reason: 'Lesión deportiva', doctor: 'Dr. Ortiz' },
        { date: '2025-08-05', reason: 'Consulta dermatológica', doctor: 'Dra. Ramírez' }
      ],
      medications: []
    }
  ];

  const stats = [
    { label: 'Pacientes Activos', value: '247', trend: '+12%', icon: Users, color: 'emerald' },
    { label: 'Consultas Hoy', value: '18', trend: '+3', icon: Calendar, color: 'blue' },
    { label: 'Pacientes Críticos', value: '5', trend: '-2', icon: AlertCircle, color: 'red' },
    { label: 'Cirugías Programadas', value: '3', trend: 'Esta semana', icon: Activity, color: 'purple' }
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.phone.includes(searchTerm) ||
                         p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || p.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Alto': return isDark ? 'text-red-400 bg-red-500/20' : 'text-red-700 bg-red-50';
      case 'Medio': return isDark ? 'text-amber-400 bg-amber-500/20' : 'text-amber-700 bg-amber-50';
      case 'Bajo': return isDark ? 'text-emerald-400 bg-emerald-500/20' : 'text-emerald-700 bg-emerald-50';
      default: return isDark ? 'text-gray-400 bg-gray-500/20' : 'text-gray-700 bg-gray-50';
    }
  };

  const getStatColor = (color) => {
    const colors = {
      emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      blue: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      red: isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
      purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6">
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
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className={`text-3xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
          <input
            type="text"
            placeholder="Buscar paciente por nombre, teléfono o email..."
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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-3 rounded-lg outline-none cursor-pointer transition-all ${
              isDark 
                ? 'bg-ale-petrol text-ale-white border border-ale-glass/30' 
                : 'bg-white text-ale-charcoal border border-ale-silver shadow-sm'
            }`}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
          
          <button className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
            isDark 
              ? 'bg-ale-neon/10 text-ale-neon hover:bg-ale-neon/20 border border-ale-neon'
              : 'bg-ale-accent-cyan text-white hover:bg-ale-deep-teal shadow-sm'
          }`}>
            <UserPlus className="w-5 h-5" />
            Nuevo Paciente
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedPatient?.id === patient.id
                  ? isDark ? 'bg-ale-petrol border-2 border-ale-neon' : 'bg-white border-2 border-ale-accent-cyan shadow-lg'
                  : isDark ? 'bg-ale-petrol/50 border border-ale-glass/30 hover:border-ale-glass' : 'bg-white border border-ale-silver hover:border-ale-accent-cyan/50 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  isDark ? 'bg-ale-neon/20 text-ale-neon' : 'bg-ale-accent-cyan/20 text-ale-accent-cyan'
                }`}>
                  {patient.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                    {patient.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    {patient.age} años • {patient.gender}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      {patient.bloodType}
                    </span>
                  </div>
                </div>
                
                <ChevronRight className={`w-5 h-5 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedPatient ? (
              <motion.div
                key={selectedPatient.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-6 rounded-lg ${isDark ? 'bg-ale-petrol' : 'bg-white shadow-md'}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                      isDark ? 'bg-ale-neon/20 text-ale-neon' : 'bg-ale-accent-cyan/20 text-ale-accent-cyan'
                    }`}>
                      {selectedPatient.avatar}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                        {selectedPatient.name}
                      </h2>
                      <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                        {selectedPatient.age} años • {selectedPatient.gender} • {selectedPatient.bloodType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'}`}>
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'}`}>
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-ale-glass/10 text-ale-glass' : 'hover:bg-ale-silver text-ale-slate'}`}>
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                    <Phone className={`w-5 h-5 mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                    <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Teléfono</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {selectedPatient.phone}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                    <Mail className={`w-5 h-5 mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                    <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Email</p>
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {selectedPatient.email}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                    <MapPin className={`w-5 h-5 mb-2 ${isDark ? 'text-ale-neon' : 'text-ale-accent-cyan'}`} />
                    <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Dirección</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                      {selectedPatient.address}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Signos Vitales
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <Heart className={`w-4 h-4 mb-1 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Presión</p>
                        <p className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {selectedPatient.vitalSigns.bp}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <Activity className={`w-4 h-4 mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Frecuencia</p>
                        <p className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {selectedPatient.vitalSigns.hr} bpm
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <Thermometer className={`w-4 h-4 mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Temperatura</p>
                        <p className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {selectedPatient.vitalSigns.temp}°C
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <Weight className={`w-4 h-4 mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Peso / IMC</p>
                        <p className={`font-semibold ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                          {selectedPatient.vitalSigns.weight}kg / {selectedPatient.vitalSigns.bmi}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-sm uppercase tracking-wide mb-3 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Información Clínica
                    </h3>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Alergias</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.map(allergy => (
                            <span key={allergy} className={`text-xs px-2 py-0.5 rounded-full ${
                              isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-700'
                            }`}>
                              {allergy}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'}`}>
                        <p className={`text-xs ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>Padecimientos Crónicos</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.chronicConditions.map(condition => (
                            <span key={condition} className={`text-xs px-2 py-0.5 rounded-full ${
                              isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className={`text-sm uppercase tracking-wide ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Medicamentos Actuales
                  </h3>
                  {selectedPatient.medications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.medications.map((med, idx) => (
                        <div key={idx} className={`p-3 rounded-lg flex items-center justify-between ${
                          isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'
                        }`}>
                          <div>
                            <p className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                              {med.name}
                            </p>
                            <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                              {med.dose} • {med.frequency}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {med.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                      Sin medicamentos activos
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className={`text-sm uppercase tracking-wide ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Visitas Recientes
                  </h3>
                  <div className="space-y-2">
                    {selectedPatient.recentVisits.map((visit, idx) => (
                      <div key={idx} className={`p-3 rounded-lg flex items-center justify-between ${
                        isDark ? 'bg-ale-black/40' : 'bg-ale-pearl'
                      }`}>
                        <div>
                          <p className={`font-medium ${isDark ? 'text-ale-white' : 'text-ale-charcoal'}`}>
                            {visit.reason}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                            {new Date(visit.date).toLocaleDateString('es-MX', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })} • {visit.doctor}
                          </p>
                        </div>
                        <button className={`p-2 rounded-lg transition-all ${
                          isDark ? 'hover:bg-ale-glass/10 text-ale-neon' : 'hover:bg-ale-silver text-ale-accent-cyan'
                        }`}>
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center justify-center h-full min-h-[600px] rounded-lg ${
                  isDark ? 'bg-ale-petrol/50' : 'bg-ale-pearl'
                }`}
              >
                <div className="text-center">
                  <Users className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`} />
                  <p className={`text-lg ${isDark ? 'text-ale-glass' : 'text-ale-slate'}`}>
                    Selecciona un paciente para ver su expediente completo
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExpedientesPacientes;