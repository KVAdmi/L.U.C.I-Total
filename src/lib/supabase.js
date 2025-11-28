import { createClient } from '@supabase/supabase-js';

// Obtener credenciales del .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que las credenciales existan
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ SUPABASE NO CONFIGURADO - Usando modo MOCK');
  console.warn('📋 Para conectar con Supabase:');
  console.warn('   1. Ve a https://supabase.com/dashboard');
  console.warn('   2. Copia tus credenciales');
  console.warn('   3. Pégalas en el archivo .env');
  console.warn('   4. Ejecuta el SQL en supabase-schema.sql');
}

// Crear cliente de Supabase
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Helper para verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Export default para compatibilidad
export default supabase;

// ========================================
// MOCK AUTH (Fallback si no hay Supabase)
// ========================================
const MOCK_USER = {
  id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  email: 'alex@empresa.com',
  user_metadata: {
    name: 'Alex Ejecutivo',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  },
};

const LOCAL_STORAGE_KEY = 'supabase.auth.token';

const mockDbFunctions = {
  select: async () => ({ data: [], error: null }),
  insert: async (data) => ({ data: [data], error: null }),
  update: async () => ({ data: [], error: null }),
  delete: async () => ({ data: [], error: null }),
};

// Mock Auth object (solo si no hay Supabase configurado)
const mockAuth = {
  /**
   * Mock sign-in function.
   * Sets a mock user session in localStorage.
   */
  signInWithPassword: async ({ email, password }) => {
    console.log(`Mock sign-in attempt for email: ${email}`);
    // In a real scenario, you'd validate password. Here, we just simulate success.
    if (email && password) {
      const session = {
        user: MOCK_USER,
        access_token: `mock_token_${Date.now()}`,
        expires_at: Date.now() + 3600 * 1000,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
      return { data: { session }, error: null };
    }
    return { data: { session: null }, error: { message: 'Invalid credentials' } };
  },

  /**
   * Mock sign-out function.
   * Clears the user session from localStorage.
   */
  signOut: async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return { error: null };
  },

  /**
   * Mock get session function.
   * Retrieves the current user session from localStorage.
   */
  getSession: async () => {
    try {
      const sessionStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        // Check for expiration
        if (session.expires_at > Date.now()) {
          return { data: { session }, error: null };
        }
      }
    } catch (e) {
      return { data: { session: null }, error: e };
    }
    return { data: { session: null }, error: null };
  },

  /**
   * Mock onAuthStateChange listener.
   * This is a simplified version. It calls the callback immediately with the current session state.
   * A full implementation would require a more complex event subscription system.
   */
  onAuthStateChange: (callback) => {
    const handler = async () => {
      const { data: { session } } = await auth.getSession();
      if (session) {
        callback('SIGNED_IN', session);
      } else {
        callback('SIGNED_OUT', null);
      }
    };
    
    // Simulate initial check
    handler();

    // In a real app, you'd listen to storage events, but this is a simplified mock.
    window.addEventListener('storage', (event) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        handler();
      }
    });

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            console.log("Mock onAuthStateChange subscription unsubscribed.");
            window.removeEventListener('storage', handler);
          },
        },
      },
    };
  },
};

// Mock Supabase client object
const supabase = {
  auth,
  /**
   * Mock database table function.
   * @param {string} tableName - The name of the table to query.
   * @returns {object} An object with mock database methods.
   */
  from: (tableName) => {
    console.log(`Mock database query on table: "${tableName}"`);
    return mockDbFunctions;
  },
};

export { supabase };
