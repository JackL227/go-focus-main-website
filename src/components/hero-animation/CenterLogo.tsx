
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  onLeadProcess: () => void;
}

const CenterLogo = ({ onLeadProcess }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <motion.div
        className="relative w-[280px] h-[280px]"
        animate={{
          scale: [1, 1.05, 1],
          filter: ['brightness(1) blur(4px)', 'brightness(1.2) blur(6px)', 'brightness(1) blur(4px)']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Primary blue glow */}
        <div className="absolute inset-0 bg-[#347bff] rounded-full opacity-40 blur-[80px]" />
        
        {/* Secondary blue glow */}
        <div className="absolute inset-[20%] bg-[#347bff] rounded-full opacity-50 blur-[60px]" />
        
        {/* Third blue glow for intensity */}
        <div className="absolute inset-[40%] bg-[#347bff] rounded-full opacity-60 blur-[40px]" />
        
        {/* Animated ripple effect */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#347bff]/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
        
        {/* Second animated ripple with delay */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#347bff]/20 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3.5,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
        
        {/* Logo image */}
        <motion.img
          src="/lovable-uploads/13a8c7e3-5b1e-41fc-bb67-ace8c2808116.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          animate={{
            scale: [1, 1.02, 1],
            filter: ['drop-shadow(0 0 8px rgba(52, 123, 255, 0.4))', 'drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))', 'drop-shadow(0 0 8px rgba(52, 123, 255, 0.4))']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Outer reactive glow - responds to leads */}
        <div className="absolute -inset-8 bg-[#347bff]/20 rounded-full blur-3xl animate-pulse-soft" />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
