
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  Mic, MicOff, Volume2, MessageSquare, Sparkles, Clock, Zap, Brain, Send, Loader2
} from 'lucide-react';
import SubmoduleHeader from './SubmoduleHeader';
import { sendMessage, getHistory } from '@/lib/asistente/conversational';
import { useToast } from '@/components/ui/use-toast';

const AsistenteConversacional = ({ onBack }) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory({ limit: 10 });
      setConversation(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text || !text.trim()) return;

    setLoading(true);
    const userMessage = { id: Date.now(), role: 'user', message: text, timestamp: new Date().toISOString() };
    setConversation(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await sendMessage(text, { history: conversation });
      const assistantMessage = { 
        id: response.id, 
        role: 'assistant', 
        message: response.message, 
        timestamp: response.timestamp,
        actions: response.actions,
        suggestions: response.suggestions 
      };
      setConversation(prev => [...prev, assistantMessage]);
      
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: 'Error', description: 'No se pudo procesar el mensaje', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Sugerencias iniciales
  const initialSuggestions = [
    { text: '¿Qué tengo pendiente hoy?', icon: Clock },
    { text: 'Agenda una reunión', icon: MessageSquare },
    { text: 'Revisa mis correos', icon: MessageSquare },
    { text: 'Recordatorios importantes', icon: Sparkles },
  ];

  useEffect(() => {
    setSuggestions(initialSuggestions);
  }, []);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript('');
      setIsListening(true);
      
      // Simular volumen de audio
      const interval = setInterval(() => {
        setVolume(Math.random());
      }, 100);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsListening(false);
        if (transcript) {
          processCommand(transcript);
        }
      }, 3000);
    }
  };

  const processCommand = (text) => {
    // Agregar a conversación
    const userMessage = { role: 'user', content: text, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);
    
    // Simular procesamiento de IA
    setTimeout(() => {
      const aiResponse = generateResponse(text);
      const assistantMessage = { role: 'assistant', content: aiResponse, timestamp: new Date() };
      setConversation(prev => [...prev, assistantMessage]);
      
      // Simular que está hablando
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
      
      // Actualizar sugerencias contextuales
      updateSuggestions(text);
    }, 800);
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('agenda') || lowerInput.includes('reunión')) {
      return 'Claro, voy a revisar tu agenda. Tienes disponibilidad mañana a las 10:00 AM y a las 3:00 PM. ¿Cuál prefieres?';
    }
    if (lowerInput.includes('correo') || lowerInput.includes('email')) {
      return 'Has recibido 12 correos nuevos. 3 son importantes y requieren respuesta urgente. ¿Quieres que te los resuma?';
    }
    if (lowerInput.includes('tarea') || lowerInput.includes('pendiente')) {
      return 'Tienes 8 tareas pendientes. Las 3 más urgentes son: revisar el reporte financiero, llamar al cliente VIP, y aprobar la propuesta de marketing.';
    }
    if (lowerInput.includes('recordatorio')) {
      return 'Configurado. Te recordaré esto mañana a las 9:00 AM. ¿Necesitas algún recordatorio adicional?';
    }
    
    return `Entendido: "${input}". Estoy procesando tu solicitud. ¿Hay algo más en lo que pueda ayudarte?`;
  };

  const updateSuggestions = (lastCommand) => {
    const contextualSuggestions = [
      { text: '¿Algo más?', icon: MessageSquare },
      { text: 'Cuéntame más detalles', icon: Sparkles },
      { text: 'Resume mi día', icon: Clock },
      { text: 'Envía un mensaje', icon: Zap },
    ];
    setSuggestions(contextualSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setTranscript(suggestion.text);
    processCommand(suggestion.text);
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-['Questrial']",
      theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-ale-white-bg'
    )}>
      {/* Header */}
      <SubmoduleHeader
        title="Asistente Conversacional AL-E"
        subtitle="Modo Alexa - Habla naturalmente, yo te escucho"
        onBack={onBack}
        icon={Brain}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
        
        {/* Micrófono Central - Modo Alexa */}
        <motion.div
          className="relative mb-8"
          animate={isListening ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: isListening ? Infinity : 0, duration: 2 }}
        >
          {/* Círculos de onda al escuchar */}
          {isListening && (
            <>
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-full",
                  theme === 'dark' ? 'bg-ale-neon' : 'bg-ale-accent-cyan'
                )}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-full",
                  theme === 'dark' ? 'bg-ale-neon' : 'bg-ale-accent-cyan'
                )}
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              />
            </>
          )}
          
          {/* Botón de micrófono */}
          <motion.button
            onClick={toggleListening}
            className={cn(
              "relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
              isListening
                ? theme === 'dark'
                  ? 'bg-ale-neon text-ale-black'
                  : 'bg-ale-accent-cyan text-white'
                : theme === 'dark'
                  ? 'bg-ale-petrol text-ale-white hover:bg-ale-glass'
                  : 'bg-white text-ale-deep-teal hover:bg-ale-pearl border-2 border-ale-border-light'
            )}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <Mic className="w-16 h-16" />
            ) : (
              <MicOff className="w-16 h-16" />
            )}
          </motion.button>

          {/* Indicador de volumen */}
          {isListening && (
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-1 rounded-full",
                    theme === 'dark' ? 'bg-ale-neon' : 'bg-ale-accent-cyan'
                  )}
                  animate={{
                    height: volume > i / 5 ? [8, 20, 8] : 8,
                  }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Estado actual */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.p
                key="listening"
                className={cn(
                  "text-xl font-medium",
                  theme === 'dark' ? 'text-ale-neon' : 'text-ale-accent-cyan'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Escuchando...
              </motion.p>
            ) : isSpeaking ? (
              <motion.p
                key="speaking"
                className={cn(
                  "text-xl font-medium flex items-center justify-center gap-2",
                  theme === 'dark' ? 'text-ale-white' : 'text-ale-charcoal'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Volume2 className="w-5 h-5 animate-pulse" />
                Hablando...
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                className={cn(
                  "text-lg",
                  theme === 'dark' ? 'text-gray-400' : 'text-ale-slate'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Toca el micrófono y háblame
              </motion.p>
            )}
          </AnimatePresence>

          {/* Transcript en tiempo real */}
          {transcript && (
            <motion.div
              className={cn(
                "mt-4 p-4 rounded-lg max-w-2xl mx-auto",
                theme === 'dark' ? 'bg-ale-petrol/30 text-ale-white' : 'bg-white text-ale-charcoal border border-ale-border-light'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-sm opacity-70 mb-1">Tú:</p>
              <p className="text-base">{transcript}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Sugerencias rápidas */}
        <div className="w-full max-w-2xl mb-8">
          <p className={cn(
            "text-xs uppercase tracking-wider mb-3 text-center",
            theme === 'dark' ? 'text-gray-500' : 'text-ale-slate'
          )}>
            Sugerencias
          </p>
          <div className="grid grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "p-3 rounded-lg flex items-center gap-2 text-sm transition-all",
                    theme === 'dark'
                      ? 'bg-ale-petrol/20 hover:bg-ale-petrol/40 text-ale-white border border-ale-glass'
                      : 'bg-white hover:bg-ale-pearl text-ale-charcoal border border-ale-border-light hover:border-ale-accent-cyan'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{suggestion.text}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Historial de conversación (últimos 3) */}
        {conversation.length > 0 && (
          <div className="w-full max-w-2xl">
            <p className={cn(
              "text-xs uppercase tracking-wider mb-3",
              theme === 'dark' ? 'text-gray-500' : 'text-ale-slate'
            )}>
              Conversación reciente
            </p>
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {conversation.slice(-3).map((msg, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg",
                    msg.role === 'user'
                      ? theme === 'dark'
                        ? 'bg-ale-petrol/20 ml-8'
                        : 'bg-ale-pearl ml-8 border border-ale-border-light'
                      : theme === 'dark'
                        ? 'bg-ale-glass/20 mr-8'
                        : 'bg-white mr-8 border border-ale-border-light'
                  )}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className={cn(
                    "text-xs mb-1 font-medium",
                    theme === 'dark' ? 'text-ale-neon' : 'text-ale-accent-cyan'
                  )}>
                    {msg.role === 'user' ? 'Tú' : 'AL-E'}
                  </p>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-ale-white' : 'text-ale-charcoal'
                  )}>
                    {msg.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsistenteConversacional;
