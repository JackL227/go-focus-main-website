
import React, { useRef, useEffect } from 'react';

const FluidAnimation = ({ extendToSection = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    // If extending to How It Works section, make the canvas taller
    let height = extendToSection ? window.innerHeight * 2 : window.innerHeight;
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = extendToSection ? window.innerHeight * 2 : window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recreate particles after resize
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    canvas.width = width;
    canvas.height = height;
    
    // Animation settings - more particles for extended canvas
    const particleCount = extendToSection ? 50 : 30;
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
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.3 - 0.1; // Slightly biased downward flow
        this.radius = Math.random() * 70 + 30;
        
        // Enhanced color palette that transitions from hero to how it works
        const colors = [
          '#006eda', // Primary blue
          '#004ea0', // Darker blue
          '#00E676', // Neon green
          '#008855', // Teal
          '#101A29'  // Dark navy
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.life = 0;
        // Longer life for particles in extended area
        this.maxLife = 100 + Math.random() * (extendToSection ? 200 : 100);
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off sides with some randomness
        if (this.x < 0 || this.x > width) {
          this.vx *= -1;
          this.vx += (Math.random() * 0.2 - 0.1);
        }
        
        // Special handling for extended canvas - particles can flow downward more freely
        if (extendToSection) {
          if (this.y < 0) {
            this.vy *= -1;
            this.vy += (Math.random() * 0.2 - 0.1);
          } else if (this.y > height) {
            // Reset to top with slight randomness for continuous flow
            this.y = Math.random() * (height / 4);
            this.life = 0;
          }
        } else {
          // Regular bounce for non-extended version
          if (this.y < 0 || this.y > height) {
            this.vy *= -1;
            this.vy += (Math.random() * 0.2 - 0.1);
          }
        }
        
        // Slowly adjust velocity for fluid-like motion
        this.vx += (Math.random() * 0.04 - 0.02);
        this.vy += (Math.random() * 0.03 - 0.01); // Slight downward bias
        
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
        // When resetting, bias particles to appear more at the top for extended mode
        if (extendToSection) {
          this.x = Math.random() * width;
          this.y = Math.random() * (height / 2);
        } else {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        }
        this.radius = Math.random() * 70 + 30;
      }
      
      draw() {
        if (!ctx) return;
        
        // Calculate opacity based on life and position
        let baseOpacity = Math.min(1, this.life / 20) * (1 - Math.max(0, (this.life - (this.maxLife - 20)) / 20));
        
        // If extended, fade particles as they reach the bottom of hero section
        if (extendToSection && this.y > window.innerHeight) {
          // Gradually reduce opacity as particles move deeper into How It Works section
          const fadeRatio = Math.min(1, (this.y - window.innerHeight) / (window.innerHeight / 2));
          baseOpacity *= (1 - (fadeRatio * 0.7)); // Don't fade completely
        }
        
        const opacity = baseOpacity * 0.3;
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Apply blur effect
      ctx.filter = 'blur(30px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [extendToSection]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full ${extendToSection ? 'h-[200vh]' : 'h-full'} z-0`}
      style={{ backgroundColor: '#050A14' }}
    />
  );
};

export default FluidAnimation;
