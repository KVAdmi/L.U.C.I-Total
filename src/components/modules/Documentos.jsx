
import React, { useState } from 'react';
import { 
  Search, Filter, FolderOpen, FileText, Image as ImageIcon, 
  Table, File, Upload, LayoutGrid, List, MoreVertical, 
  ChevronRight, Clock, Eye, Download, Share2, Trash2, 
  FileSearch, RefreshCw, AlertTriangle, Link, Copy, PenTool,
  FileWarning
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import PillButton from '@/components/ui/PillButton';
import Badge from '@/components/ui/Badge';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// --- Helper Components ---

const FolderItem = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group",
      active 
        ? "bg-slate-200 dark:bg-[#001E21] text-slate-900 dark:text-white" 
        : "text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
    )}
  >
    <div className="flex items-center gap-2">
      <FolderOpen className={cn("w-4 h-4", active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-white/40 group-hover:text-slate-600 dark:group-hover:text-white/60")} />
      <span>{label}</span>
    </div>
    <span className={cn("text-xs", active ? "text-emerald-600/80 dark:text-emerald-400/60" : "text-slate-300 dark:text-white/20")}>{count}</span>
  </button>
);

const FileIcon = ({ type, className }) => {
  switch(type) {
    case 'pdf': return <FileText className={cn("text-red-500 dark:text-red-400", className)} />;
    case 'image': return <ImageIcon className={cn("text-purple-500 dark:text-purple-400", className)} />;
    case 'excel': return <Table className={cn("text-emerald-500 dark:text-emerald-400", className)} />;
    case 'word': return <FileText className={cn("text-blue-500 dark:text-blue-400", className)} />;
    default: return <File className={cn("text-slate-400 dark:text-white/40", className)} />;
  }
};

const DocumentCard = ({ doc, viewMode, onClick, isActive }) => {
  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className={cn(
          "flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer group",
          isActive 
            ? "bg-slate-100 dark:bg-[#001E21]/30 border-emerald-500/30" 
            : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10"
        )}
      >
        <div className="p-2 rounded bg-slate-100 dark:bg-white/5">
          <FileIcon type={doc.type} className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5">
            <p className="text-slate-900 dark:text-white text-sm font-medium truncate">{doc.name}</p>
          </div>
          <div className="col-span-2">
            <Badge variant="secondary" className="uppercase text-[10px]">{doc.type}</Badge>
          </div>
          <div className="col-span-2">
            <span className="text-slate-500 dark:text-white/40 text-xs">{doc.size}</span>
          </div>
          <div className="col-span-3">
            <span className="text-slate-500 dark:text-white/40 text-xs">{doc.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CardCristal 
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer transition-all group relative overflow-hidden",
        isActive ? "border-emerald-500/50 ring-1 ring-emerald-500/20" : "hover:border-slate-300 dark:hover:border-white/20"
      )}
    >
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10">
          <MoreVertical className="w-4 h-4 text-slate-500 dark:text-white" />
        </button>
      </div>
      
      <div className="aspect-[4/3] rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 border border-slate-200 dark:border-white/5">
        <FileIcon type={doc.type} className="w-12 h-12 opacity-80 group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <div>
        <h3 className="text-slate-900 dark:text-white text-sm font-medium truncate mb-1" title={doc.name}>{doc.name}</h3>
        <div className="flex items-center justify-between text-slate-500 dark:text-white/40 text-xs">
          <span>{doc.date}</span>
          <span>{doc.size}</span>
        </div>
      </div>
    </CardCristal>
  );
};

