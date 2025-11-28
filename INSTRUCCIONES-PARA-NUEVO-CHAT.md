# 🚀 INSTRUCCIONES PARA CONTINUAR DESARROLLO L.U.C.I

**⚠️ IDIOMA:** TODO en español - código, comentarios, variables, mensajes, documentación.

**IMPORTANTE:** Lee primero el archivo `RESUMEN-CHAT-COMPLETO.md` para contexto completo.

---

## 🎯 MISIÓN CRÍTICA

El usuario tiene **3 módulos principales YA COMPLETOS visualmente** pero SIN arquitectura de backend:
- ✅ **MEDIXIA** (5 submódulos médicos)
- ✅ **LEXIA** (5 submódulos legales)  
- ✅ **ASISTENTE PERSONAL** (10 submódulos) ⭐ **NO OLVIDAR ESTE**

**Tu trabajo:** Crear toda la capa de servicios (`/lib/`) con funciones dummy que retornen mock data pero con firma correcta para conectar después.

---

## ⚠️ REGLAS DE ORO (NO NEGOCIABLES)

1. **NUNCA eliminar código existente** - Solo agregar capa de servicios
2. **El cliente NO tiene Supabase listo** - Todo debe ser dummy/mock por ahora
3. **Cada función DEBE tener:**
   - JSDoc completo con descripción
   - Parámetros con tipos documentados
   - Return type documentado
   - Comentarios `@TODO: Conectar con Supabase aquí` claros
   - Implementación dummy que retorne mock data realista
   - `await new Promise(resolve => setTimeout(resolve, 500))` para simular red
4. **NO agregar nuevas librerías** - Usar solo lo que ya está
5. **Mantener tema AL-E Crystal** intacto - No tocar estilos
6. **Cliente es "la firma más importante en México"** - Calidad profesional obligatoria
7. **Ser RÁPIDO** - El usuario se queja de velocidad lenta

---

## 📂 ESTRUCTURA DE SERVICIOS A CREAR

### Paso 1: Crear carpetas base
```bash
mkdir -p src/lib/medixia
mkdir -p src/lib/lexia
mkdir -p src/lib/asistente
```

### Paso 2: MEDIXIA (~15 funciones)
```
/src/lib/medixia/
  ├── api.js              # Cliente HTTP base + error handling
  ├── patients.js         # getPatients, createPatient, updatePatient, deletePatient, getHistory
  ├── appointments.js     # getAppointments, createAppointment, updateAppointment, syncCalendar
  ├── prescriptions.js    # getPrescriptions, createPrescription, checkInteractions, generatePDF
  ├── diagnostics.js      # getDiagnostics, searchCIE10, createDiagnostic, getSuggestions
  ├── notes.js            # getNotes, createNote, updateNote, transcribeAudio, generateSummary
  └── auth.js             # login, logout, checkAuth, getUserRole
```

### Paso 3: LEXIA (~20 funciones)
```
/src/lib/lexia/
  ├── api.js              # Cliente HTTP base + error handling
  ├── cases.js            # getCases, createCase, updateCase, deleteCase, searchCases
  ├── documents.js        # getTemplates, generateDocument, uploadFile, reviewDocument
  ├── calendar.js         # getPlazos, createPlazo, updatePlazo, syncCalendar, detectConflicts
  ├── clients.js          # getClients, createClient, updateClient, linkContract, getHistory
  ├── billing.js          # calculateMinuta, saveBilling, generatePDF, sendInvoice, getHistory
  ├── damages.js          # calculateDanos, saveDamage, generateReport, getHistory
  ├── ocr.js              # processDocument, extractText, classifyDocument, saveExtraction
  ├── jurisprudencia.js   # searchDOF, searchCodigoCivil, searchConstitucion, searchCriteria
  └── auth.js             # login, logout, checkAuth, getUserRole
```

