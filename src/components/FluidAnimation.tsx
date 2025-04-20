
import React, { useRef, useEffect } from 'react';

const FluidAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    
    // Brand colors - navy, deep teal, neon green
    const brandColors = [
      '#050A14', // Dark navy
      '#0A1428', // Navy
      '#006eda', // Blue
      '#00E676', // Neon green
      '#1EAEDB'  // Teal
    ];
    
    // Animation settings
    const particleCount = 40; // Increased for more fluid motion
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
        
        // Slower velocities for more gentle movement
        this.vx = Math.random() * 0.3 - 0.15;
        this.vy = Math.random() * 0.3 - 0.15;
        
        // Varying sizes for depth perception
        this.radius = Math.random() * 100 + 50;
        
        // Select brand colors
        this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
        
        this.life = 0;
        this.maxLife = 150 + Math.random() * 150; // Longer life for smoother transitions
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges with some randomness
        if (this.x < -this.radius || this.x > width + this.radius) {
          this.vx *= -1;
          this.vx += (Math.random() * 0.1 - 0.05);
        }
        
        if (this.y < -this.radius || this.y > height + this.radius) {
          this.vy *= -1;
          this.vy += (Math.random() * 0.1 - 0.05);
        }
        
        // Slowly adjust velocity for fluid-like motion
        this.vx += (Math.random() * 0.02 - 0.01);
        this.vy += (Math.random() * 0.02 - 0.01);
        
        // Limit velocity
        const maxVel = 0.5;
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
        
        // Reposition randomly
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { // Top
          this.x = Math.random() * width;
          this.y = -this.radius;
          this.vy = Math.abs(this.vy);
        } else if (side === 1) { // Right
          this.x = width + this.radius;
          this.y = Math.random() * height;
          this.vx = -Math.abs(this.vx);
        } else if (side === 2) { // Bottom
          this.x = Math.random() * width;
          this.y = height + this.radius;
          this.vy = -Math.abs(this.vy);
        } else { // Left
          this.x = -this.radius;
          this.y = Math.random() * height;
          this.vx = Math.abs(this.vx);
        }
        
        this.radius = Math.random() * 100 + 50;
        this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
      }
      
      draw() {
        if (!ctx) return;
        
        // Create a smooth fade in/out effect
        const opacityFadeIn = Math.min(1, this.life / 30);
        const opacityFadeOut = Math.min(1, (this.maxLife - this.life) / 30);
        const opacity = Math.min(opacityFadeIn, opacityFadeOut) * 0.25;
        
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
    
    // Animation loop with layered blur for more depth
    const animate = () => {
      // Clear canvas with very slight opacity for subtle trails
      ctx.fillStyle = 'rgba(5, 10, 20, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Apply multi-pass blur for depth
      ctx.filter = 'blur(40px)';
      ctx.globalAlpha = 0.8;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'blur(15px)';
      ctx.globalAlpha = 0.6;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default FluidAnimation;