const DocumentPreview = ({ doc, onClose, onAction, t }) => (
  <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0F0F0F]">
    <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{doc.name}</h2>
        <p className="text-slate-500 dark:text-white/40 text-xs uppercase">{doc.type} • {doc.size}</p>
      </div>
      <div className="flex gap-1">
         <button onClick={() => onAction(t('common.share'))} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white" title={t('common.share')}><Share2 className="w-4 h-4" /></button>
         <button onClick={() => onAction(t('common.download'))} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white" title={t('common.download')}><Download className="w-4 h-4" /></button>
      </div>
    </div>
    
    <div className="flex-1 bg-slate-200 dark:bg-[#000]/50 flex items-center justify-center p-8 overflow-hidden">
       <div className="w-full h-full max-w-2xl bg-white shadow-2xl rounded overflow-hidden relative group">
         {/* Mock Preview Content */}
         <div className="absolute inset-0 bg-gray-50 flex flex-col p-8 space-y-4">
            <div className="w-1/3 h-8 bg-gray-300 rounded mb-8" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-2/3 h-4 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-5/6 h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
            </div>
            
            <div className="mt-auto flex justify-center">
               <span className="text-gray-400 text-sm">Vista Previa Generada por AL-E Core</span>
            </div>
         </div>
         {doc.type === 'image' && (
            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white">
               <ImageIcon className="w-24 h-24 opacity-20" />
            </div>
         )}
       </div>
    </div>

    <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
       <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
         <button className="text-xs font-medium text-emerald-600 dark:text-emerald-400 pb-2 border-b border-emerald-600 dark:border-emerald-400">{t('common.details')}</button>
         <button className="text-xs font-medium text-slate-500 dark:text-white/40 pb-2 hover:text-slate-900 dark:hover:text-white">{t('documentos.versions')}</button>
         <button className="text-xs font-medium text-slate-500 dark:text-white/40 pb-2 hover:text-slate-900 dark:hover:text-white">{t('documentos.related')}</button>
       </div>
       
       <div className="space-y-3 text-xs">
         <div className="flex justify-between">
           <span className="text-slate-500 dark:text-white/40">{t('documentos.owner')}</span>
           <span className="text-slate-900 dark:text-white">Tú</span>
         </div>
         <div className="flex justify-between">
           <span className="text-slate-500 dark:text-white/40">{t('documentos.modified')}</span>
           <span className="text-slate-900 dark:text-white">{doc.date}</span>
         </div>
         <div className="flex justify-between">
           <span className="text-slate-500 dark:text-white/40">{t('documentos.location')}</span>
           <span className="text-slate-900 dark:text-white truncate max-w-[150px]">{doc.folder}</span>
         </div>
       </div>
    </div>
  </div>
);

// --- Main Component ---

