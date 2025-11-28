-- ========================================
-- SUPABASE DATABASE SCHEMA
-- L.U.C.I TOTAL - ASISTENTE PERSONAL
-- ========================================
-- 
-- INSTRUCCIONES PARA EJECUTAR:
-- 1. Ve a tu proyecto Supabase: https://supabase.com/dashboard
-- 2. Abre el SQL Editor
-- 3. Copia y pega TODO este archivo
-- 4. Click en "Run" para ejecutar
--
-- Esto creará todas las tablas necesarias para el Asistente Personal
-- ========================================

-- Habilitar Row Level Security (RLS) por defecto
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- ========================================
-- TABLA: user_profiles
-- Perfiles de usuario
-- ========================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
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

-- ========================================
-- TABLA: appointments
-- Citas y reuniones
-- ========================================
CREATE TABLE IF NOT EXISTS public.appointments (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    type TEXT DEFAULT 'meeting', -- meeting, video, call, personal
    location TEXT,
    attendees TEXT[], -- Array de emails
    attendee_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'confirmed', -- confirmed, pending, cancelled
    conflict BOOLEAN DEFAULT false,
    reminders INTEGER[] DEFAULT ARRAY[15, 60], -- minutos antes
    color TEXT DEFAULT '#0891B2',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TABLA: reminders
-- Recordatorios y alertas
-- ========================================
CREATE TABLE IF NOT EXISTS public.reminders (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    status TEXT DEFAULT 'pending', -- pending, completed, snoozed
    category TEXT DEFAULT 'general',
    related_to JSONB, -- {type: 'contact', id: 123}
    notifications TEXT[] DEFAULT ARRAY['push'], -- push, email, sms
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TABLA: tasks
-- Tareas y proyectos
-- ========================================
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo', -- todo, in-progress, done, blocked
    priority TEXT DEFAULT 'medium',
    due_date TIMESTAMPTZ,
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

-- ========================================
-- TABLA: communications
-- Historial de comunicaciones
-- ========================================
CREATE TABLE IF NOT EXISTS public.communications (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- email, sms, whatsapp
    direction TEXT NOT NULL, -- sent, received
    to_address TEXT,
    from_address TEXT,
    subject TEXT,
    message TEXT,
    preview TEXT,
    status TEXT DEFAULT 'sent', -- sent, delivered, read, failed, unread
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TABLA: time_entries
-- Registro de tiempo trabajado
-- ========================================
CREATE TABLE IF NOT EXISTS public.time_entries (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    task_id BIGINT REFERENCES public.tasks(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    duration INTEGER, -- minutos
    description TEXT,
    billable BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TABLA: integrations
-- Integraciones con servicios externos
-- ========================================
CREATE TABLE IF NOT EXISTS public.integrations (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- google, microsoft, slack, trello, etc
    name TEXT NOT NULL,
    status TEXT DEFAULT 'connected', -- connected, disconnected, error
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    last_sync TIMESTAMPTZ,
    data_types TEXT[], -- calendar, tasks, contacts, files
    health TEXT DEFAULT 'healthy', -- healthy, warning, error
    config JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TABLA: team_members
-- Miembros del equipo
-- ========================================
CREATE TABLE IF NOT EXISTS public.team_members (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT,
    department TEXT,
    avatar TEXT,
    status TEXT DEFAULT 'available', -- available, busy, away, offline
    current_activity TEXT,
    workload INTEGER DEFAULT 0, -- percentage
    skills TEXT[],
    location TEXT,
    timezone TEXT DEFAULT 'America/Mexico_City',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TABLA: conversation_history
-- Historial de chat con IA
-- ========================================
CREATE TABLE IF NOT EXISTS public.conversation_history (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- user, assistant
    message TEXT NOT NULL,
    intent TEXT,
    confidence NUMERIC,
    actions JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- INDICES para mejor performance
-- ========================================
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON public.reminders(due_date);
CREATE INDEX IF NOT EXISTS idx_reminders_status ON public.reminders(status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_communications_user_id ON public.communications(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_history_user_id ON public.conversation_history(user_id);

-- ========================================
-- TRIGGERS para updated_at automático
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON public.reminders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- DATOS DE PRUEBA (Opcional)
-- ========================================
-- Descomentar para insertar datos de prueba

-- INSERT INTO public.user_profiles (name, email, role, department, company)
-- VALUES ('Alex Medina', 'alex@empresa.com', 'Director General', 'Dirección', 'Firma Más Importante de México');

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================
-- Habilitar RLS en todas las tablas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_history ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permitir todo por ahora, ajustar después)
CREATE POLICY "Enable all for authenticated users" ON public.user_profiles FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.appointments FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.reminders FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.tasks FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.communications FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.time_entries FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.integrations FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.team_members FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.conversation_history FOR ALL USING (true);

-- ========================================
-- ¡LISTO! 
-- Ahora ve a .env y pega tus credenciales
-- ========================================
