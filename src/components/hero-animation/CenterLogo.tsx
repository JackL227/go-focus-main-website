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
          scale: processingLead ? [1, 1.03, 1] : [1, 1.01, 1],
        }}
        transition={{
          duration: processingLead ? 1.5 : 3,
          ease: "easeInOut",
          times: processingLead ? [0, 0.5, 1] : [0, 0.5, 1]
        }}
      >
        {/* Primary gradient glow - Reduced blur */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          processingLead ? 'animate-pulse-soft' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-30 blur-[40px]"></div>
        </div>
        
        {/* Secondary glow - Reduced intensity */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-50 blur-[30px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.5, 0.7, 0.5] : [0.4, 0.5, 0.4]
          }}
          transition={{
            duration: processingLead ? 1.2 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow - Reduced size */}
        <div className="absolute inset-[35%] rounded-full opacity-60 blur-[15px] bg-gradient-to-r from-[#00F5A0] to-[#00D9F5]" />
        
        {/* Logo image with increased z-index */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-50 p-16"
          animate={{
            scale: processingLead ? [1, 1.02, 1] : [1, 1.01, 1],
            filter: processingLead
              ? ['drop-shadow(0 0 8px rgba(0, 245, 160, 0.5))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.7))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.5))']
              : ['drop-shadow(0 0 6px rgba(0, 245, 160, 0.3))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.5))', 'drop-shadow(0 0 6px rgba(0, 245, 160, 0.3))']
          }}
          transition={{
            duration: processingLead ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(0, 245, 160, 0.4))' }}
        />

        {/* Particle effects during processing */}
        {processingLead && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#00F5A0]/80"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 80],
                  y: [0, (Math.random() - 0.5) * 80],
                  scale: [0, Math.random() * 0.7],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
                style={{
                  top: `${50 + (Math.random() - 0.5) * 20}%`,
                  left: `${50 + (Math.random() - 0.5) * 20}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CenterLogo;