const Documentos = ({ assistantName }) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState('grid');
  const [activeFolder, setActiveFolder] = useState('Contratos');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { t } = useLanguage();

  const folders = [
    { label: t('documentos.contracts'), id: 'Contratos', count: 12 },
    { label: t('documentos.reports'), id: 'Reportes', count: 8 },
    { label: t('documentos.proposals'), id: 'Propuestas', count: 5 },
    { label: t('documentos.invoices'), id: 'Facturas', count: 24 },
    { label: t('documentos.others'), id: 'Otros', count: 3 }
  ];

  // Reset to default folder if active one changes due to translation
  // For simplicity in this static example, we map labels to IDs or just keep string matching
  // Real app would use IDs.

  const documents = [
    { id: 1, name: 'Contrato_Marco_2025.pdf', type: 'pdf', size: '2.4 MB', date: '27 Nov 2025', folder: t('documentos.contracts') },
    { id: 2, name: 'Presupuesto_Q1_Final.xlsx', type: 'excel', size: '1.1 MB', date: '26 Nov 2025', folder: t('documentos.proposals') },
    { id: 3, name: 'Presentación_Corp_v3.pptx', type: 'powerpoint', size: '15 MB', date: '25 Nov 2025', folder: t('documentos.proposals') },
    { id: 4, name: 'Factura_A8992.pdf', type: 'pdf', size: '450 KB', date: '20 Nov 2025', folder: t('documentos.invoices') },
    { id: 5, name: 'Mockup_App_Mobile.png', type: 'image', size: '3.2 MB', date: '18 Nov 2025', folder: t('documentos.others') },
    { id: 6, name: 'Reporte_Mensual_Oct.docx', type: 'word', size: '890 KB', date: '01 Nov 2025', folder: t('documentos.reports') }
  ];

  const handleAction = (action) => {
    toast({
      title: t('common.action'),
      description: `${action} - Procesando solicitud...`
    });
  };

  // Simplified filter logic for demo (matches localized folder name)
  // Ideally would filter by ID
  const currentFolderLabel = activeFolder === 'Contratos' ? t('documentos.contracts') : activeFolder; // fallback
  // For this demo, let's just show all if filtered or match looser
  const filteredDocs = documents; 

  return (
    <div className="flex h-full max-h-screen overflow-hidden bg-slate-50 dark:bg-[#0F0F0F] transition-colors duration-300">
      
      {/* LEFT COLUMN - Library & Filters */}
      <div className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0F0F0F]">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 space-y-4">
          <h2 className="text-slate-900 dark:text-white font-bold text-lg">{t('documentos.title')}</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-white/40" />
            <input 
              type="text"
              placeholder={t('common.search')}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button onClick={() => handleAction(t('documentos.uploadDoc'))} className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 dark:bg-[#001E21] hover:bg-slate-800 dark:hover:bg-[#003336] text-white rounded-lg text-sm font-medium transition-colors border border-transparent dark:border-white/10">
            <Upload className="w-4 h-4" />
            {t('documentos.uploadDoc')}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <p className="px-3 py-2 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wider">{t('documentos.folders')}</p>
          {folders.map(folder => (
            <FolderItem 
              key={folder.id}
              label={folder.label}
              count={folder.count}
              active={activeFolder === folder.label} // Simple matching
              onClick={() => setActiveFolder(folder.label)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <div className="bg-slate-100 dark:bg-white/5 rounded-lg p-3 space-y-3">
             <div className="flex justify-between items-center">
               <span className="text-xs text-slate-500 dark:text-white/60">{t('documentos.storage')}</span>
               <span className="text-xs text-slate-900 dark:text-white font-bold">45%</span>
             </div>
             <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[45%] rounded-full" />
             </div>
             <p className="text-[10px] text-slate-400 dark:text-white/40 text-center">45GB {t('documentos.used')}</p>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN - Document Grid */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0F0F0F] relative">
         {/* Toolbar */}
         <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0 bg-white/90 dark:bg-[#0F0F0F]/95 backdrop-blur z-10">
            <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 text-sm">
              <span>{t('documentos.title')}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 dark:text-white font-medium">{activeFolder}</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-200 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={cn("p-1.5 rounded transition-colors", viewMode === 'grid' ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white")}
               >
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={cn("p-1.5 rounded transition-colors", viewMode === 'list' ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white")}
               >
                 <List className="w-4 h-4" />
               </button>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-hidden flex">
            {/* Grid/List View */}
            <div className={cn(
              "flex-1 overflow-y-auto custom-scrollbar p-6 transition-all",
              selectedDoc ? "w-1/2 border-r border-slate-200 dark:border-white/10" : "w-full"
            )}>
               <div className={cn(
                 "grid gap-4",
                 viewMode === 'grid' ? "grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
               )}>
                 {filteredDocs.map(doc => (
                    <DocumentCard 
                      key={doc.id} 
                      doc={doc} 
                      viewMode={viewMode}
                      isActive={selectedDoc?.id === doc.id}
                      onClick={() => setSelectedDoc(doc)} 
                    />
                 ))}
               </div>
            </div>

            {/* Preview Panel (Dynamic Split) */}
            {selectedDoc && (
              <div className="w-[400px] shrink-0 border-l border-slate-200 dark:border-white/10 h-full overflow-hidden animate-in slide-in-from-right-10 duration-300">
                <DocumentPreview 
                  doc={selectedDoc} 
                  onClose={() => setSelectedDoc(null)}
                  onAction={handleAction}
                  t={t}
                />
              </div>
            )}
         </div>
      </div>

      {/* RIGHT COLUMN - IA Context */}
      <IAActionPanel 
        assistantName={assistantName} 
        context="documentos"
        className="border-l border-slate-200 dark:border-white/10"
      />

    </div>
  );
};

export default Documentos;
