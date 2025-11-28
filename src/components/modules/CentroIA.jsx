
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, History, Star, Send, Paperclip, 
  Mic, Edit3, FileText, PieChart, Presentation, Lightbulb,
  ArrowRight, Wand2, Languages, Search, Copy, Share2, 
  Download, Save, RefreshCw, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import Badge from '@/components/ui/Badge';
import PillButton from '@/components/ui/PillButton';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// --- Helper Components ---

const ChatMessage = ({ message, isLast }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "flex gap-3 max-w-[90%] mb-6",
      message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
    )}
  >
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
      message.role === 'user' 
        ? "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white" 
        : "bg-gradient-to-br from-slate-800 to-slate-900 dark:from-[#001E21] dark:to-[#003336] text-emerald-400 border border-slate-700 dark:border-white/10"
    )}>
      {message.role === 'user' ? "YO" : <Sparkles className="w-4 h-4" />}
    </div>
    
    <div className={cn(
      "flex flex-col",
      message.role === 'user' ? "items-end" : "items-start"
    )}>
      <div className={cn(
        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
        message.role === 'user'
          ? "bg-slate-200 dark:bg-gradient-to-br dark:from-[#001E21] dark:to-[#003336] border border-slate-300 dark:border-[#001E21] text-slate-900 dark:text-white rounded-tr-none"
          : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-tl-none"
      )}>
        {message.content}
      </div>
      <span className="text-[10px] text-slate-400 dark:text-white/40 mt-1 px-1">
        {message.timestamp}
      </span>
    </div>
  </motion.div>
);

const ShortcutButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full p-3 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all group text-left"
  >
    <div className="p-2 rounded-lg bg-slate-100 dark:bg-black/20 text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-xs font-medium text-slate-700 dark:text-white/80 group-hover:text-slate-900 dark:group-hover:text-white">{label}</span>
    <ArrowRight className="w-3 h-3 text-slate-400 dark:text-white/20 group-hover:text-slate-600 dark:group-hover:text-white/60 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
  </button>
);

const GeneratorForm = ({ type, onGenerate, t }) => {
  // Mock forms based on type
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase">{t('centroIa.topic')}</label>
            <input type="text" className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-emerald-500/50 focus:outline-none" placeholder="Ej: Lanzamiento Q1..." />
         </div>
         {type === 'email' && (
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase">Destinatario</label>
              <input type="text" className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-emerald-500/50 focus:outline-none" placeholder="Nombre o cargo..." />
           </div>
         )}
         {type === 'analysis' && (
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase">Fuente de Datos</label>
              <select className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-white/60 focus:border-emerald-500/50 focus:outline-none">
                <option>Excel / CSV</option>
                <option>Base de Datos</option>
                <option>Texto Plano</option>
              </select>
           </div>
         )}
      </div>
      
      <div className="space-y-2">
         <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase">{t('centroIa.details')}</label>
         <textarea rows={5} className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-emerald-500/50 focus:outline-none resize-none" placeholder="Describe los puntos clave a incluir..." />
      </div>
      
      <div className="flex items-center justify-between pt-4">
         <div className="flex gap-2">
            <Badge variant="outline" className="text-slate-500 dark:text-white/40 bg-slate-100 dark:bg-white/5 cursor-pointer hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20">Formal</Badge>
            <Badge variant="outline" className="text-slate-500 dark:text-white/40 bg-slate-100 dark:bg-white/5 cursor-pointer hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20">Breve</Badge>
         </div>
         <PillButton onClick={onGenerate} className="bg-emerald-500 hover:bg-emerald-400 text-white dark:text-black font-bold px-6">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('centroIa.generate')}
         </PillButton>
      </div>
    </div>
  );
};

// --- Main Component ---

