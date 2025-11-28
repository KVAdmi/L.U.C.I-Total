
import React from 'react';
import { motion } from 'framer-motion';

const LoaderAnimated = ({ size = 'default' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`rounded-full border-2 border-white/20 border-t-[#001E21] ${sizes[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoaderAnimated;
