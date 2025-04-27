
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  processingLead?: boolean;
}

const CenterLogo = ({ processingLead = false }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-30">
      <motion.div
        className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]"
        animate={{
          scale: processingLead ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: processingLead ? 0.8 : 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Enhanced outer glow effect */}
        <motion.div 
          className="absolute inset-[-40%] rounded-full opacity-20 blur-[60px]"
          animate={{
            opacity: processingLead ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: processingLead ? 1.2 : 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-[#00F5A0] via-[#00E2C3] to-[#00D9F5] rounded-full" />
        </motion.div>
        
        {/* Primary pulsing glow */}
        <motion.div 
          className="absolute inset-[-10%] rounded-full"
          animate={{
            opacity: processingLead ? [0.2, 0.35, 0.2] : [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: processingLead ? 0.8 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-40 blur-[20px]"
            animate={{
              scale: processingLead ? [1, 1.06, 1] : [1, 1.03, 1],
            }}
            transition={{
              duration: processingLead ? 0.8 : 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Inner core glow */}
        <motion.div 
          className="absolute inset-[20%] rounded-full opacity-50 blur-[15px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.5, 0.7, 0.5] : [0.4, 0.5, 0.4],
            scale: processingLead ? [0.95, 1.05, 0.95] : [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: processingLead ? 0.8 : 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Logo image with enhanced glow effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-12 sm:p-16 z-50"
          animate={{
            filter: processingLead
              ? ['drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 18px rgba(0, 245, 160, 0.8))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))']
              : ['drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.4))']
          }}
          transition={{
            duration: processingLead ? 0.8 : 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <img
            src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
            alt="Go Focus AI Logo"
            className="w-full h-full object-contain"
            style={{ 
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden' // Prevent flickering
            }}
          />
        </motion.div>

        {/* Processing ripple effects */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00F5A0]/20"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.2
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00F5A0]/15"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.1
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CenterLogo;
