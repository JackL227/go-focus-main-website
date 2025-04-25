
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
          filter: ['brightness(1) blur(8px)', 'brightness(1.2) blur(12px)', 'brightness(1) blur(8px)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main glow */}
        <div className="absolute inset-0 bg-[#006eda] rounded-full opacity-20 blur-[100px]" />
        
        {/* Logo image */}
        <img 
          src={`/lovable-uploads/048fd594-f60b-4025-8710-01893d9256ae.png`}
          alt="Glowing Logo"
          className="w-full h-full object-contain relative z-10"
        />
        
        {/* Outer glow */}
        <div className="absolute -inset-8 bg-[#006eda]/20 rounded-full blur-3xl animate-pulse-soft" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-[#006eda]/30 rounded-full blur-xl animate-glow" />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
