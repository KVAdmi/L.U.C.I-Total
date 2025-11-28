--- =====================================================
-- L.U.C.I SISTEMA - SUPABASE DATABASE SCHEMA V2
-- MULTI-TENANT WORKSPACE MODEL
-- =====================================================
-- Proyecto: tzglggilydzahhukxkvq
-- Fecha: 2025-11-28
-- 
-- ARQUITECTURA: Container-per-user (workspace multi-tenant)
-- Cada cliente paga por un workspace completo con todos sus datos
-- =====================================================

-- IMPORTANTE: 
-- 1. Este schema REEMPLAZA el anterior
-- 2. Si ya ejecutaste el schema v1, tendrás que:
--    - Exportar datos existentes
--    - DROP tables viejas
--    - Ejecutar este nuevo schema
--    - Re-importar datos adaptados
-- 3. O crear un nuevo proyecto Supabase limpio

-- =====================================================
-- 1. EXTENSIONES
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 2. USER PROFILES (extensión de auth.users)
-- =====================================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'America/Mexico_City',
  language TEXT DEFAULT 'es',
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. WORKSPACES (CONTENEDOR PRINCIPAL - MULTI-TENANT)
-- =====================================================
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  
  -- Identidad del asistente personalizado
  assistant_name TEXT DEFAULT 'L.U.C.I',
  assistant_avatar TEXT,
  assistant_tone TEXT DEFAULT 'professional',
  
  -- Plan y módulos activos
  plan_type TEXT DEFAULT 'basic',
  active_modules JSONB DEFAULT '["agenda", "tasks", "contacts", "documents"]'::jsonb,
  
  -- Configuración global
  timezone TEXT DEFAULT 'America/Mexico_City',
  working_hours JSONB DEFAULT '{"start": "09:00", "end": "18:00", "days": [1,2,3,4,5]}'::jsonb,
  branding JSONB DEFAULT '{}'::jsonb,
  
  -- Límites y billing
  max_users INTEGER DEFAULT 1,
  max_storage_gb INTEGER DEFAULT 5,
  billing_email TEXT,
  
  -- Metadata
  status TEXT DEFAULT 'active',
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. WORKSPACE MEMBERS (Multi-usuario por workspace)
-- =====================================================
CREATE TABLE workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'collaborator',
  permissions JSONB DEFAULT '{"read": true, "write": false, "delete": false}'::jsonb,
  invited_by UUID REFERENCES user_profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(workspace_id, user_id)
);

