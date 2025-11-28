/**
 * @fileoverview Workspace helpers - Multi-tenant support
 * Obtiene el workspace_id del usuario autenticado
 */

import { supabase } from './supabase';

/**
 * Obtiene el workspace_id del usuario actual
 * @returns {Promise<string>} workspace_id UUID
 */
export async function getCurrentWorkspaceId() {
  try {
    // 1. Obtener usuario autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('No authenticated user:', authError);
      return null;
    }

    // 2. Obtener profile_id del user
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('No profile found:', profileError);
      return null;
    }

    // 3. Obtener workspace del usuario
    const { data: membership, error: membershipError } = await supabase
      .from('workspace_members')
      .select('workspace_id')
      .eq('user_id', profile.id)
      .single();

    if (membershipError || !membership) {
      console.error('No workspace membership:', membershipError);
      return null;
    }

    return membership.workspace_id;
  } catch (error) {
    console.error('Error getting workspace:', error);
    return null;
  }
}

/**
 * Obtiene información completa del workspace actual
 * @returns {Promise<Object>} Workspace data
 */
export async function getCurrentWorkspace() {
  try {
    const workspaceId = await getCurrentWorkspaceId();
    if (!workspaceId) return null;

    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('id', workspaceId)
      .single();

    if (error) {
      console.error('Error fetching workspace:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting workspace data:', error);
    return null;
  }
}

/**
 * Obtiene el profile_id del usuario actual
 * @returns {Promise<string>} profile_id UUID
 */
export async function getCurrentProfileId() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) return null;

    return profile.id;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}
