
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useGsapHeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(true);

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
      pop.style.width = "30px";
      pop.style.height = "30px";
      pop.style.borderRadius = "50%";
      pop.style.background = "rgba(0, 110, 218, 0.6)"; // Primary color with opacity
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
      pop.style.zIndex = "6";
      containerRef.current.appendChild(pop);

      gsap.fromTo(pop, 
        { scale: 0.2, opacity: 0.6 }, 
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          onComplete: () => pop.remove()
        }
      );
    };
    
    const spawnLead = (index: number) => {
      if (!containerRef.current || !logoRef.current || !isAnimating.current) return;
      
      const card = document.createElement("div");
      card.className = "bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-4 w-[140px] md:w-[160px]";
      card.innerHTML = `<div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-primary/80"></div>
        <p class="text-sm font-medium">${getRandomLeadText()}</p>
      </div>`;
      card.style.position = "absolute";
      card.style.zIndex = "5";
      containerRef.current.appendChild(card);

      const startY = containerRef.current.offsetHeight / 2 - 100 + index * 60;
      const logoRect = logoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate logo center position relative to container
      const logoCenterX = logoRect.left - containerRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top - containerRect.top + logoRect.height / 2;

      gsap.set(card, { x: -250, y: startY, opacity: 0 });
      
      gsap.to(card, { opacity: 1, duration: 0.5 });
      
      gsap.to(card, {
        x: logoCenterX - 50,
        y: logoCenterY - 15,
        scale: 0.1,
        opacity: 0,
        duration: 3,
        ease: "power2.inOut",
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
      nameCard.className = "bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-4";
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
      nameCard.style.width = "180px";
      nameCard.style.zIndex = "5";
      containerRef.current.appendChild(nameCard);

      const logoRect = logoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate logo center position relative to container
      const logoCenterX = logoRect.left - containerRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top - containerRect.top + logoRect.height / 2;
      
      // Create different angles for different cards
      const angle = (index % 3 === 0) ? 0 : (index % 3 === 1) ? -20 : 20;
      const distance = containerRect.width + 200;
      const radians = angle * (Math.PI / 180);

      const xTarget = Math.cos(radians) * distance;
      const yTarget = Math.sin(radians) * distance;

      gsap.set(nameCard, {
        x: logoCenterX - 90,
        y: logoCenterY - 30,
        opacity: 0,
        scale: 0.5
      });

      gsap.to(nameCard, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
      });

      gsap.to(nameCard, {
        x: logoCenterX + xTarget,
        y: logoCenterY + yTarget,
        duration: 4,
        ease: "power2.inOut",
        delay: 0.4,
        onComplete: () => {
          nameCard.remove();
        }
      });
    };
    
    const loopAnimation = () => {
      if (!isAnimating.current) return;
      
      for (let i = 0; i < 4; i++) {
        const timeout = setTimeout(() => spawnLead(i), i * 2500);
        timeouts.push(timeout);
      }
      
      const loopTimeout = setTimeout(loopAnimation, 12000);
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
  }, []);

  return { containerRef, logoRef };
};
