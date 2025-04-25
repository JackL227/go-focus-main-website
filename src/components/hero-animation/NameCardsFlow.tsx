
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface NameCardsFlowProps {
  names: string[];
  maxVisible: number;
  isProcessing: boolean;
}

const NameCardsFlow = ({ names, maxVisible, isProcessing }: NameCardsFlowProps) => {
  const isMobile = useIsMobile();
  const [cards, setCards] = useState<Array<{
    id: number;
    name: string;
    x: number;
    y: number;
  }>>([]);

  useEffect(() => {
    if (isProcessing) {
      const newCard = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        x: 0,
        y: isMobile ? cards.length * 60 : 0
      };

      setCards(prev => {
        const updated = [...prev, newCard].slice(-maxVisible);
        return updated;
      });
    }
  }, [isProcessing, names, maxVisible, isMobile]);

  const containerClass = isMobile
    ? "absolute left-1/2 -translate-x-1/2 bottom-20 space-y-2"
    : "absolute right-10 top-1/2 -translate-y-1/2 space-y-3";

  return (
    <div className={containerClass}>
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ 
              opacity: 0,
              x: isMobile ? 0 : -40,
              y: isMobile ? 20 : 0
            }}
            animate={{ 
              opacity: 1,
              x: isMobile ? 0 : 0,
              y: 0
            }}
            exit={{ 
              opacity: 0,
              x: isMobile ? 0 : 40,
              y: isMobile ? -20 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 14,
              duration: 0.8
            }}
            className="bg-[#1d1d1d] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff8c] animate-pulse" />
              <span>{card.name} has enrolled into the mentorship</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NameCardsFlow;
