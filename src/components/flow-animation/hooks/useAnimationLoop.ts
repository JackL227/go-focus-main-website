
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
  panels: OutcomePanel[]
) => {
  const animationState = useRef<AnimationState>({
    messageParticles: [],
    leadParticles: [],
    bgParticles: []
  });

  useEffect(() => {
    // Early return if any required dependencies are missing
    if (!canvas || !ctx || !aiNode) return;

    // Initialize background particles
    animationState.current.bgParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.2
    }));

    // Initialize message particles
    animationState.current.messageParticles = Array.from({ length: 20 }, () => {
      const x = -20;
      const y = canvas.height * (0.3 + Math.random() * 0.4);
      return new MessageParticle(x, y, canvas.height);
    });

    let animationId: number;

    const animate = () => {
      if (!ctx || !canvas || !aiNode) return;

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#081020');
      gradient.addColorStop(1, '#0A1A30');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw background particles
      const { bgParticles } = animationState.current;
      bgParticles.forEach((particle, i) => {
        ctx.shadowColor = 'rgba(30, 174, 219, 0.5)';
        ctx.shadowBlur = 4;

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

      // Apply depth effect
      ctx.filter = 'blur(1px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';

      // Draw connecting flow paths between AI node and panels
      panels.forEach(panel => {
        drawFlowPath(ctx, aiNode, panel);
      });

      // Update and draw panels
      panels.forEach(panel => {
        panel.update();
        panel.draw(ctx, animationColors);
      });

      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);

      // Update particles
      updateParticles(canvas, aiNode, panels, ctx, animationState.current);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [canvas, ctx, aiNode, panels]);

  return animationState.current;
};

const drawFlowPath = (
  ctx: CanvasRenderingContext2D,
  aiNode: AINode,
  panel: OutcomePanel
) => {
  ctx.beginPath();
  const startX = aiNode.x;
  const startY = aiNode.y;
  const endX = panel.x;
  const endY = panel.y;

  // Create a curvy path with multiple control points
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  // Add some randomization to control points for organic feel
  const cpX1 = midX + Math.sin(Date.now() * 0.001) * 10;
  const cpY1 = midY + Math.cos(Date.now() * 0.0008) * 10;
  
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
  
  // Add animated flow particles along the path
  animateFlowParticles(ctx, startX, startY, endX, endY, cpX1, cpY1, baseColor);
};

// Draw animated particles moving along flow paths
const animateFlowParticles = (
  ctx: CanvasRenderingContext2D,
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number,
  cpX: number,
  cpY: number,
  color: string
) => {
  // Generate 3 positions along the curve based on time
  const time = Date.now() * 0.001;
  
  for (let i = 0; i < 3; i++) {
    // Calculate position along curve (0 to 1)
    let t = ((time + i * 0.33) % 1);
    
    // Quadratic bezier formula
    const x = (1-t)*(1-t)*startX + 2*(1-t)*t*cpX + t*t*endX;
    const y = (1-t)*(1-t)*startY + 2*(1-t)*t*cpY + t*t*endY;
    
    // Draw flow particle
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
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
  state: AnimationState
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
      const leadType = targetPanel.type;
      const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
      newLead.setTarget(targetPanel.x, targetPanel.y);
      state.leadParticles.push(newLead);
      continue;
    }

    // If particle is within 150 pixels of AI node, redirect it
    const dx = aiNode.x - particle.x;
    const dy = aiNode.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150 && !particle.targetX && Math.random() < 0.05) {
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

  // Create new message particles
  if (Math.random() < 0.08 && state.messageParticles.length < 30) {
    const x = -20;
    const y = canvas.height * (0.3 + Math.random() * 0.4);
    const newParticle = new MessageParticle(x, y, canvas.height);
    state.messageParticles.push(newParticle);
  }
};
