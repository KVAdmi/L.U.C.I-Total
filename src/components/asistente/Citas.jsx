
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, Plus, X, AlertTriangle, Video, MapPin, Users, Loader2 } from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { useToast } from '@/components/ui/use-toast';
import { getAppointments, createAppointment, deleteAppointment, detectConflicts } from '@/lib/asistente/appointments';

const Citas = ({ onBack }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAppointments();
      setEvents(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({ 
        title: 'Error', 
        description: 'No se pudieron cargar las citas',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setEvents(events.filter(e => e.id !== id));
      toast({ title: 'Éxito', description: 'Cita eliminada correctamente' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast({ 
        title: 'Error', 
        description: 'No se pudo eliminar la cita',
        variant: 'destructive'
      });
    }
  };
  
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = {
        title: e.target.title.value,
        startTime: `2025-11-28T${e.target.startTime.value}:00`,
        endTime: `2025-11-28T${e.target.endTime.value}:00`,
        type: e.target.type.value,
        location: e.target.location.value,
        attendees: [],
      };

      const newEvent = await createAppointment(formData);
      setEvents([...events, newEvent]);
      setShowForm(false);
      toast({ title: 'Éxito', description: 'Cita creada correctamente' });
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({ 
        title: 'Error', 
        description: error.message || 'No se pudo crear la cita',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="p-8">
      <SubmoduleHeader onBack={onBack} title="Gestión de Citas" subtitle="Administra tus reuniones y compromisos" icon={Calendar} />
      
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setShowForm(true)} 
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-ale-deep-teal text-white rounded-lg hover:bg-ale-teal-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" /> Nueva Cita
        </button>
      </div>

      {loading && events.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-ale-accent-cyan" />
          <span className="ml-3 text-ale-slate">Cargando citas...</span>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-ale-slate">
          No tienes citas programadas
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => {
            const startTime = new Date(event.startTime);
            const endTime = new Date(event.endTime);
            const timeStr = `${startTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
            
            return (
              <motion.div 
                key={event.id} 
                variants={itemVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                className="bg-ale-pearl p-4 rounded-lg flex items-center justify-between border border-ale-border-light hover:border-ale-accent-cyan transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-ale-slate font-medium">{timeStr}</div>
                  <div className="flex items-center gap-2">
                    {event.type === 'video' ? (
                      <Video className="w-4 h-4 text-ale-accent-cyan" />
                    ) : (
                      <Users className="w-4 h-4 text-ale-deep-teal" />
                    )}
                    <span className="text-ale-charcoal font-medium">{event.title}</span>
                  </div>
                  <div className="text-sm text-ale-slate flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {event.location}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {event.conflict && (
                    <div className="flex items-center gap-1 text-amber-600 text-xs" title="Conflicto detectado">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  )}
                  <button 
                    onClick={() => handleDelete(event.id)} 
                    className="text-ale-slate hover:text-red-600 transition-colors"
                    title="Eliminar cita"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {showForm && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" 
          onClick={() => setShowForm(false)}
        >
          <div className="bg-white rounded-lg p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-ale-charcoal mb-4">Nueva Cita</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input 
                name="title" 
                placeholder="Título de la cita" 
                className="w-full px-4 py-2 bg-ale-pearl text-ale-charcoal rounded-lg border border-ale-border-light focus:border-ale-accent-cyan outline-none" 
                required 
              />
              <div className="flex gap-4">
                <input 
                  name="startTime" 
                  type="time" 
                  className="w-full px-4 py-2 bg-ale-pearl text-ale-charcoal rounded-lg border border-ale-border-light focus:border-ale-accent-cyan outline-none" 
                  required 
                />
                <input 
                  name="endTime" 
                  type="time" 
                  className="w-full px-4 py-2 bg-ale-pearl text-ale-charcoal rounded-lg border border-ale-border-light focus:border-ale-accent-cyan outline-none" 
                  required 
                />
              </div>
              <select 
                name="type" 
                className="w-full px-4 py-2 bg-ale-pearl text-ale-charcoal rounded-lg border border-ale-border-light focus:border-ale-accent-cyan outline-none"
              >
                <option value="meeting">Reunión presencial</option>
                <option value="video">Videollamada</option>
                <option value="call">Llamada telefónica</option>
              </select>
              <input 
                name="location" 
                placeholder="Ubicación o sala" 
                className="w-full px-4 py-2 bg-ale-pearl text-ale-charcoal rounded-lg border border-ale-border-light focus:border-ale-accent-cyan outline-none" 
                required 
              />
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)} 
                  className="px-6 py-2 bg-ale-silver text-ale-charcoal rounded-lg hover:bg-ale-border-light transition-colors"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-ale-deep-teal text-white rounded-lg hover:bg-ale-teal-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Crear
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Citas;