### Paso 4: ASISTENTE (~30 funciones) ⭐ **EL MÁS GRANDE**
```
/src/lib/asistente/
  ├── api.js              # Cliente HTTP base + error handling
  ├── appointments.js     # getAppointments, createAppointment, deleteAppointment, detectConflicts, syncCalendar
  ├── reminders.js        # getReminders, createReminder, updateReminder, deleteReminder, sendNotification
  ├── communications.js   # sendEmail, sendSMS, sendWhatsApp, getMessages, getHistory
  ├── organization.js     # getTasks, createTask, updateTask, deleteTask, getProjects, assignTask
  ├── productivity.js     # getStats, trackTime, generateReport, getInsights, getDailyBreakdown
  ├── integrations.js     # connectService, disconnectService, syncData, getConnections, testConnection
  ├── proactive.js        # getSuggestions, acceptSuggestion, declineSuggestion, optimizeAgenda, detectConflicts
  ├── coordination.js     # getTeam, assignTask, getResources, scheduleTeam, getAvailability
  ├── personal.js         # getProfile, updateProfile, getPreferences, updatePreferences, uploadAvatar
  ├── conversational.js   # sendMessage, getResponse, getHistory, analyzeIntent, clearHistory
  └── auth.js             # login, logout, checkAuth, getUserRole
```

---

## 📝 EJEMPLO DE FUNCIÓN PERFECTA

```javascript
/**
 * Obtiene todos los pacientes del sistema médico
 * @param {Object} filters - Filtros opcionales
 * @param {string} filters.search - Búsqueda por nombre o expediente
 * @param {string} filters.status - Estado: 'activo' | 'inactivo'
 * @param {number} filters.limit - Límite de resultados (default: 50)
 * @param {number} filters.offset - Offset para paginación (default: 0)
 * @returns {Promise<Array>} Lista de pacientes
 * 
 * @TODO: Conectar con Supabase
 * @TODO: Tabla: 'pacientes'
 * @TODO: Implementar paginación real con limit/offset
 * @TODO: Agregar ordenamiento por fecha_ultima_consulta
 * @TODO: Implementar caché con React Query o SWR
 * @TODO: Agregar manejo de errores con try-catch
 */
export async function getPatients(filters = {}) {
  // Simular delay de red (300-800ms realista)
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data - REEMPLAZAR cuando Supabase esté listo
  const mockPatients = [
    {
      id: 1,
      expediente: 'EXP-2024-001',
      nombre: 'Juan Pérez García',
      edad: 45,
      sexo: 'Masculino',
      telefono: '+52 55 1234 5678',
      email: 'juan.perez@email.com',
      ultimaConsulta: '2024-11-15',
      proximaCita: '2024-12-05',
      status: 'activo',
      diagnosticoPrincipal: 'Hipertensión arterial',
      alergias: ['Penicilina'],
      grupoSanguineo: 'O+',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      expediente: 'EXP-2024-002',
      nombre: 'María González López',
      edad: 32,
      sexo: 'Femenino',
      telefono: '+52 55 8765 4321',
      email: 'maria.gonzalez@email.com',
      ultimaConsulta: '2024-11-20',
      proximaCita: '2024-12-10',
      status: 'activo',
      diagnosticoPrincipal: 'Diabetes tipo 2',
      alergias: [],
      grupoSanguineo: 'A+',
      created_at: '2024-02-20T14:15:00Z'
    },
    // Agregar 3-4 pacientes más para mock realista
  ];

  // Aplicar filtros (simulado localmente)
  let filtered = mockPatients;

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.nombre.toLowerCase().includes(searchLower) ||
      p.expediente.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }

  // Aplicar paginación (simulado)
  const limit = filters.limit || 50;
  const offset = filters.offset || 0;
  filtered = filtered.slice(offset, offset + limit);

  console.log('📋 Pacientes obtenidos (MOCK):', filtered.length);
  return filtered;
}

/**
 * Crea un nuevo paciente en el sistema
 * @param {Object} patientData - Datos del paciente
 * @param {string} patientData.nombre - Nombre completo
 * @param {number} patientData.edad - Edad en años
 * @param {string} patientData.sexo - 'Masculino' | 'Femenino'
 * @param {string} patientData.telefono - Teléfono con formato internacional
 * @param {string} patientData.email - Email válido
 * @returns {Promise<Object>} Paciente creado con ID
 * 
 * @TODO: Conectar con Supabase
 * @TODO: INSERT into pacientes
 * @TODO: Validar datos antes de insertar (email válido, teléfono formato correcto)
 * @TODO: Generar número de expediente automático (EXP-YYYY-XXXX)
 * @TODO: Enviar email de bienvenida al paciente
 * @TODO: Crear historia clínica inicial vacía
 */
export async function createPatient(patientData) {
  await new Promise(resolve => setTimeout(resolve, 800));

  // Validación básica (mock)
  if (!patientData.nombre || !patientData.edad) {
    throw new Error('Nombre y edad son obligatorios');
  }

  // Simular creación
  const newPatient = {
    id: Date.now(), // ID temporal
    expediente: `EXP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
    ...patientData,
    status: 'activo',
    created_at: new Date().toISOString(),
    alergias: patientData.alergias || [],
    diagnosticoPrincipal: null,
    ultimaConsulta: null,
    proximaCita: null
  };

  console.log('✅ Paciente creado (MOCK):', newPatient.expediente);
  return newPatient;
}
```

---

## 🔄 PATRÓN PARA ACTUALIZAR COMPONENTES

**ANTES (MAL):**
```javascript
const [patients, setPatients] = useState(mockPatients);
```

**DESPUÉS (BIEN):**
```javascript
import { getPatients, createPatient } from '@/lib/medixia/patients';

