-- ========================================
-- SUPABASE SCHEMA - L.U.C.I TOTAL
-- ========================================
-- ✅ workspace_id en todas las tablas
-- ✅ Campos exactos del código JS
-- ========================================

-- ========================================
-- SUPABASE SCHEMA - L.U.C.I TOTAL
-- ========================================
-- ✅ workspace_id en todas las tablas
-- ✅ Campos exactos del código JS
-- ========================================

-- 1. WORKSPACES
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_email TEXT NOT NULL,
    plan TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    avatar TEXT,
    role TEXT,
    department TEXT,
    company TEXT,
    location TEXT,
    timezone TEXT DEFAULT 'America/Mexico_City',
    language TEXT DEFAULT 'es',
    bio TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    type TEXT DEFAULT 'meeting',
    location TEXT,
    attendees TEXT[],
    attendee_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'confirmed',
    conflict BOOLEAN DEFAULT false,
    travel_time INTEGER,
    color TEXT DEFAULT '#0891B2',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. REMINDERS
CREATE TABLE IF NOT EXISTS public.reminders (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'general',
    due_date TIMESTAMPTZ NOT NULL,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'active',
    category TEXT DEFAULT 'general',
    related_to JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TASKS
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    category TEXT DEFAULT 'general',
    due_date TIMESTAMPTZ,
    completed BOOLEAN DEFAULT false,
    delegable BOOLEAN DEFAULT false,
    project_id TEXT,
    project_name TEXT,
    assigned_to TEXT,
    estimated_hours INTEGER,
    progress INTEGER DEFAULT 0,
    tags TEXT[],
    blocked_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COMMUNICATIONS
CREATE TABLE IF NOT EXISTS public.communications (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL,
    direction TEXT NOT NULL,
    to_address TEXT,
    from_address TEXT,
    subject TEXT,
    message TEXT,
    preview TEXT,
    status TEXT DEFAULT 'sent',
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TIME_ENTRIES
CREATE TABLE IF NOT EXISTS public.time_entries (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    task_id BIGINT REFERENCES public.tasks(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    duration INTEGER,
    description TEXT,
    billable BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INTEGRATIONS
CREATE TABLE IF NOT EXISTS public.integrations (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    provider TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'connected',
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    last_sync TIMESTAMPTZ,
    data_types TEXT[],
    health TEXT DEFAULT 'healthy',
    config JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TEAM_MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT,
    department TEXT,
    avatar TEXT,
    status TEXT DEFAULT 'available',
    current_activity TEXT,
    workload INTEGER DEFAULT 0,
    skills TEXT[],
    location TEXT,
    timezone TEXT DEFAULT 'America/Mexico_City',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONVERSATION_HISTORY
CREATE TABLE IF NOT EXISTS public.conversation_history (
    id BIGSERIAL PRIMARY KEY,
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL,
    message TEXT NOT NULL,
    intent TEXT,
    confidence NUMERIC,
    actions JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- INDICES
-- ========================================
CREATE INDEX idx_appointments_workspace ON public.appointments(workspace_id);
CREATE INDEX idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX idx_appointments_status ON public.appointments(status);

CREATE INDEX idx_reminders_workspace ON public.reminders(workspace_id);
CREATE INDEX idx_reminders_due_date ON public.reminders(due_date);
CREATE INDEX idx_reminders_status ON public.reminders(status);
CREATE INDEX idx_reminders_priority ON public.reminders(priority);

CREATE INDEX idx_tasks_workspace ON public.tasks(workspace_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_priority ON public.tasks(priority);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);

CREATE INDEX idx_communications_workspace ON public.communications(workspace_id);
CREATE INDEX idx_time_entries_workspace ON public.time_entries(workspace_id);
CREATE INDEX idx_conversation_history_workspace ON public.conversation_history(workspace_id);

-- ========================================
-- TRIGGERS
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON public.workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON public.reminders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- RLS
-- ========================================
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all" ON public.workspaces FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.appointments FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.reminders FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.tasks FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.communications FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.time_entries FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.integrations FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.team_members FOR ALL USING (true);
CREATE POLICY "Enable all" ON public.conversation_history FOR ALL USING (true);

-- ========================================
-- WORKSPACE INICIAL
-- ========================================
INSERT INTO public.workspaces (id, name, owner_email, plan)
VALUES (
    'e8e7d0f0-1234-5678-9abc-def012345678',
    'L.U.C.I Workspace',
    'patricia@luci.com',
    'pro'
);

INSERT INTO public.profiles (workspace_id, name, email, role, company)
VALUES (
    'e8e7d0f0-1234-5678-9abc-def012345678',
    'Patricia Garibay',
    'patricia@luci.com',
    'Director General',
    'Firma Más Importante de México'
);

-- ✅ LISTO
