
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreVertical, User, Briefcase, 
  Building, Mail, Phone, MapPin, Calendar, Tag, 
  Linkedin, Twitter, FileText, Clock, CheckSquare, 
  TrendingUp, Users, Star, Shield, AlertTriangle, 
  Link, Upload, Trash2, Edit, Download, Share2, Sparkles, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import ModuleHeader from '@/components/ui/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/card';

const ContactListItem = ({ contact, isActive, onClick }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'VIP': return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20';
      case 'Activo': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'Inactivo': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
      case 'Frío': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      default: return 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/60';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 flex items-center gap-4 border-b border-border hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group relative",
        isActive && "bg-slate-100 dark:bg-slate-800 border-l-2 border-l-primary"
      )}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-bold text-sm border border-border shrink-0">
        {contact.avatar}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <h3 className="text-foreground text-sm font-medium truncate">{contact.name}</h3>
          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border", getStatusColor(contact.status))}>
            {contact.status}
          </span>
        </div>
        <p className="text-muted-foreground text-xs truncate">{contact.company}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {contact.lastContact}
          </span>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
      active 
        ? "border-primary text-primary" 
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
    )}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

const Contactos = ({ assistantName }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [filter, setFilter] = useState('Todos');
  const { t } = useLanguage();

  const contacts = [
    { id: 1, name: "Carlos Rodríguez", avatar: "CR", title: "Director de Marketing", company: "TechFlow Solutions", type: "Cliente", status: "VIP", email: "carlos.r@techflow.com", phone: "+34 612 345 678", address: "Av. Diagonal 123, Barcelona", lastContact: "2 días", tags: ["Tecnología", "B2B", "Enterprise"], engagement: "Alto", opportunities: 2 },
    { id: 2, name: "Ana Martínez", avatar: "AM", title: "CEO", company: "Innovate Corp", type: "Prospecto", status: "Activo", email: "ana.m@innovate.com", phone: "+34 699 888 777", address: "Paseo de la Castellana 45, Madrid", lastContact: "1 semana", tags: ["Startup", "Fintech"], engagement: "Medio", opportunities: 1 },
    { id: 3, name: "Roberto Gil", avatar: "RG", title: "Gerente de Compras", company: "Constructora Norte", type: "Proveedor", status: "Frío", email: "roberto.g@cnorte.es", phone: "+34 655 444 333", address: "Polígono Industrial Sur, Valencia", lastContact: "3 meses", tags: ["Construcción", "Materiales"], engagement: "Bajo", opportunities: 0 }
  ];

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const handleAction = (action) => {
    toast({ title: t('common.action'), description: `${action} - ${t('common.processing')}` });
  };

  const filterOptions = [t('contactos.all'), t('contactos.clients'), t('contactos.prospects'), 'VIP'];

  return (
    <div className="flex h-full max-h-screen overflow-hidden">
      <div className="w-[340px] flex-shrink-0 flex flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-foreground font-bold text-lg">{t('contactos.title')}</h2>
            <Button size="icon" variant="outline" onClick={() => handleAction(t('contactos.create'))}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder={t('contactos.searchPlaceholder')} className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 -mx-4 px-4">
            {filterOptions.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                  filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-border hover:bg-accent"
                )}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map(contact => (
             <ContactListItem key={contact.id} contact={contact} isActive={selectedContactId === contact.id} onClick={() => setSelectedContactId(contact.id)} />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 bg-background relative overflow-y-auto custom-scrollbar">
        <ModuleHeader title={selectedContact.name} breadcrumb={[{ label: t('modules.contactos'), path: '/contactos' }, { label: selectedContact.name }]}>
          <Button variant="outline" size="sm" onClick={() => handleAction(t('common.edit'))}><Edit className="w-4 h-4 mr-2" />{t('common.edit')}</Button>
          <Button variant="outline" size="icon" onClick={() => handleAction('More options')}><MoreVertical className="w-4 h-4" /></Button>
        </ModuleHeader>
        <div className="flex-grow">
          <div className="p-6">
            <div className="flex gap-6 items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-3xl font-bold border-2 border-card shadow-lg">
                {selectedContact.avatar}
              </div>
              <div>
                <p className="text-muted-foreground text-sm flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4" /> {selectedContact.title} at {selectedContact.company}
                </p>
                <div className="flex gap-2">
                  <Badge variant="success">{selectedContact.status}</Badge>
                  <Badge variant="secondary">{selectedContact.type}</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-border">
            <div className="px-6 flex gap-6">
              <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={User} label={t('contactos.profile')} />
              <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={Clock} label={t('contactos.history')} />
              <TabButton active={activeTab === 'files'} onClick={() => setActiveTab('files')} icon={FileText} label={t('contactos.files')} />
              <TabButton active={activeTab === 'opportunities'} onClick={() => setActiveTab('opportunities')} icon={TrendingUp} label={t('contactos.opportunities')} />
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('contactos.contactInfo')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-primary" />{selectedContact.email}</div>
                    <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-primary" />{selectedContact.phone}</div>
                    <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-primary" />{selectedContact.address}</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('contactos.social')}</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon"><Linkedin className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon"><Twitter className="w-4 h-4" /></Button>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('contactos.tags')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map(tag => (<Badge key={tag} variant="outline">{tag}</Badge>))}
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('contactos.quickNotes')}</h3>
                  <p className="text-sm text-muted-foreground italic">Cliente preferente para nuevos lanzamientos. Interesado en automatización para Q3.</p>
                </Card>
              </motion.div>
            )}
            {activeTab === 'history' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-start gap-4 relative pb-8 border-l border-border ml-2 pl-6">
                  <div className="absolute -left-[6.5px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                  <div>
                    <span className="text-xs text-muted-foreground">Hoy, 10:30 AM</span>
                    <h4 className="font-medium mt-1">Reunión de seguimiento Q4</h4>
                    <p className="text-muted-foreground text-sm mt-1">Se presentaron los resultados preliminares. Feedback positivo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 relative pb-8 border-l border-border ml-2 pl-6">
                  <div className="absolute -left-[6.5px] top-1 w-3 h-3 rounded-full bg-secondary-foreground/50 ring-4 ring-background" />
                  <div>
                    <span className="text-xs text-muted-foreground">25 Nov, 16:00 PM</span>
                    <h4 className="font-medium mt-1">Email enviado: Propuesta Comercial</h4>
                    <p className="text-muted-foreground text-sm mt-1">Envío de presupuesto adjunto v2.pdf</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactos;
