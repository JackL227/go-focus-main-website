
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from './use-mobile';

export const useGsapHeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;
    
    const names = [
      "John G. booked a call",
      "Amy W. scheduled demo",
      "Mike B. confirmed signup",
      "Tara L. booked session",
      "Sam T. joined program",
      "Lisa M. enrolled"
    ];
    
    const leadTexts = [
      "New Lead",
      "Prospect",
      "Inquiry", 
      "New Contact",
      "Website Visitor"
    ];

    let animationFrameId: number;
    let timeouts: NodeJS.Timeout[] = [];
    
    const getRandomLeadText = () => {
      return leadTexts[Math.floor(Math.random() * leadTexts.length)];
    };
    
    const getRandomName = () => {
      return names[Math.floor(Math.random() * names.length)];
    };
    
    const createPopEffect = (x: number, y: number) => {
      if (!containerRef.current) return;
      
      const pop = document.createElement("div");
      pop.style.position = "absolute";
      pop.style.width = isMobile ? "24px" : "30px";
      pop.style.height = isMobile ? "24px" : "30px";
      pop.style.borderRadius = "50%";
      pop.style.background = "rgba(0, 110, 218, 0.5)"; // Brighter blue for better visibility
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
      pop.style.zIndex = "6";
      containerRef.current.appendChild(pop);

      gsap.fromTo(pop, 
        { scale: 0.2, opacity: 0.7 }, // Higher initial opacity
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.9, // Slightly longer for smoother effect
          ease: "expo.out", // Natural easing
          onComplete: () => pop.remove()
        }
      );
    };
    
    const spawnLead = (index: number) => {
      if (!containerRef.current || !logoRef.current || !isAnimating.current) return;
      
      const card = document.createElement("div");
      card.className = "bg-background/95 backdrop-blur-sm border border-primary/20 shadow-lg rounded-lg p-4";
      card.style.width = isMobile ? "130px" : "160px";
      card.style.boxShadow = "0 4px 12px rgba(0, 110, 218, 0.15)"; // Enhanced shadow for visibility
      card.innerHTML = `<div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-primary"></div>
        <p class="text-sm font-medium">${getRandomLeadText()}</p>
      </div>`;
      card.style.position = "absolute";
      card.style.zIndex = "5";
      containerRef.current.appendChild(card);

      // Adjusted starting position for better visibility - ensure starts fully on screen
      const containerHeight = containerRef.current.offsetHeight;
      const startY = (containerHeight / 2) - 80 + (index * (isMobile ? 50 : 60));
      const logoRect = logoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate logo center position relative to container
      const logoCenterX = logoRect.left - containerRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top - containerRect.top + logoRect.height / 2;

      // Start cards from left edge but ensure they're visible
      const startX = isMobile ? -140 : -220;
      
      // Set initial state - fully visible from the start with higher opacity
      gsap.set(card, { 
        x: startX, 
        y: startY, 
        opacity: 0, 
        scale: isMobile ? 0.95 : 1.05 
      }); 
      
      // Fade in first with higher initial opacity for better visibility
      gsap.to(card, { 
        opacity: 1, 
        duration: 0.8,
        ease: "power1.inOut" // Smoother intro
      });
      
      // Then move to the center with optimized motion parameters
      gsap.to(card, {
        x: logoCenterX - 30, // Target directly to center
        y: logoCenterY,      
        scale: 0.2,          // Smaller final scale for better absorption effect
        opacity: 0,
        duration: isMobile ? 5.5 : 6,  // Slightly slower on mobile
        ease: "power1.inOut", // Consistent easing
        delay: 0.8,          // Start after fade in
        onComplete: () => {
          createPopEffect(logoCenterX, logoCenterY);
          card.remove();
          spawnName(index);
        }
      });
    };
    
    const spawnName = (index: number) => {
      if (!containerRef.current || !logoRef.current || !isAnimating.current) return;
      
      const nameCard = document.createElement("div");
      nameCard.className = "bg-background/95 backdrop-blur-sm border border-primary/20 shadow-lg rounded-lg p-4";
      nameCard.style.width = isMobile ? "170px" : "200px";
      nameCard.style.boxShadow = "0 4px 12px rgba(0, 110, 218, 0.15)"; // Enhanced shadow for visibility
      nameCard.innerHTML = `<div class="flex items-center gap-3">
        <div class="shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div>
          <h4 class="text-sm font-semibold">${getRandomName()}</h4>
          <p class="text-xs text-foreground/70">Just now</p>
        </div>
      </div>`;
      nameCard.style.position = "absolute";
      nameCard.style.zIndex = "5";
      containerRef.current.appendChild(nameCard);

      const logoRect = logoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate logo center position relative to container
      const logoCenterX = logoRect.left - containerRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top - containerRect.top + logoRect.height / 2;
      
      // Create more controlled angles for different cards
      const angleVariations = isMobile ? 
        [-20, 0, 20] : // More restricted angles for mobile
        [-25, -5, 15, 35]; // More spread for desktop
      
      const angle = angleVariations[index % angleVariations.length];
      const distance = containerRect.width * (isMobile ? 0.8 : 1) + 100; // Adjust distance based on screen size
      const radians = angle * (Math.PI / 180);

      const xTarget = Math.cos(radians) * distance;
      const yTarget = Math.sin(radians) * distance;
      
      // Start right of center logo (important for visual flow)
      const offsetX = isMobile ? 50 : 70; // Offset to the right of logo - increased for better visibility

      // Start from right of center with initial opacity 0
      gsap.set(nameCard, {
        x: logoCenterX + offsetX,
        y: logoCenterY - 20,
        opacity: 0,
        scale: 0.7
      });

      // Fade in first with higher initial opacity
      gsap.to(nameCard, {
        opacity: 1,
        scale: 0.95,
        duration: 0.7,
        ease: "power1.out"
      });

      // Then move outward with smoother motion and appropriate timing
      gsap.to(nameCard, {
        x: logoCenterX + xTarget,
        y: logoCenterY + yTarget,
        duration: isMobile ? 5 : 6, // Slightly faster on mobile
        ease: "power1.inOut", // Consistent easing
        delay: 0.7, // Start after fade in
        onComplete: () => {
          nameCard.remove();
        }
      });
    };
    
    const loopAnimation = () => {
      if (!isAnimating.current) return;
      
      // Adjust card frequency for mobile
      const cardCount = isMobile ? 3 : 4;
      const cardInterval = isMobile ? 4000 : 3500; // More time between cards on mobile
      
      for (let i = 0; i < cardCount; i++) {
        const timeout = setTimeout(() => spawnLead(i), i * cardInterval);
        timeouts.push(timeout);
      }
      
      const loopTimeout = setTimeout(loopAnimation, (cardCount * cardInterval) + 2000);
      timeouts.push(loopTimeout);
    };
    
    // Start the animation
    animationFrameId = requestAnimationFrame(() => {
      loopAnimation();
    });
    
    // Cleanup function
    return () => {
      isAnimating.current = false;
      cancelAnimationFrame(animationFrameId);
      timeouts.forEach(timeout => clearTimeout(timeout));
      
      // Clean up any remaining elements
      if (containerRef.current) {
        const leads = containerRef.current.querySelectorAll(".lead-card, .name-card");
        leads.forEach(lead => lead.remove());
      }
    };
  }, [isMobile]); // Add isMobile as a dependency

  return { containerRef, logoRef };
};
