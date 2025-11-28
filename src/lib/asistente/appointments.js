/**
 * Servicio de gestión de citas para Asistente Personal
 * Maneja creación, lectura, actualización y eliminación de citas
 * 
 * @module asistente/appointments
 */

import { supabase } from '@/lib/supabase';

/**
 * Obtiene todas las citas con filtros opcionales
 * @param {Object} filters - Filtros opcionales
 * @param {string} filters.date - Fecha específica (YYYY-MM-DD)
 * @param {string} filters.startDate - Fecha inicio rango
 * @param {string} filters.endDate - Fecha fin rango
 * @param {string} filters.type - Tipo: 'meeting' | 'video' | 'call' | 'personal'
 * @param {boolean} filters.conflictsOnly - Solo citas con conflictos
 * @returns {Promise<Array>} Lista de citas
 * 
 * @TODO: Implementar paginación
 * @TODO: Agregar filtro por participantes
 * @TODO: Sincronizar con Google Calendar/Outlook
 */
export async function getAppointments(filters = {}) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 600));

  // Si Supabase está configurado, usar DB real
  if (supabase) {
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('start_time', { ascending: true });

      // Aplicar filtros
      if (filters.date) {
        const startOfDay = `${filters.date}T00:00:00`;
        const endOfDay = `${filters.date}T23:59:59`;
        query = query.gte('start_time', startOfDay).lte('start_time', endOfDay);
      }

      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      if (filters.conflictsOnly) {
        query = query.eq('conflict', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log('[ASISTENTE] Citas obtenidas de SUPABASE:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('[ASISTENTE] Error obteniendo citas de Supabase:', error);
      // Fallback a mock si hay error
    }
  }

  // Fallback: Mock data si no hay Supabase
  const mockAppointments = [
    {
      id: 1,
      title: 'Reunión con Cliente VIP',
      description: 'Revisión de propuesta trimestral',
      startTime: '2025-11-28T10:00:00',
      endTime: '2025-11-28T11:00:00',
      type: 'meeting',
      location: 'Sala A, Oficinas Centrales',
      attendees: ['juan.perez@empresa.com', 'maria.gonzalez@empresa.com'],
      attendeeCount: 3,
      status: 'confirmed',
      conflict: false,
      reminders: [15, 60], // minutos antes
      color: '#0891B2',
      createdAt: '2025-11-20T09:00:00',
    },
    {
      id: 2,
      title: 'Llamada de seguimiento',
      description: 'Follow-up proyecto Q4',
      startTime: '2025-11-28T11:00:00',
      endTime: '2025-11-28T11:30:00',
      type: 'video',
      location: 'Zoom',
      attendees: ['cliente@external.com'],
      attendeeCount: 1,
      status: 'confirmed',
      conflict: true, // Detectado conflicto
      reminders: [10],
      color: '#0891B2',
      createdAt: '2025-11-22T14:30:00',
    },
    {
      id: 3,
      title: 'Revisión de Proyecto',
      description: 'Sprint review y planning',
      startTime: '2025-11-28T14:00:00',
      endTime: '2025-11-28T15:30:00',
      type: 'meeting',
      location: 'Sala de Juntas 2',
      attendees: ['equipo@empresa.com'],
      attendeeCount: 8,
      status: 'confirmed',
      conflict: false,
      reminders: [30, 120],
      color: '#0891B2',
      createdAt: '2025-11-15T10:00:00',
    },
    {
      id: 4,
      title: 'Presentación trimestral',
      description: 'Resultados Q4 2025',
      startTime: '2025-11-29T09:00:00',
      endTime: '2025-11-29T10:30:00',
      type: 'meeting',
      location: 'Auditorio Principal',
      attendees: ['direccion@empresa.com'],
      attendeeCount: 25,
      status: 'pending',
      conflict: false,
      reminders: [60, 1440], // 1 hora y 1 día antes
      color: '#0891B2',
      createdAt: '2025-11-10T16:00:00',
    },
  ];

  // Aplicar filtros
  let filtered = mockAppointments;

  if (filters.date) {
    filtered = filtered.filter(apt => apt.startTime.startsWith(filters.date));
  }

  if (filters.type) {
    filtered = filtered.filter(apt => apt.type === filters.type);
  }

  if (filters.conflictsOnly) {
    filtered = filtered.filter(apt => apt.conflict === true);
  }

  console.log('[ASISTENTE] Citas obtenidas (MOCK):', filtered.length);
  return filtered;
}

/**
 * Crea una nueva cita
 * @param {Object} appointmentData - Datos de la cita
 * @param {string} appointmentData.title - Título de la cita
 * @param {string} appointmentData.startTime - Hora inicio (ISO 8601)
 * @param {string} appointmentData.endTime - Hora fin (ISO 8601)
 * @param {string} appointmentData.type - Tipo de cita
 * @param {string} appointmentData.location - Ubicación
 * @param {Array<string>} appointmentData.attendees - Lista de emails
 * @returns {Promise<Object>} Cita creada
 * 
 * @TODO: Validar que no haya conflictos de horario
 * @TODO: Enviar invitaciones por email a participantes
 * @TODO: Crear recordatorios automáticos
 * @TODO: Sincronizar con calendario externo
 */
export async function createAppointment(appointmentData) {
  await new Promise(resolve => setTimeout(resolve, 800));

  // Validación básica
  if (!appointmentData.title || !appointmentData.startTime || !appointmentData.endTime) {
    throw new Error('Título, hora de inicio y hora de fin son obligatorios');
  }

  // Si Supabase está configurado, guardar en DB
  if (supabase) {
    try {
      const newAppointment = {
        title: appointmentData.title,
        start_time: appointmentData.startTime,
        end_time: appointmentData.endTime,
        type: appointmentData.type || 'meeting',
        location: appointmentData.location || '',
        attendees: appointmentData.attendees || [],
        attendee_count: appointmentData.attendees?.length || 0,
        status: 'confirmed',
        conflict: false,
        reminders: [15, 60],
        color: '#0891B2',
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert([newAppointment])
        .select()
        .single();

      if (error) throw error;

      console.log('[ASISTENTE] Cita creada en SUPABASE:', data.id);
      
      // Transformar nombres de columnas snake_case a camelCase para frontend
      return {
        id: data.id,
        title: data.title,
        startTime: data.start_time,
        endTime: data.end_time,
        type: data.type,
        location: data.location,
        attendees: data.attendees,
        attendeeCount: data.attendee_count,
        status: data.status,
        conflict: data.conflict,
        reminders: data.reminders,
        color: data.color,
        createdAt: data.created_at,
      };
    } catch (error) {
      console.error('[ASISTENTE] Error creando cita en Supabase:', error);
      throw new Error('No se pudo crear la cita: ' + error.message);
    }
  }

  // Fallback: Mock si no hay Supabase
  const newAppointment = {
    id: Date.now(),
    ...appointmentData,
    status: 'confirmed',
    conflict: false,
    attendeeCount: appointmentData.attendees?.length || 0,
    reminders: [15, 60], // Por defecto
    color: '#0891B2',
    createdAt: new Date().toISOString(),
  };

  console.log('[ASISTENTE] Cita creada (MOCK):', newAppointment.title);
  return newAppointment;
}

/**
 * Elimina una cita
 * @param {number} appointmentId - ID de la cita a eliminar
 * @returns {Promise<boolean>} True si se eliminó correctamente
 * 
 * @TODO: Enviar notificación de cancelación a participantes
 * @TODO: Eliminar de calendarios sincronizados
 */
export async function deleteAppointment(appointmentId) {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!appointmentId) {
    throw new Error('ID de cita es obligatorio');
  }

  // Si Supabase está configurado, eliminar de DB
  if (supabase) {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) throw error;

      console.log('[ASISTENTE] Cita eliminada de SUPABASE:', appointmentId);
      return true;
    } catch (error) {
      console.error('[ASISTENTE] Error eliminando cita de Supabase:', error);
      throw new Error('No se pudo eliminar la cita: ' + error.message);
    }
  }

  // Fallback: Mock si no hay Supabase
  console.log('[ASISTENTE] Cita eliminada (MOCK):', appointmentId);
  return true;
}

