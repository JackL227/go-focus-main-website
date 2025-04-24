
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const GlassmorphicHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight * 0.8; // 80% of viewport height
    let animationFrameId: number;
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight * 0.8;
      canvas.width = width;
      canvas.height = height;
      
      // Recreate blobs after resize
      initBlobs();
    };
    
    window.addEventListener('resize', handleResize);
    canvas.width = width;
    canvas.height = height;
    
    // Animation settings
    const blobCount = isMobile ? 3 : 5;
    let blobs: Blob[] = [];
    
    class Blob {
      x: number;
      y: number;
      radius: number;
      xOffset: number;
      yOffset: number;
      angle: number;
      angleSpeed: number;
      amplitude: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * (isMobile ? 70 : 120) + (isMobile ? 50 : 80);
        this.xOffset = 0;
        this.yOffset = 0;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() * 0.0002) + 0.0001;
        this.amplitude = Math.random() * 40 + 20;
        
        // Brand-aligned colors
        const colors = [
          'rgba(0, 110, 218, 0.15)', // primary blue
          'rgba(0, 230, 118, 0.12)', // accent green
          'rgba(255, 255, 255, 0.07)' // subtle white
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.angle += this.angleSpeed;
        this.xOffset = Math.cos(this.angle) * this.amplitude;
        this.yOffset = Math.sin(this.angle) * this.amplitude;
      }
      
      draw(context: CanvasRenderingContext2D) {
        const x = this.x + this.xOffset;
        const y = this.y + this.yOffset;
        
        // Create proper gradient
        const gradient = context.createRadialGradient(x, y, 0, x, y, this.radius);
        
        // Extract RGB from the color string
        const rgbMatch = this.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbMatch) {
          const r = rgbMatch[1];
          const g = rgbMatch[2];
          const b = rgbMatch[3];
          const a = rgbMatch[4];
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        } else {
          // Fallback
          gradient.addColorStop(0, 'rgba(0, 110, 218, 0.15)');
          gradient.addColorStop(1, 'rgba(0, 110, 218, 0)');
        }
        
        context.fillStyle = gradient;
        context.beginPath();
        
        // Draw a more complex blob shape using bezier curves
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const nextAngle = ((i + 1) / 8) * Math.PI * 2;
          
          const rad = this.radius * (0.9 + Math.sin(this.angle * 3 + i) * 0.1);
          const nextRad = this.radius * (0.9 + Math.sin(this.angle * 3 + i + 1) * 0.1);
          
          const xPoint = x + Math.cos(angle) * rad;
          const yPoint = y + Math.sin(angle) * rad;
          
          const xNext = x + Math.cos(nextAngle) * nextRad;
          const yNext = y + Math.sin(nextAngle) * nextRad;
          
          const xMid = (xPoint + xNext) / 2;
          const yMid = (yPoint + yNext) / 2;
          
          if (i === 0) {
            context.moveTo(xMid, yMid);
          } else {
            context.quadraticCurveTo(xPoint, yPoint, xMid, yMid);
          }
        }
        
        context.fill();
      }
    }
    
    const initBlobs = () => {
      blobs = [];
      for (let i = 0; i < blobCount; i++) {
        blobs.push(new Blob());
      }
    };
    
    initBlobs();
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear with a gradient background for seamless blend
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050A14');
      gradient.addColorStop(1, '#0A1428');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw blobs
      blobs.forEach(blob => {
        blob.update();
        blob.draw(ctx);
      });
      
      // Apply subtle blur effect for glassmorphic look
      ctx.filter = `blur(${isMobile ? 40 : 60}px)`;
      ctx.globalCompositeOperation = 'screen';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default GlassmorphicHero;