const CentroIA = ({ assistantName }) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState('chat'); // chat, generators
  const [activeGenerator, setActiveGenerator] = useState('redaccion'); 
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const { t } = useLanguage();

  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: `Hola, soy ${assistantName}. Tu centro de inteligencia artificial avanzado. ¿En qué puedo ayudarte hoy? Puedo redactar documentos, analizar datos o generar ideas creativas.`, timestamp: '09:00' }
  ]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: "Entendido. He procesado tu solicitud y aquí tienes una propuesta preliminar basada en tus requerimientos previos.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  const handleAction = (action) => {
    toast({
      title: t('common.action'),
      description: `${action} - Procesando...`
    });
  };

  const shortcuts = [
    { id: 1, icon: Edit3, label: 'Redactar Email', action: 'Redactar email' },
    { id: 2, icon: FileText, label: 'Resumir Doc', action: 'Resumir documento' },
    { id: 3, icon: Presentation, label: 'Crear Slides', action: 'Generar presentación' },
    { id: 4, icon: PieChart, label: 'Analizar Datos', action: 'Analizar datos' },
    { id: 5, icon: Lightbulb, label: 'Brainstorm', action: 'Brainstorm ideas' },
    { id: 6, icon: Languages, label: 'Traducir', action: 'Traducir texto' },
  ];

  return (
    <div className="flex h-full max-h-screen overflow-hidden bg-slate-50 dark:bg-[#0F0F0F] transition-colors duration-300">
      
      {/* LEFT COLUMN - Shortcuts & History */}
      <div className="w-72 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0F0F0F]">
        <div className="p-6 border-b border-slate-200 dark:border-white/10">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{t('centroIa.title')}</h2>
           <p className="text-xs text-slate-500 dark:text-white/40">{t('centroIa.poweredBy')}</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
           <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider px-2">{t('centroIa.shortcuts')}</h3>
              <div className="space-y-2">
                 {shortcuts.map(sc => (
                    <ShortcutButton 
                       key={sc.id} 
                       icon={sc.icon} 
                       label={sc.label} 
                       onClick={() => handleAction(sc.action)} 
                    />
                 ))}
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider px-2">{t('centroIa.history')}</h3>
              <div className="space-y-1">
                 {['Estrategia Q4', 'Análisis Competencia', 'Email Bienvenida'].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 text-xs transition-all text-left">
                       <History className="w-3 h-3" />
                       {item}
                    </button>
                 ))}
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider px-2">{t('centroIa.favorites')}</h3>
              <div className="space-y-1">
                 {['Prompt: SEO Blog', 'Template: Reporte Semanal'].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-yellow-600 dark:text-yellow-400/60 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-white/5 text-xs transition-all text-left">
                       <Star className="w-3 h-3" />
                       {item}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* CENTER COLUMN - Chat & Generators */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0F0F0F] relative overflow-hidden">
         {/* View Toggle Header */}
         <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0 bg-white/90 dark:bg-[#0F0F0F]/95 backdrop-blur z-10">
            <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10">
               <button 
                 onClick={() => setActiveView('chat')}
                 className={cn("px-4 py-1.5 text-xs font-medium rounded transition-all flex items-center gap-2", activeView === 'chat' ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white")}
               >
                 <MessageSquare className="w-3 h-3" /> {t('centroIa.chat')}
               </button>
               <button 
                 onClick={() => setActiveView('generators')}
                 className={cn("px-4 py-1.5 text-xs font-medium rounded transition-all flex items-center gap-2", activeView === 'generators' ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white")}
               >
                 <Wand2 className="w-3 h-3" /> {t('centroIa.generators')}
               </button>
            </div>
            <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-xs">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Sistema Operativo
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-hidden flex flex-col relative">
            {activeView === 'chat' ? (
               <>
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {messages.map((msg, idx) => (
                       <ChatMessage key={msg.id} message={msg} isLast={idx === messages.length - 1} />
                    ))}
                    {isTyping && (
                       <div className="flex gap-3 max-w-[90%] mb-6 mr-auto animate-pulse">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 dark:from-[#001E21] dark:to-[#003336] flex items-center justify-center shrink-0 border border-slate-700 dark:border-white/10">
                             <Sparkles className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 text-xs flex items-center gap-1 rounded-tl-none">
                             <span>{t('centroIa.typing')}</span>
                             <span className="animate-bounce">.</span>
                             <span className="animate-bounce delay-100">.</span>
                             <span className="animate-bounce delay-200">.</span>
                          </div>
                       </div>
                    )}
                    <div ref={chatEndRef} />
                 </div>

                 {/* Chat Input */}
                 <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F]">
                    <div className="relative">
                       <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={(e) => {
                             if(e.key === 'Enter' && !e.shiftKey) handleSendMessage(e);
                          }}
                          placeholder={t('centroIa.writeInstruction')}
                          className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-4 pr-12 py-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 resize-none h-14 min-h-[56px] max-h-32 custom-scrollbar"
                       />
                       <div className="absolute right-2 top-2 bottom-2 flex flex-col justify-between items-center py-1">
                          <button className="p-1.5 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors rounded">
                             <Paperclip className="w-4 h-4" />
                          </button>
                          <button 
                             onClick={handleSendMessage}
                             disabled={!inputMessage.trim()}
                             className="p-1.5 bg-slate-900 dark:bg-[#001E21] text-emerald-400 rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                             <Send className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2 custom-scrollbar">
                       {['Analizar este gráfico', 'Resumir últimos emails', 'Idea para post LinkedIn'].map(suggestion => (
                          <button 
                             key={suggestion} 
                             onClick={() => setInputMessage(suggestion)}
                             className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                             {suggestion}
                          </button>
                       ))}
                    </div>
                 </div>
               </>
            ) : (
               <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                  <div className="max-w-3xl mx-auto">
                     <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-white/10 pb-1">
                        {[
                           { id: 'redaccion', label: t('centroIa.writing'), icon: Edit3 },
                           { id: 'analisis', label: t('centroIa.analysis'), icon: PieChart },
                           { id: 'presentacion', label: t('centroIa.presentation'), icon: Presentation },
                           { id: 'brainstorm', label: t('centroIa.brainstorm'), icon: Lightbulb }
                        ].map(tab => (
                           <button
                              key={tab.id}
                              onClick={() => setActiveGenerator(tab.id)}
                              className={cn(
                                 "pb-3 px-2 text-sm font-medium transition-all border-b-2 flex items-center gap-2",
                                 activeGenerator === tab.id 
                                    ? "text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400" 
                                    : "text-slate-400 dark:text-white/40 border-transparent hover:text-slate-900 dark:hover:text-white"
                              )}
                           >
                              <tab.icon className="w-4 h-4" />
                              {tab.label}
                           </button>
                        ))}
                     </div>
                     
                     <CardCristal className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-white/5 dark:to-transparent">
                        <div className="mb-6">
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                              {activeGenerator === 'redaccion' && 'Asistente de Redacción'}
                              {activeGenerator === 'analisis' && 'Motor de Análisis'}
                              {activeGenerator === 'presentacion' && 'Generador de Slides'}
                              {activeGenerator === 'brainstorm' && 'Laboratorio de Ideas'}
                           </h3>
                           <p className="text-slate-500 dark:text-white/40 text-sm">
                              Completa los detalles para generar contenido profesional instantáneamente.
                           </p>
                        </div>
                        <GeneratorForm 
                           type={activeGenerator === 'redaccion' ? 'email' : activeGenerator === 'analisis' ? 'analysis' : 'general'} 
                           onGenerate={() => handleAction(`Generar ${activeGenerator}`)} 
                           t={t}
                        />
                     </CardCristal>
                  </div>
               </div>
            )}
         </div>
      </div>

      {/* RIGHT COLUMN - IA Context */}
      <IAActionPanel 
        assistantName={assistantName} 
        context="centro-ia"
        className="border-l border-slate-200 dark:border-white/10"
      />

    </div>
  );
};

export default CentroIA;
