# RESUMEN COMPLETO - CHAT DE DESARROLLO L.U.C.I

**⚠️ IDIOMA:** TODO en español - código, comentarios, variables, mensajes, documentación.

**Fecha:** 28 de noviembre de 2025
**Cliente:** La firma más importante en México
**Estado Actual:** Sistema funcionando visualmente pero SIN backend

---

## 📊 CHECKLIST RÁPIDO DE MÓDULOS

### ✅ MEDIXIA (Módulo Médico)
- ✅ 5/5 Submódulos creados (HistoriaClinica, AgendaCitas, Recetas, Diagnosticos, NotasMedicas)
- ✅ UI completa con AL-E Crystal theme
- ✅ Mock data funcionando
- ❌ NO tiene capa de servicios `/lib/medixia/`
- ❌ NO tiene funciones API

### ✅ LEXIA (Módulo Legal)
- ✅ 5/5 Submódulos creados (CasosExpedientes, DocumentosPlantillas, AgendaPlazos, ClientesContratos, MinutasDanos)
- ✅ UI completa con AL-E Crystal theme
- ✅ Mock data funcionando
- ✅ Calculadoras de Minutas y Daños funcionan localmente
- ❌ NO tiene capa de servicios `/lib/lexia/`
- ❌ NO tiene funciones API
- ❌ NO tiene acceso a DOF/Código Civil/Constitución

### ✅ ASISTENTE PERSONAL (Módulo Asistente)
- ✅ 10/10 Submódulos creados (Citas, Recordatorios, Organizacion, Comunicacion, Productividad, Integraciones, AgendaProactiva, Coordinacion, GestionPersonal, AsistenteConversacional)
- ✅ UI completa con AL-E Crystal theme
- ✅ Mock data funcionando
- ✅ Sugerencias proactivas con IA (mock)
- ✅ Analytics de productividad
- ❌ NO tiene capa de servicios `/lib/asistente/`
- ❌ NO tiene funciones API
- ❌ NO tiene IA conversacional real

### ⚠️ OTROS MÓDULOS
- ⚠️ Dashboard - Existe pero no revisado en detalle
- ⚠️ Comunicaciones - EmailModule básico
- ⚠️ Contactos - Existe pero no revisado
- ⚠️ Tareas - Existe pero no revisado
- ⚠️ Documentos - Existe pero no revisado
- ⚠️ Finanzas - Existe pero no revisado

---

## ⚠️ PROBLEMA CRÍTICO IDENTIFICADO

**El usuario dice:** "no me estas dejando las funciones listas para conectar y hacerlo vivir"

**Qué hicimos mal:** Creamos solo componentes visuales con mock data
**Qué debimos hacer:** Crear arquitectura completa con funciones dummy listas para conectar APIs

**Cliente NO tiene Supabase listo todavía** - Todo debe quedar preparado con funciones que retornen mock data pero con la firma correcta para cuando conecten.

---

## 🎯 LO QUE YA ESTÁ HECHO (SOLO VISUAL)

### ✅ MEDIXIA (Módulo Médico) - COMPLETO
**5 Submódulos creados (2,418 líneas totales):**

1. **HistoriaClinica.jsx** (558 líneas)
   - Expedientes de 6 pacientes con datos completos
   - Pestañas: Datos Personales, Antecedentes, Consultas, Alergias, Medicamentos
   - Stats: 234 pacientes activos, 1,847 consultas, 94% adherencia
   - **Estado:** Mock data hard-coded, NO tiene CRUD real

2. **AgendaCitas.jsx** (398 líneas)
   - Calendario con 6 citas del día
   - Vista día/semana/mes
   - Color-coding por tipo (consulta, cirugía, seguimiento, urgencia)
   - **Estado:** Mock data, NO sync con calendario real

3. **Recetas.jsx** (512 líneas)
   - 6 recetas médicas con medicamentos completos
   - Generación con IA (mock), impresión, envío digital
   - Verificación de interacciones medicamentosas (mock)
   - **Estado:** NO genera PDFs reales, NO envía emails

4. **Diagnosticos.jsx** (487 líneas)
   - 6 diagnósticos con CIE-10
   - Asistente IA para sugerencias (mock)
   - Búsqueda de enfermedades
   - **Estado:** NO tiene base de datos CIE-10 real

