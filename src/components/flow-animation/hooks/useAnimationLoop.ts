
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
      
      // Throttle animation on mobile for better performance
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval && isMobile) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;

      // Draw enhanced background with deeper gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050F20'); // Darker top
      gradient.addColorStop(1, '#0A1A30'); // Still dark but slightly different tone for depth
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw background particles with improved aesthetics
      const { bgParticles } = animationState.current;
      bgParticles.forEach((particle, i) => {
        // Skip some particles on mobile for performance
        if (isMobile && i % 2 === 0) return;
        
        // Enhanced glow effect
        ctx.shadowColor = 'rgba(30, 174, 219, 0.4)';
        ctx.shadowBlur = isMobile ? 2 : 5;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        // Enhanced particle gradient for more depth
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );

        // More variety in particle colors for visual richness
        const isBlue = i % 3 === 0;
        const isTeal = i % 5 === 0;
        if (isBlue) {
          particleGradient.addColorStop(0, 'rgba(30, 174, 219, 0.8)');
          particleGradient.addColorStop(1, 'rgba(0, 20, 50, 0.1)');
        } else if (isTeal) {
          particleGradient.addColorStop(0, 'rgba(0, 230, 118, 0.6)');
          particleGradient.addColorStop(1, 'rgba(0, 40, 50, 0.1)');
        } else {
          particleGradient.addColorStop(0, 'rgba(0, 110, 218, 0.7)');
          particleGradient.addColorStop(1, 'rgba(10, 30, 60, 0.1)');
        }

        ctx.fillStyle = particleGradient;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        // Move particles with slight variance in speed
        particle.x += particle.speed * (0.9 + Math.sin(timestamp * 0.001 + i) * 0.2);
        if (particle.x > canvas.width) {
          particle.x = -5;
          particle.y = Math.random() * canvas.height;
        }
      });

      // Apply subtle blur for glow effect - skip on mobile
      if (!isMobile) {
        ctx.filter = 'blur(1px)';
        ctx.globalAlpha = 0.3;
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
      }

      // Draw enhanced connecting flow paths between AI node and panels
      panels.forEach(panel => {
        drawFlowPath(ctx, aiNode, panel, timestamp, isMobile);
      });

      // Update and draw panels
      panels.forEach(panel => {
        panel.update();
        panel.draw(ctx, animationColors);
      });

      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);

      // Update particles with mobile optimizations
      updateParticles(canvas, aiNode, panels, ctx, animationState.current, timestamp, isMobile);

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [canvas, ctx, aiNode, panels, isMobile]);

  return animationState.current;
};

