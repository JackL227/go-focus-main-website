
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';

export interface OutputCardProps {
  name: string;
  index: number;
  isMobile: boolean;
  action?: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ name, index, isMobile, action }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.9 },
  };

  return (
    <motion.div
      style={{
        width: isMobile ? '100%' : '280px',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'absolute' as const,
        left: `calc(50% + ${index * (isMobile ? 0 : 20)}px)`,
        top: `calc(40% + ${index * (isMobile ? 0 : 10)}px)`,
        transform: 'translateX(-50%)',
        zIndex: 10 - index,
      }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md">
        <Card className="bg-primary/10 text-primary rounded-lg p-3 mb-4 inline-flex">
          {/* You can add an icon here if needed */}
        </Card>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-foreground/70">{action || 'Lead Qualification'}</p>
      </Card>
    </motion.div>
  );
};

export default OutputCard;
