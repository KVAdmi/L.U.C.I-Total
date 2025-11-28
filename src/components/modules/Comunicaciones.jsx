
import React, { useState } from 'react';
import { 
  Search, MessageSquare, Mail, Settings, Check, CheckCheck, Send, Paperclip
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmailModule from '@/components/comunicaciones/EmailModule';

// --- Helper Components ---
const ChatListItem = ({ chat, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "p-4 flex items-start gap-3 border-b border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-all group relative",
      isActive && "bg-slate-200 dark:bg-[#001E21]/30 border-l-2 border-l-emerald-500 dark:border-l-emerald-400"
    )}
  >
    <div className="relative shrink-0">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-white/10 dark:to-white/5 flex items-center justify-center text-slate-700 dark:text-white font-medium border border-slate-300 dark:border-white/10">
        {chat.avatar}
      </div>
      <div className={cn(
        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-[#0F0F0F]",
        chat.online ? "bg-emerald-500" : "bg-gray-500"
      )} />
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-slate-900 dark:text-white text-sm font-medium truncate">{chat.name}</h3>
        <span className="text-[10px] text-slate-500 dark:text-white/40">{chat.time}</span>
      </div>
      <p className="text-slate-500 dark:text-white/60 text-xs truncate pr-4 group-hover:text-slate-700 dark:group-hover:text-white/80 transition-colors">
        {chat.lastMessage}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">WA</Badge>
        {chat.unread > 0 && (
          <span className="bg-emerald-500 text-white dark:text-[#0F0F0F] text-[10px] font-bold px-1.5 h-4 rounded-full flex items-center justify-center">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  </div>
);

const MessageBubble = ({ message, isMe }) => (
  <div className={cn("flex w-full mb-4", isMe ? "justify-end" : "justify-start")}>
    <div className={cn(
      "max-w-[70%] rounded-2xl p-3 relative group",
      isMe 
        ? "bg-gradient-to-br from-slate-800 to-slate-900 dark:from-[#001E21] dark:to-[#003336] border border-slate-700 dark:border-[#001E21] text-white rounded-tr-sm" 
        : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-tl-sm"
    )}>
      {message.type === 'text' && <p className="text-sm leading-relaxed">{message.content}</p>}
      <div className={cn("flex items-center gap-1 mt-1.5 text-[10px] opacity-50", isMe ? "justify-end" : "justify-start")}>
        <span>{message.time}</span>
        {isMe && <span className="opacity-60">{message.status === 'read' ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Check className="w-3 h-3" />}</span>}
      </div>
    </div>
  </div>
);

const ChatModule = () => {
    const { t } = useLanguage();
    const [activeChatId, setActiveChatId] = useState(1);
    const [messageInput, setMessageInput] = useState('');
    const { toast } = useToast();

     const chats = [
        { id: 1, name: "Elena Miró", avatar: "EM", online: true, lastMessage: "El cliente aprobó el presupuesto Q4 🎉", time: "10:42", unread: 2 },
        { id: 2, name: "Soporte IT", avatar: "IT", online: true, lastMessage: "El servidor ya está operativo.", time: "Ayer", unread: 0 },
     ];
    const messages = [
        { id: 1, type: "text", content: "Hola, ¿cómo va el proyecto Alpha?", time: "10:30", isMe: true, status: "read" },
        { id: 2, type: "text", content: "Todo bien, acabamos de terminar la fase 1.", time: "10:35", isMe: false },
        { id: 4, type: "text", content: "Excelente noticia. ¿Cuándo podemos revisar?", time: "10:40", isMe: true, status: "read" },
        { id: 5, type: "text", content: "El cliente aprobó el presupuesto Q4 🎉", time: "10:42", isMe: false }
    ];

    return (
        <div className="flex h-full max-h-screen overflow-hidden bg-[#0A0A0A] rounded-lg border border-white/10">
            <div className="w-80 flex-shrink-0 flex flex-col border-r border-white/10">
                <div className="p-4 border-b border-white/10 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
                        <input type="text" placeholder={t('comunicaciones.searchPlaceholder')} className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">{chats.map(chat => <ChatListItem key={chat.id} chat={chat} isActive={activeChatId === chat.id} onClick={() => setActiveChatId(chat.id)} />)}</div>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0">{/* Chat Header */}</div>
                <div className="flex-1 overflow-y-auto p-6">{messages.map(msg => <MessageBubble key={msg.id} message={msg} isMe={msg.isMe} />)}</div>
                <div className="p-4 border-t border-white/10 flex items-center gap-3">
                    <button className="p-2 text-white/60 hover:text-white"><Paperclip className="w-5 h-5"/></button>
                    <input 
                        type="text" 
                        placeholder={t('comunicaciones.writeMessage')}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button className="p-3 bg-[#003336] rounded-lg text-white hover:bg-[#001E21]"><Send className="w-5 h-5"/></button>
                </div>
            </div>
        </div>
    )
}


const Comunicaciones = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('email');

  return (
    <div className="h-full flex flex-col font-['Questrial']">
      <header className="px-6 pt-6 pb-2">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider">{t('sidebar.comunicaciones')}</h1>
      </header>
      <div className="px-6 flex-1 flex flex-col">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="bg-[#1A1A1A] border border-[rgba(0,30,33,0.35)] justify-start p-1 h-auto self-start">
            <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-[#003336]"><MessageSquare className="w-4 h-4" />Chat</TabsTrigger>
            <TabsTrigger value="email" className="gap-2 data-[state=active]:bg-[#003336]"><Mail className="w-4 h-4" />Email</TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-[#003336]"><Settings className="w-4 h-4" />{t('header.settings')}</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 mt-4">
            <ChatModule />
          </TabsContent>
          <TabsContent value="email" className="flex-1 mt-4 pb-4">
            <EmailModule />
          </TabsContent>
          <TabsContent value="settings" className="flex-1 mt-4">
              <CardCristal className="h-full">
                  <div className="p-6 text-center text-white/40 flex flex-col items-center justify-center h-full">
                      <Settings className="w-12 h-12 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
                      <p>Manage your email and chat accounts here. This section is under construction.</p>
                  </div>
              </CardCristal>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Comunicaciones;
