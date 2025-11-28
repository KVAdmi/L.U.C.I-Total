
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Video, Phone, Users, ChevronDown, ChevronUp, ChevronsRight, BrainCircuit, User as UserIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import CalendarCompact from '@/components/ui/CalendarCompact';
import CardCristal from '@/components/ui/CardCristal';
import { useToast } from '@/components/ui/use-toast';
import AppointmentDetail from '@/components/agenda/AppointmentDetail';

const Agenda = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date('2025-11-27T12:00:00Z'));
  const [viewMode, setViewMode] = useState('day');
  const [isAIPanelExpanded, setIsAIPanelExpanded] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    { id: 1, time: '09:00', duration: '60', title: 'Reunión con Cliente VIP', type: 'meeting', attendees: 3, location: 'Sala A, Oficinas Centrales', status: 'confirmed', isVirtual: false, contact: { name: 'Carlos Mendoza', phone: '+34 612 345 678'}, description: 'Revisión trimestral de KPIs y planificación para el próximo trimestre.' },
    { id: 2, time: '11:00', duration: '30', title: 'Llamada de seguimiento', type: 'call', attendees: 1, location: 'Virtual', status: 'pending', isVirtual: true, contact: { name: 'Sofia Loren', phone: '+34 698 765 432'}, description: 'Llamada rápida para confirmar los detalles del proyecto "Alpha".' },
    { id: 3, time: '14:00', duration: '120', title: 'Workshop de estrategia', type: 'workshop', attendees: 8, location: 'Auditorio', status: 'confirmed', isVirtual: false, contact: { name: 'Equipo de Marketing', phone: 'N/A'}, description: 'Taller de ideación para la campaña de marketing de 2026.' },
    { id: 4, time: '16:30', duration: '45', title: 'Revisión de proyecto', type: 'video', attendees: 4, location: 'Zoom', status: 'confirmed', isVirtual: true, contact: { name: 'Project Team', phone: 'N/A'}, description: 'Sincronización semanal sobre los avances del proyecto "Omega".' },
  ];

  const handleNewAppointment = () => {
    toast({
      title: `🚧 ${t('agenda.newAppointment')}`,
      description: "Esta funcionalidad estará disponible próximamente.",
    });
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return Video;
      case 'call': return Phone;
      case 'workshop': return Users;
      default: return Users;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Helmet>
        <title>{t('sidebar.agenda')} | AL-E</title>
        <meta name="description" content={t('agenda.subtitle')} />
      </Helmet>
      
      <div className="h-full flex font-['Questrial']">
        <motion.div 
          className="w-full xl:w-2/3 h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('agenda.title')}</h1>
              <p className="text-muted-foreground mt-1">{t('agenda.subtitle')}</p>
            </div>
            <Button onClick={handleNewAppointment} className="gap-2 bg-[#003336] hover:bg-[#004a4f]">
              <Plus className="w-4 h-4" />
              {t('agenda.newAppointment')}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CalendarCompact selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              <CardCristal className="p-4 mt-6 overflow-hidden bg-[#0A0A0A]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-cyan-400" />{t('agenda.aiSuggestions')}</h3>
                  <motion.button onClick={() => setIsAIPanelExpanded(!isAIPanelExpanded)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    {isAIPanelExpanded ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {isAIPanelExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden space-y-3">
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"><p className="text-xs text-amber-300">{t('agenda.conflict')}</p></div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"><p className="text-xs text-blue-300">{t('agenda.freeTime')}</p></div>
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20"><p className="text-xs text-green-300">{t('agenda.confirmations')}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardCristal>
            </div>

            <div className="lg:col-span-2">
              <CardCristal className="p-6 bg-[#0A0A0A]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:bg-white/5 hover:text-white"><ChevronLeft className="w-4 h-4" /></Button>
                    <h2 className="text-xl font-bold text-white">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
                    <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:bg-white/5 hover:text-white"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant={viewMode === 'day' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('day')} className="bg-[#003336] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60 hover:bg-[#004a4f]">{t('agenda.day')}</Button>
                    <Button variant={viewMode === 'week' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('week')} className="bg-[#003336] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60 hover:bg-[#004a4f]">{t('agenda.week')}</Button>
                  </div>
                </div>
                <motion.div className="space-y-3" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
                  {appointments.map((apt) => {
                    const Icon = getTypeIcon(apt.type);
                    return (
                      <motion.div key={apt.id} variants={itemVariants} onClick={() => setSelectedAppointment(apt)} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer group">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0`}>
                            <Icon className={`w-6 h-6 text-cyan-300`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{apt.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-white/60">
                              <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{apt.time} ({apt.duration} min)</div>
                              <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{apt.location}</div>
                              <div className="flex items-center gap-1.5"><UserIcon className="w-3 h-3" />{apt.attendees} {t('agenda.attendees')}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-white/60 group-hover:text-white"><ChevronsRight className="w-4 h-4" /></Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </CardCristal>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence>
            {selectedAppointment && (
                <AppointmentDetail
                    key={selectedAppointment.id}
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Agenda;
