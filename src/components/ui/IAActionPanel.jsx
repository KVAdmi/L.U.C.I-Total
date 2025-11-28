
import React, { useState } from 'react';
import { 
  Sparkles, Send, Mic, X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const IAActionPanel = ({ assistantName, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSend = () => {
    if (message.trim()) {
      toast({
        title: "Procesando consulta IA",
        description: "Analizando contexto y generando respuesta..."
      });
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("fixed bottom-8 right-8 z-50 font-['Questrial']", className)}>
        <AnimatePresence>
            {isOpen && (
                 <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-96 p-4 bg-[#141414] border border-[rgba(0,30,33,0.5)] rounded-2xl shadow-2xl mb-4"
                 >
                    <h3 className="text-white text-sm font-semibold mb-2">{`Consultar a ${assistantName}`}</h3>
                     <div className="relative">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder="Escribe tu consulta o comando..."
                            className="w-full bg-[#1F1F1F] border border-[rgba(0,30,33,0.35)] rounded-lg pl-4 pr-10 py-2 text-white text-sm placeholder:text-[#BFC8CF]/60 focus:outline-none focus:border-[#003336] transition-colors resize-none h-24"
                        />
                        <button onClick={handleSend} className="absolute right-2 bottom-2 p-1.5 rounded-md hover:bg-[#003336] text-[#BFC8CF] hover:text-white transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                 </motion.div>
            )}
        </AnimatePresence>
       
       <div className="flex justify-end">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003336] to-[#001E21] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'sparkles'}
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X className="w-7 h-7 text-white" /> : <Sparkles className="w-7 h-7 text-white" />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
       </div>

    </div>
  );
};

export default IAActionPanel;
