
import React, { useEffect, useRef } from 'react';
import MessageParticle from './MessageParticle';
import LeadParticle from './LeadParticle';
import AINode from './AINode';
import OutcomePanel from './OutcomePanel';
import { animationColors, setCanvasSize, createInitialMessageParticles, drawGlassmorphism, createGlow } from './flowAnimationUtils';

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
    
    // Create outcome panels with improved positioning
    const qualifiedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.3, "Qualified", "checkmark");
    const bookedPanel = new OutcomePanel(canvas.width * 0.85, canvas.height * 0.5, "Booked Call", "calendar");
    const closedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.7, "Closed Deal", "smile");
    
    // Background particles - more particles for richer visual effect
    const bgParticles: {x: number; y: number; size: number; speed: number; opacity: number; color: string;}[] = [];
    for (let i = 0; i < 60; i++) {
      // Determine color based on position - creates visual depth
      const colorValue = i % 5 === 0 ? '#00E676' : 
                         i % 7 === 0 ? '#FFC107' : '#006eda';
      
      bgParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.4 + 0.1,
        color: colorValue
      });
    }
    
    // Create initial particles
    messageParticles.push(...createInitialMessageParticles(20, MessageParticle, canvas.height));
    
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      // Create premium dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050A15');
      gradient.addColorStop(0.5, '#071020');
      gradient.addColorStop(1, '#091830');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid pattern for depth
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw background particles with improved visual quality
      bgParticles.forEach((particle, i) => {
        // Draw glow around particle
        createGlow(ctx, particle.x, particle.y, particle.size * 3, particle.color, particle.opacity);
        
        // Draw core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Move particles
        particle.x += particle.speed;
        
        // Reset particles that go off screen
        if (particle.x > canvas.width) {
          particle.x = 0;
          particle.y = Math.random() * canvas.height;
        }
      });
      
      // Apply slight blur for depth effect - only if performance allows
      if (canvas.width < 1200) { // Skip on larger screens to maintain performance
        ctx.filter = 'blur(1px)';
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
      }
      
      // Draw glass panels to highlight the flow
      const glassPanelWidth = canvas.width * 0.7;
      const glassPanelHeight = canvas.height * 0.5;
      const glassPanelX = canvas.width * 0.15;
      const glassPanelY = canvas.height / 2 - glassPanelHeight / 2;
      
      drawGlassmorphism(ctx, glassPanelX, glassPanelY, glassPanelWidth, glassPanelHeight, 20, animationColors);
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);
      
      // Update and draw outcome panels
      qualifiedPanel.update();
      qualifiedPanel.draw(ctx, animationColors);
      
      bookedPanel.update();
      bookedPanel.draw(ctx, animationColors);
      
      closedPanel.update();
      closedPanel.draw(ctx, animationColors);
      
      // Connect glowing lines between AI node and outcome panels
      ctx.beginPath();
      ctx.moveTo(aiNode.x, aiNode.y);
      ctx.lineTo(qualifiedPanel.x, qualifiedPanel.y);
      
      // Create gradient for the connection line
      const gradientLine1 = ctx.createLinearGradient(
        aiNode.x, aiNode.y, 
        qualifiedPanel.x, qualifiedPanel.y
      );
      gradientLine1.addColorStop(0, 'rgba(0, 110, 218, 0.8)');
      gradientLine1.addColorStop(1, 'rgba(0, 230, 118, 0.4)');
      
      ctx.strokeStyle = gradientLine1;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Second connection
      ctx.beginPath();
      ctx.moveTo(aiNode.x, aiNode.y);
      ctx.lineTo(bookedPanel.x, bookedPanel.y);
      
      const gradientLine2 = ctx.createLinearGradient(
        aiNode.x, aiNode.y, 
        bookedPanel.x, bookedPanel.y
      );
      gradientLine2.addColorStop(0, 'rgba(0, 110, 218, 0.8)');
      gradientLine2.addColorStop(1, 'rgba(0, 110, 218, 0.4)');
      
      ctx.strokeStyle = gradientLine2;
      ctx.stroke();
      
      // Third connection
      ctx.beginPath();
      ctx.moveTo(aiNode.x, aiNode.y);
      ctx.lineTo(closedPanel.x, closedPanel.y);
      
      const gradientLine3 = ctx.createLinearGradient(
        aiNode.x, aiNode.y, 
        closedPanel.x, closedPanel.y
      );
      gradientLine3.addColorStop(0, 'rgba(0, 110, 218, 0.8)');
      gradientLine3.addColorStop(1, 'rgba(255, 193, 7, 0.4)');
      
      ctx.strokeStyle = gradientLine3;
      ctx.stroke();
      
      // Update and draw message particles
      for (let i = messageParticles.length - 1; i >= 0; i--) {
        const particle = messageParticles[i];
        const x = particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if particle reached AI node for processing
        if (aiNode.processParticle(particle)) {
          messageParticles.splice(i, 1);
          
          // Visual flash effect on AI node
          aiNode.pulseOpacity = 0.6;
          
          // Determine outcome panel with weighted probabilities
          const rand = Math.random();
          let targetPanel;
          
          if (rand < 0.45) { // Higher chance for qualified
            targetPanel = qualifiedPanel;
            qualifiedPanel.pulse();
          } else if (rand < 0.8) { // Medium chance for booked call
            targetPanel = bookedPanel;
            bookedPanel.pulse();
          } else { // Lower chance for closed deal
            targetPanel = closedPanel;
            closedPanel.pulse();
          }
          
          // Create a lead particle heading to the selected panel
          const leadType = targetPanel.type === "calendar" ? "calendar" : 
                           targetPanel.type === "checkmark" ? "checkmark" : "smile";
                           
          const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
          newLead.setTarget(targetPanel.x, targetPanel.y);
          leadParticles.push(newLead);
          
          continue;
        }
        
        // Auto-direct particles once they reach mid-screen
        if (!particle.targetX && x > canvas.width * 0.35) {
          particle.redirectToNode(aiNode.x, aiNode.y);
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
      if (Math.random() < 0.06 && messageParticles.length < 30) {
        const x = -20;
        const y = canvas.height * (0.3 + Math.random() * 0.4); // Keep within middle area
        const newParticle = new MessageParticle(x, y, canvas.height);
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
