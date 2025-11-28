
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Inbox, Send, FileText, Trash2, Shield, Star, Plus, FolderPlus, 
  Search, ChevronLeft, Archive, MoreVertical, Paperclip, 
  CornerUpLeft, CornerUpRight, ChevronsRight, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

// Mock Data
const mockEmails = {
  inbox: [
    { id: 'in1', sender: 'GitHub', subject: 'Security alert: New device signed in', date: '3:45 PM', read: false, starred: false, body: 'A new sign-in to your account was detected from a new device in Ashburn, VA, US. If this was you, you can safely ignore this email. If this wasn\'t you, please change your password immediately.', attachment: false },
    { id: 'in2', sender: 'Vercel', subject: 'Deployment "my-app" is ready', date: '11:20 AM', read: true, starred: true, body: 'Congratulations! Your deployment is live and running. You can access it at the following URL. Thank you for using Vercel.', attachment: true },
    { id: 'in3', sender: 'Notion', subject: 'Elena shared "Project Plan"', date: 'Yesterday', read: true, starred: false, body: 'Elena Miró has invited you to view the page "Project Plan". Click the button below to view it.', attachment: false },
    { id: 'in4', sender: 'Stripe', subject: 'Your weekly transaction summary', date: 'Nov 25', read: true, starred: false, body: 'Here is your summary for the week of November 18 - November 24, 2025. Total volume: $12,450.30', attachment: true },
  ],
  sent: [
    { id: 's1', recipient: 'Elena Miró', subject: 'Re: Project Plan', date: 'Yesterday', read: true, body: 'Thanks, Elena! Looks great. I have added my comments.', attachment: false },
  ],
  drafts: [], spam: [], trash: []
};

const mockFolders = [
  { id: 'f1', name: 'Projects', icon: FolderPlus },
  { id: 'f2', name: 'Invoices', icon: FolderPlus },
];

const FolderTree = ({ activeFolder, setActiveFolder, onCompose }) => {
  const { t } = useLanguage();
  const folders = [
    { id: 'inbox', name: t('email.inbox') || 'Inbox', icon: Inbox },
    { id: 'sent', name: t('email.sent') || 'Sent', icon: Send },
    { id: 'drafts', name: t('email.drafts') || 'Drafts', icon: FileText },
    { id: 'spam', name: t('email.spam') || 'Spam', icon: Shield },
    { id: 'trash', name: t('email.trash') || 'Trash', icon: Trash2 },
  ];

  return (
    <div className="p-2 space-y-1">
       <div className="p-2">
          <Button className="w-full gap-2" onClick={onCompose}><Plus className="w-4 h-4" />{t('email.compose') || 'Compose'}</Button>
        </div>
      {folders.map(f => (
        <button 
          key={f.id} 
          onClick={() => setActiveFolder(f.id)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm",
            activeFolder === f.id 
              ? "bg-[#003336] text-white font-semibold" 
              : "text-white/70 hover:bg-white/10 hover:text-white"
          )}
        >
          <f.icon className="w-4 h-4" /> {f.name}
        </button>
      ))}
       <div className="pt-2 mt-2 border-t border-white/10">
         {mockFolders.map(f => (
          <button key={f.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white">
            <f.icon className="w-4 h-4" /> {f.name}
          </button>
         ))}
      </div>
    </div>
  );
};

const EmailList = ({ emails, onSelectEmail, selectedEmailId }) => {
  if (emails.length === 0) {
    return <div className="flex items-center justify-center h-full text-white/40">No emails in this folder.</div>;
  }
  return (
    <div className="divide-y divide-white/10">
      {emails.map(email => (
        <div 
          key={email.id} 
          onClick={() => onSelectEmail(email)}
          className={cn(
            "p-4 cursor-pointer hover:bg-white/5 transition-colors group",
            selectedEmailId === email.id && "bg-[#001E21]/50",
            !email.read && "border-l-2 border-cyan-400 bg-cyan-400/5"
          )}
        >
          <div className="flex justify-between items-start">
            <p className={cn("font-semibold", !email.read ? "text-white" : "text-white/80")}>{email.sender}</p>
            <p className="text-xs text-white/50">{email.date}</p>
          </div>
          <p className={cn("text-sm truncate mt-1", !email.read ? "text-white/90" : "text-white/60")}>{email.subject}</p>
          <p className="text-xs text-white/40 truncate mt-1">{email.body}</p>
           <div className="flex items-center gap-2 mt-2">
            <Star className={cn("w-4 h-4 transition-colors", email.starred ? "text-amber-400 fill-amber-400" : "text-white/30 group-hover:text-amber-400")} />
            {email.attachment && <Paperclip className="w-3 h-3 text-white/40" />}
          </div>
        </div>
      ))}
    </div>
  );
};

