
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingVoiceButton = ({ onClick, isListening }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, boxShadow: '0px 10px 30px rgba(21, 51, 62, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.8 }}
      aria-label="Activate Voice Assistant"
      className={cn(
        "fixed bottom-8 right-8 z-[200] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl",
        isListening
          ? 'bg-red-500 text-ale-white border-2 border-red-300'
          : 'bg-ale-petrol text-ale-white border-2 border-ale-neon/30'
      )}
    >
      <div className="absolute w-8 h-8 rounded-full bg-ale-neon opacity-20 group-hover:opacity-40 transition-opacity blur-md" />
      <AnimatePresence mode="wait">
        {isListening ? (
          <motion.div
            key="listening"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75" />
            <Mic className="w-7 h-7" />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center justify-center flex-col"
          >
            <Mic className="w-5 h-5 mb-0.5 text-ale-neon" />
            <span className="text-[8px] font-bold tracking-wider text-ale-neon">AL-E</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default FloatingVoiceButton;
