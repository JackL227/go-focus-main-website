
import { useEffect, useRef } from 'react';
import MessageParticle from '../MessageParticle';
import LeadParticle from '../LeadParticle';
import AINode from '../AINode';
import OutcomePanel from '../OutcomePanel';
import { animationColors } from '../flowAnimationUtils';

interface AnimationState {
  messageParticles: MessageParticle[];
  leadParticles: LeadParticle[];
  bgParticles: {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }[];
}

export const useAnimationLoop = (
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null,
  aiNode: AINode | null,
  panels: OutcomePanel[],
  isMobile: boolean = false
) => {
  const animationState = useRef<AnimationState>({
    messageParticles: [],
    leadParticles: [],
    bgParticles: []
  });

  useEffect(() => {
    // Early return if any required dependencies are missing
    if (!canvas || !ctx || !aiNode) return;
    
    // Wait until canvas has valid dimensions before starting animation
    if (canvas.width === 0 || canvas.height === 0) {
      console.log('Canvas dimensions not ready yet, waiting...');
      const checkDimensions = setInterval(() => {
        if (canvas.width > 0 && canvas.height > 0) {
          clearInterval(checkDimensions);
          startAnimation();
        }
      }, 100);
      return () => clearInterval(checkDimensions);
    } else {
      startAnimation();
    }
    
    function startAnimation() {
      console.log('Starting animation with canvas dimensions:', canvas.width, 'x', canvas.height);
      
      // Initialize background particles - fewer on mobile
      const bgParticleCount = isMobile ? 30 : 60;
      animationState.current.bgParticles = Array.from({ length: bgParticleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isMobile ? 3 : 4) + 1,
        speed: Math.random() * (isMobile ? 0.2 : 0.3) + 0.1,
        opacity: Math.random() * 0.5 + 0.2
      }));

      // Initialize message particles - fewer on mobile
      const messageParticleCount = isMobile ? 10 : 20;
      animationState.current.messageParticles = Array.from({ length: messageParticleCount }, () => {
        const x = -20;
        const y = canvas.height * (0.3 + Math.random() * 0.4);
        return new MessageParticle(x, y, canvas.height);
      });

      let animationId: number;
      let lastFrameTime = 0;
      const targetFPS = isMobile ? 30 : 60; // Lower FPS target for mobile
      const frameInterval = 1000 / targetFPS;

      const animate = (timestamp: number) => {
        if (!ctx || !canvas || !aiNode) return;
        
        // Safety check to prevent drawing on a canvas with zero dimensions
        if (canvas.width === 0 || canvas.height === 0) {
          console.log('Skipping frame, canvas has zero dimension');
          animationId = requestAnimationFrame(animate);
          return;
        }
        
        // Throttle animation on mobile for better performance
        const elapsed = timestamp - lastFrameTime;
        if (elapsed < frameInterval && isMobile) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        lastFrameTime = timestamp;

        // Draw background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#081020');
        gradient.addColorStop(1, '#0A1A30');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw background particles
        const { bgParticles } = animationState.current;
        bgParticles.forEach((particle, i) => {
          // Skip some particles on mobile for performance
          if (isMobile && i % 2 === 0) return;
          
          ctx.shadowColor = 'rgba(30, 174, 219, 0.5)';
          ctx.shadowBlur = isMobile ? 2 : 4;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

          const particleGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );

          const isBlue = i % 3 === 0;
          particleGradient.addColorStop(0, isBlue ? 'rgba(30, 174, 219, 0.8)' : 'rgba(0, 110, 218, 0.8)');
          particleGradient.addColorStop(1, 'rgba(0, 20, 50, 0.1)');

          ctx.fillStyle = particleGradient;
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.shadowColor = 'transparent';

          particle.x += particle.speed;
          if (particle.x > canvas.width) {
            particle.x = 0;
            particle.y = Math.random() * canvas.height;
          }
        });

        // Apply less blur on mobile for better performance
        if (!isMobile && canvas.width > 0 && canvas.height > 0) {
          try {
            ctx.filter = 'blur(1px)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
          } catch (error) {
            console.error('Error applying blur effect:', error);
          }
        }

        // Draw connecting flow paths between AI node and panels
        panels.forEach(panel => {
          drawFlowPath(ctx, aiNode, panel, isMobile);
        });

        // Update and draw panels
        panels.forEach(panel => {
          panel.update();
          panel.draw(ctx, animationColors);
        });

        // Update and draw AI node
        aiNode.update();
        aiNode.draw(ctx, animationColors);

        // Update particles - with mobile optimizations
        updateParticles(canvas, aiNode, panels, ctx, animationState.current, isMobile);

        animationId = requestAnimationFrame(animate);
      };

      animate(0);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [canvas, ctx, aiNode, panels, isMobile]);

  return animationState.current;
};

