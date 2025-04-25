
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
        {/* Outer glow layer - larger blur radius */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: processingLead ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: processingLead ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#60A5FA] rounded-full opacity-40 blur-[120px]"></div>
        </motion.div>
        
        {/* Primary gradient glow - inner layer with stronger pulse */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          processingLead ? 'animate-pulse-soft' : ''
        }`}>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#60A5FA] rounded-full opacity-50 blur-[60px]"
            animate={{
              opacity: processingLead ? [0.5, 0.85, 0.5] : [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: processingLead ? 1.5 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Secondary glow - more intense when processing */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-60 blur-[50px]"
          style={{
            background: 'linear-gradient(to right, #2563eb, #60A5FA)'
          }}
          animate={{
            opacity: processingLead ? [0.6, 0.9, 0.6] : [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: processingLead ? 0.8 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow - focused on center */}
        <div className="absolute inset-[30%] rounded-full opacity-70 blur-[40px] bg-gradient-to-r from-[#2563eb] to-[#60A5FA]" />
        
        {/* Animated ripple effect - faster when processing */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#2563eb]/30 rounded-full"
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
            className="absolute inset-0 border-2 border-[#2563eb]/70 rounded-full"
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
              ? ['drop-shadow(0 0 15px rgba(37, 99, 235, 0.7))', 'drop-shadow(0 0 25px rgba(37, 99, 235, 0.9))', 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.7))']
              : ['drop-shadow(0 0 12px rgba(37, 99, 235, 0.6))', 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.8))', 'drop-shadow(0 0 12px rgba(37, 99, 235, 0.6))']
          }}
          transition={{
            duration: processingLead ? 1 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.7))' }}
        />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
