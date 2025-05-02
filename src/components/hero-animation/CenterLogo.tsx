
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface CenterLogoProps {
  processingLead?: boolean;
}

const CenterLogo = ({ processingLead = false }: CenterLogoProps) => {
  const isMobile = useIsMobile();
  
  // More optimized size reduction for mobile
  const logoSize = isMobile ? 
    { width: "160px", height: "160px" } : 
    { width: "230px", height: "230px" };
    
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-30">
      <motion.div
        className="relative"
        style={logoSize}
        animate={{
          scale: processingLead ? [1, 1.02, 1] : [1, 1.01, 1],
        }}
        transition={{
          duration: processingLead ? 0.9 : 5, // Slowed down from 0.7 to 0.9
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Very light outer background for better blending */}
        <motion.div 
          className="absolute inset-[-15%] rounded-full opacity-5 blur-[40px]"
          animate={{
            opacity: processingLead ? [0.05, 0.07, 0.05] : [0.04, 0.06, 0.04]
          }}
          transition={{
            duration: processingLead ? 0.9 : 8, // Slowed down from 1.5 to 0.9
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary/50 to-[#00D9F5]/50 rounded-full" />
        </motion.div>
        
        {/* Minimal pulsing effect with reduced intensity */}
        <motion.div 
          className="absolute inset-[-8%] rounded-full"
          animate={{
            opacity: processingLead ? [0.10, 0.14, 0.10] : [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: processingLead ? 0.9 : 6, // Slowed down from 1 to 0.9
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/40 to-[#00D9F5]/40 rounded-full opacity-25 blur-[15px]"
            animate={{
              scale: processingLead ? [1, 1.02, 1] : [1, 1.01, 1],
            }}
            transition={{
              duration: processingLead ? 0.9 : 6, // Slowed down from 0.8 to 0.9
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Inner core with depth effect instead of glow */}
        <motion.div 
          className="absolute inset-[18%] rounded-full opacity-35 blur-[6px]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,110,218,0.5), rgba(0,217,245,0.4))'
          }}
          animate={{
            opacity: processingLead ? [0.35, 0.45, 0.35] : [0.3, 0.4, 0.3],
            scale: processingLead ? [0.98, 1.01, 0.98] : [0.99, 1.01, 0.99],
          }}
          transition={{
            duration: processingLead ? 0.9 : 5, // Slowed down from 0.9 to 0.9 (already set properly)
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Logo image with improved mobile sizing */}
        <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-14 z-50">
          <img
            src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
            alt="Go Focus AI Logo"
            className="w-full h-full object-contain"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.05))'
            }}
          />
        </div>

        {/* Subtle processing ripple effects - optimized for visibility on mobile */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/10"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: isMobile ? 1.25 : 1.3, opacity: 0 }}
              transition={{
                duration: 0.9, // Slowed down to 0.9 seconds
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.3
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/8"
              initial={{ scale: 0.9, opacity: 0.3 }}
              animate={{ scale: isMobile ? 1.4 : 1.5, opacity: 0 }}
              transition={{
                duration: 0.9, // Slowed down from 1.8 to 0.9 seconds
                delay: 0.3, // Reduced delay from 0.4 to 0.3
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.3 // Added consistent repeatDelay
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CenterLogo;