const drawFlowPath = (
  ctx: CanvasRenderingContext2D,
  aiNode: AINode,
  panel: OutcomePanel,
  isMobile: boolean = false
) => {
  ctx.beginPath();
  const startX = aiNode.x;
  const startY = aiNode.y;
  const endX = panel.x;
  const endY = panel.y;

  // Create a curvy path with multiple control points
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  // Add some randomization to control points for organic feel - less on mobile
  const randFactor = isMobile ? 5 : 10;
  const cpX1 = midX + Math.sin(Date.now() * 0.001) * randFactor;
  const cpY1 = midY + Math.cos(Date.now() * 0.0008) * randFactor;
  
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(cpX1, cpY1, endX, endY);

  // Create gradient based on panel type
  let baseColor = panel.type === 'checkmark' ? animationColors.qualified :
                 panel.type === 'calendar' ? animationColors.booked :
                 animationColors.closed;
  
  const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
  lineGradient.addColorStop(0, `${baseColor}33`); // 20% opacity
  lineGradient.addColorStop(0.5, `${baseColor}66`); // 40% opacity
  lineGradient.addColorStop(1, `${baseColor}33`); // 20% opacity

  ctx.strokeStyle = lineGradient;
  ctx.lineWidth = panel.isHovered ? 2 : 1;
  ctx.stroke();
  
  // Add animated flow particles along the path - fewer on mobile
  if (!isMobile || Math.random() < 0.7) { // 70% chance to draw particles on mobile
    animateFlowParticles(ctx, startX, startY, endX, endY, cpX1, cpY1, baseColor, isMobile);
  }
};

const animateFlowParticles = (
  ctx: CanvasRenderingContext2D,
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number,
  cpX: number,
  cpY: number,
  color: string,
  isMobile: boolean = false
) => {
  // Generate fewer positions on mobile
  const particleCount = isMobile ? 2 : 3;
  const time = Date.now() * 0.001;
  
  for (let i = 0; i < particleCount; i++) {
    // Calculate position along curve (0 to 1)
    let t = ((time + i * 0.33) % 1);
    
    // Quadratic bezier formula
    const x = (1-t)*(1-t)*startX + 2*(1-t)*t*cpX + t*t*endX;
    const y = (1-t)*(1-t)*startY + 2*(1-t)*t*cpY + t*t*endY;
    
    // Draw flow particle - smaller on mobile
    const particleSize = isMobile ? 2 : 3;
    ctx.beginPath();
    ctx.arc(x, y, particleSize, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add glow - less intense on mobile
    if (!isMobile) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    }
  }
};

const updateParticles = (
  canvas: HTMLCanvasElement,
  aiNode: AINode,
  panels: OutcomePanel[],
  ctx: CanvasRenderingContext2D,
  state: AnimationState,
  isMobile: boolean = false
) => {
  // Update message particles
  for (let i = state.messageParticles.length - 1; i >= 0; i--) {
    const particle = state.messageParticles[i];
    const x = particle.update();
    particle.draw(ctx, animationColors);

    // Check if particle has reached the AI node center
    if (aiNode.processParticle(particle)) {
      state.messageParticles.splice(i, 1);
      
      // Determine which outcome panel to target based on particle properties
      // Use isQualified to determine if it goes to a positive outcome
      const targetPanelIndex = particle.isQualified ? 
        (Math.random() < 0.7 ? 1 : 0) : // 70% chance for booking if qualified
        2; // Closed deal for qualified leads
        
      const targetPanel = panels[targetPanelIndex];
      targetPanel.pulse();

      // Create the appropriate type of lead particle based on the target panel
      // On mobile, reduce the chance of creating new particles
      if (!isMobile || Math.random() < 0.7) {
        const leadType = targetPanel.type;
        const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
        newLead.setTarget(targetPanel.x, targetPanel.y);
        state.leadParticles.push(newLead);
      }
      continue;
    }

    // If particle is within 150 pixels of AI node, redirect it
    // Reduce interaction radius on mobile
    const interactionRadius = isMobile ? 100 : 150;
    const dx = aiNode.x - particle.x;
    const dy = aiNode.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < interactionRadius && !particle.targetX && Math.random() < (isMobile ? 0.03 : 0.05)) {
      particle.redirectToNode(aiNode.x, aiNode.y);
    }

    // Remove particles that have gone off screen
    if (x > canvas.width + 50) {
      state.messageParticles.splice(i, 1);
    }
  }

  // Update lead particles
  for (let i = state.leadParticles.length - 1; i >= 0; i--) {
    const particle = state.leadParticles[i];
    particle.update();
    particle.draw(ctx, animationColors);

    if (particle.hasReachedTarget()) {
      state.leadParticles.splice(i, 1);
    }
  }

  // Create new message particles - less frequently on mobile
  const particleCreationChance = isMobile ? 0.04 : 0.08;
  const maxParticles = isMobile ? 15 : 30;
  
  if (Math.random() < particleCreationChance && state.messageParticles.length < maxParticles) {
    const x = -20;
    const y = canvas.height * (0.3 + Math.random() * 0.4);
    const newParticle = new MessageParticle(x, y, canvas.height);
    state.messageParticles.push(newParticle);
  }
};