5. **NotasMedicas.jsx** (463 líneas)
   - 6 notas médicas recientes
   - Transcripción automática por voz (mock)
   - Plantillas pre-definidas
   - **Estado:** NO graba audio real, NO usa Speech-to-Text API

**MedixiaModule.jsx** - Container con navegación por tabs funcionando

---

### ✅ LEXIA (Módulo Legal) - COMPLETO VISUAL

**5 Submódulos creados:**

1. **CasosExpedientes.jsx** (~500 líneas)
   - 6 casos legales (Civil, Laboral, Amparo, Familiar, Penal, Administrativo)
   - Búsqueda y filtros visuales
   - **Estado:** Mock data, NO tiene upload de documentos real

2. **DocumentosPlantillas.jsx** (~450 líneas)
   - 6 plantillas legales (contratos, demandas, amparos)
   - Generación con IA (mock)
   - **Estado:** NO genera documentos reales con variables

3. **AgendaPlazos.jsx** (~350 líneas)
   - 6 plazos judiciales con urgencias
   - Countdown de días restantes
   - **Estado:** Mock data, NO tiene sistema de notificaciones

4. **ClientesContratos.jsx** (~400 líneas)
   - 6 perfiles de clientes con RFC
   - Búsqueda por nombre/RFC/contacto
   - **Estado:** Mock data, NO tiene CRM real

5. **MinutasDanos.jsx** (591 líneas) - **ÚLTIMA VISTA**
   - Calculadora de Minutas: Horas × tarifa + gastos + IVA
   - Calculadora de Daños: Base × multiplicador + lucro cesante + gastos médicos
   - **Estado:** Cálculos funcionan localmente, botones Save/PDF NO hacen nada

**LexiaModule.jsx** - Container con navegación funcionando

---

### ✅ ASISTENTE PERSONAL (Módulo Asistente) - COMPLETO VISUAL

**10 Submódulos creados y funcionando:**

1. **Citas.jsx** (~107 líneas)
   - Gestión de eventos y calendario
   - 3 citas mock (Reunión Marketing, Llamada Cliente, Revisión Proyecto)
   - Detección de conflictos automática (simulada)
   - Modal para crear nuevas citas
   - **Estado:** Mock data en local state, NO sync con Google Calendar/Outlook

2. **Recordatorios.jsx**
   - Sistema de recordatorios y notificaciones
   - **Estado:** Mock data, NO tiene sistema de push notifications real

3. **Organizacion.jsx**
   - Herramientas de organización personal
   - **Estado:** Mock data, NO tiene persistencia

4. **Comunicacion.jsx**
   - Centro de comunicaciones integradas
   - **Estado:** Mock data, NO envía emails/SMS reales

5. **Productividad.jsx** (~336 líneas)
   - Analytics de productividad personal
   - Stats semanales: 42 hrs trabajadas, 87% score
   - Breakdown diario (Lun-Vie con horas productivas/reuniones/breaks)
   - Insights con IA: "Productividad +12%", "Muchas reuniones miércoles"
   - Horario óptimo detectado: 09:00-12:00
   - Días festivos México (1 Dic, 12 Dic, 25 Dic)
   - **Estado:** Mock data, NO trackea tiempo real

6. **Integraciones.jsx**
   - Conexiones con servicios externos
   - **Estado:** Mock data, NO tiene OAuth real

7. **AgendaProactiva.jsx** (~371 líneas)
   - IA que sugiere optimizaciones de agenda
   - 4 sugerencias proactivas:
     * "Bloquear tiempo de enfoque" (3 hrs libres)
     * "Conflicto horario detectado" (2 reuniones misma hora)
     * "Tiempo descanso recomendado" (6 hrs seguidas)
     * "Optimizar ruta reuniones" (reducir traslados)
   - Priority badges: Urgente, Alta, Media
   - Botones Aceptar/Rechazar sugerencias
   - **Estado:** Mock suggestions, NO tiene IA real analizando calendario

8. **Coordinacion.jsx**
   - Coordinación de equipos y recursos
   - **Estado:** Mock data, NO tiene gestión real de equipos

