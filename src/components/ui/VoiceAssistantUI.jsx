
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Send, Zap, BrainCircuit, History } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCommandSuggestions } from '@/lib/voice-utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const VoiceAssistantUI = ({ isVisible, onClose, voiceState, activeModule, onNavigate }) => {
  const { t } = useLanguage();
  const [suggestions, setSuggestions] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setSuggestions(getCommandSuggestions(activeModule, t.language));
    }
  }, [isVisible, activeModule, t.language]);

  useEffect(() => {
    if (voiceState.transcript || voiceState.responseText) {
      const newEntry = {
        transcript: voiceState.transcript,
        response: voiceState.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      if (voiceState.isListening === false && (newEntry.transcript || newEntry.response)) {
        const lastEntry = commandHistory[commandHistory.length - 1];
        if (!lastEntry || lastEntry.transcript !== newEntry.transcript) {
          setCommandHistory(prev => [...prev, newEntry]);
        }
      }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceState.isListening, voiceState.responseText, voiceState.transcript]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  const handleSuggestionClick = (command) => {
    if (command.type === 'NAVIGATE') {
      onNavigate(command.payload);
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[100] flex items-end justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: "100%", opacity: 0.5 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: "100%", opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white/5 dark:bg-[#0F0F0F]/80 border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden relative max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <header className="p-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                   <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  AL-E Voice Assistant
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white/60 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-y-auto custom-scrollbar">
              {/* Transcript & History */}
              <div className="col-span-3 lg:col-span-2 space-y-4">
                 <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                    <History className="w-4 h-4" /> Historial de Comandos
                 </h3>
                 <div className="space-y-4 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                   {commandHistory.map((item, index) => (
                     item.transcript && <div key={index}>
                       <p className="text-sm text-white/80 font-medium">"{item.transcript}"</p>
                       {item.response && <p className="text-xs text-teal-400 mt-1 pl-4 border-l border-teal-500/20">{item.response}</p>}
                     </div>
                   ))}
                   <div ref={transcriptEndRef} />
                 </div>
                 {voiceState.isListening && <p className="text-lg text-white font-semibold">{voiceState.transcript || <span className="text-white/40">Escuchando...</span>}</p>}
              </div>

              {/* Suggestions */}
              <div className="col-span-3 lg:col-span-1 space-y-4">
                <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Atajos Rápidos
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.map((cmd) => (
                    <motion.button
                      key={cmd.id}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestionClick(cmd)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 p-2.5 rounded-lg text-sm font-medium transition-colors text-left truncate"
                    >
                      {cmd.description}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="p-4 bg-black/20 border-t border-white/10 flex items-center justify-center gap-4 shrink-0">
               <motion.button
                onClick={voiceState.isListening ? voiceState.stop : voiceState.start}
                animate={{ scale: voiceState.isListening ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 border-2",
                  voiceState.isListening ? 'bg-red-500/20 border-red-500' : 'bg-teal-500/20 border-teal-500'
                )}
              >
                {voiceState.isListening && <div className="absolute w-20 h-20 rounded-full bg-red-500 animate-ping opacity-50" />}
                <Mic className="w-8 h-8" />
              </motion.button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistantUI;