const HistoriaClinica = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (patientData) => {
    try {
      const newPatient = await createPatient(patientData);
      setPatients(prev => [newPatient, ...prev]);
      toast.success('Paciente creado exitosamente');
    } catch (err) {
      toast.error('Error al crear paciente: ' + err.message);
    }
  };

  if (loading) return <div>Cargando pacientes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // ... resto del componente sin cambios visuales
  );
};
```

---

## 📋 ORDEN DE EJECUCIÓN (IMPORTANTE)

### FASE 1: Crear estructura base (5 minutos)
1. Crear carpetas `/lib/medixia/`, `/lib/lexia/`, `/lib/asistente/`
2. Crear `api.js` en cada carpeta (cliente HTTP base)

### FASE 2: MEDIXIA (30 minutos)
1. `patients.js` - 5 funciones (get, create, update, delete, getHistory)
2. `appointments.js` - 4 funciones (get, create, update, syncCalendar)
3. `prescriptions.js` - 4 funciones (get, create, checkInteractions, generatePDF)
4. `diagnostics.js` - 3 funciones (get, searchCIE10, create)
5. `notes.js` - 3 funciones (get, create, transcribeAudio)

### FASE 3: LEXIA (40 minutos)
1. `cases.js` - 5 funciones (get, create, update, delete, search)
2. `documents.js` - 4 funciones (getTemplates, generate, upload, review)
3. `calendar.js` - 4 funciones (getPlazos, create, sync, detectConflicts)
4. `clients.js` - 4 funciones (get, create, update, linkContract)
5. `billing.js` - 3 funciones (calculate, save, generatePDF)
6. `damages.js` - 3 funciones (calculate, save, generateReport)
7. `jurisprudencia.js` - 3 funciones (searchDOF, searchCodigo, searchConstitucion)

### FASE 4: ASISTENTE (50 minutos) ⭐ **EL MÁS IMPORTANTE**
1. `appointments.js` - 5 funciones (get, create, delete, detectConflicts, sync)
2. `reminders.js` - 4 funciones (get, create, update, sendNotification)
3. `communications.js` - 4 funciones (sendEmail, sendSMS, getMessages, getHistory)
4. `organization.js` - 4 funciones (getTasks, create, update, assignTask)
5. `productivity.js` - 4 funciones (getStats, trackTime, generateReport, getInsights)
6. `integrations.js` - 4 funciones (connect, disconnect, sync, getConnections)
7. `proactive.js` - 4 funciones (getSuggestions, accept, decline, optimize)
8. `coordination.js` - 3 funciones (getTeam, assign, schedule)
9. `personal.js` - 3 funciones (getProfile, update, updatePreferences)
10. `conversational.js` - 3 funciones (sendMessage, getResponse, getHistory)

### FASE 5: Actualizar componentes (60 minutos)
1. Actualizar 5 componentes MEDIXIA para usar servicios
2. Actualizar 5 componentes LEXIA para usar servicios
3. Actualizar 10 componentes ASISTENTE para usar servicios

### FASE 6: Testing (30 minutos)
1. Verificar que todo compile sin errores
2. Probar cada módulo en el navegador
3. Verificar que mock data se muestre correctamente
4. Confirmar que loading states funcionen
5. Verificar que console.logs muestren operaciones

**TIEMPO TOTAL ESTIMADO: ~3-4 horas**

---

## 🚫 ERRORES COMUNES A EVITAR

1. ❌ **NO crear componentes nuevos** - Solo servicios
2. ❌ **NO modificar estilos** - Mantener AL-E Crystal intacto
3. ❌ **NO agregar dependencias** - Sin `npm install` de nada
4. ❌ **NO conectar APIs reales** - Todo dummy por ahora
5. ❌ **NO olvidar el AsistentePersonal** - Es el módulo más grande (10 submódulos)
6. ❌ **NO hacer funciones vacías** - Siempre retornar mock data realista
7. ❌ **NO olvidar comentarios @TODO** - Son críticos para el cliente
8. ❌ **NO usar placeholders** - Datos mock deben parecer reales

---

## ✅ CHECKLIST DE VALIDACIÓN FINAL

Antes de terminar, verifica:

- [ ] Todas las carpetas `/lib/medixia/`, `/lib/lexia/`, `/lib/asistente/` creadas
- [ ] Cada archivo tiene al menos 3-5 funciones documentadas
- [ ] Cada función tiene JSDoc completo
- [ ] Cada función tiene comentarios @TODO claros
- [ ] Cada función retorna mock data realista (no arrays vacíos)
- [ ] Cada función tiene `await setTimeout(500)` para simular red
- [ ] Cada función tiene `console.log()` para debug visual
- [ ] Los 20 componentes principales importan y usan servicios
- [ ] No hay errores de compilación
- [ ] El sistema sigue funcionando igual visualmente
- [ ] AsistentePersonal tiene sus 10 submódulos actualizados ⭐

---

## 💬 CITAS CLAVE DEL USUARIO (NO OLVIDAR)

> "no me estas dejando las funciones listas para conectar y hacerlo vivir"

> "tu debes dejar todas las cajjitas hechas para despues conectar"

> "ni siquiera tengo supabase listo"

> "los que nos pidieron este producto para abogados es la firma mas importante en mexico"

> "no eliminando lo que ya esta solo haciendo que funcione sin conectar aun"

---

## 🎯 OBJETIVO FINAL

Al terminar, el cliente debe poder:
1. Ver el sistema funcionando IGUAL que antes visualmente
2. Abrir `/lib/` y ver toda la arquitectura profesional lista
3. Leer cualquier función y entender exactamente qué conectar
4. Cuando Supabase esté listo, SOLO cambiar implementación de funciones (no tocar componentes)
5. Seguir los comentarios @TODO como mapa de ruta para integración real

---

## 📞 COMANDOS CLAVE SI EL USUARIO DICE:

**"continúa"** → Seguir con siguiente archivo de servicios en el orden de FASE 1-4

**"muéstrame [módulo]"** → Mostrar ejemplo de función para ese módulo específico

**"actualiza componentes"** → FASE 5: Actualizar componentes para usar servicios

**"testing"** → FASE 6: Compilar, verificar errores, probar en navegador

**"está lento"** → Trabajar más rápido, menos explicaciones, directo al código

**"olvidaste el asistente"** → ⚠️ Priorizar AsistentePersonal (10 submódulos, 30 funciones)

---

## 🚀 MENSAJE DE INICIO SUGERIDO

Cuando empieces el nuevo chat, di algo como:

"Entendido. Voy a crear la arquitectura completa de servicios para los 3 módulos principales:

1. **MEDIXIA** - 15 funciones en 5 archivos
2. **LEXIA** - 20 funciones en 9 archivos  
3. **ASISTENTE PERSONAL** - 30 funciones en 10 archivos ⭐

Cada función tendrá:
✅ JSDoc completo
✅ Mock data realista
✅ Comentarios @TODO claros
✅ Simulación de delay de red
✅ Console.logs para debug

Empiezo con `/lib/medixia/api.js` como base. Dame 3-4 horas y tendrás todo listo para conectar cuando Supabase esté ready."

---

**RECUERDA:** El usuario valora VELOCIDAD y CALIDAD. No des explicaciones largas, ve directo al código. 🚀
