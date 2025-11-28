-- =====================================================
-- SOLUCIÓN DEFINITIVA - BYPASS RLS PARA SETUP INICIAL
-- =====================================================

-- 1. DESACTIVAR RLS TEMPORALMENTE
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces DISABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_settings DISABLE ROW LEVEL SECURITY;

-- 2. CREAR TODO CON TU USER ID
DO $$
DECLARE
  v_profile_id UUID;
  v_workspace_id UUID;
BEGIN
  -- Crear o obtener perfil existente
  INSERT INTO user_profiles (user_id, display_name, role)
  VALUES ('ef8ddd56-fc9f-47f5-b0ee-7b1cdd76bb06', 'Patricia Garibay', 'owner')
  ON CONFLICT (user_id) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO v_profile_id;
  
  RAISE NOTICE 'Profile ID: %', v_profile_id;
  
  -- Crear workspace
  INSERT INTO workspaces (owner_id, name, assistant_name, plan_type, active_modules)
  VALUES (
    v_profile_id,
    'L.U.C.I Sistema',
    'L.U.C.I',
    'enterprise',
    '["agenda", "tasks", "contacts", "documents", "communications", "finances", "asistente", "dashboard"]'::jsonb
  )
  RETURNING id INTO v_workspace_id;
  
  RAISE NOTICE 'Workspace ID: %', v_workspace_id;
  
  -- Agregar membership
  INSERT INTO workspace_members (workspace_id, user_id, role, permissions)
  VALUES (
    v_workspace_id,
    v_profile_id,
    'owner',
    '{"read": true, "write": true, "delete": true, "admin": true}'::jsonb
  );
  
  -- Crear settings
  INSERT INTO workspace_settings (workspace_id, language, timezone, voice_enabled)
  VALUES (
    v_workspace_id,
    'es',
    'America/Mexico_City',
    true
  );
  
  RAISE NOTICE '✅ TODO LISTO! Workspace: %', v_workspace_id;
END $$;

-- 3. REACTIVAR RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_settings ENABLE ROW LEVEL SECURITY;

-- 4. VERIFICAR
SELECT 
  w.id as workspace_id,
  w.name,
  w.assistant_name,
  w.plan_type,
  up.display_name as owner_name,
  wm.role as your_role,
  w.created_at
FROM workspaces w
INNER JOIN user_profiles up ON up.id = w.owner_id
INNER JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = up.id
LIMIT 1;
