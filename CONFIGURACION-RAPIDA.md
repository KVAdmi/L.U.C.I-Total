# 🚀 GUÍA RÁPIDA DE CONFIGURACIÓN - L.U.C.I Sistema

## ✅ Estado Actual (28 Nov 2025)

### 🎯 Completado
- ✅ Arquitectura multi-tenant con 17 tablas
- ✅ Supabase Auth integrado (login/logout real)
- ✅ 10 servicios de Asistente Personal con workspace_id
- ✅ RLS policies activas en todas las tablas
- ✅ Workspace de prueba creado
- ✅ Sistema de workspace isolation funcionando

### 📊 Base de Datos
- **Proyecto Supabase**: `tzglggilydzahhukxkvq`
- **Región**: South America (São Paulo)
- **Schema**: `supabase-schema-v2.sql` (ejecutado ✅)
- **Workspace de prueba**: `bf6e47ec5-e425-4d50-86e2-c8f5ca108523`

### 👤 Usuario de Prueba
- **Email**: patricia.garibay@luci.mx
- **UUID**: ef8ddd56-fc9f-47f5-b0ee-7b1cdd76bb06
- **Rol**: owner (workspace Patricia Garibay)
- **⚠️ PENDIENTE**: Establecer password en Supabase Dashboard

---

## 🔧 Pasos para Configuración Inicial

### 1️⃣ Establecer Password del Usuario
```
1. Ir a: https://supabase.com/dashboard/project/tzglggilydzahhukxkvq/auth/users
2. Buscar: patricia.garibay@luci.mx
3. Click en "..." → "Reset password" o "Edit user"
4. Establecer password: luci2025 (o el que prefieras)
5. Verificar que email esté confirmado
```

### 2️⃣ Verificar Variables de Entorno
El archivo `.env.local` ya está creado con:
```bash
VITE_SUPABASE_URL=https://tzglggilydzahhukxkvq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3️⃣ Iniciar Servidor
```bash
npm run dev
```
Abre: http://localhost:5173

### 4️⃣ Login
- Email: patricia.garibay@luci.mx
- Password: (el que estableciste en paso 1)

---

## 📂 Archivos Clave

### Base de Datos
- `supabase-schema-v2.sql` - Schema completo multi-tenant
- `fix-rls-policies.sql` - Script de bootstrap inicial
- `setup-test-users.sql` - Crear usuarios adicionales

### Código
- `src/lib/workspace.js` - Helpers de workspace (getCurrentWorkspaceId, etc)
- `src/lib/supabase.js` - Cliente Supabase configurado
- `src/contexts/AuthContext.jsx` - Auth real con Supabase
- `src/lib/asistente/*.js` - 10 servicios con workspace support

---

## 🏗️ Arquitectura Multi-Tenant

### Patrón Container-Per-User
Cada cliente paga = 1 workspace completo con:
- ✅ user_profiles
- ✅ workspaces (config, name, plan_type)
- ✅ workspace_members (roles: owner, admin, member, guest)
- ✅ workspace_settings (preferences personalizadas)

### Aislamiento de Datos
Todas las tablas tienen:
```sql
workspace_id UUID NOT NULL REFERENCES workspaces(id)
```

RLS Policy ejemplo:
```sql
CREATE POLICY "Users can only access their workspace data"
ON appointments FOR ALL
USING (workspace_id IN (
  SELECT workspace_id FROM workspace_members 
  WHERE user_id = auth.uid()
));
```

### Helper Functions
```javascript
// En cualquier servicio:
const workspaceId = await getCurrentWorkspaceId(); // Obtiene workspace del usuario
const profileId = await getCurrentProfileId();     // Obtiene profile_id

// Filtrar queries:
const { data } = await supabase
  .from('appointments')
  .select('*')
  .eq('workspace_id', workspaceId); // ✅ Solo datos del workspace
```

---

## 📋 Tablas Creadas

### Core (Multi-tenant)
1. `user_profiles` - Perfiles de usuario
2. `workspaces` - Containers (1 por cliente)
3. `workspace_members` - Membresías y roles
4. `workspace_settings` - Configuración personalizada

### Universal Modules (todos con workspace_id)
5. `contacts` - Contactos CRM
6. `appointments` - Citas y reuniones
7. `tasks` - Tareas y to-dos
8. `reminders` - Recordatorios automáticos
9. `communications` - Emails, SMS, WhatsApp
10. `documents` - Gestión documental
11. `financial_records` - Registros financieros
12. `time_entries` - Time tracking
13. `integrations` - Servicios externos
14. `team_members` - Miembros del equipo
15. `conversation_history` - Chat con IA
16. `proactive_suggestions` - Sugerencias de IA

### Pendientes (Industrias Específicas)
- MEDIXIA: pacientes, citas médicas, historiales
- LEXIA: casos, expedientes, audiencias
- SEGUROSIA: pólizas, siniestros, cotizaciones
- CONTAIA: clientes fiscales, declaraciones, facturación

---

## 🔐 Seguridad (RLS)

### ✅ Implementado
- RLS habilitado en todas las tablas
- Políticas workspace-scoped (no cross-tenant access)
- auth.uid() para identificación de usuario
- Cascade deletes (workspace deleted → all data deleted)

### 🛡️ Niveles de Acceso
```sql
-- owner: Full access (CRUD + settings)
-- admin: CRUD en módulos, sin cambiar workspace settings
-- member: CRUD en sus propios records
-- guest: Read-only
```

---

## 🚀 Próximos Pasos

### Inmediato (HOY)
1. ✅ Establecer password usuario de prueba
2. ✅ Login y verificar que funcione
3. ✅ Navegar a Asistente Personal → Citas
4. ✅ Crear nueva cita (INSERT real en Supabase)
5. ✅ Verificar en Supabase Table Editor que aparezca con workspace_id correcto

### Corto Plazo (Esta Semana)
- [ ] Actualizar funciones CREATE en todos los servicios (reminders, tasks, etc)
- [ ] Agregar UPDATE operations con workspace_id validation
- [ ] Testing end-to-end de cada módulo
- [ ] Crear más usuarios de prueba
- [ ] Implementar invitaciones a workspace

### Mediano Plazo
- [ ] Diseñar schemas de industrias (MEDIXIA, LEXIA, SEGUROSIA, CONTAIA)
- [ ] Implementar módulos especializados
- [ ] Dashboard analytics por workspace
- [ ] Sistema de billing (Stripe)
- [ ] Onboarding wizard para nuevos workspaces

---

## 🐛 Troubleshooting

### "Invalid credentials" al hacer login
- Verificar que password esté establecido en Supabase Dashboard
- Verificar que email esté confirmado (email_confirmed_at != NULL)
- Check console browser para ver error exacto

### "No workspace found"
- Verificar que existe registro en `user_profiles` con auth user_id
- Verificar que existe registro en `workspace_members` linking profile → workspace
- Ejecutar query en Supabase SQL Editor:
```sql
SELECT * FROM workspace_members 
WHERE user_id = 'ef8ddd56-fc9f-47f5-b0ee-7b1cdd76bb06';
```

### RLS blocking inserts/updates
- Verificar que policies permitan INSERT para authenticated users
- Usar `workspace_id` del usuario actual, NO hardcodear UUIDs
- Check Supabase logs: Dashboard → Database → Logs

---

## 📞 Contacto

**Owner**: Patricia Garibay  
**Developer**: Sistema L.U.C.I  
**GitHub**: KVAdmi/L.U.C.I-Total  
**Supabase Project**: tzglggilydzahhukxkvq  

---

**Última actualización**: 28 Noviembre 2025, 17:30 hrs
