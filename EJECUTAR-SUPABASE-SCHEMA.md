# 🚀 EJECUTAR SCHEMA EN SUPABASE - PASO A PASO

## ⚡ Velocidad startup: 10 minutos para base de datos lista

---

## 📋 PASO 1: Abrir SQL Editor en Supabase

1. Ve a: https://supabase.com/dashboard/project/tzglggilydzahhukxkvq
2. En el menú lateral izquierdo, haz clic en **"SQL Editor"**
3. Click en **"New query"** (botón verde arriba a la derecha)

---

## 📝 PASO 2: Copiar el Schema

1. Abre el archivo `supabase-schema-v2.sql` (está en la raíz del proyecto)
2. **Selecciona TODO el contenido** (Cmd+A)
3. **Copia** (Cmd+C)

---

## ▶️ PASO 3: Ejecutar en Supabase

1. **Pega** todo el SQL en el editor de Supabase (Cmd+V)
2. Click en el botón **"Run"** (o presiona Cmd+Enter)
3. Espera ~30 segundos mientras crea todas las tablas

---

## ✅ PASO 4: Verificar que funcionó

Deberías ver en la consola:
```
Success. No rows returned
```

Luego ve a **"Table Editor"** en el menú lateral y verás:
- ✅ `workspaces`
- ✅ `user_profiles`
- ✅ `workspace_members`
- ✅ `contacts`
- ✅ `appointments` 
- ✅ `tasks`
- ✅ `reminders`
- ✅ `messages`
- ✅ `documents`
- ✅ `integrations`
- ✅ `activity_logs`

---

## 🔐 PASO 5: Crear tu primer Workspace (OPCIONAL)

Si quieres crear un workspace de prueba manualmente:

1. Ve a **SQL Editor** → **New query**
2. Ejecuta:

```sql
-- 1. Obtener tu user_id
SELECT id FROM auth.users WHERE email = 'TU_EMAIL_AQUI';

-- 2. Crear perfil (si no existe)
INSERT INTO user_profiles (user_id, display_name, role) 
VALUES ('TU_USER_ID_AQUI', 'Patricia Garibay', 'admin');

-- 3. Crear workspace
INSERT INTO workspaces (owner_id, name, assistant_name, settings) 
VALUES (
  (SELECT id FROM user_profiles WHERE user_id = 'TU_USER_ID_AQUI'),
  'Mi Empresa',
  'L.U.C.I',
  '{"timezone": "America/Mexico_City", "language": "es"}'::jsonb
);

-- 4. Ver el workspace creado
SELECT * FROM workspaces;
```

---

## 🎯 PASO 6: Conectar la App

El schema ya está. Ahora hay que **actualizar los servicios** para usar Supabase real en vez de mocks.

**Siguiente paso:** Actualizar `src/lib/asistente/appointments.js` para:
- ✅ Conectar con tabla `appointments`
- ✅ Queries con `workspace_id`
- ✅ INSERT, UPDATE, DELETE reales
- ✅ Mantener misma interfaz (sin breaking changes)

---

## 🆘 Si algo falla

**Error: "relation already exists"**
- Ya ejecutaste el schema antes
- Solución: Ve a Table Editor y verifica que las tablas existen

**Error: "permission denied"**
- RLS está bloqueando
- Solución temporal: En cada tabla → Settings → Disable RLS (solo para desarrollo)

**Error: "syntax error"**
- Verifica que copiaste TODO el archivo completo
- Asegúrate de no tener queries anteriores en el editor

---

## 📊 Estructura creada:

```
📁 MULTI-TENANT
├── workspaces (contenedor principal)
├── workspace_members (usuarios por workspace)
├── user_profiles (extensión de auth.users)
│
📁 DATOS PRINCIPALES
├── contacts (contactos)
├── appointments (citas/agenda)
├── tasks (tareas)
├── reminders (recordatorios)
│
📁 COMUNICACIONES
├── messages (emails, WhatsApp, SMS)
│
📁 DOCUMENTOS
├── documents (archivos y docs)
│
📁 SISTEMA
├── integrations (APIs externas)
└── activity_logs (auditoría)
```

---

## ⚡ TIEMPO ESTIMADO: 5-10 minutos
## 🎯 RESULTADO: Base de datos enterprise-grade lista para producción

---

**¿Listo?** Avísame cuando lo ejecutes y te ayudo con el siguiente paso: migrar los services de mock a Supabase real.
