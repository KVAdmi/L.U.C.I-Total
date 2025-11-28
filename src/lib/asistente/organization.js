/**
 * Servicio de organización para Asistente Personal
 * Maneja tareas, proyectos y organización de trabajo
 * 
 * @module asistente/organization
 */

import { supabase } from '../supabase.js';
import { getCurrentWorkspaceId, getCurrentProfileId } from '../workspace.js';

/**
 * Obtiene todas las tareas con filtros
 * @param {Object} filters - Filtros opcionales
 * @param {string} filters.status - Estado: 'todo' | 'in-progress' | 'done' | 'blocked'
 * @param {string} filters.priority - Prioridad: 'low' | 'medium' | 'high' | 'urgent'
 * @param {string} filters.projectId - Filtrar por proyecto
 * @param {string} filters.assignedTo - Filtrar por asignado
 * @returns {Promise<Array>} Lista de tareas
 * 
 * @TODO: Conectar con Supabase
 * @TODO: Tabla: 'tasks'
 * @TODO: Implementar subtareas anidadas
 * @TODO: Agregar estimación de tiempo
 * @TODO: Implementar dependencias entre tareas
 */
export async function getTasks(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 600));

  const mockTasks = [
    // HIGH PRIORITY
    {
      id: 1,
      title: 'Revisar propuesta de expansión Andorra',
      description: 'Análisis financiero y viabilidad del proyecto',
      status: 'pending',
      priority: 'high',
      category: 'business',
      delegable: false,
      due_date: '2025-11-28T18:00:00',
      tags: ['estrategia', 'internacional'],
      created_at: '2025-11-26T10:00:00',
    },
    {
      id: 2,
      title: 'Hablar con el notario sobre escrituras',
      description: 'Firma de documentos legales pendientes',
      status: 'pending',
      priority: 'high',
      category: 'business',
      delegable: false,
      due_date: '2025-11-28T16:00:00',
      tags: ['legal', 'urgente'],
      created_at: '2025-11-25T14:00:00',
    },
    // PERSONAL
    {
      id: 3,
      title: 'Pedirle a la señora del aseo limpiar terraza',
      description: 'Preparar terraza para evento del fin de semana',
      status: 'pending',
      priority: 'medium',
      category: 'personal',
      delegable: false,
      due_date: '2025-11-29T10:00:00',
      tags: ['casa'],
      created_at: '2025-11-27T08:00:00',
    },
    {
      id: 4,
      title: 'Revisar cotización seguro auto',
      description: 'Comparar opciones de renovación anual',
      status: 'pending',
      priority: 'medium',
      category: 'personal',
      delegable: false,
      due_date: '2025-11-30T18:00:00',
      tags: ['seguros', 'personal'],
      created_at: '2025-11-26T12:00:00',
    },
    // DELEGABLES
    {
      id: 5,
      title: 'Enviar reporte mensual al equipo',
      description: 'Compilar métricas de noviembre',
      status: 'pending',
      priority: 'medium',
      category: 'business',
      delegable: true,
      due_date: '2025-11-29T17:00:00',
      tags: ['reportes', 'equipo'],
      created_at: '2025-11-25T09:00:00',
    },
    {
      id: 6,
      title: 'Agendar mantenimiento de oficina',
      description: 'Coordinar con facilities para diciembre',
      status: 'pending',
      priority: 'low',
      category: 'business',
      delegable: true,
      due_date: '2025-12-02T15:00:00',
      tags: ['administración'],
      created_at: '2025-11-24T11:00:00',
    },
  ];

  let filtered = mockTasks;

  if (filters.status) {
    filtered = filtered.filter(t => t.status === filters.status);
  }

  if (filters.priority) {
    filtered = filtered.filter(t => t.priority === filters.priority);
  }

  if (filters.projectId) {
    filtered = filtered.filter(t => t.projectId === filters.projectId);
  }

  console.log('[ASISTENTE] Tareas obtenidas (MOCK):', filtered.length);
  return filtered;
}

/**
 * Crea una nueva tarea
 * @param {Object} taskData - Datos de la tarea
 * @param {string} taskData.title - Título
 * @param {string} taskData.description - Descripción
 * @param {string} taskData.priority - Prioridad
 * @param {string} taskData.dueDate - Fecha límite
 * @param {string} taskData.projectId - ID del proyecto
 * @returns {Promise<Object>} Tarea creada
 * 
 * @TODO: Conectar con Supabase
 * @TODO: INSERT into tasks
 * @TODO: Detectar prioridad automáticamente con IA
 * @TODO: Sugerir fecha límite basada en workload
 * @TODO: Crear recordatorios automáticos
 * @TODO: Notificar a asignados
 */
export async function createTask(taskData) {
  await new Promise(resolve => setTimeout(resolve, 700));

  if (!taskData.title) {
    throw new Error('Título es obligatorio');
  }

  const newTask = {
    id: Date.now(),
    ...taskData,
    status: 'todo',
    progress: 0,
    assignedTo: taskData.assignedTo || 'tu@empresa.com',
    tags: taskData.tags || [],
    createdAt: new Date().toISOString(),
  };

  console.log('[ASISTENTE] Tarea creada (MOCK):', newTask.title);
  return newTask;
}

/**
 * Actualiza una tarea existente
 * @param {number} taskId - ID de la tarea
 * @param {Object} updates - Campos a actualizar
 * @param {string} updates.status - Nuevo estado
 * @param {number} updates.progress - Progreso (0-100)
 * @returns {Promise<Object>} Tarea actualizada
 * 
 * @TODO: Conectar con Supabase
 * @TODO: UPDATE tasks SET ... WHERE id = taskId
 * @TODO: Registrar historial de cambios
 * @TODO: Notificar a stakeholders de cambios importantes
 * @TODO: Actualizar dependencias si se completa
 * @TODO: Recalcular fechas de proyecto si cambia fecha límite
 */
export async function updateTask(taskId, updates) {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!taskId) {
    throw new Error('ID de tarea es obligatorio');
  }

  const updated = {
    id: taskId,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  console.log('[ASISTENTE] Tarea actualizada (MOCK):', taskId);
  return updated;
}

/**
 * Asigna una tarea a un miembro del equipo
 * @param {number} taskId - ID de la tarea
 * @param {string} userId - ID del usuario a asignar
 * @param {Object} options - Opciones
 * @param {boolean} options.notifyUser - Enviar notificación al usuario
 * @param {string} options.message - Mensaje personalizado
 * @returns {Promise<Object>} Resultado de asignación
 * 
 * @TODO: Conectar con Supabase
 * @TODO: Verificar disponibilidad del usuario
 * @TODO: Enviar notificación por email/push
 * @TODO: Actualizar workload del usuario
 * @TODO: Registrar en log de actividad
 */
export async function assignTask(taskId, userId, options = {}) {
  await new Promise(resolve => setTimeout(resolve, 600));

  if (!taskId || !userId) {
    throw new Error('ID de tarea y usuario son obligatorios');
  }

  const result = {
    taskId,
    assignedTo: userId,
    assignedAt: new Date().toISOString(),
    notified: options.notifyUser !== false,
  };

  console.log('[ASISTENTE] Tarea asignada (MOCK):', taskId, 'a', userId);
  return result;
}
