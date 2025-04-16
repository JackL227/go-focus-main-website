
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
    const aiNode = new AINode(canvas.width, canvas.height);
    
    // Create outcome panels positioned strategically around the AI node
    const panelWidth = Math.min(canvas.width * 0.2, 180);
    const panelHeight = Math.min(canvas.height * 0.12, 80);
    
    const panels = [
      new OutcomePanel(canvas.width * 0.75, canvas.height * 0.3, panelWidth, panelHeight, "Qualified"),
      new OutcomePanel(canvas.width * 0.65, canvas.height * 0.7, panelWidth, panelHeight, "Booked Call"),
      new OutcomePanel(canvas.width * 0.85, canvas.height * 0.5, panelWidth, panelHeight, "Confirmed Treatment")
    ];
    
    let animationId: number;
    
    // Create initial particles
    messageParticles.push(...createInitialMessageParticles(15, MessageParticle, canvas.height));
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);
      
      // Update and draw outcome panels
      panels.forEach(panel => {
        panel.update();
        panel.draw(ctx, animationColors);
      });
      
      // Update and draw message particles
      for (let i = messageParticles.length - 1; i >= 0; i--) {
        const particle = messageParticles[i];
        const x = particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if particle reached AI node for processing
        if (aiNode.processParticle(particle)) {
          messageParticles.splice(i, 1);
          
          // If qualified, create a lead particle heading toward one of the panels
          if (particle.isQualified) {
            // Determine which panel to target based on random choice
            const targetPanel = panels[Math.floor(Math.random() * panels.length)];
            const leadType = targetPanel.label === "Qualified" ? "checkmark" : 
                           targetPanel.label === "Booked Call" ? "calendar" : "dollar";
            
            const leadParticle = new LeadParticle(aiNode.x, aiNode.y, leadType);
            leadParticle.setTarget(targetPanel.x, targetPanel.y);
            leadParticles.push(leadParticle);
            
            // Notify the panel it's receiving a new lead (for animations)
            targetPanel.receiveLead();
          }
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
        
        // Check if particle reached its target panel
        if (particle.hasReachedTarget()) {
          leadParticles.splice(i, 1);
        }
      }
      
      // Create new message particles at a controlled rate
      if (Math.random() < 0.05 && messageParticles.length < 20) {
        const x = -20;
        const y = Math.random() * canvas.height * 0.7 + canvas.height * 0.15; // Keep in middle area
        const newParticle = new MessageParticle(x, y, canvas.height);
        newParticle.type = 'lead'; // All new particles are "Lead" type
        messageParticles.push(newParticle);
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
