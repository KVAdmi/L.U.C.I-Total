/**
 * Cliente HTTP base para el módulo Asistente Personal
 * Maneja todas las peticiones HTTP con error handling centralizado
 * 
 * @module asistente/api
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 30000; // 30 segundos

/**
 * Clase de error personalizada para errores de API
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Realiza una petición HTTP con manejo de errores
 * @param {string} endpoint - Endpoint relativo a API_BASE_URL
 * @param {Object} options - Opciones de fetch
 * @returns {Promise<Object>} Respuesta parseada
 * 
 * @TODO: Conectar con backend real cuando esté listo
 * @TODO: Implementar refresh token automático
 * @TODO: Agregar interceptor para logging
 * @TODO: Implementar retry logic para errores de red
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Agregar token de autenticación si existe
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || 'Error en la petición',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Tiempo de espera agotado', 408, {});
    }
    
    if (error instanceof ApiError) {
      throw error;
    }

    // Error de red u otro error
    console.error('Error de red:', error);
    throw new ApiError('Error de conexión', 0, { originalError: error.message });
  }
}

/**
 * Helper para peticiones GET
 */
export const get = (endpoint, options = {}) => 
  apiRequest(endpoint, { ...options, method: 'GET' });

/**
 * Helper para peticiones POST
 */
export const post = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });

/**
 * Helper para peticiones PUT
 */
export const put = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * Helper para peticiones DELETE
 */
export const del = (endpoint, options = {}) =>
  apiRequest(endpoint, { ...options, method: 'DELETE' });

/**
 * Helper para peticiones PATCH
 */
export const patch = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
