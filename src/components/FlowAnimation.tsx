
import React, { useEffect, useRef } from 'react';

const FlowAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full width
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Colors
    const colors = {
      primary: '#1E3A8A', // trader-blue
      secondary: '#3B82F6', // trader-blue-light
      accent: '#10B981', // trader-green-light
      highlight: '#F59E0B', // trader-accent
      faded: 'rgba(107, 114, 128, 0.5)', // trader-gray with opacity
      analytics: '#8B5CF6', // purple for analytics
    };
    
    // Message particles (input)
    class MessageParticle {
      x: number;
      y: number;
      size: number;
      speed: number;
      type: string;
      opacity: number;
      blinkRate: number;
      blinkTime: number;
      isQualified: boolean;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = canvas.height * (0.3 + Math.random() * 0.4); // Keep within middle area
        this.size = 3 + Math.random() * 5;
        this.speed = 0.5 + Math.random() * 1.5;
        // Message types: circle (DM), square (chat), diamond (question)
        this.type = ['circle', 'square', 'diamond'][Math.floor(Math.random() * 3)];
        this.opacity = 0.3 + Math.random() * 0.5;
        this.blinkRate = 0.005 + Math.random() * 0.02;
        this.blinkTime = Math.random() * Math.PI * 2;
        // Determine if this will be a qualified lead (roughly 30%)
        this.isQualified = Math.random() > 0.7;
      }
      
      update() {
        // Move message from left to center
        this.x += this.speed;
        // Subtle vertical movement
        this.y += Math.sin(this.x * 0.01) * 0.2;
        // Blink effect for emphasis
        this.blinkTime += this.blinkRate;
        return this.x;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        const blinkOpacity = Math.sin(this.blinkTime) * 0.2 + 0.8;
        ctx.globalAlpha = this.opacity * blinkOpacity;
        
        if (this.type === 'circle') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
          ctx.fill();
        } else if (this.type === 'square') {
          ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
          ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else if (this.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x + this.size, this.y);
          ctx.lineTo(this.x, this.y + this.size);
          ctx.lineTo(this.x - this.size, this.y);
          ctx.closePath();
          ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }
    }
    
    // Lead particles (output)
    class LeadParticle {
      x: number;
      y: number;
      size: number;
      speed: number;
      type: string;
      opacity: number;
      trail: {x: number, y: number}[];
      pulseSize: number;
      pulseDir: number;
      
      constructor(x: number, y: number, type: string) {
        this.x = x;
        this.y = y;
        this.size = 4 + Math.random() * 3;
        this.speed = 1 + Math.random() * 1;
        // Lead types: calendar, checkmark, dollar, analytics
        this.type = type || ['calendar', 'checkmark', 'dollar', 'analytics'][Math.floor(Math.random() * 4)];
        this.opacity = 0.8 + Math.random() * 0.2;
        this.trail = [];
        this.pulseSize = 0;
        this.pulseDir = 1;
        
        // Add initial trail positions
        for (let i = 0; i < 10; i++) {
          this.trail.push({x: this.x - i * 2, y: this.y});
        }
      }
      
      update() {
        // Move lead from center to right
        this.x += this.speed;
        // Subtle upward trend for success visualization
        this.y -= 0.05;
        
        // Update trail
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 10) {
          this.trail.shift();
        }
        
        // Pulse effect for analytics
        if (this.type === 'analytics') {
          this.pulseSize += 0.05 * this.pulseDir;
          if (this.pulseSize > 1 || this.pulseSize < 0) {
            this.pulseDir *= -1;
          }
        }
        
        return this.x;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        // Draw trail
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        
        const trailColor = this.type === 'analytics' ? colors.analytics : 
                         this.type === 'calendar' ? colors.accent : colors.accent;
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Draw lead particle
        ctx.globalAlpha = this.opacity;
        
        if (this.type === 'calendar') {
          // Calendar icon
          ctx.fillStyle = colors.accent;
          ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
          
          // Calendar details
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(this.x - this.size/3, this.y - this.size/4, this.size/1.5, this.size/2);
        } else if (this.type === 'checkmark') {
          // Checkmark circle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
          ctx.fillStyle = colors.accent;
          ctx.fill();
          
          // Checkmark
          ctx.beginPath();
          ctx.moveTo(this.x - this.size/3, this.y);
          ctx.lineTo(this.x - this.size/10, this.y + this.size/4);
          ctx.lineTo(this.x + this.size/3, this.y - this.size/4);
          ctx.lineWidth = this.size/5;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();
        } else if (this.type === 'dollar') {
          // Dollar circle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
          ctx.fillStyle = colors.highlight;
          ctx.fill();
          
          // Dollar sign
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `${this.size}px Arial`;
          ctx.fillText('$', this.x - this.size/3, this.y + this.size/3);
        } else if (this.type === 'analytics') {
          // Analytics icon - bar chart
          const extraSize = this.pulseSize * 2;
          
          ctx.fillStyle = colors.analytics;
          
          // Bar chart icon
          const barWidth = this.size/3;
          const barSpacing = this.size/6;
          const barBase = this.y + this.size/2;
          
          // First bar
          const bar1Height = this.size * 0.5 + extraSize;
          ctx.fillRect(
            this.x - barWidth*1.5 - barSpacing, 
            barBase - bar1Height, 
            barWidth, 
            bar1Height
          );
          
          // Second bar
          const bar2Height = this.size * 0.8 + extraSize;
          ctx.fillRect(
            this.x - barWidth/2, 
            barBase - bar2Height, 
            barWidth, 
            bar2Height
          );
          
          // Third bar
          const bar3Height = this.size * 0.6 + extraSize;
          ctx.fillRect(
            this.x + barWidth/2 + barSpacing, 
            barBase - bar3Height, 
            barWidth, 
            bar3Height
          );
        }
        
        ctx.globalAlpha = 1;
      }
    }
    
    // AI Agent (central node)
    class AINode {
      x: number;
      y: number;
      size: number;
      pulseRadius: number;
      pulseOpacity: number;
      pulseSpeed: number;
      rotation: number;
      rotationSpeed: number;
      processingEffect: number;
      processingDirection: number;
      
      constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.min(canvas.width, canvas.height) * 0.08; // Responsive size
        this.pulseRadius = this.size;
        this.pulseOpacity = 0.2;
        this.pulseSpeed = 0.01;
        this.rotation = 0;
        this.rotationSpeed = 0.005;
        this.processingEffect = 0;
        this.processingDirection = 1;
      }
      
      update() {
        // Pulse effect
        this.pulseRadius += this.pulseSpeed;
        if (this.pulseRadius > this.size * 1.5) {
          this.pulseRadius = this.size;
        }
        
        // Rotation effect for inner elements
        this.rotation += this.rotationSpeed;
        if (this.rotation > Math.PI * 2) {
          this.rotation = 0;
        }
        
        // Processing effect
        this.processingEffect += 0.02 * this.processingDirection;
        if (this.processingEffect > 1 || this.processingEffect < 0) {
          this.processingDirection *= -1;
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        // Draw outer pulse
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 58, 138, ${this.pulseOpacity})`;
        ctx.fill();
        
        // Draw main node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, colors.secondary);
        gradient.addColorStop(1, colors.primary);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw processing indicator (ripple effect)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (0.6 + this.processingEffect * 0.3), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - this.processingEffect * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw inner rotating elements (abstract AI representation)
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Inner circles
        for (let i = 0; i < 3; i++) {
          const angle = (Math.PI * 2 / 3) * i;
          const orbitRadius = this.size * 0.5;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;
          const circleSize = this.size * (0.12 + this.processingEffect * 0.05);
          
          ctx.beginPath();
          ctx.arc(x, y, circleSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fill();
        }
        
        // Core circle
        ctx.beginPath();
        ctx.arc(0, 0, this.size * (0.22 + this.processingEffect * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        
        ctx.restore();
      }
      
      processParticle(particle: MessageParticle): boolean {
        // Check if particle is within processing range
        const dx = this.x - particle.x;
        const dy = this.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < this.size * 1.2;
      }
    }
    
    // Animation variables
    const messageParticles: MessageParticle[] = [];
    const leadParticles: LeadParticle[] = [];
    const aiNode = new AINode();
    let animationId: number;
    
    // Create initial particles
    const createInitialParticles = () => {
      for (let i = 0; i < 15; i++) {
        const x = -50 - Math.random() * 100;
        const y = Math.random() * canvas.height;
        messageParticles.push(new MessageParticle(x, y));
      }
    };
    
    createInitialParticles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx);
      
      // Update and draw message particles
      for (let i = messageParticles.length - 1; i >= 0; i--) {
        const particle = messageParticles[i];
        const x = particle.update();
        particle.draw(ctx);
        
        // Check if particle reached AI node for processing
        if (aiNode.processParticle(particle)) {
          messageParticles.splice(i, 1);
          
          // If qualified, create a lead particle
          if (particle.isQualified) {
            // Determine what type of lead particle to create with more analytics
            const leadType = ['calendar', 'checkmark', 'dollar', 'analytics'][Math.floor(Math.random() * 4)];
            leadParticles.push(new LeadParticle(aiNode.x, aiNode.y, leadType));
          }
        }
        
        // Remove if off screen
        if (x > canvas.width + 50) {
          messageParticles.splice(i, 1);
        }
      }
      
      // Update and draw lead particles
      for (let i = leadParticles.length - 1; i >= 0; i--) {
        const particle = leadParticles[i];
        const x = particle.update();
        particle.draw(ctx);
        
        // Remove if off screen
        if (x > canvas.width + 50) {
          leadParticles.splice(i, 1);
        }
      }
      
      // Create new message particles at a controlled rate
      if (Math.random() < 0.1 && messageParticles.length < 25) {
        const x = -20;
        const y = Math.random() * canvas.height;
        messageParticles.push(new MessageParticle(x, y));
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-trader-blue/10 to-trader-green-light/5"
      style={{ opacity: 0.9 }}
    />
  );
};

export default FlowAnimation;
