
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  onLeadProcess: () => void;
  processingLead: boolean;
}

const CenterLogo = ({ onLeadProcess, processingLead }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <motion.div
        className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]"
        animate={{
          scale: processingLead ? [1, 1.08, 1] : [1, 1.05, 1],
          filter: processingLead 
            ? ['brightness(1) blur(4px)', 'brightness(1.3) blur(8px)', 'brightness(1) blur(4px)'] 
            : ['brightness(1) blur(4px)', 'brightness(1.2) blur(6px)', 'brightness(1) blur(4px)']
        }}
        transition={{
          duration: processingLead ? 1.2 : 3,
          ease: "easeInOut",
          times: processingLead ? [0, 0.5, 1] : [0, 0.5, 1]
        }}
      >
        {/* Primary blue glow - larger and more intense when processing */}
        <div 
          className={`absolute inset-0 bg-[#347bff] rounded-full opacity-40 blur-[80px] transition-all duration-300 ${
            processingLead ? 'opacity-60 scale-110' : 'opacity-40 scale-100'
          }`} 
        />
        
        {/* Secondary blue glow - more intense when processing */}
        <div 
          className={`absolute inset-[20%] bg-[#347bff] rounded-full opacity-50 blur-[60px] transition-all duration-300 ${
            processingLead ? 'opacity-70 scale-105' : 'opacity-50 scale-100'
          }`} 
        />
        
        {/* Third blue glow for intensity - pulses when processing */}
        <div 
          className={`absolute inset-[40%] bg-[#347bff] rounded-full opacity-60 blur-[40px] transition-all duration-300 ${
            processingLead ? 'opacity-80 animate-pulse-soft' : 'opacity-60'
          }`} 
        />
        
        {/* Animated ripple effect - faster when processing */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#347bff]/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: processingLead ? 2 : 3,
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
            duration: processingLead ? 2.5 : 3.5,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
        
        {/* Processing ripple - only visible during processing */}
        {processingLead && (
          <motion.div 
            className="absolute inset-0 border-2 border-[#347bff]/70 rounded-full"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        )}
        
        {/* Logo image */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-12 sm:p-16"
          animate={{
            scale: processingLead ? [1, 1.05, 1] : [1, 1.02, 1],
            filter: processingLead
              ? ['drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))', 'drop-shadow(0 0 20px rgba(52, 123, 255, 0.9))', 'drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))']
              : ['drop-shadow(0 0 8px rgba(52, 123, 255, 0.4))', 'drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))', 'drop-shadow(0 0 8px rgba(52, 123, 255, 0.4))']
          }}
          transition={{
            duration: processingLead ? 1.2 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Outer reactive glow - responds to leads */}
        <div 
          className={`absolute -inset-8 bg-[#347bff]/20 rounded-full blur-3xl transition-opacity duration-300 ${
            processingLead ? 'opacity-50 animate-pulse' : 'opacity-20 animate-pulse-soft'
          }`} 
        />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
