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
  console.warn('   3. Pégalas en el archivo .env.local');
  console.warn('   4. Reinicia el servidor (npm run dev)');
}

// Crear cliente de Supabase
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
      },
    })
  : null;

// Helper para verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Export default para compatibilidad
export default supabase;

