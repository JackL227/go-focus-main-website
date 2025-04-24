
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import AINode from './flow-animation/AINode';
import OutcomePanel from './flow-animation/OutcomePanel';
import MessageParticle from './flow-animation/MessageParticle';

const FlowAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize elements
    const aiNode = new AINode(canvas.width * 0.5, canvas.height * 0.5);
    
    const panels = [
      new OutcomePanel(canvas.width * 0.8, canvas.height * 0.3, "Booked Calls", "calendar"),
      new OutcomePanel(canvas.width * 0.8, canvas.height * 0.5, "Qualified Leads", "checkmark"),
      new OutcomePanel(canvas.width * 0.8, canvas.height * 0.7, "Closed Deals", "smile")
    ];

    let particles: MessageParticle[] = [];
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles
      if (Math.random() < 0.05 && particles.length < (isMobile ? 10 : 20)) {
        particles.push(new MessageParticle(-20, canvas.height * 0.5, canvas.height));
      }

      // Update and draw particles
      particles = particles.filter(particle => {
        particle.update();
        particle.draw(ctx, { primary: '#006eda', qualified: '#00E676', closed: '#FFC107' });
        
        // Remove particles that go off screen
        if (particle.x > canvas.width + 50) return false;
        
        // Check if particle reaches AI node
        if (aiNode.processParticle(particle)) {
          const targetPanel = panels[Math.floor(Math.random() * panels.length)];
          targetPanel.pulse();
          return false;
        }
        
        return true;
      });

      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, { primary: '#006eda' });

      // Update and draw panels
      panels.forEach(panel => {
        panel.update();
        panel.draw(ctx, { primary: '#006eda', qualified: '#00E676', closed: '#FFC107' });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
};

export default FlowAnimation;
