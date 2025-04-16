
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
    
    // Animation settings
    const particleCount = 40;
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
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.radius = Math.random() * 50 + 20;
        this.color = '#006eda';
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
        
        // Slowly adjust velocity for fluid-like motion
        this.vx += (Math.random() * 0.04 - 0.02);
        this.vy += (Math.random() * 0.04 - 0.02);
        
        // Limit velocity
        const maxVel = 0.7;
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
        this.radius = Math.random() * 50 + 20;
      }
      
      draw() {
        if (!ctx) return;
        
        const opacity = Math.min(1, this.life / 20) * (1 - Math.max(0, (this.life - (this.maxLife - 20)) / 20));
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        
        gradient.addColorStop(0, `rgba(0, 110, 218, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(0, 110, 218, 0)`);
        
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Apply blur effect
      ctx.filter = 'blur(12px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      
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
      style={{ backgroundColor: '#000000' }}
    />
  );
};

export default FluidAnimation;
