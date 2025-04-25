
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const names = [
  'Beyoncé',
  'Samantha K',
  'Liam J', 
  'Olivia T',
  'Noah P',
  'Emma L',
];

const HeroAnimation = () => {
  const [visibleNames, setVisibleNames] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = names[Math.floor(Math.random() * names.length)];
      setVisibleNames((prev) => {
        const updated = [...prev, random];
        if (updated.length > 3) updated.shift();
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      {/* Glow background */}
      <div className="absolute w-[300px] h-[300px] bg-blue-500/30 rounded-full blur-[100px] z-0"></div>

      {/* Logo */}
      <motion.img
        src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
        alt="Go Focus AI"
        className="absolute w-[120px] z-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Incoming lead cards */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute top-[50%] left-[-200px] w-24 h-10 bg-[#2e2e2e] text-white rounded-md shadow-lg flex items-center justify-center text-sm"
          initial={{ x: -200, scale: 1, opacity: 1 }}
          animate={{ 
            x: window.innerWidth,
            scale: 0.2,
            opacity: 0
          }}
          transition={{
            duration: 8,
            delay: idx * 0.8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Lead
        </motion.div>
      ))}

      {/* Outgoing enrollment cards */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 space-y-3">
        <h2 className="text-white text-xl font-semibold mb-4">
          Automated <span className="text-muted">Sales Process</span>
        </h2>
        {visibleNames.map((name, idx) => (
          <motion.div
            key={`${name}-${idx}`}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#1d1d1d] text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#00ff8c] rounded-full"></span>
            {name} has enrolled into the mentorship
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroAnimation;