9. **GestionPersonal.jsx**
   - Gestión de información personal
   - **Estado:** Mock data, NO tiene perfil de usuario real

10. **AsistenteConversacional.jsx**
    - Chat con asistente IA
    - **Estado:** Mock responses, NO tiene OpenAI/Claude conectado

**AsistentePersonal.jsx** - Container con navegación por tarjetas funcionando

---

### ⚠️ OTROS MÓDULOS (NO REVISADOS A DETALLE)

**Dashboard** - Componentes de stats y actividad
**Comunicaciones** - EmailModule básico
**Contactos, Tareas, Documentos, Finanzas** - Existen pero no sabemos su estado

---

## 🚨 LO QUE FALTA (LA ARQUITECTURA REAL)

### NO EXISTE:
❌ Carpeta `/lib/` con servicios
❌ Funciones API (getCases, createCase, updateCase, deleteCase)
❌ Funciones de upload (uploadDocument, uploadFile)
❌ Funciones OCR (processDocument, extractText)
❌ Funciones de IA (generateDocument, reviewDocument, transcribeAudio)
❌ Funciones de calendario (syncCalendar, createReminder)
❌ Funciones de facturación (saveBilling, generatePDF, sendInvoice)
❌ Funciones de búsqueda (searchDOF, searchCodigoCivil, searchConstitucion)
❌ Hooks personalizados (useCases, useClients, usePatients)
❌ Context de autenticación (AuthContext con login/logout)
❌ State management global (Redux/Zustand)
❌ Manejo de errores centralizado
❌ Loading states globales

### LO QUE EL USUARIO QUIERE:
✅ Funciones con firma correcta que retornen mock data
✅ Comentarios TODO claros: `// TODO: Conectar con Supabase aquí`
✅ Estructura profesional lista para conectar
✅ Cada botón "Guardar" debe llamar función (aunque sea dummy)
✅ Preparar para que después SOLO cambien la implementación de las funciones

---

## 📋 REQUERIMIENTOS COMPLETOS (PROYECTO-GUIA.md)

### LEXIA - 14 Funcionalidades Base:
1. Agenda Legal y Calendario Inteligente
2. Expedientes Digitales con OCR Avanzado
3. Redacción y Revisión Legal Automatizada
4. Jurisprudencia y Legislación Inteligente
5. Gestión y Comunicación con Clientes
6. Minutas, Audiencias y Resúmenes Automáticos
7. Facturación y Administración Legal
8. Control de Contratos y Documentos Corporativos
9. Gestión de Pruebas y Evidencias
10. Estrategia Legal y Análisis Predictivo
11. Seguridad y Confidencialidad de Alto Nivel
12. Inteligencia de Negocio para el Despacho
13. Marketing Legal y Captación de Clientes
14. Atención Inteligente 24/7

**MÁS:** Acceso en línea a Diario Oficial, Código Civil, Constitución Mexicana

### LEXIA - 27 Especialidades Legales:
Ambiental, Civil, Penal, Mercantil, Laboral, Fiscal, Administrativo, Corporativo, Familiar, Inmobiliario, Notarial, Constitucional, Internacional, Migratorio, Propiedad Intelectual, Tecnológico, Sanitario, Agrario, Marítimo, Aeroespacial, Seguros, Bancario, Urbano, Competencia, Electoral, Deportivo, Cultural

**Cada especialidad:** 10-15 funciones específicas

---

## 🛠️ STACK TÉCNICO ACTUAL

```javascript
// Package.json dependencies
React 18.3.1
Vite 6.0.1
Tailwind CSS 3.4.17
Framer Motion 11.15.0
Lucide React (iconos)
Radix UI (componentes)
Recharts (gráficas)
React Router DOM

// Contextos funcionando:
ThemeContext (dark/light mode) ✅
LanguageContext (es/en) ✅
AuthContext (básico) ⚠️

// Tema:
AL-E Crystal Dual Theme (dark/light) ✅
Colores: ale-neon, ale-petrol, ale-glass, ale-black ✅
```

---

## 🎨 DISEÑO ACTUAL

