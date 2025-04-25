
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  rotate?: number;
  rotateY?: number;
  type?: string;
}

const LEAD_TYPES = [
  "Potential Lead",
  "Unqualified Lead",
  "Instagram DM",
  "Website Form", 
  "Email Lead",
  "Cold Contact",
  "Referral",
  "Campaign Lead"
];

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  size = 'md',
  rotate = 0,
  rotateY = 0,
  type
}: LeadCardProps) => {
  const isMobile = useIsMobile();
  const maxX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  
  // Determine lead type - either use provided or get from array
  const leadType = type || LEAD_TYPES[index % LEAD_TYPES.length];
  
  // Size variants for visual diversity
  const sizeClasses = {
    sm: 'w-16 h-10',
    md: 'w-20 h-12',
    lg: 'w-24 h-14'
  };
  
  const cardSize = sizeClasses[size];
  
  // Stagger the starting positions
  const initialDelay = index * 0.8;
  
  // Card animation - now with stopping at the center
  const cardAnimationProps = {
    initial: { 
      x: -maxX - 100, 
      y: isMobile ? index * 20 - 60 : index * 15 - 45,
      scale: 1, 
      opacity: 0,
      rotateY: 0,
      rotate: (index % 3 - 1) * 5,
    },
    animate: isAbsorbed 
      ? { 
          x: 0, 
          y: 0, 
          scale: 0.1, 
          opacity: 0,
          rotateY: 45,
          rotate: 0,
          transition: { 
            duration: 0.5, 
            ease: "easeInOut" 
          }
        } 
      : { 
          x: Math.max(0, maxX * 0.5), // Stop at the center logo
          y: isMobile ? index * 20 - 60 : index * 15 - 45, 
          scale: 0.5, // Scale down as it approaches
          opacity: 0.8,
          rotateY: 10,
          rotate: (index % 3 - 1) * 2,
          transition: { 
            duration: 4.5, 
            delay: initialDelay,
            ease: "easeOut" 
          }
        }
  };

  return (
    <motion.div
      className={`absolute ${cardSize} rounded-xl bg-[#1d1d1d] shadow-lg border border-[#3a3a3a] flex items-center justify-center z-10`}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      {...cardAnimationProps}
      onAnimationComplete={() => {
        if (!isAbsorbed && onComplete) {
          onComplete();
        }
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-1">
        <div className="w-5 h-5 bg-[#347bff]/20 rounded-full mb-1 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#347bff]/70 rounded-full"></div>
        </div>
        <span className="text-white text-xs text-center font-medium">{leadType}</span>
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default LeadCard;
