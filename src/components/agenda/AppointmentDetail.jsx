

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  X, Calendar, Clock, MapPin, Users, Phone, Building, Link as LinkIcon, Download, Plus,
  FileText, BrainCircuit, Mic, Save, Video, Film, Trash2, Edit
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import PillButton from '@/components/ui/PillButton';
import { useToast } from '@/components/ui/use-toast';
import MapSimulated from '@/components/ui/MapSimulated';
import FilePreview from '@/components/ui/FilePreview';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AppointmentDetail = ({ appointment, onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [isRecording, setIsRecording] = useState(false);

  const handleAction = (actionName) => {
    toast({
      title: "🚧 Acción en desarrollo",
      description: `La acción '${actionName}' no está implementada todavía.`,
    });
  };
  
  const handleRecord = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? t('agenda.stopRecording') : t('agenda.startRecording'),
      description: isRecording ? 'Grabación guardada.' : 'Iniciando grabación de la reunión...',
    });
  };

  const tabs = [
    { id: 'details', label: t('agenda.appointmentDetails'), icon: Calendar },
    { id: 'documents', label: t('agenda.meetingDocs'), icon: FileText },
    { id: 'summary', label: t('agenda.meetingSummary'), icon: Mic },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl bg-[#0F0F0F] border-l border-white/10 h-full flex flex-col shadow-2xl font-['Questrial']"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-6 border-b border-white/10 flex items-start justify-between bg-[#001E21]/20 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Badge variant={appointment.status === 'confirmed' ? 'success' : 'secondary'}>
                 {appointment.status === 'confirmed' ? t('agenda.confirmed') : t('agenda.pending')}
               </Badge>
               <span className="text-white/40 text-xs font-mono">ID: #{appointment.id}2938</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">{appointment.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1.5 border-b border-white/10 bg-white/5 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all flex items-center justify-center gap-2",
                activeTab === tab.id ? "bg-[#003336] text-white" : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <tab.icon className="w-4 h-4"/> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
           <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
             {activeTab === 'details' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-cyan-300"/>
                        <div>
                           <p className="text-white font-medium">{t('common.today')}, 27 Nov 2025</p>
                           <p className="text-white/60 text-sm">{appointment.time} ({appointment.duration} min)</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                            {appointment.isVirtual ? <LinkIcon className="w-5 h-5 text-cyan-300"/> : <Building className="w-5 h-5 text-cyan-300"/>}
                            <div>
                               <p className="text-white font-medium">{appointment.isVirtual ? t('agenda.virtual') : t('agenda.presencial')}</p>
                               <p className="text-white/60 text-sm">{appointment.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-cyan-300"/>
                            <div>
                                <p className="text-white font-medium">{appointment.attendees} {t('agenda.attendees')}</p>
                            </div>
                        </div>
                    </div>

                     <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 className="text-white/60 text-sm mb-2">{t('agenda.contact')}</h3>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-cyan-300"/>
                            <div>
                               <p className="text-white font-medium">{appointment.contact.name}</p>
                               <p className="text-white/60 text-sm">{appointment.contact.phone}</p>
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                     {!appointment.isVirtual && (
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                           <h3 className="text-white/60 text-sm mb-2">{t('agenda.travelTime')}</h3>
                           <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold text-white">25 <span className="text-base font-normal text-white/60">{t('agenda.minutes')}</span></p>
                              <PillButton size="sm" onClick={() => handleAction(t('agenda.calculateRoute'))}>
                                <MapPin className="w-3 h-3"/> {t('agenda.calculateRoute')}
                              </PillButton>
                           </div>
                        </div>
                     )}
                     <MapSimulated/>
                  </div>
               </div>
             )}

             {activeTab === 'documents' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <h3 className="text-lg font-semibold text-white">{t('agenda.meetingDocs')}</h3>
                       <PillButton onClick={() => handleAction(t('agenda.addDoc'))} size="sm">
                          <Plus className="w-4 h-4" /> {t('agenda.addDoc')}
                       </PillButton>
                    </div>
                    <FilePreview fileName="Presentacion_Q4.pptx" fileType="PowerPoint" fileSize="12.5 MB" />
                    <FilePreview fileName="Reporte_Ventas.pdf" fileType="PDF" fileSize="2.1 MB" />
                    <FilePreview fileName="Contrato_Cliente.docx" fileType="Word" fileSize="890 KB" />
                </div>
             )}

             {activeTab === 'summary' && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2"><BrainCircuit className="w-5 h-5 text-cyan-400"/> {t('agenda.aiSummary')}</h3>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-white/80 text-sm h-32">
                           <p>{t('agenda.aiSummaryPlaceholder')}</p>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{t('agenda.myNotes')}</h3>
                        <textarea placeholder={t('agenda.myNotesPlaceholder')} rows="5" className="w-full p-3 bg-white/5 rounded-lg border border-white/10 text-white focus:outline-none focus:border-cyan-400/50 transition"></textarea>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <Button onClick={handleRecord} className={cn("gap-2 w-full", isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#003336] hover:bg-[#004a4f]")}>
                          {isRecording ? <><Film className="w-4 h-4 animate-pulse"/><span>{t('agenda.recording')}</span></> : <><Video className="w-4 h-4"/>{t('agenda.startRecording')}</>}
                        </Button>
                        <Button variant="secondary" className="gap-2 w-full bg-white/10 hover:bg-white/20 text-white">
                            <Save className="w-4 h-4"/>{t('agenda.saveNotes')}
                        </Button>
                    </div>
                </div>
             )}
            </motion.div>
           </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <footer className="p-4 border-t border-white/10 flex gap-3 bg-[#0F0F0F] shrink-0">
           <PillButton className="flex-1" onClick={() => handleAction('Iniciar Reunión')}>Iniciar Reunión</PillButton>
           <PillButton variant="secondary" onClick={() => handleAction('Editar')}>
             <Edit className="w-4 h-4" />
           </PillButton>
           <button 
             className="p-3 rounded-full bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
             onClick={() => handleAction('Cancelar')}
           >
             <Trash2 className="w-5 h-5" />
           </button>
        </footer>
      </motion.div>
    </div>
  );
};

export default AppointmentDetail;