const EmailDetail = ({ email, onClose }) => {
  const { toast } = useToast();
  if (!email) {
    return null;
  }
  return (
    <motion.div 
      key={email.id}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="flex flex-col h-full absolute inset-0 bg-[#0A0A0A] xl:relative"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1"><CornerUpLeft className="w-3 h-3"/> Reply</Button>
          <Button variant="outline" size="sm" className="gap-1"><CornerUpRight className="w-3 h-3"/> Reply All</Button>
          <Button variant="outline" size="sm" className="gap-1"><ChevronsRight className="w-3 h-3"/> Forward</Button>
        </div>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" title="Archive"><Archive className="w-4 h-4"/></Button>
            <Button variant="ghost" size="icon" title="Delete" className="hover:bg-red-500/10 hover:text-red-400"><Trash2 className="w-4 h-4"/></Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="xl:hidden"><ChevronLeft className="w-5 h-5"/></Button>
        </div>
      </div>
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
        <h1 className="text-2xl font-bold text-white mb-4">{email.subject}</h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center font-bold">{email.sender.charAt(0)}</div>
          <div>
            <p className="font-semibold text-white">{email.sender}</p>
            <p className="text-sm text-white/60">to me</p>
          </div>
          <p className="text-sm text-white/60 ml-auto">{email.date}</p>
        </div>
        <div className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed">
          <p>{email.body}</p>
        </div>
        {email.attachment && (
            <div className="mt-8">
                <h3 className="text-sm font-semibold mb-2 text-white/80">Attachments</h3>
                <div className="flex gap-2">
                    <div className="p-2 bg-white/5 rounded-md border border-white/10 flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-cyan-400"/>
                        <span>report_Q3.pdf</span>
                    </div>
                </div>
            </div>
        )}
      </div>
    </motion.div>
  );
};


const EmailModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="h-full flex overflow-hidden rounded-lg bg-[#0A0A0A] border border-white/10 text-white font-['Questrial']">
      <div className="w-60 border-r border-white/10 flex-shrink-0 hidden md:block">
        <FolderTree activeFolder={activeFolder} setActiveFolder={setActiveFolder} onCompose={() => setShowCompose(true)} />
      </div>

      <div className={cn("w-full md:w-[35%] lg:w-[30%] border-r border-white/10 flex-shrink-0 flex flex-col", selectedEmail && "hidden md:flex")}>
        <div className="p-4 border-b border-white/10 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"/>
            <input type="text" placeholder={t('common.search')} className="w-full bg-white/5 pl-9 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <EmailList emails={mockEmails[activeFolder] || []} onSelectEmail={setSelectedEmail} selectedEmailId={selectedEmail?.id} />
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence>
            <EmailDetail email={selectedEmail} onClose={() => setSelectedEmail(null)} />
        </AnimatePresence>
        {!selectedEmail && <div className="hidden xl:flex items-center justify-center h-full text-white/40">Select an email to read.</div>}
      </div>

       <AnimatePresence>
        {showCompose && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowCompose(false)}
            >
             <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-[#0F0F0F] border border-white/10 rounded-lg w-full max-w-2xl shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-white">{t('email.new_message') || 'New Message'}</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowCompose(false)}><X className="w-4 h-4"/></Button>
                </div>
                <div className="p-4 space-y-3">
                    <input type="text" placeholder="To" className="w-full bg-white/5 p-2 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"/>
                    <input type="text" placeholder="Subject" className="w-full bg-white/5 p-2 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"/>
                    <div className="h-64 bg-white/5 rounded p-2 text-sm text-white/60">Rich text editor placeholder...</div>
                </div>
                 <div className="p-4 border-t border-white/10 flex justify-between items-center">
                     <Button className="gap-2" onClick={() => {setShowCompose(false); toast({title: "Email Sent"})}}> <Send className="w-4 h-4"/>{t('email.send') || 'Send'}</Button>
                     <Button variant="ghost" onClick={() => toast({title: "Attachment added (simulated)"})}><Paperclip className="w-4 h-4"/></Button>
                 </div>
             </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailModule;
