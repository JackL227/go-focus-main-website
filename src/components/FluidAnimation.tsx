
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const FluidAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recreate particles after resize
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    canvas.width = width;
    canvas.height = height;
    
    // Animation settings - reduce particle count on mobile
    const particleCount = isMobile ? 15 : 25;
    let particles: Particle[] = [];
    
    // Create mouse interaction effect
    const mouse = {
      x: width / 2,
      y: height / 2,
      isActive: false
    };
    
    // Track mouse position for interactive effects
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
      
      // Timeout to reset mouse activity
      clearTimeout(mouse.timeout);
      mouse.timeout = setTimeout(() => {
        mouse.isActive = false;
      }, 3000) as unknown as number;
    });
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      originalRadius: number;
      color: string;
      life: number;
      maxLife: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Smoother, more controlled velocity
        const velocityFactor = isMobile ? 0.25 : 0.3;
        this.vx = Math.random() * velocityFactor - (velocityFactor / 2);
        this.vy = Math.random() * velocityFactor - (velocityFactor / 2);
        
        // Create larger, softer particles
        this.radius = Math.random() * (isMobile ? 60 : 100) + (isMobile ? 40 : 60);
        this.originalRadius = this.radius;
        
        // GoFocus.ai brand colors with variation
        const colors = [
          '#3B82F6', // Primary blue
          '#2563EB', // Secondary blue
          '#1E40AF', // Accent blue
          '#3B82F6', // Double the chances of primary blue
          '#2563EB'  // Double the chances of secondary blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.life = 0;
        this.maxLife = 150 + Math.random() * 150; // Longer lifespan for smoother transitions
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Subtle bounce off edges with damping
        if (this.x < 0 || this.x > width) {
          this.vx *= -0.8; // Damping effect
          this.vx += (Math.random() * 0.1 - 0.05); // Tiny random adjustment
        }
        
        if (this.y < 0 || this.y > height) {
          this.vy *= -0.8; // Damping effect
          this.vy += (Math.random() * 0.1 - 0.05); // Tiny random adjustment
        }
        
        // Very subtle velocity adjustments for natural flow
        const adjustFactor = isMobile ? 0.01 : 0.015;
        this.vx += (Math.random() * adjustFactor - (adjustFactor / 2));
        this.vy += (Math.random() * adjustFactor - (adjustFactor / 2));
        
        // Limit velocity for smoother motion
        const maxVel = isMobile ? 0.4 : 0.5;
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel;
          this.vy = (this.vy / vel) * maxVel;
        }
        
        // Interact with mouse position
        if (mouse.isActive) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;
          
          if (dist < maxDist) {
            // Scale effect based on distance
            const force = (1 - dist / maxDist) * 0.05;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
            
            // Slightly change particle size based on mouse proximity
            this.radius = this.originalRadius * (1 + (1 - dist / maxDist) * 0.2);
          } else {
            // Gradually return to original size
            this.radius += (this.originalRadius - this.radius) * 0.03;
          }
        } else {
          // Gradually return to original size when mouse is inactive
          this.radius += (this.originalRadius - this.radius) * 0.03;
        }
        
        // Life cycle
        this.life++;
        if (this.life >= this.maxLife) {
          this.resetLife();
        }
      }
      
      resetLife() {
        this.life = 0;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * (isMobile ? 60 : 100) + (isMobile ? 40 : 60);
        this.originalRadius = this.radius;
      }
      
      draw() {
        if (!ctx) return;
        
        // Smoother fade in/out based on lifespan
        let opacity = 0;
        
        // Fade in
        if (this.life < this.maxLife * 0.2) {
          opacity = (this.life / (this.maxLife * 0.2)) * 0.2;
        } 
        // Stable period
        else if (this.life < this.maxLife * 0.8) {
          opacity = 0.2;
        } 
        // Fade out
        else {
          opacity = 0.2 * (1 - ((this.life - this.maxLife * 0.8) / (this.maxLife * 0.2)));
        }
        
        // Create a more sophisticated gradient
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        
        // Convert color to rgba for opacity
        const colorBase = this.color;
        gradient.addColorStop(0, `${colorBase}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.4, `${colorBase}${Math.floor(opacity * 200).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${colorBase}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    initParticles();
    
    // Animation loop
    const animate = () => {
      // Apply a subtle blur effect for smoother transitions
      ctx.fillStyle = `rgba(7, 16, 32, ${isMobile ? 0.08 : 0.06})`;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Apply sophisticated blur for a more professional feel
      ctx.filter = `blur(${isMobile ? 30 : 40}px)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ backgroundColor: '#050A14' }}
    />
  );
};

export default FluidAnimation;