/**
 * Detecta conflictos de horario en las citas
 * @param {string} startTime - Hora inicio nueva cita (ISO 8601)
 * @param {string} endTime - Hora fin nueva cita (ISO 8601)
 * @param {number} excludeId - ID de cita a excluir (para ediciones)
 * @returns {Promise<Array>} Lista de citas en conflicto
 * 
 * @TODO: Conectar con Supabase
 * @TODO: Query complejo para detectar overlaps
 * @TODO: Considerar tiempo de traslado entre ubicaciones
 * @TODO: Sugerir horarios alternativos
 * @TODO: Implementar lógica de buffer time (15 min entre citas)
 */
export async function detectConflicts(startTime, endTime, excludeId = null) {
  await new Promise(resolve => setTimeout(resolve, 400));

  // Simular detección de conflictos
  const conflicts = [
    {
      id: 2,
      title: 'Llamada de seguimiento',
      startTime: startTime,
      endTime: endTime,
      reason: 'Horario superpuesto',
    },
  ];

  // En mock, 30% de probabilidad de conflicto
  const hasConflict = Math.random() < 0.3;

  console.log('[ASISTENTE] Conflictos detectados (MOCK):', hasConflict ? conflicts.length : 0);
  return hasConflict ? conflicts : [];
}

/**
 * Sincroniza citas con calendario externo (Google Calendar, Outlook)
 * @param {string} provider - Proveedor: 'google' | 'outlook' | 'apple'
 * @param {Object} options - Opciones de sincronización
 * @param {boolean} options.bidirectional - Sincronización bidireccional
 * @param {string} options.calendarId - ID del calendario específico
 * @returns {Promise<Object>} Resultado de sincronización
 * 
 * @TODO: Implementar OAuth2 para Google Calendar
 * @TODO: Implementar OAuth2 para Microsoft Graph (Outlook)
 * @TODO: Detectar y resolver conflictos de sincronización
 * @TODO: Manejar eventos recurrentes
 * @TODO: Implementar webhook para actualizaciones en tiempo real
 */
export async function syncCalendar(provider, options = {}) {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const result = {
    provider,
    success: true,
    synced: 12,
    conflicts: 1,
    lastSync: new Date().toISOString(),
  };

  console.log('[ASISTENTE] Calendario sincronizado (MOCK):', provider, result.synced, 'eventos');
  return result;
}
