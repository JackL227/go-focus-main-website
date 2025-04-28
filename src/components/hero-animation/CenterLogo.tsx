
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
          duration: processingLead ? 0.7 : 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Enhanced outer glow effect */}
        <motion.div 
          className="absolute inset-[-45%] rounded-full opacity-20 blur-[80px]"
          animate={{
            opacity: processingLead ? [0.2, 0.35, 0.2] : [0.1, 0.22, 0.1]
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
        
        {/* Primary pulsing glow with enhanced intensity */}
        <motion.div 
          className="absolute inset-[-15%] rounded-full"
          animate={{
            opacity: processingLead ? [0.25, 0.38, 0.25] : [0.2, 0.28, 0.2]
          }}
          transition={{
            duration: processingLead ? 0.8 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-50 blur-[30px]"
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
        
        {/* Inner core glow with increased intensity */}
        <motion.div 
          className="absolute inset-[18%] rounded-full opacity-60 blur-[20px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.6, 0.75, 0.6] : [0.5, 0.62, 0.5],
            scale: processingLead ? [0.95, 1.05, 0.95] : [0.97, 1.02, 0.97],
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
              ? ['drop-shadow(0 0 12px rgba(0, 245, 160, 0.7))', 'drop-shadow(0 0 18px rgba(0, 245, 160, 0.9))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.7))']
              : ['drop-shadow(0 0 8px rgba(0, 245, 160, 0.5))', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.5))']
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

        {/* Enhanced processing ripple effects */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00F5A0]/30"
              initial={{ scale: 0.9, opacity: 0.9 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.2
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00F5A0]/20"
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 1.4,
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
