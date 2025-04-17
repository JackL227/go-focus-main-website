
import React, { useEffect, useRef, useState } from 'react';
import MessageParticle from './MessageParticle';
import LeadParticle from './LeadParticle';
import AINode from './AINode';
import OutcomePanel from './OutcomePanel';
import { animationColors, setCanvasSize, createInitialMessageParticles } from './flowAnimationUtils';

const FlowAnimationCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPanel, setHoveredPanel] = useState<OutcomePanel | null>(null);
  
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
    
    // Create outcome panels with clearer naming
    const qualifiedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.3, "Qualified", "checkmark");
    const bookedPanel = new OutcomePanel(canvas.width * 0.85, canvas.height * 0.5, "Booked Call", "calendar");
    const closedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.7, "Closed Deal", "smile"); // Renamed to "Closed Deal"
    
    // Create array of all panels for hover detection
    const allPanels = [qualifiedPanel, bookedPanel, closedPanel];
    
    // Background particles
    const bgParticles: {x: number; y: number; size: number; speed: number; opacity: number;}[] = [];
    for (let i = 0; i < 60; i++) { // More particles for a richer background
      bgParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1, // Larger particles
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.2 // More visible
      });
    }
    
    // Create initial particles
    messageParticles.push(...createInitialMessageParticles(20, MessageParticle, canvas.height)); // More initial particles
    
    // Mouse interaction handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // Check for hover on panels
      let foundHoveredPanel = null;
      for (const panel of allPanels) {
        if (panel.isPointInside(mouseX, mouseY)) {
          foundHoveredPanel = panel;
          panel.hover(true);
        } else {
          panel.hover(false);
        }
      }
      
      setHoveredPanel(foundHoveredPanel);
      canvas.style.cursor = foundHoveredPanel ? 'pointer' : 'default';
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#081020'); // Deep navy
      gradient.addColorStop(1, '#0A1A30');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background particles with improved aesthetics
      bgParticles.forEach((particle, i) => {
        // Create a subtle glow effect
        ctx.shadowColor = 'rgba(30, 174, 219, 0.5)'; // Neon teal
        ctx.shadowBlur = 4;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Use gradient for each particle to create depth
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        // Randomize colors between teal and blue for variety
        const isBlue = i % 3 === 0;
        particleGradient.addColorStop(0, isBlue ? 'rgba(30, 174, 219, 0.8)' : 'rgba(0, 110, 218, 0.8)');
        particleGradient.addColorStop(1, 'rgba(0, 20, 50, 0.1)');
        
        ctx.fillStyle = particleGradient;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        
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
      
      closedPanel.update();
      closedPanel.draw(ctx, animationColors);
      
      // Connect lines between AI node and outcome panels with enhanced styling
      const drawConnectingLine = (toPanel: OutcomePanel) => {
        ctx.beginPath();
        
        // Create curved paths for more interesting visuals
        const startX = aiNode.x;
        const startY = aiNode.y;
        const endX = toPanel.x;
        const endY = toPanel.y;
        
        // Calculate control points for curved lines
        const cpX = (startX + endX) / 2 + Math.random() * 20 - 10;
        const cpY = (startY + endY) / 2 + Math.random() * 20 - 10;
        
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        
        // Create gradient for line
        const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
        
        let baseColor: string;
        if (toPanel.type === 'checkmark') {
          baseColor = 'rgba(0, 230, 118, '; // Green
        } else if (toPanel.type === 'calendar') {
          baseColor = 'rgba(0, 110, 218, '; // Blue
        } else {
          baseColor = 'rgba(255, 193, 7, '; // Gold
        }
        
        lineGradient.addColorStop(0, `${baseColor}0.1)`);
        lineGradient.addColorStop(0.5, `${baseColor}0.3)`);
        lineGradient.addColorStop(1, `${baseColor}0.1)`);
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = toPanel === hoveredPanel ? 2 : 1;
        ctx.stroke();
      };
      
      drawConnectingLine(qualifiedPanel);
      drawConnectingLine(bookedPanel);
      drawConnectingLine(closedPanel);
      
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
      
      // Create new message particles at a controlled rate (more frequent)
      if (Math.random() < 0.08 && messageParticles.length < 30) { // Increased rate and limit
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
      canvas.removeEventListener('mousemove', handleMouseMove);
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
