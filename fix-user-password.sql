-- =========================================================================
-- SOLUCIÓN RÁPIDA: Establecer Password al Usuario Existente
-- =========================================================================
-- Ejecutar en Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/tzglggilydzahhukxkvq/sql/new
-- =========================================================================

-- Establecer password "Admi2025@" al usuario pgaribay@kodigovivo.com
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admi2025@', gen_salt('bf')),
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  updated_at = NOW()
WHERE email = 'pgaribay@kodigovivo.com';

-- Verificar que se actualizó
SELECT 
  id,
  email,
  encrypted_password IS NOT NULL as has_password,
  email_confirmed_at IS NOT NULL as email_confirmed,
  created_at,
  updated_at
FROM auth.users
WHERE email = 'pgaribay@kodigovivo.com';

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
