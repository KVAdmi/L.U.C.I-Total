-- =========================================================================
-- Script para establecer password al usuario de prueba
-- =========================================================================
-- Ejecutar este script en Supabase SQL Editor
-- Usuario: patricia.garibay@luci.mx (UUID: ef8ddd56-fc9f-47f5-b0ee-7b1cdd76bb06)
-- =========================================================================

-- OPCIÓN 1: Establecer password directamente (requiere acceso a auth schema)
-- Reemplaza 'TU_PASSWORD_AQUI' con el password deseado
-- UPDATE auth.users 
-- SET encrypted_password = crypt('TU_PASSWORD_AQUI', gen_salt('bf'))
-- WHERE id = 'ef8ddd56-fc9f-47f5-b0ee-7b1cdd76bb06';

-- OPCIÓN 2: Usar Supabase Dashboard (RECOMENDADO)
-- 1. Ve a: https://supabase.com/dashboard/project/tzglggilydzahhukxkvq/auth/users
-- 2. Busca el usuario: patricia.garibay@luci.mx
-- 3. Click en los 3 puntos → "Send password reset email"
-- 4. O directamente edita y establece nuevo password

-- =========================================================================
-- CREAR USUARIOS ADICIONALES DE PRUEBA
-- =========================================================================

-- Usuario de prueba 1: Desarrollador
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
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
  'dev@luci.mx',
  crypt('desarrollo123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Developer User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Usuario de prueba 2: Cliente VIP
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
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
  'cliente@empresa.com',
  crypt('cliente123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Cliente VIP"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- =========================================================================
-- Verificar usuarios creados
-- =========================================================================
SELECT 
  id,
  email,
  email_confirmed_at IS NOT NULL as confirmed,
  created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- =========================================================================
-- NOTA IMPORTANTE:
-- =========================================================================
-- Para poder hacer INSERT en auth.users, necesitas ejecutar esto en 
-- Supabase SQL Editor con permisos de postgres (superuser).
--
-- Si no funciona, la forma más fácil es:
-- 1. Ir a Dashboard → Authentication → Users
-- 2. Click en "Add user" (botón verde)
-- 3. Ingresar email y password
-- 4. Marcar "Auto Confirm User"
-- =========================================================================
