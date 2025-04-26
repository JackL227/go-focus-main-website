
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
          scale: processingLead ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: processingLead ? 1.5 : 3,
          ease: "easeInOut",
          times: processingLead ? [0, 0.5, 1] : [0, 0.5, 1],
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Enhanced primary gradient glow with depth */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: processingLead ? [0.6, 0.9, 0.6] : [0.4, 0.5, 0.4]
          }}
          transition={{
            duration: processingLead ? 1.2 : 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-30 blur-[80px]"
            animate={{
              scale: processingLead ? [1, 1.1, 1] : [1, 1.05, 1],
            }}
            transition={{
              duration: processingLead ? 1.8 : 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Enhanced secondary glow with animation */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-50 blur-[40px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.5, 0.9, 0.5] : [0.4, 0.6, 0.4],
            scale: processingLead ? [1, 1.08, 1] : [1, 1.03, 1]
          }}
          transition={{
            duration: processingLead ? 1.2 : 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Enhanced inner glow */}
        <motion.div 
          className="absolute inset-[28%] sm:inset-[30%] rounded-full opacity-70 blur-[20px] bg-gradient-to-r from-[#00F5A0] to-[#00D9F5]"
          animate={{
            opacity: processingLead ? [0.7, 1, 0.7] : [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: processingLead ? 0.8 : 2,
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
            scale: processingLead ? [1, 1.08, 1] : [1, 1.03, 1],
            filter: processingLead
              ? ['drop-shadow(0 0 12px rgba(0, 245, 160, 0.7)) brightness(1.1)', 'drop-shadow(0 0 20px rgba(0, 245, 160, 0.9)) brightness(1.2)', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.7)) brightness(1.1)']
              : ['drop-shadow(0 0 8px rgba(0, 245, 160, 0.5)) brightness(1)', 'drop-shadow(0 0 12px rgba(0, 245, 160, 0.6)) brightness(1.05)', 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.5)) brightness(1)']
          }}
          transition={{
            duration: processingLead ? 1 : 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ 
            filter: processingLead 
              ? 'drop-shadow(0 0 15px rgba(0, 245, 160, 0.8)) brightness(1.2)' 
              : 'drop-shadow(0 0 10px rgba(0, 245, 160, 0.6)) brightness(1.05)'
          }}
        />

        {/* Ripple effect when processing */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00F5A0]/30"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00F5A0]/20"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 2,
                delay: 0.3,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </>
        )}

        {/* Enhanced particle effects */}
        {processingLead && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#00F5A0]/90"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 160],
                  y: [0, (Math.random() - 0.5) * 160],
                  scale: [0, Math.random() * 0.8],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.7,
                  ease: "easeOut"
                }}
                style={{
                  top: `${50 + (Math.random() - 0.5) * 40}%`,
                  left: `${50 + (Math.random() - 0.5) * 40}%`,
                  boxShadow: '0 0 8px rgba(0, 245, 160, 0.8)'
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
