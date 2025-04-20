
import React, { useRef, useEffect } from 'react';

const FluidAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight * 1.5; // Extended height to cover both sections
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight * 1.5; // Extended height for seamless effect
      canvas.width = width;
      canvas.height = height;
      
      // Recreate particles after resize
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    canvas.width = width;
    canvas.height = height;
    
    // Brand colors - expanded color palette for smoother transitions
    const brandColors = [
      '#050A14', // Dark navy
      '#0A1428', // Navy
      '#0D1E3C', // Medium navy
      '#006eda', // Blue
      '#0080FF', // Brighter blue
      '#00A0FF', // Light blue
      '#00E676', // Neon green
      '#00C853', // Medium green
      '#1EAEDB', // Teal
      '#00ACC1'  // Light teal
    ];
    
    // Animation settings
    const particleCount = 50; // Increased for more fluid motion and coverage
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
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
        
        // Varying sizes for depth perception
        this.radius = Math.random() * 120 + 60;
        
        // Select brand colors
        this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
        
        this.life = 0;
        this.maxLife = 200 + Math.random() * 200; // Longer life for smoother transitions
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges with some randomness
        if (this.x < -this.radius || this.x > width + this.radius) {
          this.vx *= -1;
          this.vx += (Math.random() * 0.08 - 0.04);
        }
        
        if (this.y < -this.radius || this.y > height + this.radius) {
          this.vy *= -1;
          this.vy += (Math.random() * 0.08 - 0.04);
        }
        
        // Slower adjustment velocity for more fluid-like motion
        this.vx += (Math.random() * 0.01 - 0.005);
        this.vy += (Math.random() * 0.01 - 0.005);
        
        // Limit velocity
        const maxVel = 0.4;
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
        
        // Reposition randomly throughout the larger canvas (including extended area)
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
        
        this.radius = Math.random() * 120 + 60;
        this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
      }
      
      draw() {
        if (!ctx) return;
        
        // Create a smoother fade in/out effect
        const opacityFadeIn = Math.min(1, this.life / 40);
        const opacityFadeOut = Math.min(1, (this.maxLife - this.life) / 40);
        const opacity = Math.min(opacityFadeIn, opacityFadeOut) * 0.2; // Lower opacity for subtle effect
        
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
      ctx.fillStyle = 'rgba(5, 10, 20, 0.03)'; // More subtle trail effect
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Apply multi-pass blur for depth
      ctx.filter = 'blur(50px)'; // Increased blur for smoother gradients
      ctx.globalAlpha = 0.7;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'blur(20px)';
      ctx.globalAlpha = 0.5;
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
      style={{ backgroundColor: 'transparent', height: '150vh' }} // Extend canvas height for seamless flow
    />
  );
};

export default FluidAnimation;
