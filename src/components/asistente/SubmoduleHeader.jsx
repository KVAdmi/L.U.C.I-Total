
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SubmoduleHeader = ({ onBack, title, subtitle, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 flex items-start gap-6"
    >
      <button
        onClick={onBack}
        className="mt-1 p-2 bg-[#1F1F1F] rounded-full text-[#BFC8CF] hover:bg-[#003336] hover:text-white transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
            {Icon && <Icon className="w-8 h-8 text-[#003336]" />}
            <h1 className="text-3xl font-normal tracking-wide text-white">{title}</h1>
        </div>
        <p className="text-[#BFC8CF] text-base">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default SubmoduleHeader;