**Tema AL-E Crystal aplicado en:**
- ✅ Todos los componentes MEDIXIA
- ✅ Todos los componentes LEXIA
- ✅ Dashboard
- ✅ Sidebar y Header
- ✅ Animaciones con Framer Motion
- ✅ Responsive design
- ✅ Sin errores de compilación

---

## 🔄 PRÓXIMOS PASOS (LO QUE DEBEMOS HACER)

### FASE 1: Crear Arquitectura de Servicios

**Para LEXIA:**
```
/src/lib/lexia/
  ├── api.js           (cliente HTTP base)
  ├── cases.js         (getCases, createCase, updateCase, deleteCase)
  ├── documents.js     (getTemplates, generateDocument, uploadFile)
  ├── calendar.js      (getPlazos, createPlazo, syncCalendar)
  ├── clients.js       (getClients, createClient, updateClient)
  ├── billing.js       (saveBilling, generatePDF, sendInvoice)
  ├── damages.js       (calculateDanos, saveDamage, generateReport)
  ├── ocr.js           (processDocument, extractText, classify)
  ├── jurisprudencia.js (searchDOF, searchCodigoCivil, searchConstitucion)
  └── auth.js          (login, logout, checkAuth, getUserRole)
```

**Para MEDIXIA:**
```
/src/lib/medixia/
  ├── api.js           (cliente HTTP base)
  ├── patients.js      (getPatients, createPatient, updateHistory)
  ├── appointments.js  (getAppointments, createAppointment, syncCalendar)
  ├── prescriptions.js (getPrescriptions, createPrescription, checkInteractions)
  ├── diagnostics.js   (getDiagnostics, searchCIE10, createDiagnostic)
  ├── notes.js         (getNotes, createNote, transcribeAudio)
  └── auth.js          (login, logout, checkAuth, getUserRole)
```

**Para ASISTENTE:**
```
/src/lib/asistente/
  ├── api.js              (cliente HTTP base)
  ├── appointments.js     (getAppointments, createAppointment, detectConflicts, syncCalendar)
  ├── reminders.js        (getReminders, createReminder, sendNotification, updateReminder)
  ├── communications.js   (sendEmail, sendSMS, getMessages, getHistory)
  ├── organization.js     (getTasks, createTask, updateTask, getProjects)
  ├── productivity.js     (getStats, trackTime, generateReport, getInsights)
  ├── integrations.js     (connectService, disconnectService, syncData, getConnections)
  ├── proactive.js        (getSuggestions, acceptSuggestion, declineSuggestion, optimizeAgenda)
  ├── coordination.js     (getTeam, assignTask, getResources, scheduleTeam)
  ├── personal.js         (getProfile, updateProfile, getPreferences, updatePreferences)
  ├── conversational.js   (sendMessage, getResponse, getConversationHistory, analyzeIntent)
  └── auth.js             (login, logout, checkAuth, getUserRole)
```

### FASE 2: Actualizar Componentes

**Patrón a seguir en CADA componente:**

```javascript
// Antes (MAL):
const mockCases = [ /* hard-coded data */ ];

// Después (BIEN):
import { getCases, createCase, updateCase } from '@/lib/lexia/cases';

const CasosExpedientes = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    setLoading(true);
    try {
      const data = await getCases(); // Función dummy que retorna mock
      setCases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (caseData) => {
    try {
      await createCase(caseData); // Función dummy
      loadCases(); // Refresh
    } catch (err) {
      console.error('Error saving case:', err);
    }
  };

  // ... resto del componente
};
```

### FASE 3: Crear Hooks Personalizados

```javascript
// /src/hooks/useCases.js
export function useCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCases = async (filters) => {
    setLoading(true);
    const data = await getCases(filters);
    setCases(data);
    setLoading(false);
  };

  return { cases, loading, fetchCases };
}
```

### FASE 4: State Management (Opcional)

Si el usuario quiere, agregar Redux Toolkit o Zustand para estado global.

---

## 📝 EJEMPLO DE FUNCIÓN DUMMY CORRECTA