const drawFlowPath = (
  ctx: CanvasRenderingContext2D,
  aiNode: AINode,
  panel: OutcomePanel,
  timestamp: number,
  isMobile: boolean = false
) => {
  const startX = aiNode.x;
  const startY = aiNode.y;
  const endX = panel.x;
  const endY = panel.y;

  // Create enhanced curvy path with multiple control points
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  // Add subtle animated control points for organic flow
  const time = timestamp * 0.001;
  const randFactor = isMobile ? 5 : 10;
  const cpX1 = midX + Math.sin(time * 0.8) * randFactor;
  const cpY1 = midY + Math.cos(time * 0.7) * randFactor;
  
  // Draw path with enhanced styling for glass effect
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(cpX1, cpY1, endX, endY);

  // Create enhanced gradient based on panel type
  let baseColor = panel.type === 'checkmark' ? animationColors.qualified :
                 panel.type === 'calendar' ? animationColors.booked :
                 animationColors.closed;
  
  // More sophisticated gradient with better opacity
  const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
  lineGradient.addColorStop(0, `${baseColor}22`); // 13% opacity
  lineGradient.addColorStop(0.5, `${baseColor}55`); // 33% opacity  
  lineGradient.addColorStop(1, `${baseColor}22`); // 13% opacity
  
  // Adjust line width and style for cleaner look
  ctx.strokeStyle = lineGradient;
  ctx.lineWidth = panel.isHovered ? 2 : 1.2;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Add enhanced, smoother flow particles along the path
  if (!isMobile || Math.random() < 0.7) { // 70% chance to draw particles on mobile
    animateFlowParticles(ctx, startX, startY, endX, endY, cpX1, cpY1, baseColor, timestamp, isMobile);
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
  timestamp: number,
  isMobile: boolean = false
) => {
  // Generate fewer positions on mobile
  const particleCount = isMobile ? 2 : 4;
  const time = timestamp * 0.001;
  
  for (let i = 0; i < particleCount; i++) {
    // Calculate position along curve with improved timing
    let t = ((time * 0.7 + i * 0.33) % 1.5) / 1.5; // Smoother timing
    if (t > 1) continue; // Skip if beyond the path
    
    // Enhanced quadratic bezier formula for smoother motion
    const x = Math.pow(1-t, 2) * startX + 2 * (1-t) * t * cpX + t * t * endX;
    const y = Math.pow(1-t, 2) * startY + 2 * (1-t) * t * cpY + t * t * endY;
    
    // Draw flow particle with enhanced styling
    const particleSize = isMobile ? 2 : 3;
    
    // Add glow for particles
    ctx.shadowColor = color;
    ctx.shadowBlur = isMobile ? 4 : 8;
    
    // Create particle with fade in/out based on position
    const fadeOpacity = Math.sin(t * Math.PI); // Fade in and out
    
    ctx.beginPath();
    ctx.arc(x, y, particleSize, 0, Math.PI * 2);
    ctx.fillStyle = color + Math.floor(fadeOpacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
  }
};

const updateParticles = (
  canvas: HTMLCanvasElement,
  aiNode: AINode,
  panels: OutcomePanel[],
  ctx: CanvasRenderingContext2D,
  state: AnimationState,
  timestamp: number,
  isMobile: boolean = false
) => {
  // Update message particles with improved interaction
  for (let i = state.messageParticles.length - 1; i >= 0; i--) {
    const particle = state.messageParticles[i];
    const x = particle.update();
    particle.draw(ctx, animationColors);

    // Enhanced AI node interaction
    if (aiNode.processParticle(particle)) {
      state.messageParticles.splice(i, 1);
      
      // More sophisticated panel targeting based on particle properties
      const targetPanelIndex = particle.isQualified ? 
        (Math.random() < 0.7 ? 1 : 0) : // 70% chance for booking if qualified
        2; // Closed deal for qualified leads
        
      const targetPanel = panels[targetPanelIndex];
      targetPanel.pulse();

      // Create the appropriate lead particle with optimized animation
      if (!isMobile || Math.random() < 0.8) {
        const leadType = targetPanel.type;
        const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
        newLead.setTarget(targetPanel.x, targetPanel.y);
        state.leadParticles.push(newLead);
      }
      continue;
    }

    // Enhanced interaction radius with smooth attraction to AI node
    const interactionRadius = isMobile ? 100 : 150;
    const dx = aiNode.x - particle.x;
    const dy = aiNode.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Improved attraction logic with time-based randomization
    const attractionChance = isMobile ? 0.03 : 0.05;
    if (distance < interactionRadius && !particle.targetX && 
        Math.sin(timestamp * 0.001 + particle.y * 0.1) > 0.7 && // Time-based randomization
        Math.random() < attractionChance) {
      particle.redirectToNode(aiNode.x, aiNode.y);
    }

    // Remove particles that have gone off screen
    if (x > canvas.width + 50) {
      state.messageParticles.splice(i, 1);
    }
  }

  // Update lead particles with improved visuals
  for (let i = state.leadParticles.length - 1; i >= 0; i--) {
    const particle = state.leadParticles[i];
    particle.update();
    particle.draw(ctx, animationColors);

    if (particle.hasReachedTarget()) {
      state.leadParticles.splice(i, 1);
    }
  }

  // Create new message particles with improved timing
  const particleCreationChance = isMobile ? 0.04 : 0.08;
  const maxParticles = isMobile ? 15 : 30;
  
  if (Math.sin(timestamp * 0.001) > 0.7 && // Time-based variation
      Math.random() < particleCreationChance && 
      state.messageParticles.length < maxParticles) {
    const x = -20;
    const y = canvas.height * (0.3 + Math.random() * 0.4);
    const newParticle = new MessageParticle(x, y, canvas.height);
    state.messageParticles.push(newParticle);
  }
};
