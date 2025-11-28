# 🚀 INSTRUCCIONES PARA CONECTAR SUPABASE

## PASO 1: CREAR PROYECTO EN SUPABASE (2 minutos)

1. Ve a: https://supabase.com
2. Click en "Start your project"
3. Inicia sesión con GitHub
4. Click en "New Project"
5. Nombre del proyecto: `luci-total`
6. Contraseña de la base de datos: (guárdala bien)
7. Región: `South America (São Paulo)` (más cercana a México)
8. Click en "Create new project"
9. Espera 2-3 minutos mientras se crea...

---

## PASO 2: OBTENER CREDENCIALES (1 minuto)

1. Una vez creado el proyecto, ve a:
   **Settings** (⚙️ en el sidebar izquierdo) → **API**

2. Verás dos valores importantes:

   **Project URL:**
   ```
   https://xxxxxxxxxxx.supabase.co
   ```
   
   **anon public (API Key):**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
   ```

3. Cópialos

---

## PASO 3: PEGAR EN .ENV (30 segundos)

1. Abre el archivo `.env` en tu proyecto
2. Pega tus credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Guarda el archivo

---

## PASO 4: CREAR TABLAS EN SUPABASE (1 minuto)

1. En Supabase, ve a:
   **SQL Editor** (en el sidebar izquierdo)

2. Click en "+ New query"

3. Abre el archivo `supabase-schema.sql` de tu proyecto

4. Copia TODO el contenido del archivo

5. Pégalo en el editor SQL de Supabase

6. Click en "Run" (▶️)

7. Verás el mensaje: "Success. No rows returned"

---

## PASO 5: VERIFICAR (30 segundos)

1. Ve a **Table Editor** en Supabase

2. Deberías ver estas tablas creadas:
   - ✅ user_profiles
   - ✅ appointments
   - ✅ reminders
   - ✅ tasks
   - ✅ communications
   - ✅ time_entries
   - ✅ integrations
   - ✅ team_members
   - ✅ conversation_history

---

## PASO 6: REINICIAR PROYECTO (10 segundos)

En tu terminal, detén el servidor (Ctrl+C) y vuelve a iniciarlo:

```bash
npm run dev
```

Deberías ver en la consola:
```
✅ Supabase conectado correctamente
```

---

## ¡LISTO! 🎉

Ahora tu Asistente Personal está VIVO y conectado a Supabase.

### Para verificar que funciona:

1. Abre http://localhost:3000
2. Ve al módulo "Asistente Personal"
3. Entra a "Citas"
4. Crea una nueva cita
5. Ve a Supabase → Table Editor → appointments
6. ¡Deberías ver tu cita guardada!

---

## ¿PROBLEMAS?

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Invalid API key"
- Verifica que copiaste bien la key completa
- No debe tener espacios al inicio o final
- Debe empezar con `eyJ...`

### "Network error"
- Verifica tu conexión a internet
- Verifica que el proyecto de Supabase esté activo

---

**¿LISTO PARA CONTINUAR?**

Cuando tengas Supabase configurado, dime "listo" y actualizo los servicios para usar la DB real en lugar del mock. 🚀
