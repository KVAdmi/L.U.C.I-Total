-- =====================================================
-- MIGRACIÓN A SCHEMA V2 - WORKSPACE MODEL
-- =====================================================
-- Proyecto: tzglggilydzahhukxkvq
-- Fecha: 2025-11-28
-- 
-- INSTRUCCIONES:
-- Ejecuta estos pasos EN ORDEN en el SQL Editor de Supabase
-- =====================================================

-- =====================================================
-- PASO 1: LIMPIAR SCHEMA ANTERIOR
-- =====================================================
-- Ejecuta esto primero para borrar todas las tablas viejas

DROP TABLE IF EXISTS conversation_history CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
DROP TABLE IF EXISTS time_entries CASCADE;
DROP TABLE IF EXISTS communications CASCADE;
DROP TABLE IF EXISTS reminders CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Borrar funciones viejas si existen
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- =====================================================
-- PASO 2: EJECUTAR SCHEMA V2 COMPLETO
-- =====================================================
-- Ahora ve al archivo supabase-schema-v2.sql
-- Copia TODO su contenido y ejecútalo

-- =====================================================
-- PASO 3: VERIFICAR QUE TODO SE CREÓ
-- =====================================================
-- Ejecuta esto para ver las tablas creadas:

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Deberías ver:
-- appointments
-- communications
-- contacts (NUEVO)
-- conversation_history
-- documents (NUEVO)
-- financial_records (NUEVO)
-- integrations
-- proactive_suggestions (NUEVO)
-- reminders
-- tasks
-- team_members
-- time_entries
-- user_profiles
-- workspace_members (NUEVO)
-- workspace_settings (NUEVO)
-- workspaces (NUEVO)

-- =====================================================
-- PASO 4: CREAR TU PRIMER WORKSPACE
-- =====================================================
-- Después de que veas todas las tablas, ejecuta esto:

-- 1. Crear perfil para tu usuario actual
INSERT INTO user_profiles (user_id, display_name, role)
SELECT 
  auth.uid(), 
  'Patricia Garibay', 
  'owner'
WHERE NOT EXISTS (
  SELECT 1 FROM user_profiles WHERE user_id = auth.uid()
);

-- 2. Crear tu workspace
INSERT INTO workspaces (owner_id, name, assistant_name, plan_type, active_modules)
SELECT 
  up.id,
  'L.U.C.I Sistema',
  'L.U.C.I',
  'enterprise',
  '["agenda", "tasks", "contacts", "documents", "communications", "finances"]'::jsonb
FROM user_profiles up
WHERE up.user_id = auth.uid()
  AND NOT EXISTS (
    SELECT 1 FROM workspaces WHERE owner_id = up.id
  );

-- 3. Agregar como miembro del workspace
INSERT INTO workspace_members (workspace_id, user_id, role, permissions)
SELECT 
  w.id,
  up.id,
  'owner',
  '{"read": true, "write": true, "delete": true, "admin": true}'::jsonb
FROM workspaces w
INNER JOIN user_profiles up ON up.id = w.owner_id
WHERE up.user_id = auth.uid()
  AND NOT EXISTS (
    SELECT 1 FROM workspace_members 
    WHERE workspace_id = w.id AND user_id = up.id
  );

-- 4. Crear settings del workspace
INSERT INTO workspace_settings (workspace_id, language, timezone, voice_enabled)
SELECT 
  w.id,
  'es',
  'America/Mexico_City',
  true
FROM workspaces w
INNER JOIN user_profiles up ON up.id = w.owner_id
WHERE up.user_id = auth.uid()
  AND NOT EXISTS (
    SELECT 1 FROM workspace_settings WHERE workspace_id = w.id
  );

-- =====================================================
-- PASO 5: VERIFICAR TU WORKSPACE
-- =====================================================
-- Ejecuta esto para confirmar que tu workspace está listo:

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
WHERE up.user_id = auth.uid();

-- Deberías ver algo como:
-- workspace_id | name | assistant_name | plan_type | owner_name | your_role | created_at
-- uuid-xxx     | L.U.C.I Sistema | L.U.C.I | enterprise | Patricia Garibay | owner | 2025-11-28...

-- =====================================================
-- PASO 6: CREAR DATOS DE PRUEBA (OPCIONAL)
-- =====================================================
-- Si quieres datos de ejemplo para probar:

-- Contacto de prueba
INSERT INTO contacts (workspace_id, full_name, email, phone, type, created_by)
SELECT 
  w.id,
  'Juan Pérez',
  'juan.perez@example.com',
  '555-1234',
  'person',
  up.id
FROM workspaces w
INNER JOIN user_profiles up ON up.id = w.owner_id
WHERE up.user_id = auth.uid()
LIMIT 1;

-- Cita de prueba
INSERT INTO appointments (workspace_id, title, description, start_time, end_time, type, status, created_by)
SELECT 
  w.id,
  'Reunión de demostración',
  'Primera prueba del sistema',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '1 day' + INTERVAL '1 hour',
  'meeting',
  'scheduled',
  up.id
FROM workspaces w
INNER JOIN user_profiles up ON up.id = w.owner_id
WHERE up.user_id = auth.uid()
LIMIT 1;

-- Tarea de prueba
INSERT INTO tasks (workspace_id, title, description, status, priority, due_date, created_by)
SELECT 
  w.id,
  'Probar sistema L.U.C.I',
  'Verificar que todos los módulos funcionen correctamente',
  'pending',
  'high',
  NOW() + INTERVAL '3 days',
  up.id
FROM workspaces w
INNER JOIN user_profiles up ON up.id = w.owner_id
WHERE up.user_id = auth.uid()
LIMIT 1;

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
-- Si todo salió bien, deberías tener:
-- ✅ 17 tablas creadas
-- ✅ Tu workspace configurado
-- ✅ RLS activo y funcionando
-- ✅ Datos de prueba listos
-- 
-- Siguiente paso: Actualizar los servicios JS para usar workspace_id
-- =====================================================
