
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
  aiNode: AINode,
  panels: OutcomePanel[]
) => {
  const animationState = useRef<AnimationState>({
    messageParticles: [],
    leadParticles: [],
    bgParticles: []
  });

  useEffect(() => {
    if (!canvas || !ctx) return;

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
      if (!ctx || !canvas) return;

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

      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);

      // Update and draw panels
      panels.forEach(panel => {
        panel.update();
        panel.draw(ctx, animationColors);
      });

      // Draw connecting lines
      panels.forEach(panel => {
        drawConnectingLine(ctx, aiNode, panel);
      });

      // Update particles
      updateParticles(canvas, aiNode, panels);

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

const drawConnectingLine = (
  ctx: CanvasRenderingContext2D,
  aiNode: AINode,
  panel: OutcomePanel
) => {
  ctx.beginPath();
  const startX = aiNode.x;
  const startY = aiNode.y;
  const endX = panel.x;
  const endY = panel.y;

  const cpX = (startX + endX) / 2 + Math.random() * 20 - 10;
  const cpY = (startY + endY) / 2 + Math.random() * 20 - 10;

  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(cpX, cpY, endX, endY);

  const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
  let baseColor = panel.type === 'checkmark' ? 'rgba(0, 230, 118, ' :
                 panel.type === 'calendar' ? 'rgba(0, 110, 218, ' :
                 'rgba(255, 193, 7, ';

  lineGradient.addColorStop(0, `${baseColor}0.1)`);
  lineGradient.addColorStop(0.5, `${baseColor}0.3)`);
  lineGradient.addColorStop(1, `${baseColor}0.1)`);

  ctx.strokeStyle = lineGradient;
  ctx.lineWidth = panel.isHovered ? 2 : 1;
  ctx.stroke();
};

const updateParticles = (
  canvas: HTMLCanvasElement,
  aiNode: AINode,
  panels: OutcomePanel[]
) => {
  const state = animationState.current;

  // Update message particles
  for (let i = state.messageParticles.length - 1; i >= 0; i--) {
    const particle = state.messageParticles[i];
    const x = particle.update();
    particle.draw(ctx, animationColors);

    if (aiNode.processParticle(particle)) {
      state.messageParticles.splice(i, 1);
      const rand = Math.random();
      let targetPanel = panels[Math.floor(rand * panels.length)];
      targetPanel.pulse();

      const leadType = targetPanel.type;
      const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
      newLead.setTarget(targetPanel.x, targetPanel.y);
      state.leadParticles.push(newLead);
      continue;
    }

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

