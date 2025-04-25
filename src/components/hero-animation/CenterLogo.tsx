
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
          scale: processingLead ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: processingLead ? 0.8 : 0.3,
          ease: "easeInOut",
        }}
      >
        {/* Background glow effect - positioned behind everything */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            processingLead ? 'opacity-70 scale-125' : 'opacity-50 scale-100'
          }`}
        >
          <div className="absolute inset-0 bg-[#347bff] rounded-full opacity-30 blur-[60px]" />
          <div className="absolute inset-[15%] bg-[#347bff] rounded-full opacity-40 blur-[40px]" />
          <div className="absolute inset-[30%] bg-[#347bff] rounded-full opacity-50 blur-[20px]" />
        </div>

        {/* Ripple effects */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#347bff]/20 rounded-full"
          animate={{
            scale: [1, 1.4],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        <motion.div 
          className="absolute inset-0 border-4 border-[#347bff]/10 rounded-full"
          animate={{
            scale: [1, 1.6],
            opacity: [0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />

        {/* Logo image - now above the glow effects */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="relative z-10 w-full h-full object-contain p-12 sm:p-16 drop-shadow-lg"
          animate={{
            scale: processingLead ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: processingLead ? 0.8 : 0.3,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
