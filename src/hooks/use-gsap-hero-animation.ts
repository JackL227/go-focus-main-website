
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
      pop.style.width = isMobile ? "16px" : "30px";
      pop.style.height = isMobile ? "16px" : "30px";
      pop.style.borderRadius = "50%";
      pop.style.background = "rgba(0, 110, 218, 0.5)"; 
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
      pop.style.zIndex = "6";
      containerRef.current.appendChild(pop);

      gsap.fromTo(pop, 
        { scale: 0.2, opacity: 0.7 },
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          onComplete: () => pop.remove()
        }
      );
    };
    
    const spawnLead = (index: number) => {
      if (!containerRef.current || !logoRef.current || !isAnimating.current) return;
      
      const card = document.createElement("div");
      card.className = "lead-card bg-background/95 backdrop-blur-sm border border-primary/20 shadow-lg rounded-lg p-3";
      
      // Mobile-optimized card styles
      if (isMobile) {
        card.style.width = "110px";
        card.style.boxShadow = "0 4px 10px rgba(0, 110, 218, 0.2)";
      } else {
        card.style.width = "160px";
        card.style.boxShadow = "0 4px 14px rgba(0, 110, 218, 0.25)";
      }
      
      card.innerHTML = `<div class="flex items-center gap-1">
        <div class="w-2 h-2 rounded-full bg-primary"></div>
        <p class="text-xs font-medium">${getRandomLeadText()}</p>
      </div>`;
      card.style.position = "absolute";
      card.style.zIndex = "5";
      containerRef.current.appendChild(card);

      // Get container dimensions
      const containerHeight = containerRef.current.offsetHeight;
      const containerWidth = containerRef.current.offsetWidth;
      
      // Calculate logo position relative to container
      const logoRect = logoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const logoCenterX = logoRect.left - containerRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top - containerRect.top + logoRect.height / 2;

      // Mobile-optimized start position
      // Move cards closer to the visible area for small screens
      const startX = isMobile ? -110 : -160;
      
      // Improved vertical distribution for mobile
      let startY;
      if (isMobile) {
        // More visible distribution on mobile
        const positions = [-1, -0.5, 0, 0.5, 1];
        const position = positions[index % positions.length];
        const verticalSpace = containerHeight * 0.6;
        startY = logoCenterY + (position * (verticalSpace / 3));
      } else {
        // Desktop version remains similar
        startY = (containerHeight / 2) - 80 + (index * 60);
      }
      
      // Set initial state with higher opacity for better visibility
      gsap.set(card, { 
        x: startX, 
        y: startY, 
        opacity: 0, 
        scale: isMobile ? 0.9 : 1 
      }); 
      
      // Fade in with higher initial opacity for better visibility
      gsap.to(card, { 
        opacity: 1, 
        duration: 0.5,
        ease: "power1.inOut"
      });
      
      // Optimized path to center - slightly faster on mobile
      gsap.to(card, {
        x: logoCenterX - (isMobile ? 15 : 30),
        y: logoCenterY,      
        scale: 0.2,
        opacity: 0,
        duration: isMobile ? 3 : 5.5,
        ease: "power1.inOut",
        delay: 0.5,
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
      nameCard.className = "name-card bg-background/95 backdrop-blur-sm border border-primary/20 shadow-lg rounded-lg p-3";
      
      // Adjust card size for better visibility on mobile
      if (isMobile) {
        nameCard.style.width = "140px";
        nameCard.style.boxShadow = "0 4px 12px rgba(0, 110, 218, 0.25)";
      } else {
        nameCard.style.width = "200px";
      }
      
      // Simplified content for mobile
      const cardContent = isMobile ? 
        `<div class="flex items-center gap-2">
          <div class="shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <h4 class="text-xs font-semibold">${getRandomName()}</h4>
          </div>
        </div>` :
        `<div class="flex items-center gap-3">
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
      
      nameCard.innerHTML = cardContent;
      nameCard.style.position = "absolute";
      nameCard.style.zIndex = "5";
      containerRef.current.appendChild(nameCard);

      // Calculate logo position
      const logoRect = logoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const logoCenterX = logoRect.left - containerRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top - containerRect.top + logoRect.height / 2;
      
      // Create optimized angle variations for mobile
      // Mobile needs tighter angles to keep cards on screen
      const angleVariations = isMobile ? 
        [0, 15, 30, 45, 60] : // More visible angles for mobile, covering more of the screen
        [-25, -5, 15, 35]; // Desktop angles unchanged
      
      const angle = angleVariations[index % angleVariations.length];
      
      // Calculate distance based on container width - adjusted for mobile visibility
      const distance = isMobile ? 
        containerRect.width * 0.5 : // Shorter distance for mobile to keep cards visible
        containerRect.width * 1 + 100; // Original distance for desktop
        
      const radians = angle * (Math.PI / 180);

      // Calculate end coordinates
      const xTarget = Math.cos(radians) * distance;
      const yTarget = Math.sin(radians) * distance;
      
      // Improved starting position
      // For mobile: ensure proper spacing from logo edge
      const offsetX = isMobile ? 30 : 70;

      // Set initial position - ensuring cards start from right of logo
      gsap.set(nameCard, {
        x: logoCenterX + offsetX,
        y: logoCenterY - (isMobile ? 5 : 20),
        opacity: 0,
        scale: isMobile ? 0.85 : 0.7
      });

      // Fade in with improved opacity
      gsap.to(nameCard, {
        opacity: 1,
        scale: isMobile ? 0.95 : 0.95,
        duration: 0.6,
        ease: "power1.out"
      });

      // Move outward with optimized timing for mobile
      gsap.to(nameCard, {
        x: logoCenterX + xTarget,
        y: logoCenterY + yTarget,
        duration: isMobile ? 3 : 5.5,
        ease: "power1.inOut",
        delay: 0.6,
        onComplete: () => {
          nameCard.remove();
        }
      });
    };
    
    const loopAnimation = () => {
      if (!isAnimating.current) return;
      
      // Adjust card frequency and count for better visibility
      const cardCount = isMobile ? 5 : 4; // More cards for mobile to ensure visibility
      const cardInterval = isMobile ? 2500 : 3500; // Faster on mobile for better perception of activity
      
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