-- =====================================================
-- 5. CONTACTS (CRM Genérico - Universal)
-- =====================================================
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Información básica
  type TEXT DEFAULT 'person',
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  position TEXT,
  
  -- Dirección
  address JSONB,
  
  -- Metadata
  tags TEXT[],
  notes TEXT,
  avatar_url TEXT,
  source TEXT,
  
  -- Relaciones
  assigned_to UUID REFERENCES user_profiles(id),
  
  -- Flags para industrias
  is_patient BOOLEAN DEFAULT false,
  is_legal_client BOOLEAN DEFAULT false,
  is_policyholder BOOLEAN DEFAULT false,
  is_accounting_client BOOLEAN DEFAULT false,
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. APPOINTMENTS (Citas/Agenda - Universal)
-- =====================================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  -- Ubicación
  location TEXT,
  location_type TEXT DEFAULT 'office',
  meeting_url TEXT,
  
  -- Tipo y estado
  type TEXT DEFAULT 'meeting',
  status TEXT DEFAULT 'scheduled',
  priority TEXT DEFAULT 'normal',
  
  -- Relaciones
  contact_id UUID REFERENCES contacts(id),
  assigned_to UUID REFERENCES user_profiles(id),
  
  -- Recordatorios
  reminders JSONB DEFAULT '[{"minutes": 15, "type": "notification"}]'::jsonb,
  
  -- Metadata
  color TEXT,
  tags TEXT[],
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. TASKS (Tareas - Universal)
-- =====================================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  
  -- Estado y prioridad
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  
  -- Fechas
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Relaciones
  assigned_to UUID REFERENCES user_profiles(id),
  contact_id UUID REFERENCES contacts(id),
  appointment_id UUID REFERENCES appointments(id),
  parent_task_id UUID REFERENCES tasks(id),
  
  -- Metadata
  tags TEXT[],
  checklist JSONB,
  estimated_hours DECIMAL(5,2),
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. REMINDERS (Recordatorios - Universal)
-- =====================================================
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  remind_at TIMESTAMPTZ NOT NULL,
  
  -- Tipo y canal
  type TEXT DEFAULT 'notification',
  channel TEXT DEFAULT 'app',
  
  -- Estado
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  
  -- Relaciones
  contact_id UUID REFERENCES contacts(id),
  appointment_id UUID REFERENCES appointments(id),
  task_id UUID REFERENCES tasks(id),
  user_id UUID REFERENCES user_profiles(id),
  
  -- Recurrencia
  recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT,
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. COMMUNICATIONS (Comunicaciones - Universal)
-- =====================================================
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  type TEXT NOT NULL,
  channel TEXT NOT NULL,
  
  -- Contenido
  subject TEXT,
  body TEXT,
  
  -- Para (destinatarios)
  to_addresses TEXT[],
  cc_addresses TEXT[],
  
  -- Estado
  status TEXT DEFAULT 'draft',
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  
  -- Relaciones
  contact_id UUID REFERENCES contacts(id),
  appointment_id UUID REFERENCES appointments(id),
  task_id UUID REFERENCES tasks(id),
  
  -- Attachments
  attachments JSONB,
  
  -- Metadata
  metadata JSONB,
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 10. DOCUMENTS (Documentos - Universal)
-- =====================================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Información del archivo
  filename TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  storage_path TEXT NOT NULL,
  
  -- Metadata
  title TEXT,
  description TEXT,
  tags TEXT[],
  
  -- Relaciones (puede estar ligado a múltiples entidades)
  contact_id UUID REFERENCES contacts(id),
  appointment_id UUID REFERENCES appointments(id),
  task_id UUID REFERENCES tasks(id),
  
  -- Versioning
  version INTEGER DEFAULT 1,
  parent_document_id UUID REFERENCES documents(id),
  
  -- Seguridad
  is_public BOOLEAN DEFAULT false,
  access_level TEXT DEFAULT 'workspace',
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 11. FINANCIAL RECORDS (Finanzas - Universal)
-- =====================================================
CREATE TABLE financial_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Tipo de registro
  type TEXT NOT NULL,
  category TEXT,
  
  -- Montos
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'MXN',
  
  -- Fechas
  transaction_date DATE NOT NULL,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  
  -- Descripción
  description TEXT,
  notes TEXT,
  
  -- Relaciones
  contact_id UUID REFERENCES contacts(id),
  
  -- Status
  status TEXT DEFAULT 'pending',
  
  -- Referencias externas
  invoice_number TEXT,
  payment_method TEXT,
  
  -- Metadata
  metadata JSONB,
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 12. TIME ENTRIES (Seguimiento de tiempo - Universal)
-- =====================================================
CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Tiempo
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  
  -- Descripción
  description TEXT,
  activity_type TEXT,
  
  -- Relaciones
  task_id UUID REFERENCES tasks(id),
  contact_id UUID REFERENCES contacts(id),
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  
  -- Facturación
  billable BOOLEAN DEFAULT false,
  hourly_rate DECIMAL(10,2),
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 13. INTEGRATIONS (Integraciones externas - Universal)
-- =====================================================
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Proveedor
  provider TEXT NOT NULL,
  provider_type TEXT,
  
  -- Estado
  status TEXT DEFAULT 'disconnected',
  
  -- Configuración
  config JSONB,
  credentials JSONB,
  
  -- Sincronización
  last_sync TIMESTAMPTZ,
  sync_frequency TEXT DEFAULT 'manual',
  
  -- Metadata
  metadata JSONB,
  
  connected_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 14. TEAM MEMBERS (Coordinación de equipo)
-- =====================================================
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Información del miembro
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Rol y departamento
  role TEXT,
  department TEXT,
  
  -- Disponibilidad
  availability JSONB,
  skills TEXT[],
  
  -- Estado
  status TEXT DEFAULT 'active',
  
  -- Relación con user (opcional)
  user_id UUID REFERENCES user_profiles(id),
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 15. CONVERSATION HISTORY (Centro IA - Universal)
-- =====================================================
CREATE TABLE conversation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Mensaje
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Contexto
  context JSONB,
  
  -- Relaciones (opcional)
  contact_id UUID REFERENCES contacts(id),
  task_id UUID REFERENCES tasks(id),
  appointment_id UUID REFERENCES appointments(id),
  
  -- IA metadata
  model TEXT,
  tokens_used INTEGER,
  
  user_id UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 16. PROACTIVE SUGGESTIONS (Agenda Proactiva IA)
