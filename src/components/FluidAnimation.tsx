
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
    const particleCount = isMobile ? 15 : 30;
    let particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      life: number;
      maxLife: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Reduce velocity on mobile for better performance
        const velocityFactor = isMobile ? 0.3 : 0.4;
        this.vx = Math.random() * velocityFactor - (velocityFactor / 2);
        this.vy = Math.random() * velocityFactor - (velocityFactor / 2);
        
        // Smaller particles on mobile
        this.radius = Math.random() * (isMobile ? 50 : 70) + (isMobile ? 20 : 30);
        
        // Different colors for particles
        const colors = ['#006eda', '#00E676', '#006eda'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.life = 0;
        this.maxLife = 100 + Math.random() * 100;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges with some randomness
        if (this.x < 0 || this.x > width) {
          this.vx *= -1;
          this.vx += (Math.random() * 0.2 - 0.1);
        }
        
        if (this.y < 0 || this.y > height) {
          this.vy *= -1;
          this.vy += (Math.random() * 0.2 - 0.1);
        }
        
        // Slower velocity adjustments on mobile
        const adjustFactor = isMobile ? 0.02 : 0.04;
        this.vx += (Math.random() * adjustFactor - (adjustFactor / 2));
        this.vy += (Math.random() * adjustFactor - (adjustFactor / 2));
        
        // Limit velocity - slower on mobile
        const maxVel = isMobile ? 0.5 : 0.7;
        const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (vel > maxVel) {
          this.vx = (this.vx / vel) * maxVel;
          this.vy = (this.vy / vel) * maxVel;
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
        this.radius = Math.random() * (isMobile ? 50 : 70) + (isMobile ? 20 : 30);
      }
      
      draw() {
        if (!ctx) return;
        
        // Lower opacity on mobile for less visual intensity
        const opacityFactor = isMobile ? 0.25 : 0.3;
        const opacity = Math.min(1, this.life / 20) * (1 - Math.max(0, (this.life - (this.maxLife - 20)) / 20)) * opacityFactor;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        
        gradient.addColorStop(0, `${this.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${this.color}00`);
        
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
      // Clear with semi-transparent black for trail effect
      // Use more transparency for mobile (faster clearing)
      ctx.fillStyle = `rgba(0, 0, 0, ${isMobile ? 0.1 : 0.05})`;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Apply less blur on mobile for better performance
      ctx.filter = `blur(${isMobile ? 20 : 30}px)`;
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
