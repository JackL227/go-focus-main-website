
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  onLeadProcess: () => void;
  processingLead: boolean;
}

const CenterLogo = ({ onLeadProcess, processingLead }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-30">
      <motion.div
        className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]"
        animate={{
          scale: processingLead ? [1, 1.03, 1] : 1,
        }}
        transition={{
          duration: processingLead ? 0.4 : 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Refined primary gradient glow */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: processingLead ? [0.15, 0.25, 0.15] : [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: processingLead ? 0.4 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-30 blur-[10px]"
            animate={{
              scale: processingLead ? [1, 1.05, 1] : [1, 1.02, 1],
            }}
            transition={{
              duration: processingLead ? 0.4 : 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Refined inner glow */}
        <motion.div 
          className="absolute inset-[35%] rounded-full opacity-40 blur-[8px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.4, 0.6, 0.4] : [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: processingLead ? 0.4 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Logo image with enhanced glow effect */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-50 p-12 sm:p-16"
          animate={{
            filter: processingLead
              ? ['drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))']
              : ['drop-shadow(0 0 6px rgba(0, 245, 160, 0.3))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))', 'drop-shadow(0 0 6px rgba(0, 245, 160, 0.3))']
          }}
          transition={{
            duration: processingLead ? 0.4 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Processing ripple effect */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00F5A0]/20"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00F5A0]/10"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: "easeOut"
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CenterLogo;