-- =====================================================
CREATE TABLE proactive_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Sugerencia
  title TEXT NOT NULL,
  description TEXT,
  suggestion_type TEXT NOT NULL,
  
  -- Acciones propuestas
  actions JSONB,
  
  -- Prioridad
  priority TEXT DEFAULT 'medium',
  
  -- Estado
  status TEXT DEFAULT 'pending',
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  
  -- Contexto
  context JSONB,
  
  -- Relaciones
  related_appointment_id UUID REFERENCES appointments(id),
  related_task_id UUID REFERENCES tasks(id),
  
  user_id UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 17. WORKSPACE SETTINGS (Configuración por workspace)
-- =====================================================
CREATE TABLE workspace_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- Preferencias generales
  language TEXT DEFAULT 'es',
  timezone TEXT DEFAULT 'America/Mexico_City',
  date_format TEXT DEFAULT 'DD/MM/YYYY',
  time_format TEXT DEFAULT '24h',
  
  -- Voz y IA
  voice_enabled BOOLEAN DEFAULT true,
  voice_language TEXT DEFAULT 'es-MX',
  ai_temperature DECIMAL(3,2) DEFAULT 0.7,
  ai_model TEXT DEFAULT 'gpt-4',
  
  -- Notificaciones
  notifications JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
  
  -- Branding
  logo_url TEXT,
  primary_color TEXT DEFAULT '#0EA5E9',
  secondary_color TEXT DEFAULT '#06B6D4',
  
  -- Horario laboral
  working_hours JSONB,
  
  -- Features activas
  features JSONB,
  
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- User profiles
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- Workspaces
CREATE INDEX idx_workspaces_owner_id ON workspaces(owner_id);
CREATE INDEX idx_workspaces_status ON workspaces(status);

-- Workspace members
CREATE INDEX idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);

-- Contacts
CREATE INDEX idx_contacts_workspace ON contacts(workspace_id);
CREATE INDEX idx_contacts_assigned_to ON contacts(assigned_to);
CREATE INDEX idx_contacts_email ON contacts(email);

-- Appointments
CREATE INDEX idx_appointments_workspace ON appointments(workspace_id);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_appointments_contact ON appointments(contact_id);
CREATE INDEX idx_appointments_assigned ON appointments(assigned_to);