```javascript
/**
 * Obtiene todos los casos legales del despacho
 * @param {Object} filters - Filtros opcionales (status, tipo, cliente)
 * @returns {Promise<Array>} Lista de casos
 * 
 * @TODO: Conectar con Supabase
 * @TODO: Tabla: 'casos_legales'
 * @TODO: Implementar paginación (limit, offset)
 * @TODO: Agregar ordenamiento (sortBy, sortOrder)
 * @TODO: Implementar caché con React Query
 */
export async function getCases(filters = {}) {
  // Simulamos delay de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data - REEMPLAZAR cuando Supabase esté listo
  const mockCases = [
    {
      id: 1,
      numero: 'EXP-2024-001',
      tipo: 'Civil',
      cliente: 'Constructora XYZ S.A. de C.V.',
      status: 'En proceso',
      prioridad: 'alta',
      fechaInicio: '2024-01-15',
      descripcion: 'Demanda de incumplimiento de contrato...',
      documentos: ['contrato.pdf', 'evidencia1.jpg']
    },
    // ... más casos mock
  ];

  // Aplicar filtros (simulado)
  let filtered = mockCases;
  if (filters.status) {
    filtered = filtered.filter(c => c.status === filters.status);
  }
  if (filters.tipo) {
    filtered = filtered.filter(c => c.tipo === filters.tipo);
  }

  return filtered;
}

/**
 * Crea un nuevo caso legal
 * @param {Object} caseData - Datos del caso
 * @returns {Promise<Object>} Caso creado con ID
 * 
 * @TODO: Conectar con Supabase
 * @TODO: INSERT into casos_legales
 * @TODO: Validar datos antes de insertar
 * @TODO: Subir documentos a Storage
 * @TODO: Enviar notificación al cliente
 */
export async function createCase(caseData) {
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock: Simular creación
  const newCase = {
    id: Date.now(), // ID temporal
    ...caseData,
    fechaCreacion: new Date().toISOString(),
    status: 'Nuevo'
  };

  console.log('📋 Caso creado (MOCK):', newCase);
  return newCase;
}

/**
 * Sube un documento al caso
 * @param {number} caseId - ID del caso
 * @param {File} file - Archivo a subir
 * @returns {Promise<Object>} URL del documento subido
 * 
 * @TODO: Conectar con Supabase Storage
 * @TODO: Bucket: 'documentos-legales'
 * @TODO: Implementar OCR para PDFs
 * @TODO: Extraer metadatos del documento
 * @TODO: Crear thumbnail para imágenes
 */
export async function uploadDocument(caseId, file) {
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock: Simular upload
  const mockUrl = `https://storage.example.com/casos/${caseId}/${file.name}`;
  
  console.log('📤 Documento subido (MOCK):', mockUrl);
  return {
    url: mockUrl,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString()
  };
}
```

---

## ⚡ REGLAS DE ORO

1. **NUNCA eliminar lo que ya está** - Solo agregar capa de servicios
2. **Cada función debe tener firma correcta** - Parámetros y retorno como si fuera real
3. **Comentarios TODO claros** - Marcar exactamente qué conectar
4. **Mock data realista** - Retornar datos que parezcan reales
5. **Simular delays** - `await setTimeout(500)` para simular red
6. **Console.log en operaciones** - Para debug visual: "✅ Guardado", "📤 Subiendo"
7. **Mantener tema AL-E Crystal** - No tocar estilos
8. **No agregar librerías nuevas** - Usar lo que ya está (React, Vite, Tailwind)
9. **Estructura clara** - `/lib/[modulo]/[servicio].js`
10. **El usuario NO tiene Supabase listo** - Todo debe ser dummy por ahora

---

## 🎯 ALCANCE TOTAL

**Módulos a preparar con arquitectura:**
- ✅ MEDIXIA (5 submódulos + servicios) - ~15 funciones
- ✅ LEXIA (5 submódulos + servicios) - ~20 funciones
- ✅ ASISTENTE PERSONAL (10 submódulos + servicios) - ~30 funciones
- ⚠️ Dashboard (componentes + servicios) - ~10 funciones
- ⚠️ Comunicaciones (email + servicios) - ~8 funciones
- ⚠️ Contactos (CRM + servicios) - ~10 funciones
- ⚠️ Tareas (kanban + servicios) - ~8 funciones
- ⚠️ Documentos (storage + servicios) - ~10 funciones
- ⚠️ Finanzas (contabilidad + servicios) - ~12 funciones

**Estimación:**
- MEDIXIA: ~15 funciones de servicio
- LEXIA: ~20 funciones de servicio
- AsistentePersonal: ~30 funciones de servicio ⭐
- Otros módulos: ~58 funciones de servicio
- **TOTAL: ~123 funciones dummy a crear**

---

## 📌 ESTADO ACTUAL DEL PROYECTO

```
✅ UI/UX completamente funcional
✅ Tema AL-E Crystal aplicado
✅ Navegación funcionando
✅ Sin errores de compilación
✅ Mock data desplegándose correctamente
❌ NO hay capa de servicios
❌ NO hay funciones de API
❌ NO hay manejo de estado global
❌ NO hay sistema de autenticación real
❌ Botones "Guardar" no hacen nada
❌ Botones "Generar PDF" no hacen nada
❌ Búsquedas no consultan backend
❌ Uploads no suben archivos reales
```

---

## 💬 CITAS CLAVE DEL USUARIO

> "esto esta feito... le bajaste a la intensidad"

> "tu debes dejar todas las cajjitas hechas para despues conectar"

> "no me estas dejando las funciones listas para conectar y hacerlo vivir"

> "los que nos pidieron este producto para abogados es la firma mas importante en mexico"

> "Agrega acceso en linea del diario oficial codigo civil y acceso a la constitucion"

> "no eliminando lo que ya esta solo haciendo que funcione sin conectar aun"

> "ni siquiera tengo supabase listo"

---

## 🔥 PLAN DE ACCIÓN INMEDIATO

### ORDEN DE EJECUCIÓN:

1. **Crear estructura `/lib/` completa** (folders vacíos primero)
2. **Implementar servicios de MEDIXIA** (empezar por patients.js)
3. **Actualizar componentes MEDIXIA** (uno por uno)
4. **Implementar servicios de LEXIA** (empezar por cases.js)
5. **Actualizar componentes LEXIA** (uno por uno)
6. **Implementar servicios de ASISTENTE** (agenda.js, reminders.js)
7. **Actualizar componentes ASISTENTE** (uno por uno)
8. **Crear hooks personalizados** (usePatients, useCases, useTasks)
9. **Testing manual** (verificar que todo funcione igual pero con arquitectura)
10. **Documentar para el cliente** (README de cómo conectar Supabase después)

---

## 📊 MÉTRICAS

**Archivos creados hasta ahora:** ~45 componentes React (MEDIXIA: 5, LEXIA: 5, ASISTENTE: 10, otros: ~25)
**Líneas de código:** ~12,000 líneas (estimado)
**Tiempo invertido:** Múltiples sesiones
**Estado:** 35% (UI completa en 3 módulos principales, falta backend architecture)

**Próximo hito:** 80% cuando arquitectura de servicios esté lista para los 3 módulos principales

---

## 🚀 CUANDO SUPABASE ESTÉ LISTO

El cliente solo tendrá que:

1. Crear tablas en Supabase (casos_legales, pacientes, citas, etc.)
2. Copiar URL y API Key de Supabase
3. Crear archivo `.env`:
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```
4. Reemplazar implementaciones dummy por llamadas reales a Supabase
5. **NO cambiar componentes** - Solo cambiar implementación de funciones en `/lib/`

---

## 📝 NOTAS FINALES

- El usuario está pagando por un sistema profesional para cliente top tier
- NO acepta mockups sin arquitectura
- Quiere ver la estructura completa aunque no funcione con DB real todavía
- Prefiere tener 90 funciones dummy bien hechas que 5 funciones conectadas
- La velocidad del asistente es un problema - necesita respuestas más rápidas
- Este resumen debe guardarse para continuar en nueva sesión

---

**Última actualización:** 28 de noviembre de 2025, 11:00 PM
**Próxima sesión:** Comenzar con creación de arquitectura completa:
1. `/lib/medixia/` - 15 funciones
2. `/lib/lexia/` - 20 funciones  
3. `/lib/asistente/` - 30 funciones ⭐ (el más grande)
4. Actualizar componentes para usar servicios
5. Testing manual de cada módulo
