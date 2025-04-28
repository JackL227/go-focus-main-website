
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  id: number;
  text: string;
  status: 'waiting' | 'moving' | 'absorbed';
  delay: number;
}

const LeadCard: React.FC<LeadCardProps> = ({ id, text, status, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const variants = {
    waiting: { 
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    },
    moving: { 
      x: '40vw', // Move towards center
      y: 0,
      scale: 0.5, // Shrink as it moves
      opacity: [1, 0.6, 0],
      transition: { 
        duration: 1.8,
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth flow
        opacity: { times: [0, 0.7, 1], duration: 1.8 }
      }
    },
    absorbed: {
      x: '40vw',
      y: 0,
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Add subtle floating animation
  useEffect(() => {
    if (!cardRef.current || status !== 'waiting') return;
    
    const floatY = Math.random() * 10 + 5; // 5-15px float
    const duration = Math.random() * 2 + 4; // 4-6s duration
    
    cardRef.current.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${-floatY}px)` },
        { transform: 'translateY(0px)' }
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'ease-in-out'
      }
    );
  }, [status]);

  return (
    <motion.div
      ref={cardRef}
      className="bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-4 w-[120px] md:w-[160px]"
      variants={variants}
      animate={status}
      initial="waiting"
      layout
      key={id}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary/80"></div>
        <p className="text-sm font-medium">{text}</p>
      </div>
    </motion.div>
  );
};

export default LeadCard;
