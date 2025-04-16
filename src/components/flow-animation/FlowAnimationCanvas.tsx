
import React, { useEffect, useRef } from 'react';
import MessageParticle from './MessageParticle';
import LeadParticle from './LeadParticle';
import AINode from './AINode';
import OutcomePanel from './OutcomePanel';
import { animationColors, setCanvasSize, createInitialMessageParticles, createOutcomePanels } from './flowAnimationUtils';
import WordFormation from './WordFormation';

const FlowAnimationCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full width
    const handleResize = () => setCanvasSize(canvas);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation variables
    const messageParticles: MessageParticle[] = [];
    const leadParticles: LeadParticle[] = [];
    let aiNode: AINode;
    let wordFormation: WordFormation;
    let outcomePanels: any[] = [];
    
    // Initialize animation elements after canvas is sized
    const initializeAnimationElements = () => {
      // Central AI node
      aiNode = new AINode(canvas.width, canvas.height);
      
      // Word formation for "LEAD"
      wordFormation = new WordFormation(canvas.width * 0.25, canvas.height / 2, 'LEAD');
      
      // Outcome panels
      outcomePanels = createOutcomePanels(canvas.width, canvas.height, OutcomePanel);
      
      // Create initial particles
      messageParticles.push(...createInitialMessageParticles(15, MessageParticle, canvas.height));
    };
    
    initializeAnimationElements();
    
    // Create gradient background
    const createBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000614');  // Dark navy
      gradient.addColorStop(1, '#000000');  // Black
      return gradient;
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      ctx.fillStyle = createBackground();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw ambient particles in the background
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const opacity = Math.random() * 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 110, 218, ${opacity})`;
        ctx.fill();
      }
      
      // Update and draw outcome panels
      outcomePanels.forEach(panel => {
        panel.update();
        panel.draw(ctx, animationColors);
      });
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);
      
      // Draw the word formation
      wordFormation.draw(ctx, animationColors);
      
      // Update and draw message particles
      for (let i = messageParticles.length - 1; i >= 0; i--) {
        const particle = messageParticles[i];
        const x = particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if particle should join word formation
        if (x > canvas.width * 0.15 && x < canvas.width * 0.3) {
          if (wordFormation.attractParticle(particle)) {
            messageParticles.splice(i, 1);
            continue;
          }
        }
        
        // Check if particle reached AI node for processing
        if (aiNode.processParticle(particle)) {
          messageParticles.splice(i, 1);
          
          // If qualified, create a lead particle
          if (particle.isQualified) {
            // Determine what type of outcome to create
            const outcomeType = Math.floor(Math.random() * outcomePanels.length);
            const targetPanel = outcomePanels[outcomeType];
            
            // Map outcome type to lead particle type
            let leadType;
            switch(outcomeType) {
              case 0: leadType = 'checkmark'; break; // Qualified
              case 1: leadType = 'calendar'; break;  // Booked Call
              case 2: leadType = 'dollar'; break;    // Confirmed Treatment
              default: leadType = 'analytics';
            }
            
            const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
            newLead.setTarget(targetPanel.x, targetPanel.y);
            leadParticles.push(newLead);
          }
        }
        
        // Remove if off screen
        if (x > canvas.width + 50) {
          messageParticles.splice(i, 1);
        }
      }
      
      // Process particles in word formation that should be released to AI node
      const releasedParticles = wordFormation.releaseParticles();
      if (releasedParticles.length > 0) {
        releasedParticles.forEach(p => {
          p.redirectToNode(aiNode.x, aiNode.y);
          messageParticles.push(p);
        });
      }
      
      // Update and draw lead particles
      for (let i = leadParticles.length - 1; i >= 0; i--) {
        const particle = leadParticles[i];
        particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if lead particle has reached its target
        if (particle.hasReachedTarget()) {
          // Find matching outcome panel and trigger its animation
          outcomePanels.some(panel => {
            const dx = panel.x - particle.x;
            const dy = panel.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 30) {
              panel.pulse();
              panel.incrementCounter();
              leadParticles.splice(i, 1);
              return true;
            }
            return false;
          });
        }
        
        // Remove if off screen
        if (particle.x > canvas.width + 50 || particle.x < -50 || 
            particle.y > canvas.height + 50 || particle.y < -50) {
          leadParticles.splice(i, 1);
        }
      }
      
      // Create new message particles at a controlled rate
      if (Math.random() < 0.1 && messageParticles.length < 25) {
        const x = -20;
        const y = Math.random() * canvas.height;
        messageParticles.push(new MessageParticle(x, y, canvas.height));
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);
    
    // Handle resize
    window.addEventListener('resize', () => {
      handleResize();
      initializeAnimationElements();
    });
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 bg-black"
    />
  );
};

export default FlowAnimationCanvas;
