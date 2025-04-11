
import React, { useEffect, useRef } from 'react';
import MessageParticle from './MessageParticle';
import LeadParticle from './LeadParticle';
import AINode from './AINode';
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
    let animationId: number;
    
    // Create initial particles
    messageParticles.push(...createInitialMessageParticles(15, MessageParticle, canvas.height));
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);
      
      // Update and draw message particles
      for (let i = messageParticles.length - 1; i >= 0; i--) {
        const particle = messageParticles[i];
        const x = particle.update();
        particle.draw(ctx, animationColors);
        
        // Check if particle reached AI node for processing
        if (aiNode.processParticle(particle)) {
          messageParticles.splice(i, 1);
          
          // If qualified, create a lead particle
          if (particle.isQualified) {
            // Determine what type of lead particle to create with more analytics
            const leadType = ['calendar', 'checkmark', 'dollar', 'analytics'][Math.floor(Math.random() * 4)];
            leadParticles.push(new LeadParticle(aiNode.x, aiNode.y, leadType));
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
        const x = particle.update();
        particle.draw(ctx, animationColors);
        
        // Remove if off screen
        if (x > canvas.width + 50) {
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
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-trader-blue/10 to-trader-green-light/5"
      style={{ opacity: 0.9 }}
    />
  );
};

export default FlowAnimationCanvas;
