
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  onLeadProcess: () => void;
}

const CenterLogo = ({ onLeadProcess }: CenterLogoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="relative w-[323px] h-[323px]"
        animate={{
          scale: [1, 1.05, 1],
          filter: ['blur(8px)', 'blur(12px)', 'blur(8px)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00E676] to-[#006eda] rounded-full opacity-20" />
        <img 
          src="/lovable-uploads/gofocus-logo.png" 
          alt="Go Focus AI Logo" 
          className="w-full h-full object-contain relative z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00E676]/20 to-[#006eda]/20 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
