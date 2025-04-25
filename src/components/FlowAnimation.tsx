
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

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

    // Simple animation to replace the complex flow animation
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const createParticle = () => {
      const radius = Math.random() * 4 + 2;
      return {
        x: -radius,
        y: canvas.height * (Math.random() * 0.6 + 0.2),
        radius,
        color: Math.random() > 0.5 ? '#006eda' : '#00E676',
        vx: Math.random() * 2 + 1,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.5
      };
    };

    // Create initial particles
    for (let i = 0; i < (isMobile ? 15 : 30); i++) {
      const p = createParticle();
      // Distribute particles across canvas initially
      p.x = Math.random() * canvas.width;
      particles.push(p);
    }

    const animate = () => {
      // Clear canvas with slight fadeout effect for trails
      ctx.fillStyle = 'rgba(1, 1, 1, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new particles occasionally
      if (Math.random() < 0.05 && particles.length < (isMobile ? 20 : 40)) {
        particles.push(createParticle());
      }

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = p.x > canvas.width * 0.7 ? Math.max(0, p.alpha - 0.02) : p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Remove particles that go off-screen or fade out
        if (p.x > canvas.width + p.radius || p.alpha <= 0) {
          particles.splice(i, 1);
        }
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
