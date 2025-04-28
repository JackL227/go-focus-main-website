
import React, { useEffect, useRef, useState } from 'react';
import { useCompanyLogo } from '@/hooks/use-company-logo';

const FlowThroughHero = () => {
  const animationAreaRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const [logoCenterX, setLogoCenterX] = useState(0);
  const [logoCenterY, setLogoCenterY] = useState(0);
  const { logo } = useCompanyLogo();

  const numCardsPerCycle = 7; // Number of cards per cycle (lead -> name)
  const animationCycleTime = 7000; // Total time for one cycle (milliseconds)
  const cardTravelDuration = 1800; // Time for card to travel to logo (ms)
  const cardEmergeDuration = 1800; // Time for card to emerge and travel out (ms)
  const nameCardDelay = 100; // Delay between lead disappearing and name appearing (ms)

  // Update logo position function
  const updateLogoPosition = () => {
    if (!logoContainerRef.current) return;
    
    const logoRect = logoContainerRef.current.getBoundingClientRect();
    // Calculate center relative to the viewport
    const centerX = logoRect.left + logoRect.width / 2;
    const centerY = logoRect.top + logoRect.height / 2;
    
    setLogoCenterX(centerX);
    setLogoCenterY(centerY);
  };

  // Card creation function
  const createCard = (type: 'lead' | 'name') => {
    if (!animationAreaRef.current) return null;
    
    const card = document.createElement('div');
    card.classList.add('animated-card', type === 'lead' ? 'lead-card' : 'name-card');
    card.textContent = type === 'lead' ? 'Lead' : 'Name';
    card.setAttribute('aria-hidden', 'true');
    animationAreaRef.current.appendChild(card);
    return card;
  };

  // Animate lead card function
  const animateLeadCard = (card: HTMLDivElement, index: number, onComplete: () => void) => {
    if (!animationAreaRef.current) return;

    // Initial position: Cluster off-screen left, tighter vertical band
    const startYOffset = (Math.random() - 0.5) * (animationAreaRef.current.clientHeight * 0.3);
    const startY = (animationAreaRef.current.clientHeight / 2) + startYOffset;
    const startX = -100 - (Math.random() * 50);

    card.style.left = `${startX}px`;
    card.style.top = `${startY}px`;
    card.style.opacity = '0';
    card.style.transform = 'scale(1)';

    // Delay animation start for staggering
    const delay = index * (animationCycleTime / (numCardsPerCycle * 1.5));

    setTimeout(() => {
      card.style.opacity = '0.9'; // Fade in

      // Target position: Center of the logo
      const targetX = logoCenterX - card.offsetWidth / 2;
      const targetY = logoCenterY - card.offsetHeight / 2;

      // Calculate movement vector
      const moveX = targetX - startX;
      const moveY = targetY - startY;

      // Apply transform to move towards logo and shrink just at the end
      card.style.transitionDuration = `${cardTravelDuration}ms, ${cardTravelDuration * 0.4}ms`;
      card.style.transitionTimingFunction = `cubic-bezier(0.4, 0, 0.8, 1), ease-in`;
      card.style.transitionProperty = 'transform, opacity';
      card.style.transitionDelay = `0ms, ${cardTravelDuration * 0.6}ms`;

      card.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.1)`;
      card.style.opacity = '0';

      // Trigger callback slightly before visual disappearance
      setTimeout(onComplete, delay + cardTravelDuration - nameCardDelay);

      // Remove card after animation
      setTimeout(() => {
        if (card.parentNode) {
          card.parentNode.removeChild(card);
        }
      }, delay + cardTravelDuration + 100);
    }, delay);
  };

  // Animate name card function
  const animateNameCard = (card: HTMLDivElement, index: number) => {
    if (!animationAreaRef.current) return;
    
    // Initial position: Center logo, scaled down
    const startX = logoCenterX - card.offsetWidth / 2;
    const startY = logoCenterY - card.offsetHeight / 2;
    card.style.left = `${startX}px`;
    card.style.top = `${startY}px`;
    card.style.opacity = '0';
    card.style.transform = 'scale(0.1)'; // Start small

    // Emerge and move outwards
    card.style.transitionDuration = `${cardEmergeDuration * 0.3}ms, ${cardEmergeDuration * 0.3}ms`;
    card.style.transitionTimingFunction = `cubic-bezier(0.2, 0.8, 0.5, 1), ease-out`;
    card.style.transitionProperty = 'transform, opacity';
    card.style.transitionDelay = `0ms, 0ms`;

    card.style.opacity = '0.9';
    card.style.transform = 'scale(1)'; // Emerge to full size

    // Calculate random outward path (mostly right side) after emerging
    const angleVariation = (Math.random() - 0.5) * Math.PI / 1.8;
    const distance = Math.random() * (animationAreaRef.current.clientWidth / 2.5) + (animationAreaRef.current.clientWidth / 4);
    const endX = Math.cos(angleVariation) * distance;
    const endY = Math.sin(angleVariation) * distance;

    // Apply transform for outward movement after emerging (chained transition)
    setTimeout(() => {
      card.style.transitionDuration = `${cardEmergeDuration * 0.7}ms, ${cardEmergeDuration * 0.7}ms`;
      card.style.transitionTimingFunction = `cubic-bezier(0.2, 0.5, 0.5, 1), ease-in`;
      card.style.transitionDelay = `0ms, ${cardEmergeDuration * 0.2}ms`;

      card.style.transform = `translate(${endX}px, ${endY}px) scale(1)`;
      card.style.opacity = '0';
    }, cardEmergeDuration * 0.3 + 50);

    // Remove card after animation
    setTimeout(() => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    }, cardEmergeDuration + 100);
  };

  // Run animation cycle
  const runAnimationCycle = () => {
    for (let i = 0; i < numCardsPerCycle; i++) {
      const leadCard = createCard('lead');
      if (!leadCard) continue;

      const handleLeadComplete = () => {
        const nameCard = createCard('name');
        if (nameCard) {
          animateNameCard(nameCard, i);
        }
      };

      animateLeadCard(leadCard, i, handleLeadComplete);
    }
  };

  // Setup animation on component mount
  useEffect(() => {
    // Initial setup
    updateLogoPosition();
    
    // Handle window resize
    const handleResize = () => {
      updateLogoPosition();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    const animationId = setTimeout(() => {
      runAnimationCycle();
      
      // Set interval for continuous animation
      const intervalId = setInterval(runAnimationCycle, animationCycleTime);
      return () => clearInterval(intervalId);
    }, 100);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(animationId);
    };
  }, [logoCenterX, logoCenterY]);

  return (
    <section className="relative flex items-center justify-center min-h-[600px] h-screen overflow-hidden">
      <div 
        ref={animationAreaRef} 
        className="animation-area absolute top-0 left-0 w-full h-full overflow-visible z-0"
      ></div>
      
      <div 
        ref={logoContainerRef} 
        className="logo-container relative z-10 w-[100px] h-[100px] md:w-[100px] md:h-[100px] rounded-full shadow-[0_0_35px_8px_rgba(70,130,180,0.6)] flex items-center justify-center"
      >
        <img 
          src={logo || "https://placehold.co/100x100/3b82f6/ffffff?text=LOGO"}
          alt="GoFocus AI Logo"
          className="w-full h-full object-contain rounded-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/100x100/cccccc/ffffff?text=Error";
          }}
        />
      </div>
      
      <div className="hero-content relative z-20"></div>
      
      <style jsx>{`
        .animated-card {
          position: absolute;
          width: 80px;
          height: 40px;
          border-radius: 6px;
          background-color: rgba(50, 50, 80, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(100, 100, 120, 0.4);
          opacity: 0;
          will-change: transform, opacity;
          z-index: 5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #e2e8f0;
          transition-property: transform, opacity;
          transition-timing-function: ease-out;
        }
        
        .name-card {
          background-color: rgba(60, 179, 113, 0.5);
          border: 1px solid rgba(60, 179, 113, 0.5);
        }
        
        @media (max-width: 768px) {
          .animated-card {
            width: 70px;
            height: 35px;
            font-size: 0.7rem;
          }
          .logo-container {
            width: 80px;
            height: 80px;
          }
        }
        
        @media (max-width: 480px) {
          .animated-card {
            width: 60px;
            height: 30px;
            font-size: 0.6rem;
          }
          .logo-container {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default FlowThroughHero;
