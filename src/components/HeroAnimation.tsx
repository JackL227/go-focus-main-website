
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroAnimation = () => {
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const logoPath = '/lovable-uploads/gofocus-logo.png';

  useEffect(() => {
    if (!particlesContainerRef.current) return;

    const container = particlesContainerRef.current;
    const numParticles = 30;

    // Clear existing particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = (Math.random() - 0.5) * 200;
      const endY = (Math.random() - 0.5) * 200;

      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;
      particle.style.setProperty('--end-x', `${endX}px`);
      particle.style.setProperty('--end-y', `${endY}px`);

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const duration = Math.random() * 10 + 5;
      particle.style.animationDuration = `${duration}s`;

      const delay = Math.random() * 10;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="animation-container absolute inset-0 flex items-center justify-center">
        <div className="floating-elements absolute inset-0 overflow-hidden">
          <motion.div
            className="blur-element blur-1"
            animate={{
              x: [0, 20, 0],
              y: [0, 20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="blur-element blur-2"
            animate={{
              x: [0, -20, 0],
              y: [0, 40, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 15,
              delay: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="blur-element blur-3"
            animate={{
              x: [0, 15, 0],
              y: [0, -30, 0],
              rotate: [0, 3, 0]
            }}
            transition={{
              duration: 15,
              delay: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <motion.div
          className="logo-container"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src={logoPath} alt="GoFocus.ai Logo" className="w-full h-full object-contain" />
        </motion.div>

        <div className="flowing-lines">
          <div className="flowing-line line-1" />
          <div className="flowing-line line-2" />
          <div className="flowing-line line-3" />
          <div className="flowing-line line-4" />
        </div>

        <div className="particles" ref={particlesContainerRef} />
      </div>
    </div>
  );
};

export default HeroAnimation;