-- Tasks
CREATE INDEX idx_tasks_workspace ON tasks(workspace_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_status ON tasks(status);

-- Reminders
CREATE INDEX idx_reminders_workspace ON reminders(workspace_id);
CREATE INDEX idx_reminders_remind_at ON reminders(remind_at);
CREATE INDEX idx_reminders_status ON reminders(status);

-- Communications
CREATE INDEX idx_communications_workspace ON communications(workspace_id);
CREATE INDEX idx_communications_contact ON communications(contact_id);
CREATE INDEX idx_communications_type ON communications(type);

-- Documents
CREATE INDEX idx_documents_workspace ON documents(workspace_id);
CREATE INDEX idx_documents_contact ON documents(contact_id);

-- Financial records
CREATE INDEX idx_financial_workspace ON financial_records(workspace_id);
CREATE INDEX idx_financial_transaction_date ON financial_records(transaction_date);

-- Time entries
CREATE INDEX idx_time_entries_workspace ON time_entries(workspace_id);
CREATE INDEX idx_time_entries_user ON time_entries(user_id);

-- Integrations
CREATE INDEX idx_integrations_workspace ON integrations(workspace_id);
CREATE INDEX idx_integrations_provider ON integrations(provider);

-- Team members
CREATE INDEX idx_team_members_workspace ON team_members(workspace_id);

-- Conversation history
CREATE INDEX idx_conversation_workspace ON conversation_history(workspace_id);
CREATE INDEX idx_conversation_user ON conversation_history(user_id);

-- Proactive suggestions
CREATE INDEX idx_suggestions_workspace ON proactive_suggestions(workspace_id);
CREATE INDEX idx_suggestions_status ON proactive_suggestions(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE proactive_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES RLS - USER PROFILES
-- =====================================================
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- POLICIES RLS - WORKSPACES
-- =====================================================
CREATE POLICY "Users can view workspaces they own"
  ON workspaces FOR SELECT
  USING (
    owner_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own workspaces"
  ON workspaces FOR INSERT
  WITH CHECK (
    owner_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update workspaces they own"
  ON workspaces FOR UPDATE
  USING (
    owner_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- POLICIES RLS - WORKSPACE MEMBERS
-- =====================================================
CREATE POLICY "Members can view their memberships"
  ON workspace_members FOR SELECT
  USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can insert their memberships"
  ON workspace_members FOR INSERT
  WITH CHECK (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- FUNCTION: Get user's workspaces
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_workspaces()
RETURNS SETOF UUID AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT w.id
  FROM workspaces w
  INNER JOIN workspace_members wm ON wm.workspace_id = w.id
  INNER JOIN user_profiles up ON up.id = wm.user_id
  WHERE up.user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- POLICIES RLS - DATA TABLES (workspace-scoped)
-- =====================================================

-- Contacts
CREATE POLICY "Users can view contacts in their workspaces"
  ON contacts FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can insert contacts in their workspaces"
  ON contacts FOR INSERT
  WITH CHECK (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can update contacts in their workspaces"
  ON contacts FOR UPDATE
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can delete contacts in their workspaces"
  ON contacts FOR DELETE
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Appointments
CREATE POLICY "Users can view appointments in their workspaces"
  ON appointments FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can insert appointments in their workspaces"
  ON appointments FOR INSERT
  WITH CHECK (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can update appointments in their workspaces"
  ON appointments FOR UPDATE
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can delete appointments in their workspaces"
  ON appointments FOR DELETE
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Tasks
CREATE POLICY "Users can view tasks in their workspaces"
  ON tasks FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can insert tasks in their workspaces"
  ON tasks FOR INSERT
  WITH CHECK (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can update tasks in their workspaces"
  ON tasks FOR UPDATE
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can delete tasks in their workspaces"
  ON tasks FOR DELETE
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Reminders
CREATE POLICY "Users can view reminders in their workspaces"
  ON reminders FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage reminders in their workspaces"
  ON reminders FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Communications
CREATE POLICY "Users can view communications in their workspaces"
  ON communications FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage communications in their workspaces"
  ON communications FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Documents
CREATE POLICY "Users can view documents in their workspaces"
  ON documents FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage documents in their workspaces"
  ON documents FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Financial records
CREATE POLICY "Users can view financial records in their workspaces"
  ON financial_records FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage financial records in their workspaces"
  ON financial_records FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Time entries
CREATE POLICY "Users can view time entries in their workspaces"
  ON time_entries FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage time entries in their workspaces"
  ON time_entries FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Integrations
CREATE POLICY "Users can view integrations in their workspaces"
  ON integrations FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage integrations in their workspaces"
  ON integrations FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Team members
CREATE POLICY "Users can view team members in their workspaces"
  ON team_members FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage team members in their workspaces"
  ON team_members FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Conversation history
CREATE POLICY "Users can view conversations in their workspaces"
  ON conversation_history FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage conversations in their workspaces"
  ON conversation_history FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Proactive suggestions
CREATE POLICY "Users can view suggestions in their workspaces"
  ON proactive_suggestions FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage suggestions in their workspaces"
  ON proactive_suggestions FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- Workspace settings
CREATE POLICY "Users can view settings in their workspaces"
  ON workspace_settings FOR SELECT
  USING (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can insert settings in their workspaces"
  ON workspace_settings FOR INSERT
  WITH CHECK (workspace_id IN (SELECT get_user_workspaces()));

CREATE POLICY "Users can manage settings in their workspaces"
  ON workspace_settings FOR ALL
  USING (workspace_id IN (SELECT get_user_workspaces()));

-- =====================================================
-- TRIGGERS - Updated_at automático
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communications_updated_at BEFORE UPDATE ON communications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_records_updated_at BEFORE UPDATE ON financial_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON time_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proactive_suggestions_updated_at BEFORE UPDATE ON proactive_suggestions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspace_settings_updated_at BEFORE UPDATE ON workspace_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DATOS INICIALES DE PRUEBA (OPCIONAL)
-- =====================================================
-- Descomenta si quieres datos de ejemplo para probar

/*
-- Crear perfil de prueba (requiere usuario en auth.users)
INSERT INTO user_profiles (user_id, display_name, role)
SELECT id, 'Usuario Demo', 'owner'
FROM auth.users
LIMIT 1;

-- Crear workspace de prueba
INSERT INTO workspaces (owner_id, name, assistant_name, plan_type)
SELECT id, 'Mi Workspace', 'L.U.C.I', 'basic'
FROM user_profiles
LIMIT 1;

-- Agregar miembro al workspace
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT w.id, p.id, 'owner'
FROM workspaces w, user_profiles p
LIMIT 1;
*/

-- =====================================================
-- FIN DEL SCHEMA
-- =====================================================
