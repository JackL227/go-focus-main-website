
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
        }}
        transition={{
          duration: processingLead ? 1.2 : 3,
          ease: "easeInOut",
          times: processingLead ? [0, 0.5, 1] : [0, 0.5, 1]
        }}
      >
        {/* Primary gradient glow - background radial gradient */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          processingLead ? 'animate-pulse-soft' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-40 blur-[80px]"></div>
        </div>
        
        {/* Secondary glow - more intense when processing */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-60 blur-[50px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.6, 0.8, 0.6] : [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: processingLead ? 0.8 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow - focused on center */}
        <div className="absolute inset-[30%] rounded-full opacity-70 blur-[30px] bg-gradient-to-r from-[#00F5A0] to-[#00D9F5]" />
        
        {/* Animated ripple effect - faster when processing */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#00F5A0]/30 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: processingLead ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Processing ripple - only visible when processing */}
        {processingLead && (
          <motion.div 
            className="absolute inset-0 border-2 border-[#00F5A0]/70 rounded-full"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        {/* Logo image */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          animate={{
            scale: processingLead ? [1, 1.05, 1] : [1, 1.02, 1],
            filter: processingLead
              ? ['drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 20px rgba(0, 245, 160, 0.9))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))']
              : ['drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))']
          }}
          transition={{
            duration: processingLead ? 1 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 245, 160, 0.6))' }}
        />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
