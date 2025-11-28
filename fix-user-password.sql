-- =========================================================================
-- CREAR USUARIO COMPLETO EN SUPABASE
-- =========================================================================
-- Ejecutar en Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/tzglggilydzahhukxkvq/sql/new
-- =========================================================================

-- 1. CREAR USUARIO EN AUTH
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'pgaribay@kodigovivo.com',
  crypt('Admi2025@', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Patricia Garibay"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (email) 
DO UPDATE SET 
  encrypted_password = crypt('Admi2025@', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW();

-- 2. CREAR PROFILE
INSERT INTO public.user_profiles (user_id, email, full_name, created_at, updated_at)
SELECT 
  id,
  email,
  'Patricia Garibay',
  NOW(),
  NOW()
FROM auth.users 
WHERE email = 'pgaribay@kodigovivo.com'
ON CONFLICT (user_id) DO NOTHING;

-- 3. CREAR WORKSPACE
INSERT INTO public.workspaces (id, name, owner_id, plan_type, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  'Kódigo Vivo Workspace',
  up.id,
  'enterprise',
  NOW(),
  NOW()
FROM public.user_profiles up
JOIN auth.users au ON au.id = up.user_id
WHERE au.email = 'pgaribay@kodigovivo.com'
ON CONFLICT DO NOTHING
RETURNING id as workspace_id;

-- 4. ASIGNAR MEMBERSHIP (ejecutar después de ver workspace_id arriba)
DO $$
DECLARE
  v_user_profile_id UUID;
  v_workspace_id UUID;
BEGIN
  -- Obtener IDs
  SELECT up.id INTO v_user_profile_id
  FROM public.user_profiles up
  JOIN auth.users au ON au.id = up.user_id
  WHERE au.email = 'pgaribay@kodigovivo.com';
  
  SELECT id INTO v_workspace_id
  FROM public.workspaces
  WHERE owner_id = v_user_profile_id;
  
  -- Crear membership
  INSERT INTO public.workspace_members (workspace_id, user_id, role, created_at)
  VALUES (v_workspace_id, v_user_profile_id, 'owner', NOW())
  ON CONFLICT DO NOTHING;
  
  -- Crear settings
  INSERT INTO public.workspace_settings (workspace_id, created_at, updated_at)
  VALUES (v_workspace_id, NOW(), NOW())
  ON CONFLICT DO NOTHING;
END $$;

-- 5. VERIFICAR TODO
SELECT 
  au.id as user_id,
  au.email,
  au.encrypted_password IS NOT NULL as has_password,
  au.email_confirmed_at IS NOT NULL as email_confirmed,
  up.id as profile_id,
  w.id as workspace_id,
  w.name as workspace_name,
  wm.role as workspace_role
FROM auth.users au
LEFT JOIN public.user_profiles up ON up.user_id = au.id
LEFT JOIN public.workspace_members wm ON wm.user_id = up.id
LEFT JOIN public.workspaces w ON w.id = wm.workspace_id
WHERE au.email = 'pgaribay@kodigovivo.com';

-- =========================================================================
-- RESULTADO ESPERADO:
-- =========================================================================
-- email: pgaribay@kodigovivo.com
-- has_password: true ✅
-- email_confirmed: true ✅
-- =========================================================================

-- =========================================================================
-- AHORA PUEDES HACER LOGIN CON:
-- =========================================================================
-- Email: pgaribay@kodigovivo.com
-- Password: Admi2025@
-- =========================================================================
