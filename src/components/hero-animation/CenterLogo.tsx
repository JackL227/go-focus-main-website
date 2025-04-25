
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  onLeadProcess: () => void;
}

const CenterLogo = ({ onLeadProcess }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
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
        {/* Enhanced glow background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#006eda]/40 to-[#006eda]/40 rounded-full blur-[100px] animate-pulse-soft" />
        
        {/* Main circle with gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#006eda] to-[#006eda] rounded-full opacity-20" />
        
        {/* Logo image */}
        <img 
          src="/lovable-uploads/gofocus-logo.png" 
          alt="Go Focus AI Logo" 
          className="w-full h-full object-contain relative z-10"
        />
        
        {/* Inner glow */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-[#006eda]/30 to-[#006eda]/30 rounded-full blur-2xl animate-glow"
        />
        
        {/* Outer glow */}
        <div 
          className="absolute -inset-4 bg-gradient-to-tr from-[#006eda]/10 to-[#006eda]/10 rounded-full blur-3xl animate-pulse-soft"
        />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
