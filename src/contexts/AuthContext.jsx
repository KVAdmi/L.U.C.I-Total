
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[AUTH] Error obteniendo sesión:', error);
        } else {
          setSession(currentSession);
          setUser(currentSession?.user || null);
        }
      } catch (error) {
        console.error('[AUTH] Error inicializando autenticación:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('[AUTH] Estado cambió:', event);
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[AUTH] Error en login:', error);
        return { user: null, error };
      }

      console.log('[AUTH] Login exitoso:', data.user.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('[AUTH] Error inesperado en login:', error);
      return { user: null, error };
    }
  };

  const signUp = async ({ email, password, userData = {} }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        console.error('[AUTH] Error en registro:', error);
        return { user: null, error };
      }

      console.log('[AUTH] Registro exitoso:', data.user.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('[AUTH] Error inesperado en registro:', error);
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[AUTH] Error en logout:', error);
        return { error };
      }

      console.log('[AUTH] Logout exitoso');
      return { error: null };
    } catch (error) {
      console.error('[AUTH] Error inesperado en logout:', error);
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('[AUTH] Error solicitando reset:', error);
        return { error };
      }

      console.log('[AUTH] Email de reset enviado a:', email);
      return { data, error: null };
    } catch (error) {
      console.error('[AUTH] Error inesperado en reset:', error);
      return { error };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('[AUTH] Error actualizando password:', error);
        return { error };
      }

      console.log('[AUTH] Password actualizado');
      return { data, error: null };
    } catch (error) {
      console.error('[AUTH] Error inesperado actualizando password:', error);
      return { error };
    }
  };
  
  const value = { 
    user, 
    session,
    loading,
    signIn, 
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

