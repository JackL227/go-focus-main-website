
import React, { useEffect, useRef } from 'react';
import MessageParticle from './MessageParticle';
import LeadParticle from './LeadParticle';
import AINode from './AINode';
import OutcomePanel from './OutcomePanel';
import { animationColors, setCanvasSize, createInitialMessageParticles } from './flowAnimationUtils';

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
    const aiNode = new AINode(canvas.width / 2, canvas.height / 2);
    
    // Create outcome panels
    const qualifiedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.3, "Qualified", "checkmark");
    const bookedPanel = new OutcomePanel(canvas.width * 0.85, canvas.height * 0.5, "Booked Call", "calendar");
    const confirmedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.7, "Confirmed Treatment", "smile");
    
    // Background particles
    const bgParticles: {x: number; y: number; size: number; speed: number; opacity: number;}[] = [];
    for (let i = 0; i < 30; i++) {
      bgParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Create initial particles
    messageParticles.push(...createInitialMessageParticles(10, MessageParticle, canvas.height));
    
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#081020');
      gradient.addColorStop(1, '#0A1A30');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background particles
      bgParticles.forEach((particle, i) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 110, 218, ${particle.opacity})`;
        ctx.fill();
        
        // Move particles
        particle.x += particle.speed;
        
        // Reset particles that go off screen
        if (particle.x > canvas.width) {
          particle.x = 0;
          particle.y = Math.random() * canvas.height;
        }
      });
      
      // Apply slight blur for depth effect
      ctx.filter = 'blur(1px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);
      
      // Update and draw outcome panels
      qualifiedPanel.update();
      qualifiedPanel.draw(ctx, animationColors);
      
      bookedPanel.update();
      bookedPanel.draw(ctx, animationColors);
      
      confirmedPanel.update();
      confirmedPanel.draw(ctx, animationColors);
      
      // Update and draw message particles
      for (let i = messageParticles.length - 1; i >= 0; i--) {
        const particle = messageParticles[i];
        const x = particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if particle reached AI node for processing
        if (aiNode.processParticle(particle)) {
          messageParticles.splice(i, 1);
          
          // Determine outcome panel
          const rand = Math.random();
          let targetPanel;
          
          if (rand < 0.33) {
            targetPanel = qualifiedPanel;
            qualifiedPanel.pulse();
          } else if (rand < 0.66) {
            targetPanel = bookedPanel;
            bookedPanel.pulse();
          } else {
            targetPanel = confirmedPanel;
            confirmedPanel.pulse();
          }
          
          // Create a lead particle heading to the selected panel
          const leadType = targetPanel.type === "calendar" ? "calendar" : 
                           targetPanel.type === "checkmark" ? "checkmark" : "smile";
                           
          const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
          newLead.setTarget(targetPanel.x, targetPanel.y);
          leadParticles.push(newLead);
          
          continue;
        }
        
        // Remove if off screen
        if (x > canvas.width + 50) {
          messageParticles.splice(i, 1);
        }
      }
      
      // Update and draw lead particles
      for (let i = leadParticles.length - 1; i >= 0; i--) {
        const particle = leadParticles[i];
        particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if reached target panel
        if (particle.hasReachedTarget()) {
          leadParticles.splice(i, 1);
          continue;
        }
      }
      
      // Create new message particles at a controlled rate
      if (Math.random() < 0.05 && messageParticles.length < 20) {
        const x = -20;
        const y = canvas.height * (0.3 + Math.random() * 0.4); // Keep within middle area
        messageParticles.push(new MessageParticle(x, y, canvas.height));
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default FlowAnimationCanvas;
